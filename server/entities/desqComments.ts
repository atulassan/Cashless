import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqCustContact} from "./desqCustContact";


@Entity("desq_comments",{schema:"desq" } )
//@Index("user_id",["user",])
export class DesqComments extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"comment_id"
        })
    public commentId:number;

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("int",{ 
        nullable:false,
        name:"ticket_id"
        })
    public ticketId:number;    

    @Column("text",{ 
        nullable:false,
        name:"comments"
        })
    public comments:string;
        

    @Column("int",{ 
        nullable:false,
        name:"type"
        })
    public type:number;

    @Column("int",{ 
        nullable:false,
        name:"comment_type"
        })
    public commentType:number;

    @Column("varchar",{ 
        nullable:false,
        name:"toaddress"
        })
    public toAddress:string;

    @Column("varchar",{ 
        nullable:false,
        name:"fromaddress"
        })
    public fromAddress:string;

    @Column("text",{ 
        nullable:false,
        name:"ccaddress"
        })
    public ccAddress:string;

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
        nullable:true,
        name:"modified_datetime"
        })
    public modifiedDatetime:Date;
        

    @Column("int",{ 
        nullable:true,
        name:"modifiedby"
        })
    public modifiedby:number;
        

    @Column("int",{ 
        nullable:false,
        name:"status"
        })
    public status:number;
  
    
    //  @OneToMany(type=>DesqCustContact, desq_cust_contact=>desq_cust_contact.customerId,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    // public desqCustomers:DesqCustContact[];

    
}
