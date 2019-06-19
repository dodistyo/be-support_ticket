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
  

@Entity()
export class Priority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(8, 40)
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}