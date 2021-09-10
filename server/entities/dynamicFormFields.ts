import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { DynamicFormFieldValue } from "./dynamicFormFieldValue";
import { DynamicForms } from "./dynamicForms";

@Index("dynamic_form_id", ["dynamicFormId"], {})
@Entity("dynamic_form_fields", { schema: "desq" })
export class DynamicFormFields  extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "dynamic_form_id" })
  dynamicFormId: number;

  @Column("varchar", { name: "element", length: 30 })
  element: string;

  @Column("varchar", { name: "text", length: 30 })
  text: string;

  @Column("tinyint", { name: "required", width: 1 })
  required: boolean;

  @Column("tinyint", { name: "canHaveAnswer", width: 1 })
  canHaveAnswer: boolean;

  @Column("tinyint", { name: "canHavePageBreakBefore", width: 1 })
  canHavePageBreakBefore: boolean;

  @Column("tinyint", { name: "canHaveAlternateForm", width: 1 })
  canHaveAlternateForm: boolean;

  @Column("tinyint", { name: "canHaveDisplayHorizontal", width: 1 })
  canHaveDisplayHorizontal: boolean;

  @Column("tinyint", { name: "canHaveOptionCorrect", width: 1 })
  canHaveOptionCorrect: boolean;

  @Column("tinyint", { name: "canHaveOptionValue", width: 1 })
  canHaveOptionValue: boolean;

  @Column("tinyint", { name: "canPopulateFromApi", width: 1 })
  canPopulateFromApi: boolean;

  @Column("varchar", { name: "field_name", length: 150 })
  fieldName: string;

  @Column("varchar", { name: "label", length: 150 })
  label: string;

  @Column("text", { name: "options" })
  options: string;

  @Column("tinyint", { name: "dirty", width: 1 })
  dirty: boolean;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(
    () => DynamicFormFieldValue,
    (dynamicFormFieldValue) => dynamicFormFieldValue.dynamicFormFiled
  )
  dynamicFormFieldValues: DynamicFormFieldValue[];

  @ManyToOne(
    () => DynamicForms,
    (dynamicForms) => dynamicForms.dynamicFormFields,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "dynamic_form_id", referencedColumnName: "id" }])
  dynamicForm: DynamicForms;
}
