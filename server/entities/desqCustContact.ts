import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {DesqCustomer} from "./desqCustomer";


@Entity("desq_cust_contact",{schema:"desq" } )
@Index("customer_id",["customerId",])
@Index("customer_id_2",["customerId",])
export class DesqCustContact extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"cust_contact_id"
        })
    public custContactId:number;
        

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;
        
  @ManyToOne(type=>DesqCustomer, desq_customer=>desq_customer.desqCustomers,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'customer_id'})
    public customerId:DesqCustomer | null | number;

    // @Column("int",{ 
    // nullable:false,
    // name:"customer_id"
    // })
    // public customerId:number;



    @Column("varchar",{ 
        nullable:false,
        name:"first_name"
        })
    public firstName:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"last_name"
        })
    public lastName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"telephone_direct"
        })
    public telephoneDirect:string;


    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"telephone_private"
        })
    public telephonePrivate:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"email"
        })
    public email:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"mobile"
        })
    public mobile:string;

    @Column("varchar",{ 
        nullable:false,
        name:"title"
        })
    public title:string;
    @Column("varchar",{ 
        nullable:false,
        name:"salutation"
        })
    public salutation:string;


    @Column("date",{ 
        nullable:false,
        name:"dob"
        })
    public dob:Date;


    @Column("varchar",{ 
        nullable:false,
        name:"facebook"
        })
    public facebook:string;


    @Column("varchar",{ 
        nullable:false,
        name:"instagram"
        })
    public instagram:string;


    @Column("varchar",{ 
        nullable:false,
        name:"linkedin"
        })
    public linkedin:string;


    @Column("varchar",{ 
        nullable:false,
        name:"xing"
        })
    public xing:string;
        

     @Column("datetime",{ 
        nullable:false,
        name:"created_datetime"
        })
    public createdDatetime:Date;
        

    @Column("int",{ 
        nullable:false,
        name:"createdby"
        })
    public createdby:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"modified_datetime"
        })
    public modifiedDatetime:Date;
        

    @Column("int",{ 
        nullable:false,
        name:"modifiedby"
        })
    public modifiedby:number;
        

   @Column("int",{ 
        nullable:false,
        name:"status"
        })
    public status:number;
           
}
