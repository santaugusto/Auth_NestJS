import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false })
    nome: string;

    @Column({nullable: false })
    email: string;

    @Column({nullable: false })
    tipo: number;

    @Column({nullable: false })
    senha: string;

    @BeforeInsert()
    async setPassaword(){
        const salt = await bcrypt.genSalt();
        this.senha = await bcrypt.hash(this.senha,salt);
    };
}
