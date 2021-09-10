import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqTicket} from "./desqTicket";


@Entity("desq_activity",{schema:"desq" } )
@Index("activity_id",["activityId",])
//@Index("company_type_id_2",["companyType",])
export class DesqActivity extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"activity_id"
        })
    public activityId:number;
        

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

    @Column("int",{ 
        nullable:false,
        name:"type"
        })
    public type:number;

   @Column("varchar",{ 
        nullable:false,
        name:"category"
        })
    public category:string;


    @Column("text",{ 
        nullable:false,
        name:"subject"
        })
    public subject:string;

    @Column("int",{ 
        nullable:false,
        name:"direction"
        })
    public direction:number;

    @Column("int",{ 
        nullable:false,
        name:"callstatus"
        })
    public callstatus:number;

    @Column("datetime",{ 
        nullable:false,
        name:"starttime"
        })
    public starttime:Date;


    @Column("varchar",{ 
        nullable:false,
        name:"duration"
        })
    public duration:string;

    @Column("int",{ 
        nullable:false,
        name:"contact_name"
        })
    public contactName:number;

    @Column("int",{ 
        nullable:false,
        name:"call_owner"
        })
    public callOwner:number;

    @Column("int",{ 
        nullable:false,
        name:"priority"
        })
    public priority:number;

    @Column("varchar",{ 
        nullable:false,
        name:"total_cost"
        })
    public totalCost:string |number;

    @Column("text",{ 
        nullable:false,
        name:"description"
        })
    public description:string;
        
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
