import { Resolver, Mutation, Query, Arg, Int } from "type-graphql";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'Hello world!';
    }
    @Query(() => [User])
    users() {
        return getRepository(User).find();
    }
}
