import { Resolver, Mutation, Query, Arg, Int } from "type-graphql";
import { getRepository } from "typeorm";
import { Category } from "../entity/Category";

@Resolver()
export class CategoryResolver{
    @Query(() => [Category])
    categories() {
        return getRepository(Category).find();
    }
}
