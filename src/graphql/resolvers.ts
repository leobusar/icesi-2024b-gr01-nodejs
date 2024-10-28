import { UserDocument } from "../models/user.model";
import userService from "../services/user.service";

export const resolvers = {
    Query: {
        user: async (_root: any, params: any) => {
            console.log(params.id);
            const user: UserDocument | null = await userService.findById(params.id);
            return user;
        }

    },

}