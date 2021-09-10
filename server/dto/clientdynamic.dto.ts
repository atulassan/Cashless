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
  export class ClientDynamicCreateDTO {
     // @IsString()
   @IsNotEmpty()
   public clientId: number;

    @IsNotEmpty()
    public clientAttId: number;

    // @IsString()
   public customerId: number;

    // @IsString()
    public ticketId: number;

    // @IsString()
    public fieldValue: string;

   public createdBy:  number;

    

  }
  export class ClientDynamicUpdateDTO {
      // @IsString()
      @IsNotEmpty()
      public clientId: number;
   
       @IsNotEmpty()
       public clientAttId: number;
   
       // @IsString()
      public customerId: number;

       // @IsString()
      public ticketId: number;
   
       // @IsString()
       public fieldValue: string;
    //@IsString()
    public modifiedBy: number;

  }
  
 
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const ClientdynamicSchemas = validationMetadatasToSchemas(metadatas)


