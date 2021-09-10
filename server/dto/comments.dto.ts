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
  export class CommentCreateDTO {
    // @IsString()
    //@IsNotEmpty()
    public clientId: number;

    @IsNotEmpty()
    public ticketId: number;
 
     // @IsString()
     @IsNotEmpty()
     public comments: string;
 
     @IsNotEmpty()
     public type: number;
 
     @IsNotEmpty()
     public commentType: number;

     @IsNotEmpty()
     public toAddress: string;

     @IsNotEmpty()
     public fromAddress: string;
    // @IsNotEmpty()
     public ccAddress: string;

    // @IsString()
    @IsNotEmpty()
    public createdBy: number;
}
  export class CommentUpdateDTO {
   // @IsString()

   @IsNotEmpty()
   public clientId: number;

   @IsNotEmpty()
   public ticketId: number;

    // @IsString()
    @IsNotEmpty()
    public comments: string;

    @IsNotEmpty()
    public type: number;

    
    public commentType: number;

  // @IsString()
    
   public modifiedBy: number;

    

  }
 
 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  export const CommentsSchemas = validationMetadatasToSchemas(metadatas)


