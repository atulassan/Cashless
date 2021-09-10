import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {DesqAttachemnts} from "./desqAttachments";
import {DesqCustomer} from "./desqCustomer";
import {DesqChannel} from "./desqChannel";
import {DesqClassifications} from "./desqClassifications";


@Entity("desq_ticket",{schema:"desq" } )
//@Index("user_id",["user",])
export class DesqTicket extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"ticket_id"
        })
    public ticketId:number;

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    // @Column("int",{ 
    //     nullable:false,
    //     name:"customer_id"
    //     })
    // public customerId:number;  

    @ManyToOne(type=>DesqCustomer, desq_customer=>desq_customer.desqCustomers1,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'customer_id'})
    public customerId:DesqCustomer | null ;

   
    
    @Column("varchar",{ 
        nullable:false,
        name:"contact_name"
        })
    public contactName:number;

    @Column("varchar",{ 
        nullable:false,
        name:"account_name"
        })
    public accountName:number;

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

    @Column("text",{ 
        nullable:false,
        name:"subject"
        })
    public subject:string;

    @Column("text",{ 
        nullable:false,
        name:"description"
        })
    public description:string;
        

    @Column("int",{ 
        nullable:false,
        name:"ticket_owner"
        })
    public ticketOwner:number;
        

    @Column("date",{ 
        nullable:false,
        name:"duedate"
        })
    public dueDate:Date;
        

    @Column("int",{ 
        nullable:false,
        name:"priority"
        })
    public priority:number;


    @Column("int",{ 
        nullable:false,
        name:"channel_id"
        })
    public channelId:number | null;


    @Column("int",{ 
        nullable:false,
        name:"classification_id"
        })
    public classificationId:number | null;
    
//    @ManyToOne(type=>DesqChannel, desq_channel=>desq_channel.desqChannels,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
//     @JoinColumn({ name:'channel_id'})
//     public channelId:DesqChannel | null |number;

//     @ManyToOne(type=>DesqClassifications, desq_classifications=>desq_classifications.desqClassificationss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
//     @JoinColumn({ name:'classification_id'})
//     public classificationId:DesqClassifications | null | number;

    
  


    // @Column("int",{ 
    //     nullable:false,
    //     name:"classification"
    //     })
    // public classifications:number;

    @Column("int",{ 
        nullable:false,
        name:"rating"
        })
    public rating:number;
        
    @Column("datetime",{ 
        nullable:false,
        name:"open_datetime"
        })
    public openDatetime:Date;


    @Column("datetime",{ 
        nullable:false,
        name:"onhold_datetime"
        })
    public onholdDatetime:Date;

    @Column("datetime",{ 
        nullable:false,
        name:"escalted_datetime"
        })
    public escaltedDatetime:Date;


    @Column("datetime",{ 
        nullable:false,
        name:"closed_datetime"
        })
    public closedDatetime:Date;
        

    

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

    @Column("text",{ 
        nullable:false,
        name:"solution"
        })
    public solution:string;
  
    @OneToMany(type=>DesqAttachemnts, desq_attachments=>desq_attachments.attachmentId,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    public desqTickets:DesqAttachemnts[];

    @ManyToOne(type => DesqCustomer, desq_customer => desq_customer.customerId)
    @JoinColumn({ name: 'customer_id' })
    public desqCustomers1: DesqCustomer;

    

    


    // @OneToMany(type => DesqChannel, desq_channel => desq_channel.channelId)
    // @JoinColumn({ name: 'channel_id' })
    // public desqChannels: DesqChannel;

    // @OneToMany(type => DesqClassifications, desq_classifications => desq_classifications.classificationId)
    // @JoinColumn({ name: 'classifiction_id' })
    // public DesqClassificationss: DesqClassifications;
    //  @OneToMany(type=>DesqCustContact, desq

//    @OneToMany(type => DesqCustomer, desq_customer => desq_customer.customerId,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
//    @JoinColumn({ name: 'customer_id' })
//     public desqCustomers2: DesqCustomer;

  

    


//     @OneToMany(type => DesqCustomer, desq_customer => desq_customer.customerId)
//    public desqCustomers1: DesqCustomer[];

    
}
