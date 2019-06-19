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
import { Category } from "./Category";
import { Priority } from "./Priority";
import { State } from "./State";
  

@Entity()
export class Ticket{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 40)
  subject: string;

  @Column("varchar", { length: 40 })
  ticketNumber: string;

  @Column("varchar", { length: 40 })
  email: string;

  @Column("varchar", { length: 20 })
  phone: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column("text")
  issueDescription: string;

  @Column({type:"text", nullable: true})
  actionDoneDescription: string;

  @ManyToOne(type => User)
  requesterUser: User;

  @ManyToOne(type => User)
  assignedUser: User;

  @ManyToOne(type => Category)
  category: Category;

  @ManyToOne(type => Priority)
  priority: Priority;

  @Column({nullable: true})
  staffClosed: boolean;

  @Column({nullable: true})
  userClosed: boolean;

  @ManyToOne(type => State)
  state: State;
  
}
