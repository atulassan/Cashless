import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqTicket} from "./desqTicket";


@Entity("desq_activity_reminder",{schema:"desq" } )
@Index("activity_reminder_id",["activityReminderId",])
//@Index("company_type_id_2",["companyType",])
export class DesqActivityRemainder extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"activity_reminder_id"
        })
    public activityReminderId:number;
        

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("int",{ 
        nullable:false,
        name:"activity_id"
        })
    public activityId:number;

    @Column("int",{ 
        nullable:false,
        name:"type"
        })
    public type:number;

    @Column("date",{ 
        nullable:false,
        name:"date"
        })
    public date:Date;

   

    @Column("varchar",{ 
        nullable:false,
        name:"hours"
        })
    public hours:string;


    @Column("varchar",{ 
        nullable:false,
        name:"minutes"
        })
    public minutes:string;

    @Column("int",{ 
        nullable:false,
        name:"email"
        })
    public email:number;

    @Column("int",{ 
        nullable:false,
        name:"popup"
        })
    public popup:number;

    @Column("int",{ 
        nullable:false,
        name:"sms"
        })
    public sms:number;

    
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
