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
  } from 'class-validator';
  import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
  export class ClientAttCreateDTO {
     // @IsString()
   @IsNotEmpty()
   public clientId: number;

    // @IsString()
    @IsNotEmpty()
    public modelType: number;

    @IsNotEmpty()
    public type: string;

    // @IsString()
   public options: string;

    // @IsString()
    public additionalClass: string;

   // @IsString()
   public id: string;

   // @IsString()
   //@IsNotEmpty()
   public title: string;

     // @IsString()
    // @IsNotEmpty()
     public createdBy:  number;

    

  }
  export class ClientAttUpdateDTO {
   // @IsString()
   @IsNotEmpty()
   public clientId: number;

   @IsNotEmpty()
    public type: string;

    // @IsString()
   public options: string;

    // @IsString()
    public additionalClass: string;

   // @IsString()
   public id: string;

   // @IsString()
   //@IsNotEmpty()
   public title: string;
   
    //@IsString()
    public modifiedBy: number;

  }
  
 
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const ClientattributesSchemas = validationMetadatasToSchemas(metadatas)


