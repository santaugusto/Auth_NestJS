import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PasswordReset {
    @PrimaryGeneratedColumn()
    idPassworReset: number;
    @Column({nullable:false})
    email:string;
    @Column({nullable:false})
    token:string;
    
    @CreateDateColumn({
        type:'timestamp',
        default:()=>'CURRENT_TIMESTAMP(6)',
    })
    public createdAt:Date
    
    @UpdateDateColumn({
        type:'timestamp',
        default:()=>'CURRENT_TIMESTAMP(6)',
        onUpdate:'CURRENT_TIMESTAMP(6)',
    })
    public updatedAt:Date
}
