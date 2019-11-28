import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Ticket } from "./Ticket";
  

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(type => User)
  forUser: User;

  @ManyToOne(type => Ticket, { onDelete: 'CASCADE' })
  relatedTicket: Ticket;

  @Column()
  isRead : boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}