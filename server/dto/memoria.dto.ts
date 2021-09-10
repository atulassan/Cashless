import {
    IsString,
    IsNotEmpty,
    MinLength,
    IsInt,
    IsEmail,
    Matches,
    IsNumber,
    Min,
    Max,
    getFromContainer,
    MetadataStorage,
    IsNumberString,
    IsArray,
    ValidateNested,
    ArrayMinSize,
  } from 'class-validator';
  import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Type } from 'class-transformer';


 export class MemoriaGetDTO {

    @IsNotEmpty()
    public url: string;

    public data:string;

   
   }
   export class LogInDTO {

    @IsNotEmpty()
    public loginame: string;
    
    @IsNotEmpty()
    public password:string;
    
    @IsNotEmpty()
    public companyCode:string;

    public appCode:string;
   
   }
   

 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
 export const MessageSchemas = validationMetadatasToSchemas(metadatas)