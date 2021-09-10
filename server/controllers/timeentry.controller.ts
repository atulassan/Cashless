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
import {  TimeentryCreateDTO,TimeentryUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqTimeEntry} from '../entities';
//import { DesqActivityReminder } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/timeentry')
export class TimeentryController {
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
  @Middleware(validationMiddleware(TimeentryCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        ticketId,
        agentId,
        excuteTime,
        duration,
        description,
        billingType,
        costHour,
        addtionalCost,
        totalCost,
        ticketChargeType,
        createdBy,
       
     }:  TimeentryCreateDTO= request.body;
      console.log('request.body;',request.body)
     const createTimeentryQuery = await getRepository(DesqTimeEntry)
          .createQueryBuilder('desq_time_entry')
          .insert()
          .into('desq_time_entry')
          .values({
          ...{clientId: clientId, ticketId: ticketId,
            agentId: agentId, excuteTime: excuteTime,
            duration: duration, description: description, 
            status: 1, billingType:billingType, costHour:costHour, addtionalCost:addtionalCost,
            totalCost:totalCost, ticketChargeType: ticketChargeType, createdDatetime: new Date(), createdby: createdBy
            },
           
        })
        .execute();
       const ticketAddedId = createTimeentryQuery.generatedMaps[0].timeEntryId;
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'Time Entry added successfully.',
            response: {
              id: createTimeentryQuery.generatedMaps[0].timeEntryId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  /***
   * Get separate Time Entry
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getTimeEntryQuery = await getRepository(DesqTimeEntry)
        .createQueryBuilder('desq_timeentry')
        .getOne();
        
        if(getTimeEntryQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'TimeEntry data',
                success:true,
                response: { ...getTimeEntryQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Get separate Time Entry ticket
   */
  @Get('/ticket/:id')
    //@Middleware(authenticateMiddleware)
    public async getTicketItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getTimeEntryQuery = await getRepository(DesqTimeEntry)
        .createQueryBuilder('desq_timeentry')
        .where('desq_timeentry.ticket_id=:id',{ id: Id},)
        .getMany();
        
        if(getTimeEntryQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'TimeEntry data',
                success:true,
                response: { ...getTimeEntryQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * TimeEntry Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqTimeEntry)
          .delete({ timeEntryId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'timeEntry removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
 @Post('/update/:id')
 // @Middleware([validationMiddleware(CustomerUpdateDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(TimeentryUpdateDTO))
  private async updateCustomer(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    console.log(request.body);
    try {
      let Id = parseInt(request.params.id);
      const {
        clientId,
        ticketId,
        agentId,
        excuteTime,
        duration,
        description,
        billingType,
        costHour,
        addtionalCost,
        totalCost,
        ticketChargeType,
        modifiedBy,
      }: TimeentryUpdateDTO = request.body;
      console.log(request.body);
      const updateCustCOntactQuery = getRepository(DesqTimeEntry)
        .createQueryBuilder('desq_time_entry')  
        .update()
        .set({ clientId: clientId, ticketId: ticketId,
          agentId: agentId, excuteTime: excuteTime,
          duration: duration, description: description, 
          status: 1, billingType:billingType, costHour:costHour, addtionalCost:addtionalCost,
          totalCost:totalCost, ticketChargeType: ticketChargeType, modifiedDatetime: new Date(), modifiedby: modifiedBy})
        .where('desq_time_entry.time_entry_id=:id',{ id: Id},)
        .execute();
          response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'time Entry Update Successfully.',
            response: { updateCustCOntactQuery },
        });
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }

  


  

}
export default TimeentryController