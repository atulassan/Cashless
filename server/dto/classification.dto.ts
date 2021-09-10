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
  export class ClcCreateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

     // @IsString()
     @IsNotEmpty()
     public classificationName: string;

    // @IsString()
    @IsNotEmpty()
    public createdBy: number;

    

  }
  export class ClcUpdateDTO {
   // @IsString()
   @IsNotEmpty()
   public clientId: number;

    // @IsString()
    @IsNotEmpty()
    public classificationName: string;

   // @IsString()
   @IsNotEmpty()
   public modifiedBy: number;

    

  }
 
 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const ClassificationSchemas = validationMetadatasToSchemas(metadatas)


