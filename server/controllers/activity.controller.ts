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
import {  ActivityCreateDTO, ActivityUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqActivity } from '../entities';
//import { DesqActivityReminder } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/activity')
export class ActivityController {
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
  @Middleware(validationMiddleware(ActivityCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        ticketId,
        type,
        category,
        subject,
        direction,
        callstatus,
        starttime,
        duration,
        callOwner,
        contactName,
        priority,
        totalCost,
        description,
        createdBy,
       
     }:  ActivityCreateDTO= request.body;
      console.log('request.body;',request.body)
     const createActivityQuery = await getRepository(DesqActivity)
          .createQueryBuilder('desq_activity')
          .insert()
          .into('desq_activity')
          .values({
          ...{clientId: clientId, ticketId: ticketId,
            type: type, category: category,
            duration: duration, description: description, 
            status: 1, subject:subject, dirction:direction, callstatus:callstatus, starttime:new Date(),
            contactName:contactName, totalCost: totalCost, createdDatetime: new Date(), createdby: createdBy
            },
           
        })
        .execute();
       const activeAddedId = createActivityQuery.generatedMaps[0].activityId;

      //  if(createActivityQuery)
      //  {
      //    var Rpopup,Rsms,Remail;
      //    if(Rpopup == "popup")
      //    {
      //     Rpopup = 1;
      //    }
      //    if(Rsms == "popup")
      //    {
      //     Rsms = 1;
      //    }
      //    if(Remail == "popup")
      //    {
      //     Remail = 1;
      //    }
      //   const createActivityRemainderQuery = await getRepository(DesqActivity)
      //     .createQueryBuilder('desq_activity')
      //     .insert()
      //     .into('desq_activity')
      //     .values({
      //     ...{clientId: clientId, activityId: activeAddedId,
      //       hours: hours, type: type,
      //       minutes: minutes, email: email, 
      //       popup: popup, sms:sms, createdDatetime: new Date(), createdby: createdBy
      //       },
           
      //   })
      //   .execute();
      //  }
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'Activity added successfully.',
            response: {
              id: createActivityQuery.generatedMaps[0].activityId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  /***
   * Get separate Activity
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getActivityQuery = await getRepository(DesqActivity)
        .createQueryBuilder('desq_activity')
        .getOne();
        
        if(getActivityQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Activity data',
                success:true,
                response: { ...getActivityQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Get separate Time Activity ticket
   */
  @Get('/ticket/:id')
    //@Middleware(authenticateMiddleware)
    public async getTicketItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getActivityQuery = await getRepository(DesqActivity)
        .createQueryBuilder('desq_activity')
        .where('desq_activity.ticket_id=:id',{ id: Id},)
        .getMany();
        
        if(getActivityQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Activity data',
                success:true,
                response: { ...getActivityQuery },
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
      const removeQuery = await getRepository(DesqActivity)
          .delete({ activityId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'activity removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
 @Post('/update/:id')
 // @Middleware([validationMiddleware(CustomerUpdateDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(ActivityUpdateDTO))
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
        type,
        category,
        subject,
        direction,
        callstatus,
        starttime,
        duration,
        callOwner,
        contactName,
        totalCost,
        description,
        priority,
        modifiedBy,
      }: ActivityUpdateDTO = request.body;
      console.log(request.body);
      const updateCustCOntactQuery = getRepository(DesqActivity)
        .createQueryBuilder('desq_activity')  
        .update()
        .set({ clientId: clientId, ticketId: ticketId,
          type: type, category: category,
          duration: duration, description: description, 
          status: 1, subject:subject, direction:direction, callstatus:callstatus, starttime:new Date(),
          contactName:contactName, totalCost: totalCost, priority: priority, 
          modifiedDatetime: new Date(), modifiedby: modifiedBy})
        .where('desq_activity.activity_id=:id',{ id: Id},)
        .execute();
          response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'activity Update Successfully.',
            response: { updateCustCOntactQuery },
        });
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }
 

}
export default ActivityController