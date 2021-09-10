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
import {  CustomerRegisterDTO,CustomerUpdateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DesqCustomer } from '../entities';
import { DesqCustContact } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/customer')
export class CustomerController {
  /***
   * Customer Add
   */
  @Post('/add')
  //@Middleware(validationMiddleware(CustomerRegisterDTO))
  public async register(request: Request, response: Response, next: NextFunction,) {
    try {
      const {
        clientId,
        customerName,
        telephone,
        email,
        website,
        address,
        postcode,
        city,
        place,
        country,
        account,
        fax,
        vatno,
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
     }: CustomerRegisterDTO = request.body;
      console.log('request.body;',request.body)
      const checkingCustomerAlreadyExistQuery = await getRepository(DesqCustomer) 
        .createQueryBuilder('desq_customer')
        .where(
          'desq_customer.status IN (:...status) AND (desq_customer.email = :email)',
          {
            status: [Status.ACTIVIE, Status.INACTIVE],
            email: email,
            
          },
        )
        .getOne();
      if (!checkingCustomerAlreadyExistQuery) {
        console.log("account - account----"+account);
        const createCustomerQuery = await getRepository(DesqCustomer)
       
          .createQueryBuilder('desq_customercheckingCustomerAlreadyExistQuery')
          .insert()
          .into('desq_customer')
          .values({
          ...{clientId: clientId, telephone: telephone, account: account, fax:fax,vatno:vatno,website:website, email: email, address: address, postcode: postcode, place: place, city: city, country: country, status:Status.ACTIVIE, createdDatetime: new Date(), customerName: customerName}
          
        })
        .execute();
        const customerAddedId = createCustomerQuery.generatedMaps[0].customerId;
          if(customerAddedId)
          {
            const createCustomerContactQuery = await getRepository(DesqCustContact)
            .createQueryBuilder('desq_cust_Contact')
            .insert()
            .into('desq_cust_contact')
            .values({
            ...{ customerId: customerAddedId, clientId: clientId, firstName: firstName, lastName: lastName,telephoneDirect: telephoneDirect, 
              telephonePrivate: telephonePrivate, email: contEmail,mobile: mobile,title: title,
              salutation: salutation, dob: dob, facebook: facebook, instagram: instagram, linkedin: linkedin,
               status:Status.ACTIVIE, createdDatetime: new Date(), xing: xing }
           })
          .execute();
          response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'customer added successfully.',
            response: {
              id: createCustomerQuery.generatedMaps[0].customerId,
              emailo: createCustomerQuery.generatedMaps[0].email,
              
            },
          });
          }
         else{
          next(new CommonException('404', 'coustomer not created'));
          }
      } else {
        
          if (
            checkingCustomerAlreadyExistQuery.email == email
          ) {
            next(new UserWithThatEmailAlreadyExistsException(email));
          }
          
        }
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  } 
  /***
   * Get All Customer with pagination
   */
   @Get('/all')
  //@Middleware(authenticateMiddleware)
  public async index(request: Request, response: Response, next: NextFunction) {
    var currentPage, maxPages, pageSize, customerType ;
    //var currentPage, maxPages, pageSize;
    customerType = request.query.customerType;
    currentPage = request.query.currentpage;
    maxPages = request.query.maxPages;
    pageSize = request.query.pageSize;
    currentPage = currentPage ? currentPage : 1;
    console.log('comment Type1-------------------------'+customerType);
    console.log('pageSize Type1-------------------------'+pageSize);
    maxPages = maxPages ? maxPages : 1;
    pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
    
  //   currentPage = request.query.currentpage;
  //   maxPages = request.query.maxPages;
  //   pageSize = request.query.pageSize;
  //  //var { currentPage, maxPages, pageSize } = request.query;
  //   currentPage = currentPage ? currentPage : 1;
  //   maxPages = maxPages ? maxPages : 1;
  //   pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
    var customerTypeData = [1,2];
       if(customerType == undefined || customerType == null || customerType =="")
      {
        
        customerTypeData =[1,2];
      }
      else{
        customerTypeData = [customerType];
      }
    const productCountQuery = await DesqCustomer.count();
    if (productCountQuery) {
      const paginationData = paginate(
        productCountQuery,
        parseInt(currentPage),
        parseInt(pageSize),
        parseInt(maxPages),
      );
      console.log("customerTypeData---- "+customerTypeData);
      let PaginationQuery;
       PaginationQuery = await getRepository(DesqCustomer)
        .createQueryBuilder('customer')
        .select(['customer'])
        .where(`customer.status In (:status )`, { status: customerTypeData })
        //.where(customerTypeData)
        //.where("customer.status = " + customerType )
        .skip(paginationData.startIndex)
        .take(paginationData.pageSize)
        .orderBy('customer_id', 'DESC')
        .getMany();
     let result = [];
    PaginationQuery.map(function (customer, index) {
      
        result.push(customer);
      }, this);
      console.log(result);
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
   * Get separate Custom Customer 
   */
  @Get('/check')
    //@Middleware(authenticateMiddleware)
    public async getItemSearch(request: Request, response: Response,next: NextFunction) {
      var searchData;
      searchData = request.query.searchData;
      let data;
      const getCustomerQuery = await getRepository(DesqCustomer)
      .createQueryBuilder('desq_customer')
      //.select(['desq_customer.account'])
        
        //.where("desq_customer.customer_name = %:name%", {name: searchData })
        .where("desq_customer.account like :name", { name:`%${searchData}%` })
        .getMany();
      console.log('getCustomerQuery',getCustomerQuery)
       if(getCustomerQuery)
        {
          let result = [];
          getCustomerQuery.map(function (customer, index) {
      
        result.push(customer);
      }, this);
          response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Customer data',
                success:true,
                response: {...{ data: result }},
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
    
  

/***
   * Customer Remove
   */
  @Post('/remove/:id')
  //@Middleware([authenticateMiddleware])
  private async removeUser(request: Request,response: Response,next: NextFunction,) {
      let Id = parseInt(request.params.id);
      try {
      const removeQuery = await getRepository(DesqCustomer)
          .delete({ customerId: Id });
          response.status(200).json({
              status: 200,
              timestamp: Date.now(),
              message: 'customer removed Successfully.',
              response: { removeQuery },
          });
      } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
      }
  }
 @Post('/update/:id')
 // @Middleware([validationMiddleware(CustomerUpdateDTO), authenticateMiddleware])
  @Middleware(validationMiddleware(CustomerUpdateDTO))
  private async updateCustomer(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    console.log(request.body);
    try {
      let Id = parseInt(request.params.id);
      const {
        custContactId,
        customerName,
        telephone,
        email,
        website,
        address,
        postcode,
        city,
        place,
        country,
        account,
        fax,
        vatno,
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
      }: CustomerUpdateDTO = request.body;
      console.log(request.body);
      const updateQuery = getRepository(DesqCustomer)
          .createQueryBuilder('desq_customer')
          .update()
          .set({ account: account, telephone: telephone,fax:fax,vatno:vatno,website:website, email: email, address: address, postcode: postcode, place: place, city: city, country: country,  customerName: customerName, status:1, modifiedDatetime: new Date(), modifiedby: modifiedBy})
          .where('desq_customer.customer_id=:id',{ id: Id},)
          .execute();
          if(updateQuery)
          {
            const updateCustCOntactQuery = getRepository(DesqCustContact)
            .createQueryBuilder('desq_cust_contact')  
            .update()
            .set({ firstName: firstName, lastName: lastName,telephoneDirect: telephoneDirect, 
              telephonePrivate: telephonePrivate, email: contEmail,mobile: mobile,title: title,
              salutation: salutation, dob: dob, facebook: facebook, instagram: instagram, linkedin: linkedin,
               status:1, xing: xing, modifiedDatetime: new Date(), modifiedby: modifiedBy})
            .where('desq_cust_contact.cust_contact_id=:id',{ id: custContactId},)
            .execute();
              response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'customer Update Successfully.',
                response: { updateQuery },
            });
          }
          else{

          }
           
    
    } catch (error) {
      //console.log(error);
      next(new InternalServerErrorException(error));
    }
  }
/***
   * Get separate Customer 
   */
  @Get('/:id')
    //@Middleware(authenticateMiddleware)
    public async getItem(request: Request,
    response: Response,
    next: NextFunction) {
     
    let Id = parseInt(request.params.id);
    let data;
    console.log("get id vaslue --- "+ Id);
    const getCustomerQuery = await getRepository(DesqCustomer)
        .createQueryBuilder('desq_customer')
        .leftJoinAndSelect("desq_customer.desqCustomers", "cc")
        .leftJoin("desq_customer.desqCustomers1", "tic")
        .addSelect("COUNT(tic.ticketId)", "ticketcount")
        .addSelect(['tic.ticketId'])
        //.loadRelationCountAndMap('tic.ticketId', 'tic.ticketId')
        //.where('desq_customer.customer_id = :id  AND desq_customer.status = :status', {id: Id, status: 1}, )
        //.addSelect(['desq_customer.customer_id','aa.status','COUNT(aa.customer_id) as custcount'])
        .where('desq_customer.customer_id = :id ', {id: Id}, )
        .andWhere("cc.status = :status", { status: 1 })
        .getOne();
        console.log('getCustomerQuery',getCustomerQuery)
        
        if(getCustomerQuery)
        {
            response.status(200).json({
                status: 200,
                timestamp: Date.now(),
                message: 'Customer data',
                success:true,
                response: { ...getCustomerQuery },
              });
        } else {
          next(new CommonException('404', 'No Record Found'));
        }
    }
  

}
export default CustomerController