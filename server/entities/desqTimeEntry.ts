import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqTicket} from "./desqTicket";


@Entity("desq_time_entry",{schema:"desq" } )
@Index("time_entry_id",["timeEntryId",])
//@Index("company_type_id_2",["companyType",])
export class DesqTimeEntry extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"time_entry_id"
        })
    public timeEntryId:number;
        

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
        name:"agent_id"
        })
    public agentId:number;

    @Column("varchar",{ 
        nullable:false,
        name:"excute_time"
        })
    public excuteTime:string | number;

    @Column("varchar",{ 
        nullable:false,
        name:"duration"
        })
    public duration:string | number;


    @Column("text",{ 
        nullable:false,
        name:"description"
        })
    public description:string;

    @Column("int",{ 
        nullable:false,
        name:"billing_type"
        })
    public billingType:number;

    @Column("varchar",{ 
        nullable:false,
        name:"cost_hour"
        })
    public costHour:string | number;

    @Column("varchar",{ 
        nullable:false,
        name:"addtional_cost"
        })
    public addtionalCost: string | number;


    @Column("varchar",{ 
        nullable:false,
        name:"total_cost"
        })
    public totalCost: string | number;

    @Column("int",{ 
        nullable:false,
        name:"ticket_charge_type"
        })
    public ticketChargeType: number;
        
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
