import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { Role } from "./Role";
import * as bcrypt from "bcryptjs";
import { ID, Field, ObjectType } from "type-graphql";

  
  @ObjectType()
  @Entity()
  @Unique(["username"])
  export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column()
    @Length(4, 20)
    name: string;

    @Field()
    @Column({nullable:true})
    @Length(4, 20)
    email: string;

    @Field()
    @Column({nullable:true})
    @Length(4, 20)
    phone: string;
    
    @Field()
    @Column()
    @Length(4, 20)
    username: string;
  
    @Column()
    @Length(4, 100)
    password: string;
    
    @Field()
    @Column()
    @CreateDateColumn()
    createdAt: Date;
    
    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    @ManyToMany(type => Role, {
      eager: true,
      cascade: true
    })
    @JoinTable()
    roles: Role[];

  }
  