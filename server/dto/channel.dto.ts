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
  export class ChannelCreateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

     // @IsString()
     @IsNotEmpty()
     public channelName: string;

    // @IsString()
    @IsNotEmpty()
    public createdBy: number;

    

  }
  export class ChannelUpdateDTO {
   // @IsString()
   @IsNotEmpty()
   public clientId: number;

    // @IsString()
    @IsNotEmpty()
    public channelName: string;

  // @IsString()
    @IsNotEmpty()
   public modifiedBy: number;

    

  }
 
 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const ChannelSchemas = validationMetadatasToSchemas(metadatas)


