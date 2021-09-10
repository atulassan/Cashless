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
import {  CustomerContactAddDTO,CustomerContactUpdateDTo } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqCustomer } from '../entities';
import { DesqCustContact } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/contact')
export class CustContactController {
  /***
   * Customer Contact Add
   */
  @Post('/add')
  @Middleware(validationMiddleware(CustomerContactAddDTO))
  public async register(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        customerId,
        firstName,
        lastName,
        contEmail,
        mobile,
        telephoneDirect,
        telephonePrivate,
        dob,
        salutation,
        title,
        facebook,
        instagram,
        linkedin,
        xing
     }: CustomerContactAddDTO = request.body;
      console.log('request.body;',request.body)
      const checkingCustomerContactAlreadyExistQuery = await getRepository(DesqCustContact) 
        .createQueryBuilder('desq_cust_contact')
        .where(
          '(desq_cust_contact.email = :email)',
          {
             email: contEmail,
            
          },
        )
        .getOne();
      if (!checkingCustomerContactAlreadyExistQuery) {
        const createCustomerQuery = await getRepository(DesqCustomer)
          .createQueryBuilder('checkingCustomerContactAlreadyExistQuery')
          .insert()
          .into('desq_cust_contact')
          .values({
          ...{customerId: customerId, clientId: clientId, firstName: firstName, lastName: lastName,telephoneDirect: telephoneDirect, 
            telephonePrivate: telephonePrivate, email: contEmail,mobile: mobile,title: title,
            salutation: salutation, dob: dob, facebook: facebook, instagram: instagram, linkedin: linkedin,
             status: 2, createdDatetime: new Date(), createdBy: clientId, xing: xing}
          
        })
        .execute();
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'customer Contact added successfully.',
                response: {
                },
            });
      } else {
        
          if (
            checkingCustomerContactAlreadyExistQuery.email == contEmail
          ) {
            next(new UserWithThatEmailAlreadyExistsException(contEmail));
          }
          
        }
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  /***
   * Get All customer contact  with pagination
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
    const productCountQuery = await DesqCustContact.count();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
      
      let PaginationQuery;
       PaginationQuery = await getRepository(DesqCustContact)
        .createQueryBuilder('cust_contact')
        .select(['cust_contact'])
        .where(`cust_contact.status In (:...status)`, { status: [Status.ACTIVIE, Status.INACTIVE] })
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('cust_contact_id', 'DESC')
        .getMany();
     let result = [];
    PaginationQuery.map(function (cust_contact, index) {
      
        result.push(cust_contact);
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
   * Get Customer based Contact Data
   */
  @Get('/customer/:id')
  //@Middleware([authenticateMiddleware])
  public async getCustomerContact(request: Request, response: Response, next: NextFunction) {
    let Id = parseInt(request.params.id);
   // var { currentPage, maxPages, pageSize } = request.query;
    var currentPage, maxPages, pageSize ;
    currentPage = request.query.currentpage;
    maxPages = request.query.maxPages;
    pageSize = request.query.pageSize;
    currentPage = currentPage ? currentPage : 1;
    maxPages = maxPages ? maxPages : 1;
    pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
    const productCountQuery = await getRepository(DesqCustContact)
    .createQueryBuilder('desq_cust_contact')
    .where('desq_cust_contact.cust_contact_id = :id',{id: Id,},)
    .getCount();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
      
      let PaginationQuery;
       PaginationQuery = await getRepository(DesqCustContact)
        .createQueryBuilder('desq_cust_contact')
       .where(`desq_cust_contact.cust_contact_id = :id`, { id: Id })
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('cust_contact_id', 'DESC')
        .getMany();
     let result = [];
    PaginationQuery.map(function (custContact, index) {
      
        result.push(custContact);
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
   * Get Separate Remove Contact
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqCustContact)
          .delete({ custContactId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'User remove Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
 @Post('/update/:id')
 @Middleware(validationMiddleware(CustomerContactUpdateDTo))
 // @Middleware([validationMiddleware(CustomerContactAddDTO), authenticateMiddleware])
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
        customerId,
        firstName,
        lastName,
        contEmail,
        mobile,
        telephoneDirect,
        telephonePrivate,
        dob,
        salutation,
        title,
        facebook,
        instagram,
        linkedin,
        xing,
        modifiedBy,
      }: CustomerContactUpdateDTo = request.body;
      console.log(request.body);
    //  const getUserQuery = await getRepository(DesqCustContact)
    //       .createQueryBuilder('desq_cust_contact')
    //       .where(
    //         'desq_cust_contact.cust_contact_id',
    //         {id: Id},
    //       )
    //       .getOne();
       const updateQuery = getRepository(DesqCustContact)
          .createQueryBuilder('desq_cust_contact')
          .update()
          .set({ customerId: customerId, clientId: clientId, firstName: firstName, lastName: lastName,telephoneDirect: telephoneDirect, 
            telephonePrivate: telephonePrivate, email: contEmail,mobile: mobile,title: title,
            salutation: salutation, dob: dob, facebook: facebook, instagram: instagram, linkedin: linkedin,
             status:1, createdDatetime: new Date(), xing: xing, modifiedby: modifiedBy})
          .where('desq_cust_contact.cust_contact_id=:id',{ id: Id},)
          .execute();
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'contact  Update Successfully.',
              response: { updateQuery },
          }); 
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }
      /***
   * Get Separate Contact
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
    let Id = parseInt(request.params.id);
    let data;
    const getUserQuery = await getRepository(DesqCustContact)
          .createQueryBuilder('desq_cust_contact')
          .where(
            'desq_cust_contact.cust_contact_id = :id  AND desq_cust_contact.status In (:...status)',
            {id: Id,status: [Status.ACTIVIE, Status.INACTIVE],},
          )
          .getOne();
        if(getUserQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'user data',
                success:true,
                response: { ...getUserQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }

  

}
export default CustContactController