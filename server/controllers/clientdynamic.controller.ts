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
import {  ClientDynamicCreateDTO, ClientDynamicUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqClientDynamic } from '../entities';
//import { DesqActivityReminder } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/clientdynamic')
export class ClientdynamicController {
  
  /***
   * client Dyanmic Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(ClientDynamicCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        clientAttId,
        customerId,
        ticketId,
        fieldValue,
        createdBy,
       
     }:  ClientDynamicCreateDTO= request.body;
      console.log('request.body;',request.body)
     const createClientDynamicQuery = await getRepository(DesqClientDynamic)
          .createQueryBuilder('desq_client_dynamic')
          .insert()
          .into('desq_client_dynamic')
          .values({
          ...{clientId: clientId, ticketId: ticketId, clientAttId: clientAttId, customerId: customerId,fieldValue: fieldValue, createdDatetime: new Date(), createdby: createdBy
            },
           
        })
        .execute();
       response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'clientDyanmci added successfully.',
            response: {
              id: createClientDynamicQuery.generatedMaps[0].clientDynamicId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  /***
   * Get separate ClientDynamic
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getClientdynamicQuery = await getRepository(DesqClientDynamic)
        .createQueryBuilder('desq_client_dynamic')
        .getOne();
        
        if(getClientdynamicQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Client dynamic data',
                success:true,
                response: { ...getClientdynamicQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Get separate Client Dynamic ticket
   */
  @Get('/ticket/:id')
    //@Middleware(authenticateMiddleware)
    public async getTicketItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getClientDynamicQuery = await getRepository(DesqClientDynamic)
        .createQueryBuilder('desq_client_dynamic')
        .where('desq_client_dynamic.ticket_id=:id',{ id: Id},)
        .getMany();
        
        if(getClientDynamicQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'client dynamic data',
                success:true,
                response: { ...getClientDynamicQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Get separate Client Dynamic customer
   */
  @Get('/customer/:id')
    //@Middleware(authenticateMiddleware)
    public async getCustomerItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getClientDynamicQuery = await getRepository(DesqClientDynamic)
        .createQueryBuilder('desq_client_dynamic')
        .where('desq_client_dynamic.customer_id=:id',{ id: Id},)
        .getMany();
        
        if(getClientDynamicQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'client dynamic data',
                success:true,
                response: { ...getClientDynamicQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Client Dynamic Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeClientdynamic(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqClientDynamic)
          .delete({ clientDynamicId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Client Dynamic removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
 @Post('/update/:id')
 // @Middleware([validationMiddleware(CustomerUpdateDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(ClientDynamicUpdateDTO))
  private async updateClientDynamic(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    console.log(request.body);
    try {
      let Id = parseInt(request.params.id);
      const {
        clientId,
        clientAttId,
        customerId,
        ticketId,
        fieldValue,
        modifiedBy,
      }: ClientDynamicUpdateDTO = request.body;
      console.log(request.body);
      const updateDynamicactQuery = getRepository(DesqClientDynamic)
        .createQueryBuilder('desq_client_dynamic')  
        .update()
        .set({ clientId: clientId, clientAttId: clientAttId, customerId: customerId, fieldValue: fieldValue,  
          modifiedDatetime: new Date(), modifiedby: modifiedBy})
        .where('desq_client_dynamic.client_dynamic_id=:id',{ id: Id},)
        .execute();
          response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'client dynamic Update Successfully.',
            response: { updateDynamicactQuery },
        });
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }
 

}
export default ClientdynamicController