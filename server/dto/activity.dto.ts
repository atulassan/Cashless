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
  export class ActivityCreateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

    @IsNotEmpty()
    public ticketId: number;

    @IsNotEmpty()
    public type: number;

     // @IsString()
    public category: string;

     // @IsString()
     public subject: string;

    // @IsString()
    public description: string;

    // @IsString()
    //@IsNotEmpty()
    public direction: number;

    // @IsString()
    public callstatus: number;

    // @IsString()
    public starttime: Date;

    // @IsString()
    public duration: string;

    // @IsString()
     public callOwner:  number;

     // @IsString()
     public contactName:  number;

     // @IsString()
     public totalCost:  number;

    // @IsString()
     public priority:  number;

     // @IsString()
    // @IsNotEmpty()
     public createdBy:  number;

    

  }
  export class ActivityUpdateDTO {
   // @IsString()
   @IsNotEmpty()
   public clientId: number;

   @IsNotEmpty()
   public ticketId: number;

   @IsNotEmpty()
   public type: number;

    // @IsString()
   public category: string;

    // @IsString()
    public subject: string;

   // @IsString()
   public description: string;

   // @IsString()
   //@IsNotEmpty()
   public direction: number;

   // @IsString()
   public callstatus: number;

   // @IsString()
   public starttime: Date;

   // @IsString()
   public duration: string;

   // @IsString()
    public callOwner:  number;

    // @IsString()
    public contactName:  number;

    // @IsString()
    public totalCost:  number;

   // @IsString()
    public priority:  number;

    //@IsString()
    public modifiedBy: number;

  }
  
 
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const ActivitySchemas = validationMetadatasToSchemas(metadatas)


