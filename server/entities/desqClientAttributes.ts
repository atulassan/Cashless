import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
//import {DesqTicket} from "./desqTicket";


@Entity("desq_client_attributes",{schema:"desq" } )
@Index("client_att_id",["clientAttId",])
//@Index("company_type_id_2",["companyType",])
export class DesqClientAttributes extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"client_att_id"
        })
    public clientAttId:number;
        

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("int",{ 
        nullable:false,
        name:"model_type"
        })
    public modelType:number;

    @Column("varchar",{ 
        nullable:false,
        name:"type"
        })
    public type:string;

    @Column("text",{ 
        nullable:false,
        name:"options"
        })
    public options:string;

    @Column("text",{ 
        nullable:false,
        name:"additional_class"
        })
    public additionalClass:string;

    @Column("varchar",{ 
        nullable:false,
        name:"id"
        })
    public id:string;

    @Column("varchar",{ 
        nullable:false,
        name:"title"
        })
    public title:string;
        
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
