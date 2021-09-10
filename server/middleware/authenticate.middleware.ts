import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  AuthenticationTokenMissingException,
  WrongAuthenticationTokenException,
} from '../exceptions/';
import { getRepository } from 'typeorm';
import {  DesqCustomer  } from '../entities';
import { Global } from '../global'
export async function authenticateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.headers['authorization'];
  console.log("token---"+token);
  if (token) {
    const secret = process.env.JWT_SECRET;
    try {
      jwt.verify(token, secret, async (err, verify) => {
        if (err){
         // getUserDetails(token,request,next)
         //console.log(err);
         next( new WrongAuthenticationTokenException());
        
         
        }
        else{
          //console.log('id',verify);
          const Id = verify['userId'];
          request['user'] = verify;
          next();
        //console.log('id',verify);
        //  const user=1;
        // const user = await getRepository(Users).findOne({
        //   where: { id: id },
        //   relations: ['Roless'], //UserAccesss
        // });

       // getUserDetails(Id,request,next)
        //console.log('user', user)
        }
      });
    } catch (error) {
   
      next(new WrongAuthenticationTokenException());
    }
  } else {

   
    next(new AuthenticationTokenMissingException());
  }
}

async function getUserDetails(id,  request: Request,
  next: NextFunction,) {
  var user = await getRepository(DesqCustomer)
    .createQueryBuilder('user')
    .select(['user.userId'])
  
    //.innerJoin('ua.idUser', 'u')
    .where(`user.userId=:id`, { id: id})
    .getOne();
  //  console.log('user',user);
  // .orderBy('uad.created', 'DESC')
  // console.log('query',query);
  // console.log('query',query['Roless'][0]);
  
  if (user) {
  
 // console.log(user)
    // const rcc = await getRepository(Roles).findOne({
    //   where: { id: 1 },
    //   relations: ['RoleAccesss'], //UserAccesss
    // });
    Global['user'] = user;
    request['user'] = user;
    next();
  } else {
       next(new WrongAuthenticationTokenException());
  }
 // return user;
}