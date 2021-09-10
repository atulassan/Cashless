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
import {  ChannelCreateDTO,ChannelUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqTicket,DesqAttachemnts,DesqClassifications } from '../entities';
import { DesqChannel } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/channel')
export class ChannelController {
   /***
   * Channel Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(ChannelCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        channelName,
        createdBy
       
     }:  ChannelCreateDTO= request.body;
      console.log('request.body;',request.body)
      const checkingChannelAlreadyExistQuery = await getRepository(DesqChannel) 
        .createQueryBuilder('desq_channel')
        .where(
          'desq_channel.channelName = :channelName',
          {
            channelName: channelName,
          },
        )
        .getOne();
    const createchannelQuery = await getRepository(DesqChannel)
            .createQueryBuilder('checkingChannelAlreadyExistQuery')
          .insert()
          .into('desq_channel')
          .values({
          ...{clientId: clientId, channelName: channelName,
            createdDatetime: new Date(), createdby: createdBy}
        })
        .execute();
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'channel added successfully.',
            response: {
              id: createchannelQuery.generatedMaps[0].channelId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
   @Post('/update/:id')
  //@Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(ChannelUpdateDTO))
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
        channelName,
        modifiedBy,
      }: ChannelUpdateDTO = request.body;
      console.log(request.body);
      const checkingChannelAlreadyExistQuery = await getRepository(DesqChannel) 
        .createQueryBuilder('desq_channel')
        .where(
          'desq_channel.channelName = :channelName AND desq_channel.channel_id=:id',
          {
            channelName: channelName,
            id: !Id
          },
        )
        .getOne();
      const updateQuery = getRepository(DesqChannel)
          .createQueryBuilder('checkingChannelAlreadyExistQuery')
          .update()
          .set({ channelName: channelName, modifiedDatetime: new Date(), modifiedby: modifiedBy})
          .where('desq_channel.channel_id=:id',{ id: Id},)
          .execute();
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'channel Update Successfully.',
              response: { updateQuery },
          }); 
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }

  /***
   * Get All Channel with pagination
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
    const productCountQuery = await DesqChannel.count();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
      
      let PaginationQuery;
       PaginationQuery = await getRepository(DesqChannel)
        .createQueryBuilder('desq_channel')
        .select(['desq_channel'])
        .where(`desq_channel.status In (:...status)`, { status: [Status.ACTIVIE, Status.INACTIVE] })
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('desq_channel.channel_id', 'DESC')
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
   * Get separate Channel
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getChannelQuery = await getRepository(DesqChannel)
        .createQueryBuilder('desq_channel')
         .where('desq_channel.channel_id = :id ', {id: Id}, )
        .getOne();
        if(getChannelQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Ticket data',
                success:true,
                response: { ... getChannelQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * channel Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqChannel)
          .delete({ channelId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'channel removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }


  

}
export default ChannelController