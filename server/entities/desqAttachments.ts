import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {DesqTicket} from "./desqTicket";


@Entity("desq_attachments",{schema:"desq" } )
@Index("ticket_id",["ticketId",])
//@Index("company_type_id_2",["companyType",])
export class DesqAttachemnts extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"attachment_id"
        })
    public attachmentId:number;
        

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("text",{ 
        nullable:false,
        name:"file"
        })
    public file:string;
        
  @ManyToOne(type=>DesqTicket, desq_ticket=>desq_ticket.desqTickets,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'ticket_id'})
    public ticketId:DesqTicket | null;

    

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
    public modifiedby:number|string;
        

   @Column("int",{ 
        nullable:false,
        name:"status"
        })
    public status:number;
           
}
