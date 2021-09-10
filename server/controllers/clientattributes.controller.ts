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
import {  ClientAttCreateDTO, ClientAttUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqClientAttributes } from '../entities';
//import { DesqActivityReminder } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/clientattributes')
export class ClientattributesController {
  /***
   * Get All Time Entery with pagination
   */
  // @Get('/all')
  // //@Middleware(authenticateMiddleware)
  // public async index(request: Request, response: Response, next: NextFunction) {
  //   var currentPage, maxPages, pageSize, customerType ;
  //   currentPage = request.query.currentpage;
  //   maxPages = request.query.maxPages;
  //   pageSize = request.query.pageSize;
  //  //var { currentPage, maxPages, pageSize } = request.query;
  //   currentPage = currentPage ? currentPage : 1;
  //   maxPages = maxPages ? maxPages : 1;
  //   pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
  //   const productCountQuery = await getRepository(DesqTimeEntry)
  //   .createQueryBuilder('timeentry')
  //   .getCount();
  //   if (productCountQuery) {
  //     const paginationData = paginate(
  //       productCountQuery,
  //       parseInt(currentPage),
  //       parseInt(pageSize),
  //       parseInt(maxPages),
  //     );
      
  //     let PaginationQuery;
  //      PaginationQuery = await getRepository(DesqTimeEntry)
  //       .createQueryBuilder('customer')
  //       .select(['customer'])
  //       .skip(paginationData.startIndex)
  //       .take(paginationData.pageSize)
  //       .orderBy('customer_id', 'DESC')
  //       .getMany();
  //    let result = [];
  //   PaginationQuery.map(function (customer, index) {
      
  //       result.push(customer);
  //     }, this);
  //     //  console.log(result);
  //     response.status(200).json({
  //       status: 200,
  //       timestamp: Date.now(),
  //       message: 'All Details Fetched Successfully',
  //       response: {
  //         ...paginationData,
  //         ...{ data: result },
  //       },
  //     });
  //   }
  //   else {
  //     next(new CommonException('404', 'No Record Found'));
  //   }
  // }
  /***
   * Ticket Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(ClientAttCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        modelType,
        type,
        options,
        additionalClass,
        id,
        title,
        createdBy,
       
     }:  ClientAttCreateDTO= request.body;
      console.log('request.body;',request.body)
     const createTimeentryQuery = await getRepository(DesqClientAttributes)
          .createQueryBuilder('desq_client_attributes')
          .insert()
          .into('desq_client_attributes')
          .values({
          ...{clientId: clientId, modelType:modelType,  type: type, options: options,additionalClass: additionalClass, id:id,title: title, createdDatetime: new Date(), createdby: createdBy
            },
           
        })
        .execute();
       response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'clientAtt added successfully.',
            response: {
              id: createTimeentryQuery.generatedMaps[0].clientAttId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  /***
   * Get separate Client
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getActivityQuery = await getRepository(DesqClientAttributes)
        .createQueryBuilder('desq_client_attributes')
        .getOne();
        
        if(getActivityQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Client Att data',
                success:true,
                response: { ...getActivityQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }

/***
   * Client Att Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqClientAttributes)
          .delete({ clientAttId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Client Att removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
 @Post('/update/:id')
 // @Middleware([validationMiddleware(CustomerUpdateDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(ClientAttUpdateDTO))
  private async updateClient(
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
        options,
        additionalClass,
        id,
        title,
        modifiedBy,
      }: ClientAttUpdateDTO = request.body;
      console.log(request.body);
      const updateCustCOntactQuery = getRepository(DesqClientAttributes)
        .createQueryBuilder('desq_client_attributes')  
        .update()
        .set({ clientId: clientId, type: type, options: options, additionalClass: additionalClass, id:id, title: title, 
          modifiedDatetime: new Date(), modifiedby: modifiedBy})
        .where('desq_client_attributes.client_att_id=:id',{ id: Id},)
        .execute();
          response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'client Att Update Successfully.',
            response: { updateCustCOntactQuery },
        });
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }
 

}
export default ClientattributesController