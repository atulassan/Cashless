import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { DynamicFormFields } from "./dynamicFormFields";

@Index("slug", ["slug"], { unique: true })
@Entity("dynamic_forms", { schema: "desq" })
export class DynamicForms  extends BaseEntity  {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "form_name", length: 150 })
  formName: string;

  @Column("varchar", { name: "slug", unique: true, length: 150 })
  slug: string;

  @Column("tinyint", { name: "status", comment: "0->Inactive,1->Active" })
  status: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(
    () => DynamicFormFields,
    (dynamicFormFields) => dynamicFormFields.dynamicForm
  )
  dynamicFormFields: DynamicFormFields[];
}
