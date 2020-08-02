import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: TaskStatus;

    @Column()
    description: string;

    @Column()
    title: string;

    @ManyToOne(type => User, user => user.tasks, {eager: false})
    user: User;

    @Column()
    userId: number;
}