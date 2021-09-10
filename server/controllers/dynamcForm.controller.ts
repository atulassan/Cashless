import { Request, Response, NextFunction } from 'express'
import { Controller, Get, Post, Middleware } from '../decorators'
import { validationMiddleware, authenticateMiddleware } from '../middleware'
import {
    InternalServerErrorException,
    CommonException,
} from '../exceptions/index';
import { FormCreateDTO } from '../dto'
import { getRepository, getConnection } from 'typeorm';
import { DynamicForms, DynamicFormFields, DynamicFormFieldValue } from '../entities';
import { Status } from '../enum';
import { paginate, generatePasscode, uploadImages, imageUnlink } from '../util';
import { Utils } from 'handlebars';

@Controller('/form')
export class DynamicFormController {
    /***
    * Channel Add
    */
    @Post('/add')
    @Middleware(validationMiddleware(FormCreateDTO))
    public async add(request: Request, response: Response, next: NextFunction, ) {
        try {
            const {
                formName,
                formFields

            }: FormCreateDTO = request.body;
            console.log('request.body;', request.body)
            const checkingFormAlreadyExistQuery = await getRepository(DynamicForms)
                .createQueryBuilder('form')
                .where(
                    'form.formName = :formName',
                    {
                        formName: formName,
                    },
                )
                .getOne();
            if (!checkingFormAlreadyExistQuery) {
                let slug = formName.replace(/[^a-zA-Z0-9 ]/g, "")
                slug = slug.split(" ").join('-');
                const formQuery =  await getRepository(DynamicForms).save({
                    formName: formName, slug: slug.toLowerCase(),
                });
                // await getRepository(DynamicForms)
                //     .createQueryBuilder('dynamicForm')
                //     .insert()
                //     .into('dynamicForm')
                //     .values({
                //         formName: formName, slug: slug,
                //     })
                //     .execute();
                for (let i = 0; i < formFields.length; i++) {
                    // formFields[i];
                    await getRepository(DynamicFormFields).save({
                        dynamicFormId:formQuery.id,
                        element: formFields[i].element,
                        text: formFields[i].text,
                        required: formFields[i].required,
                        canHaveAnswer: formFields[i].canHaveAnswer,
                        canHavePageBreakBefore: formFields[i].canHavePageBreakBefore,
                        canHaveAlternateForm: formFields[i].canHaveAlternateForm,
                        canHaveDisplayHorizontal: formFields[i].canHaveDisplayHorizontal,
                        canHaveOptionCorrect: formFields[i].canHaveOptionCorrect,
                        canHaveOptionValue: formFields[i].canHaveOptionValue,
                        canPopulateFromApi: formFields[i].canPopulateFromApi,
                        fieldName: formFields[i].field_name,
                        label: formFields[i].label,
                        options: JSON.stringify(formFields[i].options),
                        dirty: formFields[i].dirty
                    });
                }
                response.status(200).json({
                    status: 200,
                    timestamp: Date.now(),
                    message: 'New form added successfully.',
                    response: {
                        id:formQuery.id,

                    },
                });
            }
            else {
                next(new CommonException(409, `${formName} form already exists`))
            }
        } catch (error) {
            next(new InternalServerErrorException(error));
        }
    }
    @Get('/allForms')
    //@Middleware(authenticateMiddleware)
    public async allForms(request: Request, response: Response, next: NextFunction) {
        let PaginationQuery;
        PaginationQuery = await getRepository(DynamicForms)
            .createQueryBuilder('dynamicForm')
            .select(['dynamicForm'])
            .where(`dynamicForm.status In (:...status)`, { status: [Status.ACTIVIE] })
            .getMany();
        let result = [];
        PaginationQuery.map(function (form, index) {
            delete form['createdAt'];
            result.push(form);
        }, this);
        //  console.log(result);
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'All Details Fetched Successfully',
            response: {
                ...{ data: result },
            },
        });
    }

    //get Form Fields list
    @Get('/fields/:formId')
    //@Middleware(authenticateMiddleware)
    public async formFields(request: Request, response: Response, next: NextFunction) {
        let formId=request.params.formId;
        let PaginationQuery;

        PaginationQuery = await getRepository(DynamicForms)
            .createQueryBuilder('dynamicForm')
            //.select(['dynamicForm'])
            .leftJoinAndSelect('dynamicForm.dynamicFormFields', 'dynamicFormFields')
            .where(`dynamicForm.status In (:...status) and (dynamicForm.id=:formId or dynamicForm.slug=:formId )`, { status: [Status.ACTIVIE] ,formId:formId})
            .getOne();
       // let result = [];
        // PaginationQuery.map(function (form, index) {
        //     delete form['createdAt'];
        //     result.push(form);
        // }, this);
        //  console.log(result);
        response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'All Details Fetched Successfully',
            response: {
                ...{ data: PaginationQuery },
            },
        });
    }
}