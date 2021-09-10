import { Request, Response, NextFunction } from 'express'
import { Controller, Get, Post, Middleware } from '../decorators'
import { validationMiddleware, authenticateMiddleware } from '../middleware'
import {
  UserWithThatEmailAlreadyExistsException,
  InternalServerErrorException,
  UserMobileAlreadyExists,
  CommonException,
  PasswordNotMatchException,

} from '../exceptions/index';
import {  ChargetypeCreateDTO,ChargetypeUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqChargeType } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/chargetype')
export class ChargetypeController {
   /***
   * Chargetype Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(ChargetypeCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        type,
        createdBy
       
     }:  ChargetypeCreateDTO= request.body;
      console.log('request.body;',request.body)
      const checkingChargeTypeAlreadyExistQuery = await getRepository(DesqChargeType) 
        .createQueryBuilder('desq_charge_type')
        .where(
          'desq_charge_type.type = :type',
          {
            type: type,
          },
        )
        .getOne();
    const createChargeTypeQuery = await getRepository(DesqChargeType)
            .createQueryBuilder('checkingChargeTypeAlreadyExistQuery')
          .insert()
          .into('desq_charge_type')
          .values({
          ...{clientId: clientId, type: type, status: 1,
            createdDatetime: new Date(), createdby: createdBy}
        })
        .execute();
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'charge type added successfully.',
            response: {
              id: createChargeTypeQuery.generatedMaps[0].chargeTypeId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
   @Post('/update/:id')
  //@Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(ChargetypeUpdateDTO))
  private async updateUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    console.log(request.body);
    try {
      let Id = parseInt(request.params.id);
      const {
        clientId,
        type,
        modifiedBy,
      }: ChargetypeUpdateDTO = request.body;
      console.log(request.body);
      const checkingChargeTypeAlreadyExistQuery = await getRepository(DesqChargeType) 
        .createQueryBuilder('desq_charge_type')
        .where(
          'desq_charge_type.type = :type AND desq_charge_type.charge_type_id=:id',
          {
            type: type,
            id: !Id
          },
        )
        .getOne();
      const updateQuery = getRepository(DesqChargeType)
          .createQueryBuilder('checkingChargeTypeAlreadyExistQuery')
          .update()
          .set({ type: type, status: 1, modifiedDatetime: new Date(), modifiedby: modifiedBy})
          .where('desq_charge_type.charge_type_id=:id',{ id: Id},)
          .execute();
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Chargetype Update Successfully.',
              response: { updateQuery },
          }); 
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }

  /***
   * Get All ChargeType with pagination
   */
   @Get('/all')
  //@Middleware(authenticateMiddleware)
  public async index(request: Request, response: Response, next: NextFunction) {
    var currentPage, maxPages, pageSize ;
    currentPage = request.query.currentpage;
    maxPages = request.query.maxPages;
    pageSize = request.query.pageSize;
   //var { currentPage, maxPages, pageSize } = request.query;
    currentPage = currentPage ? currentPage : 1;
    maxPages = maxPages ? maxPages : 1;
    pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
    const productCountQuery = await DesqChargeType.count();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
      
      let PaginationQuery;
       PaginationQuery = await getRepository(DesqChargeType)
        .createQueryBuilder('desq_charge_type')
        .select(['desq_charge_type'])
        .where(`desq_charge_type.status In (:...status)`, { status: [Status.ACTIVIE, Status.INACTIVE] })
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('desq_charge_type.charge_type_id', 'DESC')
        .getMany();
     let result = [];
    PaginationQuery.map(function (tickets, index) {
      
        result.push(tickets);
      }, this);
      //  console.log(result);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'All Details Fetched Successfully',
        response: {
          ...paginationData,
          ...{ data: result },
        },
      });
    }
    else {
      next(new CommonException('404', 'No Record Found'));
    }

  }
   /***
   * Get separate ChargeType
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getChargeTypeQuery = await getRepository(DesqChargeType)
        .createQueryBuilder('desq_charge_type')
         .where('desq_charge_type.charge_type_id = :id ', {id: Id}, )
        .getOne();
        if(getChargeTypeQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'ChargeType data',
                success:true,
                response: { ... getChargeTypeQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * charge Type Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqChargeType)
          .delete({ chargeTypeId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Charge type removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }


  

}
export default ChargetypeController