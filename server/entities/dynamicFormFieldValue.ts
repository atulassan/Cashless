import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { DynamicFormFields } from "./dynamicFormFields";

@Index("dynamic_form_filed_id", ["dynamicFormFiledId"], {})
@Entity("dynamic_form_field_value", { schema: "desq" })
export class DynamicFormFieldValue  extends BaseEntity  {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "dynamic_form_filed_id" })
  dynamicFormFiledId: number;

  @Column("varchar", { name: "value", length: 1000 })
  value: string;

  @ManyToOne(
    () => DynamicFormFields,
    (dynamicFormFields) => dynamicFormFields.dynamicFormFieldValues,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "dynamic_form_filed_id", referencedColumnName: "id" }])
  dynamicFormFiled: DynamicFormFields;
}
