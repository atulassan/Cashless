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
import {  ClcCreateDTO,ClcUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqClassifications } from '../entities';
import { DesqChannel } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/classification')
export class ClassificationController {
   /***
   * Classification Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(ClcCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        classificationName,
        createdBy
       
     }:  ClcCreateDTO= request.body;
      console.log('request.body;',request.body)
      const checkingClcAlreadyExistQuery = await getRepository(DesqClassifications) 
        .createQueryBuilder('desq_classifications')
        .where(
          'desq_classifications.classification_name = :classificationName',
          {
            classificationName: classificationName,
          },
        )
        .getOne();
    const createClcQuery = await getRepository(DesqClassifications)
            .createQueryBuilder('checkingClcAlreadyExistQuery')
          .insert()
          .into('desq_classifications')
          .values({
          ...{clientId: clientId, classificationName: classificationName,
            createdDatetime: new Date(), createdby: createdBy, status: 1}
        })
        .execute();
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'Classification added successfully.',
            response: {
              id: createClcQuery.generatedMaps[0].classificationId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
   @Post('/update/:id')
  //@Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(ClcUpdateDTO))
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
        classificationName,
        modifiedBy,
      }: ClcUpdateDTO = request.body;
      console.log(request.body);
      const checkingClcAlreadyExistQuery = await getRepository(DesqClassifications) 
        .createQueryBuilder('desq_classifications')
        .where(
          'desq_classifications.classification_name = :classificationName AND desq_classifications.classification_id=:id',
          {
            classificationName: classificationName,
            id: !Id
          },
        )
        .getOne();
      const updateQuery = getRepository(DesqClassifications)
          .createQueryBuilder('checkingClcAlreadyExistQuery')
          .update()
          .set({ classificationName: classificationName, modifiedDatetime: new Date(), modifiedby: modifiedBy, status: 1})
          .where('desq_classifications.classification_id=:id',{ id: Id},)
          .execute();
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'classification Update Successfully.',
              response: { updateQuery },
          }); 
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }

  /***
   * Get All Classification with pagination
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
    const productCountQuery = await DesqClassifications.count();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
      
      let PaginationQuery;
       PaginationQuery = await getRepository(DesqClassifications)
        .createQueryBuilder('desq_classifications')
        .select(['desq_classifications'])
        .where(`desq_classifications.status In (:...status)`, { status: [Status.ACTIVIE, Status.INACTIVE] })
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('desq_classifications.classification_id', 'DESC')
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
   * Get separate Classifications
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getClcQuery = await getRepository(DesqClassifications)
        .createQueryBuilder('desq_classifications')
         .where('desq_classifications.classification_id = :id ', {id: Id}, )
        .getOne();
        if(getClcQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Classification data',
                success:true,
                response: { ... getClcQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Classifications Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqClassifications)
          .delete({ classificationId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'classification removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }


  

}
export default ClassificationController