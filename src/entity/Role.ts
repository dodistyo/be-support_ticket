import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";

@Entity()
@Unique(["name"])
export class Role {
@PrimaryGeneratedColumn()
id: number;

@Column()
@Length(4, 20)
name: string;

@Column("text")
description: string;

}