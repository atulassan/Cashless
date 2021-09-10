import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqTicket} from "./desqTicket";


@Entity("desq_charge_type",{schema:"desq" } )
@Index("charge_type_id",["chargeTypeId",])
//@Index("company_type_id_2",["companyType",])
export class DesqChargeType extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"charge_type_id"
        })
    public chargeTypeId:number;
        

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

   

    @Column("varchar",{ 
        nullable:false,
        name:"type"
        })
    public type:string;

    
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
