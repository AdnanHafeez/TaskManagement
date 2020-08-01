import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Unique(['username'])
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;
    
    @Column()
    password: string;
}