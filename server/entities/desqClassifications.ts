import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {DesqTicket} from "./desqTicket";

@Entity("desq_classifications",{schema:"desq" } )
//@Index("user_id",["user",])
export class DesqClassifications extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"classification_id"
        })
    public classificationId:number;

    @Column("int",{ 
        nullable:false,
        name:"client_id"
        })
    public clientId:number;

    @Column("varchar",{ 
        nullable:false,
        name:"classification_name"
        })
    public classificationName:string;    

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


    
  
    // @OneToMany(type => DesqTicket, desq_ticket => desq_ticket.classificationId)
    // @JoinColumn({ name: 'classification_id' })
    // public desqClassificationss: DesqClassifications;

    

    
    
    

    
}
