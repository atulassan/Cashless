import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {DesqCustContact} from "./desqCustContact";
import {DesqTicket} from "./desqTicket";


@Entity("desq_customer",{schema:"desq" } )
//@Index("user_id",["user",])
export class DesqCustomer extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"customer_id"
        })
    public customerId:number;

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("varchar",{ 
        nullable:false,
        name:"customer_name"
        })
    public customerName:string;    

    @Column("varchar",{ 
        nullable:false,
        name:"telephone"
        })
    public telephone:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"email"
        })
    public email:string;

    @Column("varchar",{ 
        nullable:false,
        name:"website"
        })
    public website:string;
        

    @Column("text",{ 
        nullable:false,
        name:"address"
        })
    public address:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"postcode"
        })
    public postcode:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"city"
        })
    public city:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"place"
        })
    public place:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"country"
        })
    public country:string;

    @Column("varchar",{ 
        nullable:false,
         name:"account"
        })
    public account:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"fax"
        })
    public fax:string;


    @Column("varchar",{ 
        nullable:false,
        name:"vatno"
        })
    public vatno:string;


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
  
    @OneToMany(type => DesqCustContact, desq_cust_contact => desq_cust_contact.customerId)
    @JoinColumn({ name: 'customer_id' })
    public desqCustomers: DesqCustContact;

    @OneToMany(type => DesqTicket, desq_ticket => desq_ticket.customerId)
    @JoinColumn({ name: 'customer_id' })
    public desqCustomers1: DesqTicket;

   
    //  @OneToMany(type=>DesqCustContact, desq_cust_contact=>desq_cust_contact.customerId,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    // public desqCustomers:DesqCustContact[];

    
}
