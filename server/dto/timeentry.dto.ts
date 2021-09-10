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
  export class TimeentryCreateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

    @IsNotEmpty()
    public ticketId: number;

    @IsNotEmpty()
    public agentId: number;

     // @IsString()
    public excuteTime: string;

     // @IsString()
     public duration: string;

    // @IsString()
    public description: string;

    // @IsString()
    @IsNotEmpty()
    public billingType: number;

    // @IsString()
    public costHour: number;

    // @IsString()
    public addtionalCost: number;

    // @IsString()
    public ticketChargeType: number;

    // @IsString()
     public totalCost:  number;

     // @IsString()
     @IsNotEmpty()
     public createdBy:  number;

    

  }
  export class TimeentryUpdateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

    @IsNotEmpty()
    public ticketId: number;

    @IsNotEmpty()
    public agentId: number;

     // @IsString()
    public excuteTime: string;

     // @IsString()
     public duration: string;

    // @IsString()
    public description: string;

    // @IsString()
    @IsNotEmpty()
    public billingType: number;

    // @IsString()
    public ticketChargeType: number;

    // @IsString()
    public costHour: number;

    // @IsString()
    public addtionalCost: number;

    // @IsString()
     public totalCost:  number;

    //@IsString()
    public modifiedBy: number;

  }
  
 
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const TimeentrySchemas = validationMetadatasToSchemas(metadatas)


