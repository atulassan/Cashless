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
  export class TicketCreateDTO {
    // @IsString()
    @IsNotEmpty()
    public clientId: number;

    @IsNotEmpty()
    public customerId: number;

     // @IsString()
     @IsNotEmpty()
     public contactName: number;

     // @IsString()
    
     public accountName: string;

    @MinLength(10)
    @IsNotEmpty()
    public telephone: string;
     
    @IsNotEmpty()
    @Matches(
      /^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/i,
      {
        message: 'Email must be an email',
      },
    )
    public email: string;

    // @IsString()
    @IsNotEmpty()
    public subject: string;
    
    //@IsString()
    public description: string;

    //@IsString()
    public ticketOwner: number;

    //@IsString()
    public dueDate: Date;

    //@IsString()
    public priority: number;

    //@IsString()
    public channel: number;

    //@IsString()
    public classifications: number;
     //@IsString()
    public createdBy: number;

     //@IsString()
     public status: number;
    

  }
  export class TicketUpdateDTO {
   // @IsString()
   //@IsNotEmpty()
   public clientId: number;

    // @IsString()
    @IsNotEmpty()
    public contactName: number;

    // @IsString()
   
    public accountName: number;

   @MinLength(10)
   @IsNotEmpty()
   public telephone: string;
    
   @IsNotEmpty()
   @Matches(
     /^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/i,
     {
       message: 'Email must be an email',
     },
   )
   public email: string;

   // @IsString()
   @IsNotEmpty()
   public subject: string;
   
   //@IsString()
   public description: string;

   //@IsString()
   public ticketOwner: number;

   //@IsString()
   public dueDate: Date;

   //@IsString()
   public priority: number;

   //@IsString()
   public channel: number;

   //@IsString()
   public classifications: number;

    //@IsString()
   public modifiedBy: number;

    //@IsString()
    public status: number;

     //@IsString()
    public solution: string;
    

  }

  export class TicketStatusUpdateDTO {
    //@IsString()
    public modifiedBy: number;
 
     //@IsString()
     public status: number;
 }
 
 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const TicketSchemas = validationMetadatasToSchemas(metadatas)


