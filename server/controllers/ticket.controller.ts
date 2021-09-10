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
import {  TicketCreateDTO,TicketUpdateDTO,TicketStatusUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqTicket,DesqAttachemnts,DesqClassifications } from '../entities';
import { DesqChannel } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/ticket')
export class TicketController {
   /***
   * Ticket Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(TicketCreateDTO))
  public async add(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        contactName,
        customerId,
        accountName,
        telephone,
        email,
        subject,
        description,
        status,
        ticketOwner,
        dueDate,
        priority,
        channel,
        classifications,
        createdBy,
       
     }:  TicketCreateDTO= request.body;
      console.log('request.body;',request.body)
      var opendate, onhold, escalted, closedate;
      if(status == 1)
      {
        opendate = new Date();
       }
      else if(status == 2)
      {
          onhold =new Date();
      }
      else if(status == 3)
      {
          escalted = new Date();
       }
      else if(status == 4)
      {
        closedate =new Date();
      }
      let imageData = "";
      let imageNewLink = "";
      
        //    await uploadImages(request, response)
        //   .then(getalldata => {
            
        //       imageData = getalldata['upload'];
        //       imageNewLink = getalldata['saveImage'];
        //   })
        //   .catch(err => {
           
        // })
       if(request.body.uploadedData){
          imageData = await request.body.uploadedData['upload'];
          imageNewLink = await request.body.uploadedData['saveImage'];
         }
        if(imageData != "1")
         {
           imageNewLink = "";
         }
      const createTicketQuery = await getRepository(DesqTicket)
          .createQueryBuilder('desq_ticket')
          .insert()
          .into('desq_ticket')
          .values({
          ...{clientId: clientId, customerId: customerId, telephone: telephone,
            email: email, 
            subject: subject, description: description, 
            status: status, ticketOwner:ticketOwner, dueDate:dueDate, priority:priority, channelId:channel, 
            classificationId:classifications,createdDatetime: new Date(), createdby: createdBy, openDatetime : new Date()
            },
        })
        .execute();
        const ticketAddedId = createTicketQuery.generatedMaps[0].ticketId;
        
        if(createTicketQuery && imageData == "1")
        {
        console.log("ticketAddedId",ticketAddedId);
        console.log("imageData",imageData);
          const createAttQuery = await getRepository(DesqAttachemnts)
           .createQueryBuilder('desq_attachments')
           .insert()
           .into('desq_attachments')
           .values({
           ...{ clientId: clientId,file:imageNewLink, ticketId: ticketAddedId, createdDatetime: new Date(), createdby: createdBy},
           })
            .execute();
            if(createAttQuery)
            {
              response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Ticket added successfully.',
                response: {
                  id: createTicketQuery.generatedMaps[0].ticketId,
                  emailo: createTicketQuery.generatedMaps[0].email,
                },
              });
            }
            else{
              next(new CommonException('404', 'file not insert'));
            }
        }
        else{
          response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'Ticket added successfully.',
            response: {
              id: createTicketQuery.generatedMaps[0].ticketId,
              emailo: createTicketQuery.generatedMaps[0].email,
            },
          });
        }
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
   @Post('/update/:id')
  //@Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(TicketUpdateDTO))
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
        contactName,
        accountName,
        telephone,
        email,
        subject,
        description,
        status,
        ticketOwner,
        dueDate,
        priority,
        channel,
        classifications,
        modifiedBy,
        solution,
      }: TicketUpdateDTO = request.body;
      console.log(request.body);
      var opendate, onhold, escalted, closedate,fData;
      if(status == 1)
      {
        opendate = new Date();
        fData = {clientId: clientId, telephone: telephone,
            email: email,
             subject: subject, description: description, 
            status: status, ticketOwner:ticketOwner, dueDate:dueDate, priority:priority, channelId:channel, 
            classificationId:classifications, modifiedDatetime: new Date(), modifiedby: modifiedBy, 
            solution : solution, openDatetime : opendate};
       }
      else if(status == 2)
      {
          onhold =new Date();
          fData = {clientId: clientId, telephone: telephone,
            email: email,
             subject: subject, description: description, 
            status: status, ticketOwner:ticketOwner, dueDate:dueDate, priority:priority, channelId:channel, 
            classificationId:classifications, modifiedDatetime: new Date(), modifiedby: modifiedBy, solution : solution, onholdDatetime : onhold};
      }
      else if(status == 3)
      {
          escalted = new Date();
          fData = {clientId: clientId, telephone: telephone,
            email: email,
             subject: subject, description: description, 
            status: status, ticketOwner:ticketOwner, dueDate:dueDate, priority:priority, channelId:channel, 
            classificationId:classifications, modifiedDatetime: new Date(), modifiedby: modifiedBy, solution : solution,  escaltedDatetime : escalted};
       }
      else if(status == 4)
      {
        closedate =new Date();
        fData = {clientId: clientId, telephone: telephone,
          email: email,
           subject: subject, description: description, 
          status: status, ticketOwner:ticketOwner, dueDate:dueDate, priority:priority, channelId:channel, 
          classificationId:classifications, modifiedDatetime: new Date(), modifiedby: modifiedBy, solution : solution, closedDatetime : closedate};
      }
      const getTicketQuery = await getRepository(DesqTicket)
          .createQueryBuilder('desq_ticket')
          .where(
            'desq_ticket.ticket_id = :id ',
            {id: Id},
          )
          .getOne();
         const updateQuery = getRepository(DesqTicket)
          .createQueryBuilder('desq_ticket')
          .update()
          .set(fData)
          .where('desq_ticket.ticket_id=:id',{ id: Id},)
          .execute();
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Ticket Update Successfully.',
              response: { updateQuery },
          }); 
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }
  /*
  *** ticket status update
  */
  @Post('/status/:id')
  //@Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(TicketStatusUpdateDTO))
  private async updateTicketStatus(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    
    try {
      let Id = parseInt(request.params.id);
      const {
        status,
        modifiedBy
        
      }: TicketUpdateDTO = request.body;
      console.log("-------------------request.body-------------");
    console.log(request.body);
    console.log("Id--------"+Id);
    console.log("-------------------request.body-------------");
      var opendate, onhold, escalted, closedate, linkadd;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); 
      var yyyy = today.getFullYear();
      var h= today.getHours(); // => 9
      var m= today.getMinutes(); // =>  30
      var s= today.getSeconds(); // => 51
      var currenttime = yyyy + '-' + mm + '-' + dd +' '+h+':'+m+':'+s;
      if(status == 1)
      {
        //linkadd = "{status: "+status+", modifiedDatetime:"+ new Date()+", modifiedby: "+modifiedBy+", openDatetime :"+ new Date()+"}";
        // linkadd = "UPDATE desq_ticket SET status: "+status+", modifiedDatetime:"+ opendate+", modifiedby: "+modifiedBy+", openDatetime :"+ new Date()+" WHERE ticket_id="+Id;
         linkadd = "UPDATE desq_ticket SET status= '"+status+"', modified_datetime='"+ currenttime+"', modifiedby= '"+modifiedBy+"', open_datetime ='"+currenttime+"' WHERE ticket_id="+Id;
       }
      else if(status == 2)
      {
         //linkadd = "{status: "+status+", modifiedDatetime:"+ new Date()+", modifiedby: "+modifiedBy+", onholdDatetime :"+ new Date()+"}";
         linkadd = "UPDATE desq_ticket SET status= '"+status+"', modified_datetime='"+ currenttime+"', modifiedby= '"+modifiedBy+"', onhold_datetime ='"+ currenttime+"' WHERE ticket_id="+Id;
      }
      else if(status == 3)
      {
         //linkadd = "{status: "+status+", modifiedDatetime:"+ new Date()+", modifiedby: "+modifiedBy+", escaltedDatetime :"+ new Date()+"}";
          linkadd = "UPDATE desq_ticket SET status= '"+status+"', modified_datetime='"+ currenttime+"', modifiedby= '"+modifiedBy+"', escalted_datetime ='"+ currenttime+"' WHERE ticket_id="+Id;
      }
      else if(status == 4)
      {
        // linkadd = "{status: "+status+", modifiedDatetime:"+ new Date()+", modifiedby: "+modifiedBy+", closedDatetime :"+ new Date()+"}";
        linkadd = "UPDATE desq_ticket SET status= '"+status+"', modified_datetime='"+ currenttime+"', modifiedby=' "+modifiedBy+"', closed_datetime ='"+ currenttime+"' WHERE ticket_id="+Id;
        
      }
      const updateQuery = await getConnection()
          .query(linkadd)
          
          //  const updateQuery = getRepository(DesqTicket)
          // .createQueryBuilder('desq_ticket')
          // .update()
          // .set({ status: status, modifiedDatetime: new Date(), modifiedby: modifiedBy, openDatetime : opendate, onholdDatetime : onhold, escaltedDatetime : escalted, closedDatetime : closedate})
          //  .where('desq_ticket.ticket_id=:id',{ id: Id},)
          // .execute();
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'Ticket Status Update Successfully.',
              response: { updateQuery },
          }); 
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }

  /***
   * Get All Ticket with pagination
   */
   @Get('/all')
  //@Middleware(authenticateMiddleware)
  public async index(request: Request, response: Response, next: NextFunction) {
    var currentPage, maxPages, pageSize, orderList, datefilter, cloumnfilter, keyword, ticketType;
    currentPage = request.query.currentpage;
    maxPages = request.query.maxPages;
    pageSize = request.query.pageSize;
    currentPage = currentPage ? currentPage : 1;
    maxPages = maxPages ? maxPages : 1;
    pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
    var limitColumn = "";
    orderList = request.query.orderList;
    datefilter = request.query.datefilter;
    cloumnfilter = request.query.cloumnfilter;
    ticketType = request.query.ticketType;
    keyword = request.query.keyword;
    var ticketTypeData = [1,2,3,4];
    if(ticketType == undefined || ticketType == null || ticketType =="")
      {
        
        ticketTypeData =[1,2,3,4];
      }
      else{
        ticketTypeData = [ticketType];
      }
    if(orderList == "" || orderList == null  || orderList == undefined )
    {
      limitColumn = 'ticket_id';
    }
    else{
      limitColumn = orderList;
    }
    var dateQuery = "";
    var dateQueryValue = {};
    var dateQueryCloumn = "";
    var dateQueryValueCloumn = {};
    if(cloumnfilter =="" || cloumnfilter ==null || cloumnfilter ==undefined)
    {
      var tc =[1,2,3,4];
      dateQueryCloumn = "ticket.status In (:status )";
      dateQueryValueCloumn = { status: tc };
     }
    else if(cloumnfilter =="ticketid" && keyword!=undefined){
      dateQueryCloumn = "ticket.ticket_id like :ticketId";
      dateQueryValueCloumn = { ticketId: '%' + keyword + '%' };
    }
    else if(cloumnfilter =="duedate" && keyword!=undefined){
      dateQueryCloumn = "ticket.duedate like :duedate";
      dateQueryValueCloumn = { duedate: '%' + keyword + '%' };

    }
    else if(cloumnfilter =="createddate" && keyword!=undefined){
      dateQueryCloumn = "ticket.created_datetime like :createddatetime";
      dateQueryValueCloumn = { createddatetime: '%' + keyword + '%' };

    }
    
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    // const end = new Date(start);
    // const end15 = new Date(start);
    // const end30 = new Date(start);
    // const end90 = new Date(start);
    // end.setDate(start.getDate() + 15);
    // end15.setDate(start.getDate() - 15);
    // end30.setDate(start.getDate() - 30);
    // end90.setDate(start.getDate() - 90);
    
    const end = new Date(start);
    if(datefilter == 15)
    {
      end.setDate(start.getDate() - 15);
      dateQuery="ticket.created_datetime >= :startDate AND ticket.created_datetime <= :endDate";
      dateQueryValue = {  startDate: start, endDate: end };
    }
    else if(datefilter == 30){
      end.setDate(start.getDate() - 30);
      dateQuery="ticket.created_datetime >= :startDate AND ticket.created_datetime <= :endDate";
      dateQueryValue = {  startDate: start, endDate: end };
    }
    else if(datefilter == 3)
    {
      end.setDate(start.getDate() - 90);
      dateQuery="ticket.created_datetime >= :startDate AND ticket.created_datetime <= :endDate";
      dateQueryValue = {  startDate: start, endDate: end };
    }
    else{
      end.setDate(start.getDate() + 1);
      dateQuery="ticket.created_datetime <= :startDate ";
      dateQueryValue = {  startDate: end};
      console.log("start---------"+start);
      console.log("end15---------"+end);
    }
    console.log("limitColumn---------"+limitColumn);
    console.log("tickettype------"+ticketType);
    const productCountQuery = await getRepository(DesqTicket)
    .createQueryBuilder('ticket')
    // .where(dateQuery , dateQueryValue)
    // .andWhere(dateQueryCloumn , dateQueryValueCloumn)
    .where(`ticket.status In (:status )`, { status: ticketTypeData })
    .getCount();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
     let PaginationQuery;
      // PaginationQuery = await getConnection()
      // .query('SELECT tt.ticket_id AS ticketId,tt.status,DATE_FORMAT(tt.created_datetime, "%d %b") AS createdDate,DATE_FORMAT(tt.open_datetime, "%d %b %h:%i %p") AS openDate,DATE_FORMAT(tt.onhold_datetime, "%d %b %h:%i %p") AS onholdDate,DATE_FORMAT(tt.escalted_datetime, "%d %b %h:%i %p") AS escaltedDate,DATE_FORMAT(tt.closed_datetime, "%d %b %h:%i %p") AS closedDate, (SELECT customer_name From desq_customer cc WHERE cc.customer_id = tt.customer_id) AS customerName  from desq_ticket tt')
       PaginationQuery = await getRepository(DesqTicket)
       .createQueryBuilder('ticket') 
       .select(['ticket.ticketId','ticket.accountName','ticket.status','ticket.createdDatetime','ticket.openDatetime','ticket.onholdDatetime','ticket.escaltedDatetime','ticket.closedDatetime','ticket.subject'])
       //.addSelect('DATE_FORMAT(ticket.created_datetime, "%d %b")', "createdDate")
       //.select(`DATE_FORMAT(ticket.createdDatetime,'%Y%m%d')`)
       .leftJoinAndSelect("ticket.desqCustomers1", "cc")
      //  .where(dateQuery , dateQueryValue)
      //  .andWhere(dateQueryCloumn , dateQueryValueCloumn)
       .where(`ticket.status In (:status )`, { status: ticketTypeData })
       .skip(paginationData.startIndex)
       .take(paginationData.pageSize)
       //.orderBy(limitColumn, 'DESC')
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
   * Get All Ticket with pagination for comment Page
   */
  @Get('/comment/all')
  //@Middleware(authenticateMiddleware)
  public async indexcmm(request: Request, response: Response, next: NextFunction) {
    var currentPage, maxPages, pageSize, orderList, datefilter, cloumnfilter, keyword, ticketType;
    currentPage = request.query.currentpage;
    maxPages = request.query.maxPages;
    pageSize = request.query.pageSize;
    currentPage = currentPage ? currentPage : 1;
    maxPages = maxPages ? maxPages : 1;
    pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
    var limitColumn = "";
    orderList = request.query.orderList;
    datefilter = request.query.datefilter;
    cloumnfilter = request.query.cloumnfilter;
    ticketType = request.query.ticketType;
    keyword = request.query.keyword;
    var ticketTypeData = [1,2,3,4];
    if(ticketType == undefined || ticketType == null || ticketType =="")
      {
        
        ticketTypeData =[1,2,3,4];
      }
      else{
        ticketTypeData = [ticketType];
      }
    if(orderList == "" || orderList == null  || orderList == undefined )
    {
      limitColumn = 'ticket_id';
    }
    else{
      limitColumn = orderList;
    }
    var dateQuery = "";
    var dateQueryValue = {};
    var dateQueryCloumn = "";
    var dateQueryValueCloumn = {};
    if(cloumnfilter =="" || cloumnfilter ==null || cloumnfilter ==undefined)
    {
      var tc =[1,2,3,4];
      dateQueryCloumn = "ticket.status In (:status )";
      dateQueryValueCloumn = { status: tc };
     }
    else if(cloumnfilter =="ticketid" && keyword!=undefined){
      dateQueryCloumn = "ticket.ticket_id like :ticketId";
      dateQueryValueCloumn = { ticketId: '%' + keyword + '%' };
    }
    else if(cloumnfilter =="duedate" && keyword!=undefined){
      dateQueryCloumn = "ticket.duedate like :duedate";
      dateQueryValueCloumn = { duedate: '%' + keyword + '%' };

    }
    else if(cloumnfilter =="createddate" && keyword!=undefined){
      dateQueryCloumn = "ticket.created_datetime like :createddatetime";
      dateQueryValueCloumn = { createddatetime: '%' + keyword + '%' };

    }
    
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    // const end = new Date(start);
    // const end15 = new Date(start);
    // const end30 = new Date(start);
    // const end90 = new Date(start);
    // end.setDate(start.getDate() + 15);
    // end15.setDate(start.getDate() - 15);
    // end30.setDate(start.getDate() - 30);
    // end90.setDate(start.getDate() - 90);
    
    const end = new Date(start);
    if(datefilter == 15)
    {
      end.setDate(start.getDate() - 15);
      dateQuery="ticket.created_datetime >= :startDate AND ticket.created_datetime <= :endDate";
      dateQueryValue = {  startDate: start, endDate: end };
    }
    else if(datefilter == 30){
      end.setDate(start.getDate() - 30);
      dateQuery="ticket.created_datetime >= :startDate AND ticket.created_datetime <= :endDate";
      dateQueryValue = {  startDate: start, endDate: end };
    }
    else if(datefilter == 3)
    {
      end.setDate(start.getDate() - 90);
      dateQuery="ticket.created_datetime >= :startDate AND ticket.created_datetime <= :endDate";
      dateQueryValue = {  startDate: start, endDate: end };
    }
    else{
      end.setDate(start.getDate() + 1);
      dateQuery="ticket.created_datetime <= :startDate ";
      dateQueryValue = {  startDate: end};
      console.log("start---------"+start);
      console.log("end15---------"+end);
    }
    console.log("limitColumn---------"+limitColumn);
    console.log("tickettype------"+ticketType);
    const productCountQuery = await getRepository(DesqTicket)
    .createQueryBuilder('ticket')
    // .where(dateQuery , dateQueryValue)
    // .andWhere(dateQueryCloumn , dateQueryValueCloumn)
    .where(`ticket.status In (:status )`, { status: ticketTypeData })
    .getCount();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
     let PaginationQuery;
      // PaginationQuery = await getConnection()
      // .query('SELECT tt.ticket_id AS ticketId,tt.status,DATE_FORMAT(tt.created_datetime, "%d %b") AS createdDate,DATE_FORMAT(tt.open_datetime, "%d %b %h:%i %p") AS openDate,DATE_FORMAT(tt.onhold_datetime, "%d %b %h:%i %p") AS onholdDate,DATE_FORMAT(tt.escalted_datetime, "%d %b %h:%i %p") AS escaltedDate,DATE_FORMAT(tt.closed_datetime, "%d %b %h:%i %p") AS closedDate, (SELECT customer_name From desq_customer cc WHERE cc.customer_id = tt.customer_id) AS customerName  from desq_ticket tt')
       PaginationQuery = await getRepository(DesqTicket)
       .createQueryBuilder('ticket') 
       .select(['ticket.ticketId','ticket.accountName','ticket.status','ticket.createdDatetime','ticket.openDatetime','ticket.onholdDatetime','ticket.escaltedDatetime','ticket.closedDatetime'])
       //.addSelect('DATE_FORMAT(ticket.created_datetime, "%d %b")', "createdDate")
       //.select(`DATE_FORMAT(ticket.createdDatetime,'%Y%m%d')`)
       .leftJoinAndSelect("ticket.desqCustomers1", "cc")
      //  .where(dateQuery , dateQueryValue)
      //  .andWhere(dateQueryCloumn , dateQueryValueCloumn)
       .where(`ticket.status In (:status )`, { status: ticketTypeData })
       .skip(paginationData.startIndex)
       .take(paginationData.pageSize)
       //.orderBy(limitColumn, 'DESC')
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
   * Get separate Ticket
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,response: Response,next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getTicketQuery = await getRepository(DesqTicket)
        .createQueryBuilder('desq_ticket')
        .leftJoinAndSelect("desq_ticket.desqCustomers1", "cc")
        .where('desq_ticket.ticket_id = :id ', {id: Id}, )
        .getOne();
      if(getTicketQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Ticket data',
                success:true,
                response: { ...getTicketQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
    /***
   * Ticket Customer Data
   */
    @Get('/customer/:id')
    //@Middleware(authenticateMiddleware)
    public async getCustomerItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getTicketQuery = await getRepository(DesqTicket)
        .createQueryBuilder('desq_ticket')
       .where('desq_ticket.customer_id = :id ', {id: Id}, )
        .getOne();
    const getChannelQuery = await getRepository(DesqChannel)
        .createQueryBuilder('desq_channel')
        .getOne();

        const getClcQuery = await getRepository(DesqClassifications)
        .createQueryBuilder('desq_classifications')
        .getOne()
        
        if(getTicketQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Ticket data customer',
                success:true,
                response: { ticket: getTicketQuery, channel : getChannelQuery, classification : getClcQuery  },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
/***
   * Ticket Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqTicket)
          .delete({ ticketId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'ticket removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }


  

}
export default TicketController