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
//import {  UpdateUserDTO,UserChangePasswordDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
//import { MycoidUsers } from '../entities';
//import { MycoidCompanytype } from '../entities';
import { Status } from '../enum';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/user')
export class UserController {
  /***
   * Get All User with pagination
   */
//    @Get('/all')
//   @Middleware(authenticateMiddleware)
//   public async index(request: Request, response: Response, next: NextFunction) {
//   //   var currentPage, maxPages, pageSize ;
//   //   currentPage = request.query.currentpage;
//   //   maxPages = request.query.maxPages;
//   //   pageSize = request.query.pageSize;
//   //  //var { currentPage, maxPages, pageSize } = request.query;
//   //   currentPage = currentPage ? currentPage : 1;
//   //   maxPages = maxPages ? maxPages : 1;
//   //   pageSize = pageSize && pageSize <= 100 ? pageSize : 10;
//   //   const productCountQuery = await MycoidUsers.count();
//   //   if (productCountQuery) {
//   //     const paginationData = paginate(
//   //       productCountQuery,
//   //       parseInt(currentPage),
//   //       parseInt(pageSize),
//   //       parseInt(maxPages),
//   //     );
      
//   //     let PaginationQuery;
//   //      PaginationQuery = await getRepository(MycoidUsers)
//   //       .createQueryBuilder('users')
//   //       .select(['users'])
//   //       .where(`users.status In (:...status)`, { status: [Status.ACTIVIE, Status.INACTIVE] })
//   //       .skip(paginationData.startIndex)
//   //       .take(paginationData.pageSize)
//   //       .orderBy('user_id', 'DESC')
//   //       .getMany();
//   //    let result = [];
//   //   PaginationQuery.map(function (user, index) {
      
//   //       result.push(user);
//   //     }, this);
//   //     //  console.log(result);
//   //     response.status(200).json({
//   //       status: 200,
//   //       timestamp: Date.now(),
//   //       message: 'All Details Fetched Successfully',
//   //       response: {
//   //         ...paginationData,
//   //         ...{ data: result },
//   //       },
//   //     });
//   //   }
//   //   else {
//   //     next(new CommonException('404', 'No Record Found'));
//   //   }

//   }
//   @Get('/:id')
//     @Middleware(authenticateMiddleware)
//     public async getItem(request: Request,
//     response: Response,
//     next: NextFunction) {
//     // let Id = parseInt(request.params.id);
//     // let data;
//     // const getUserQuery = await getRepository(MycoidUsers)
//     //       .createQueryBuilder('mycoid_user')
//     //       .where(
//     //         'mycoid_user.user_id = :id  AND mycoid_user.status In (:...status)',
//     //         {id: Id,status: [Status.ACTIVIE, Status.INACTIVE],},
//     //       )
//     //       .getOne();
//     //     if(getUserQuery)
//     //     {
//     //         response.status(200).json({
//     //             status: 200,
//     //             timestamp: Date.now(),
//     //             message: 'user data',
//     //             success:true,
//     //             response: { ...getUserQuery },
//     //           });
//     //     } else {
//     //       next(new CommonException('404', 'No Record Found'));
//     //     }
//     }
//   // user remove
//   @Post('/remove/:id')
//   @Middleware([authenticateMiddleware])
//   private async removeUser(request: Request,response: Response,next: NextFunction,) {
//       // let Id = parseInt(request.params.id);
//       // try {
//       // const removeQuery = await getRepository(MycoidUsers)
//       //     .delete({ userId: Id });
//       //     response.status(200).json({
//       //         status: 200,
//       //         timestamp: Date.now(),
//       //         message: 'User remove Successfully.',
//       //         response: { removeQuery },
//       //     });
//       // } catch (error) {
//       // //console.log(error);
//       // next(new InternalServerErrorException(error));
//       // }
//   }
//  @Post('/update/:id')
//   @Middleware([validationMiddleware(UpdateUserDTO), authenticateMiddleware])
//   private async updateUser(
//     request: Request,
//     response: Response,
//     next: NextFunction,
//   ) {
//     // console.log(request.body);
//     // try {
//     //   let Id = parseInt(request.params.id);
//     //   const {
//     //     companyName,
//     //     firstName,
//     //     lastName,
//     //     telephone,
//     //     email,
//     //     contactperson,
//     //     website,
//     //     extraInfo,
//     //     mobile,
//     //     address,
//     //     postcode,
//     //     city,
//     //     place,
//     //     country,
//     //     modifiedBy,
//     //   }: UpdateUserDTO = request.body;
//     //   console.log(request.body);
//     //   let imageData = "";
//     //   let imageNewLink = "";
//     //   let oldImage = "";
//     //   const getUserQuery = await getRepository(MycoidUsers)
//     //       .createQueryBuilder('mycoid_user')
//     //       .where(
//     //         'mycoid_user.user_id = :id  AND mycoid_user.status In (:...status)',
//     //         {id: Id,status: [Status.ACTIVIE, Status.INACTIVE],},
//     //       )
//     //       .getOne();
//     //       oldImage = getUserQuery.image;
//     //       await uploadImages(request, response)
//     //       .then(getalldata => {
//     //           imageData = getalldata['upload'];
//     //           imageNewLink = getalldata['saveImage'];
//     //       })
//     //       .catch(err => {
//     //      })
//     //     console.log("-----------------ttttttt-------------");
//     //     console.log(imageData);
//     //     console.log(imageNewLink);
//     //     console.log("-----------------ttttttt-------------");
//     //     if(imageData != "1" && oldImage=="")
//     //      {
//     //        imageNewLink = "";
//     //      }
//     //      else if(imageData != "1" && oldImage!="")
//     //      {
//     //             imageNewLink = oldImage;
//     //      }
//     //      else if(imageData == "1" && oldImage!="")
//     //      {
//     //        let imagRemove = imageUnlink(oldImage);
//     //      }
//     //    const updateQuery = getRepository(MycoidUsers)
//     //       .createQueryBuilder('mycoid_users')
//     //       .update()
//     //       .set({ image: imageNewLink, companyName: companyName,telephone: telephone, contactperson: contactperson, email: email, website: website, extraInfo: extraInfo, mobile: mobile, address: address, postcode: postcode, place: place, city: city, country: country, status:1, modifiedDatetime: new Date(), firstName: firstName, modifiedby: modifiedBy})
//     //       .where('mycoid_users.user_id=:id',{ id: Id},)
//     //       .execute();
//     //       response.status(200).json({
//     //           status: 200,
//     //           timestamp: Date.now(),
//     //           message: 'user Update Successfully.',
//     //           response: { updateQuery },
//     //       }); 
    
//     // } catch (error) {
//     //   //console.log(error);
//     //   next(new InternalServerErrorException(error));
//     // }
//   }

  

}
export default UserController