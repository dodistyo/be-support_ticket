import { getRepository,getConnection } from "typeorm";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { Notification } from "../entity/Notification";

const root = {
  hello: () => {
    return 'Hello world!';
  },
  users: async () => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ select: ["id", "username", "email", "name", "phone", "createdAt", "updatedAt"],relations: ["roles"] });
    return users;
  },
  categories: async () =>{
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find();
    return category;
  },
  notifications: async () => {
    const notifRepository = getRepository(Notification);
    const notifications = await notifRepository.find({ select: ["id", "message", "isRead", "createdAt", "updatedAt"]});
    return notifications;
  }
};
export default root