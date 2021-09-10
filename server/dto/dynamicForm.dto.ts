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

class FormField {
    // @IsString()
      
    public element: string;
    public text: string;
    public required:boolean;
    public canHaveAnswer:boolean;
    public canHavePageBreakBefore:boolean;
    public canHaveAlternateForm:boolean;
    public canHaveDisplayHorizontal:boolean;
    public canHaveOptionCorrect:boolean;
    public canHaveOptionValue:boolean;
    public canPopulateFromApi:boolean;
    public field_name:string;
    public label:string;
    public options:[];
    public dirty:boolean;

    
 }
 export class FormCreateDTO {
     
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => FormField)
    formFields: FormField[];

    @IsNotEmpty()
    public formName: string;

   
   }

 const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
 export const MessageSchemas = validationMetadatasToSchemas(metadatas)