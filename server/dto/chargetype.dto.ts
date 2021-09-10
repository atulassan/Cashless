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
  export class ChargetypeCreateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

     // @IsString()
     @IsNotEmpty()
     public type: string;

    // @IsString()
    @IsNotEmpty()
    public createdBy: number;

    

  }
  export class ChargetypeUpdateDTO {
   // @IsString()
   @IsNotEmpty()
   public clientId: number;

    // @IsString()
    @IsNotEmpty()
    public type: string;

  // @IsString()
    @IsNotEmpty()
   public modifiedBy: number;

    

  }
 
 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const ChargetypeSchemas = validationMetadatasToSchemas(metadatas)


