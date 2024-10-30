import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";

export const resolvers = {
    Query: {
        user: async (_root: any, params: any) => {
            console.log(params.id);
            const user: UserDocument | null = await userService.findById(params.id);
            return user;
        }, 
        users: (_root: any) => userService.findAll(),
        createUser: async (_root: any, params: any )=> {
            const userOutput: UserDocument = await userService.create(params.input as UserInput);
            return userOutput;
        }

    },
    Mutation: {
        createUser: async (_root: any, params: any )=> {
            const userOutput: UserDocument = await userService.create(params.input as UserInput);
            return userOutput;
        }
    }



}