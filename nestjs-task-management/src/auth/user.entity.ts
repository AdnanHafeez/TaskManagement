import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"
import * as bcrypt from 'bcryptjs';
import { Task } from "src/tasks/task.entity";

@Unique(['username'])
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];

    async validateUserPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}