import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqTicket} from "./desqTicket";


@Entity("desq_client_dynamic",{schema:"desq" } )
@Index("client_dynamic_id",["clientDynamicId",])
//@Index("company_type_id_2",["companyType",])
export class DesqClientDynamic extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"client_dynamic_id"
        })
    public clientDynamicId:number;
        

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("int",{ 
        nullable:false,
        name:"client_att_id"
        })
    public clientAttId:number;


    @Column("int",{ 
        nullable:false,
        name:"customer_id"
        })
    public customerId:number;

    @Column("int",{ 
        nullable:false,
        name:"ticket_id"
        })
    public ticketId:number;

    @Column("text",{ 
        nullable:false,
        name:"field_value"
        })
    public fieldValue:string;

    
//   @ManyToOne(type=>DesqTicket, desq_ticket=>desq_ticket.desqTickets,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
//     @JoinColumn({ name:'ticket_id'})
//     public ticketId:DesqTicket | null;

    

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
