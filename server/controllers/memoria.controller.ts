import { Request, Response, NextFunction } from 'express'
import { Controller, Get, Post, Delete, Middleware } from '../decorators'
import axios from 'axios';
import { InternalServerErrorException, CommonException } from '../exceptions';
import { LogInDTO, MemoriaGetDTO } from '../dto/memoria.dto';
import * as jwt from 'jsonwebtoken';
import { authenticateMiddleware, validationMiddleware } from '../middleware';
import { Base64 } from 'js-base64';
import { getConnection } from 'typeorm';
var CryptoJS = require("crypto-js");

const querystring = require('querystring');
var md5 = require('md5');


@Controller('/memoria')
export class MemoriaController {
    @Get('/getMethod')
    @Middleware(authenticateMiddleware)
    // @Middleware(authenticateMiddleware)
    public async index(request: Request, response: Response, next: NextFunction) {
        this.axiosRequest('GET', request, response, next);
    }
    @Post('/postMethod')
    @Middleware(authenticateMiddleware)
    public async postMethod(request: Request, response: Response, next: NextFunction) {
        this.axiosRequest('POST', request, response, next);
    }
    @Post('/putMethod')
    @Middleware(authenticateMiddleware)
    public async putMethod(request: Request, response: Response, next: NextFunction) {
        this.axiosRequest('PUT', request, response, next);
    }
    @Delete('/deleteMethod')
    @Middleware(authenticateMiddleware)
    public async deleteMethod(request: Request, response: Response, next: NextFunction) {
        this.axiosRequest('DELETE', request, response, next);
    }
    @Post('/payment')
    @Middleware(authenticateMiddleware)
    public async payment(request: Request, response: Response, next: NextFunction) {

        let User = request['user'];
        var bytes = CryptoJS.AES.decrypt(User['tempKey'], process.env.JWT_SECRET + 'dsfrwzzx23c*&!23@#DS21DCzz');
        var apiDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("User Details+++++++++++++++++", User);
        console.log("API Details+++++++++++++++++", apiDetails);

        const { amount, useCard, alias, exMonth, exYear, paymentMethods } = request.body;

        let siteURL = process.env.URL;

        let data:any = {
            'currency': 'CHF',
            'refno': (Math.floor(Math.random() * 100000) + 900000).toString().substring(-2),
            'amount': parseFloat(amount) * 100,
            'redirect': {
                "successUrl": `${siteURL}${User['companyCode']}/home`,
                "cancelUrl": `${siteURL}${User['companyCode']}/cancelled`,
                "errorUrl": `${siteURL}${User['companyCode']}/failure`
            }
        };
        if(useCard) {
            data["card"] = {
                "alias": alias,
                "expiryMonth": exMonth,
                "expiryYear": exYear
            },
            data["paymentMethods"] = [`${paymentMethods}`]
        }
        if(!useCard) {
            data['option'] = {
                "createAlias": true
            }
        }
        
        //console.log("Sample Card BUILD Data++++++++++++++++++++++++", data);
        //return false;

        axios({
            method: "POST",
            //url: "https://api.sandbox.datatrans.com/v1/transactions",
            url: apiDetails.payment_url + '/transactions',
            validateStatus: function (status) {
                return status < 600;
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                //"Authorization": 'Basic ' + Base64.encode("1100029954:4J8VFJT0PclFwRQc")
                "Authorization": 'Basic ' + Base64.encode(`${apiDetails.payment_username}:${apiDetails.payment_password}`)
            },
            data: data,
        }).then(function (res) {
            // console.log('res',res,res.data)
            if (res.data == '') {
                next(new CommonException('404', 'No Record Found'));
            } else {
                return response.status(200).json(res.data);
            }
        })
            .catch(function (error) {
                return response.send({
                    status: '500',
                    message: error
                })
            });
    }

    @Post('/transaction')
    @Middleware(authenticateMiddleware)
    public async transaction(request: Request, response: Response, next: NextFunction) {

        let User = request['user'];
        var bytes = CryptoJS.AES.decrypt(User['tempKey'], process.env.JWT_SECRET + 'dsfrwzzx23c*&!23@#DS21DCzz');
        var apiDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("Api Details+++++++++++++", apiDetails);

        const { datatransTrxId } = request.body;
        console.log("Transaction ID+++++++++++++++++++", datatransTrxId);

        axios({
            method: "GET",
            //url: "https://api.sandbox.datatrans.com/v1/transactions/" + datatransTrxId,
            url: apiDetails.payment_url + `/transactions/${datatransTrxId}`,
            validateStatus: function (status) {
                return status < 600;
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                //"Authorization": 'Basic ' + Base64.encode("1100029954:4J8VFJT0PclFwRQc")
                "Authorization": 'Basic ' + Base64.encode(`${apiDetails.payment_username}:${apiDetails.payment_password}`)
            },
        }).then(function (res) {
            console.log("Response data+++++++++++++++++++++++++++++++", res);
            // console.log('res',res,res.data)
            if (res.data == '') {
                next(new CommonException('404', 'No Record Found'));
            } else {
                return response.status(200).json(res.data);
            }
        })
            .catch(function (error) {
                return response.send({
                    status: '500',
                    message: error
                })
            });
    }

    @Get('/cards')
    @Middleware(authenticateMiddleware)
    public async cards(request: Request, response: Response, next: NextFunction) {
        
        let User = request['user'];
        var bytes = CryptoJS.AES.decrypt(User['tempKey'], process.env.JWT_SECRET + 'dsfrwzzx23c*&!23@#DS21DCzz');
        var apiDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("Api Details+++++++++++++", apiDetails);
        let { alias }  = request.query;
        //const { alias } = request.alias;
        //let alias:any = 'AAABeR2ckinssdexyrAAAbazrcwKANGm';
        console.log("Transaction ID+++++++++++++++++++", alias);

        axios({
            method: "GET",
            //url: "https://api.sandbox.datatrans.com/v1/aliases/"+alias,
            url: apiDetails.payment_url + '/aliases/'+alias,
            validateStatus: function (status) {
                return status < 600;
            },
            headers: {
              "Access-Control-Allow-Origin": "*", 
              //"Authorization": 'Basic ' + Base64.encode("1100029954:4J8VFJT0PclFwRQc")
              "Authorization": 'Basic ' + Base64.encode(`${apiDetails.payment_username}:${apiDetails.payment_password}`)
            },
          }).then(function (res) {
            console.log("Response data+++++++++++++++++++++++++++++++", res);
            // console.log('res',res,res.data)
            if (res.data == '') {
                next(new CommonException('404', 'No Record Found'));
            } else {
                return response.status(200).json(res.data);
            }
        })
        .catch(function (error) {
            return response.send({
                status: '500',
                message: error
            });
        }); 
    }

    // @Post('/login')
    // @Middleware(validationMiddleware(LogInDTO))
    // public async login(request: Request, response: Response, next: NextFunction) {
    //     const { loginame, password, companyCode, appCode }: LogInDTO = request.body;

    //     const data = await getConnection().query('select c.* from clients c  where company_code=?', [companyCode])
    //     console.log(data, data.length);
    //     // let filterData={
    //     //     "filters": [
    //     //         {
    //     //             "column": "lastname",
    //     //             "filterValue": "%test%",
    //     //             "filterOperator": "LIKE"

    //     //         },
    //     //         {
    //     //             "column": "groupID",
    //     //             "filterValue": 23,
    //     //             "filterOperator":"EQUAL"           

    //     //         }
    //     //     ],
    //     //     "filterLogic": "AND"
    //     // }
    //     let fData = {
    //         "filters": [],
    //         "column": "loginname",
    //         "filterValue": loginame,
    //         "filterOperator": "EQUAL"
    //     };
    //     console.log()
    //     axios({
    //         //method: 'GET',
    //         //url: 'http://185.230.21.218:5000/api/Users/getUsersAll',
    //         method: 'GET',
    //         url: 'http://demo2021.webservicemportal.dyndns.org/api/Addresses/getAddressesAll?Fields=memoriaWebLogin&Fields=memoriaWebPassword&Fields=Firstname&Fields=Lastname&IncludeDetails=true',
    //         //data: fData,
    //         validateStatus: function (status) {
    //             return status < 600;
    //         },
    //         headers: { "Access-Control-Allow-Origin": "*", "Authorization": process.env.MEMORIA_API_TOKEN.toString() },

    //     })
    //         .then(async function (res) {
    //             console.log('res+++++++++++++++++++++++>', res.data);
    //             //return false;
    //             if (res.data == '') {
    //                 next(new CommonException('404', 'No Record Found'));
    //             }
    //             else {
    //                 let loggedUser = { password: ""};
    //                 let findUser = false;
    //                 if (Array.isArray(res.data.objects)) {
    //                     res.data.objects.map(function (user, index) {
    //                         //console.log("++++++++++++++++++++++++++++++++++++");
    //                         //console.log(user);
    //                         if (Array.isArray(user.fields)) {
    //                             user.fields.map(function (userFields, idx) {
    //                                 //console.log("++++++++++++++++++++++++++++++++++++");
    //                                 if(userFields['field'] === 'memoriaWebLogin' && userFields['value'] === loginame) {
    //                                     findUser = true;
    //                                     console.log("++++++++++++++++++++++++++++++++++++");
    //                                     console.log(user.fields);
    //                                     console.log(user.fields[1]['value']);
    //                                     user['password'] = user.fields[1]['value'];
    //                                     loggedUser = user;
    //                                     return false;
    //                                 }
    //                             });
    //                             if(findUser) {
    //                                 return false;
    //                             }
    //                         }

    //                         /*if (user.mail == loginame || user.loginname == loginame) {
    //                             console.log('user find');
    //                             loggedUser = user
    //                         }*/

    //                     });
    //                 }
    //                 else {
    //                     return next(new CommonException('404', 'No User Found'));
    //                 }
    //                 console.log("+++++++++++++++++++++++>",loggedUser);
    //                 if (Object.keys(loggedUser).length == 0) {
    //                     next(new CommonException('404', 'No User Found'));
    //                 }
    //                 console.log(loggedUser,md5(password),'==', (loggedUser.password.split("-").join("").toLowerCase()))
    //                 if (md5(password) == (loggedUser.password.split("-").join("").toLowerCase())) {
    //                     const token = await jwt.sign(
    //                         { ...loggedUser },
    //                         process.env.JWT_SECRET,
    //                         {
    //                             expiresIn: 86400,
    //                         },
    //                     );
    //                     return response.status(200).json({
    //                         status: 200,
    //                         timestamp: Date.now(),
    //                         message: 'user logged in successfully',
    //                         success: true,
    //                         response: { user: loggedUser, token: token },
    //                     });
    //                 }

    //                 next(new CommonException('404', 'User and password does not match'));
    //                 // response.status(200).json(loggedUser)
    //             }
    //         })
    //         .catch(function (error) {
    //             next(new InternalServerErrorException(error));
    //             // console.log('errrr',error);
    //             // response.send({
    //             //     status: '500',
    //             //     message: error?error:'Internal server error'
    //             // })
    //         });
    // }

    @Post('/login')
    //@Middleware(authenticateMiddleware)
    @Middleware(validationMiddleware(LogInDTO))
    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { loginame, password, companyCode, appCode }: LogInDTO = request.body;
            //   const data = await getConnection().query('select c.* from clients c left join client_apps ca on ca.client_id=c.id left join apps a on a.id=ca.app_id where company_code=?', [companyCode])
            const data = await getConnection().query('select c.* from clients c  where company_code=?', [companyCode])
            console.log(data, data.length);

            // let filterData={
            //     "filters": [
            //         {
            //             "column": "lastname",
            //             "filterValue": "%test%",
            //             "filterOperator": "LIKE"

            //         },
            //         {
            //             "column": "groupID",
            //             "filterValue": 23,
            //             "filterOperator":"EQUAL"           

            //         }
            //     ],
            //     "filterLogic": "AND"
            // }

            if (data.length > 0) {
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ api_key: data[0].api_key, api_url: data[0].api_url, payment_url: data[0].payment_url, payment_username: data[0].payment_username, payment_password: data[0].payment_password }), process.env.JWT_SECRET + 'dsfrwzzx23c*&!23@#DS21DCzz').toString();
                let fData = {
                    "filters": [],
                    "column": "loginname",
                    "filterValue": loginame,
                    "filterOperator": "EQUAL"
                };
                axios({
                    //method: 'GET',
                    //url: 'http://185.230.21.218:5000/api/Users/getUsersAll',
                    method: 'POST',
                    url: data[0].api_url + '/Users/getUsersByFilter',//'http://185.230.21.218:5000/api/Users/getUsersByFilter',
                    data: fData,
                    validateStatus: function (status) {
                        return status < 600;
                    },
                    headers: { "Access-Control-Allow-Origin": "*", "Authorization": data[0].api_key },//process.env.MEMORIA_API_TOKEN.toString() },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity

                })
                    .then(async function (res) {

                        // let addFilter = {
                        //     "filters": [],
                        //     "column": "memoriaWebLogin",
                        //     "filterValue": loginame,
                        //     "filterOperator": "EQUAL"
                        // };
                        let hashedPass = md5(password)
                        hashedPass = hashedPass.toUpperCase().match(/.{1,2}/g).join('-');
                        console.log('hashedPass', hashedPass)
                        let addFilter = {
                            "filters": [
                                {
                                    "column": "memoriaWebLogin",
                                    "filterValue": loginame,
                                    "filterOperator": "EQUAL"

                                },
                                {
                                    "column": "memoriaWebPassword",
                                    "filterValue": hashedPass,
                                    "filterOperator": "EQUAL"

                                }
                            ],
                            "filterLogic": "AND"
                        }
                        let addressDetails = await axios({
                            //method: 'GET',
                            //url: 'http://185.230.21.218:5000/api/Users/getUsersAll',
                            method: 'POST',
                            url: data[0].api_url + '/Addresses/getAddressesByFilter?Fields=memoriaWebLogin&Fields=memoriaWebPassword&Fields=Firstname&Fields=Lastname&IncludeDetails=true',//'http://185.230.21.218:5000/api/Users/getUsersByFilter',
                            data: addFilter,
                            validateStatus: function (status) {
                                return status < 600;
                            },
                            headers: { "Access-Control-Allow-Origin": "*", "Authorization": data[0].api_key },//process.env.MEMORIA_API_TOKEN.toString() },
                            maxContentLength: Infinity,
                            maxBodyLength: Infinity

                        });
                        // console.log('addressDetails', addressDetails.data);
                        //console.log('addressDetails', addressDetails.data, res.data, addressDetails.data['objects'][0]['fields'])
                        //console.log('res', res, res.data)
                        if (res.data == '' && addressDetails.data == '') {
                            next(new CommonException('404', 'No User Found'));
                        }
                        else {
                            let loggedUser = { password: '' };
                            let userAddress = {};
                            if (Array.isArray(addressDetails.data.objects) && addressDetails.data.objects.length > 0) {
                                userAddress = addressDetails.data.objects[0];
                            }
                            else {
                                return next(new CommonException('404', 'No User Found'));
                            }
                            console.log('userAddress', userAddress)
                            if (Array.isArray(res.data.objects)) {
                                res.data.objects.map(function (user, index) {
                                    if (user.loginname == loginame && md5(password) == (user.password.split("-").join("").toLowerCase())) {
                                        loggedUser = user
                                        //console.log('user==', user);
                                        // console.log();
                                    }

                                });
                            }
                            // else {
                            //     return next(new CommonException('404', 'No User Found'));
                            // }
                            // if (Object.keys(loggedUser).length == 0) {
                            //     next(new CommonException('404', 'No User Found'));
                            // }

                            // if (md5(password) == (loggedUser.password.split("-").join("").toLowerCase())) {
                            if (userAddress && Object.keys(userAddress).length > 0) {
                                loggedUser['companyCode'] = companyCode;
                                loggedUser['tempKey'] = ciphertext;
                                loggedUser['userDetails'] = false;
                                if (md5(password) == (loggedUser.password.split("-").join("").toLowerCase())){
                                    loggedUser['userDetails'] = true;
                                    loggedUser['surname'] = loggedUser['lastname'];
                                    loggedUser['firstName'] = loggedUser['firstname'];
                                }
                                loggedUser['userAddress'] = userAddress;
                                delete loggedUser['password'];
                                const token = await jwt.sign(
                                    { ...loggedUser },
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn: 86400,
                                    },
                                );
                                return response.status(200).json({
                                    status: 200,
                                    timestamp: Date.now(),
                                    message: 'user logged in successfully',
                                    success: true,
                                    response: { ...loggedUser, token: token, companyCode },
                                });
                            }

                            next(new CommonException('404', 'User and password does not match'));
                            // response.status(200).json(loggedUser)
                        }
                    })
                    .catch(function (error) {
                        next(new InternalServerErrorException(error));
                        // console.log('errrr',error);
                        // response.send({
                        //     status: '500',
                        //     message: error?error:'Internal server error'
                        // })
                    });
            }
            else {
                next(new CommonException('404', 'Company code does not match'));
            }

        }
        catch (err) {
            next(new InternalServerErrorException(err));
        }
    }

    axiosRequest(method: any, request: Request, response: Response, next: NextFunction) {

        try {
            let User = request['user'];
            var bytes = CryptoJS.AES.decrypt(User['tempKey'], process.env.JWT_SECRET + 'dsfrwzzx23c*&!23@#DS21DCzz');
            var apiDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            const { url }: MemoriaGetDTO = request.query;
            let query = request.query;
            delete query.url;
            let data = request.body;
            //console.log('request', request)
            console.log('dddd', apiDetails, url + '?' + querystring.stringify(query));
            axios({
                method: method,
                url: apiDetails.api_url + url + '?' + querystring.stringify(query),
                validateStatus: function (status) {
                    return status < 600;
                },
                headers: { "Access-Control-Allow-Origin": "*", "Authorization": apiDetails.api_key.toString()},
                data: data

            })
                .then(function (res) {
                    // console.log('res',res,res.data)
                    if (res.data == '') {
                        next(new CommonException('404', 'No Record Found'));
                    }
                    else {
                        response.status(200).json(res.data)
                    }
                })
                .catch(function (error) {
                    response.send({
                        status: '500',
                        message: error
                    })
                });
        }
        catch (err) {
            next(new InternalServerErrorException(err));
        }
    }
}