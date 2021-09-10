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
import {  CommentCreateDTO,CommentUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqComments } from '../entities';
import { DesqChannel } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/comments')
export class CommentController {
   /***
   * Comment Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(CommentCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        ticketId,
        comments,
        commentType,
        type,
        toAddress,
        fromAddress,
        ccAddress,
        createdBy
       
     }:  CommentCreateDTO= request.body;
      console.log('request.body;',request.body)
      const createchannelQuery = await getRepository(DesqChannel)
            .createQueryBuilder('desq_comments')
          .insert()
          .into('desq_comments')
          .values({
          ...{clientId: clientId, ticketId: ticketId, type: type, commentType: commentType, comments: comments,
            createdDatetime: new Date(), createdby: createdBy, status: 1, toAddress: toAddress, fromAddress: fromAddress, ccAddress: ccAddress
          }
        })
        .execute();
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'comment added successfully.',
            response: {
              id: createchannelQuery.generatedMaps[0].commentId,
              
            },
          });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  //  @Post('/update/:id')
  // //@Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
  // @Middleware(validationMiddleware(CommentUpdateDTO))
  // private async updateUser(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction,
  // ) {
  //   console.log(request.body);
  //   try {
  //     let Id = parseInt(request.params.id);
  //     const {
  //       clientId,
  //       ticketId,
  //       comments,
  //       commentType,
  //       type,
  //       modifiedBy,
  //     }: CommentUpdateDTO = request.body;
  //     console.log(request.body);
  //     const updateQuery = getRepository(DesqComments)
  //         .createQueryBuilder('desq_comments')
  //         .update()
  //         .set({ clientId: clientId, ticketId: ticketId, type: type, comments: comments, 
  //           commentType: commentType, modifiedDatetime: new Date(), 
  //           modifiedby: modifiedBy, status: 1})
  //         .where('desq_comments.comment_id=:id',{ id: Id},)
  //         .execute();
  //         response.status(200).json({
  //             status: 200,
  //             timestamp: Date.now(),
  //             message: 'comment Update Successfully.',
  //             response: { updateQuery },
  //         }); 
    
  //   } catch (error) {
  //     //console.log(error);
  //     next(new InternalServerErrorException(error));
  //   }
  // }

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
       PaginationQuery = await getRepository(DesqComments)
        .createQueryBuilder('desq_comments')
        .select(['desq_comments'])
        .where(`desq_comments.status In (:...status)`, { status: [Status.ACTIVIE, Status.INACTIVE] })
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('desq_comments.comment_id', 'DESC')
        .getMany();
     let result = [];
    PaginationQuery.map(function (comment, index) {
      
        result.push(comment);
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
   * Get separate Comment based on Ticket
   */
  @Get('/ticket/:id')
  //@Middleware(authenticateMiddleware)
  public async getItemComment(request: Request,
  response: Response,
  next: NextFunction) {
  let Id = parseInt(request.params.id);
  let data;
  console.log("get id vaslue --- "+ Id);
  const getCommentQuery = await getRepository(DesqComments)
      .createQueryBuilder('desq_comments')
       .where('desq_comments.ticket_id = :id ', {id: Id}, )
      .getMany();
      let result = [];
      getCommentQuery.map(function (comment, index) {
      
        result.push(comment);
      }, this);
      if(getCommentQuery)
      {
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Comment data',
              success:true,
              response: {
                ...{ data: result },
              },
            });
      } else {
        next(new CommonException('404', 'No Record Found'));
      }
  }
/***
   * comment Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqComments)
          .delete({ commentId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'comment removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
  /***
   * Get separate Comment
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getCommentQuery = await getRepository(DesqComments)
        .createQueryBuilder('desq_comments')
         .where('desq_comments.comment_id = :id ', {id: Id}, )
        .getOne();
        if(getCommentQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Comment data',
                success:true,
                response: { ... getCommentQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }


  

}
export default CommentController