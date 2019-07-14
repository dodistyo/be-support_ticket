import { getRepository,getConnection } from "typeorm";
import { Category } from "../entity/Category";

const root = {
    hello: () => {
      return 'Hello world!';
    },
    categories: async () =>{
      const categoryRepository = getRepository(Category);
      const category = await categoryRepository.find();
      return category;
    }
  };
export default root