import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";

class userController {

    public async create(req: Request, res: Response) {
        try {
            // const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
            // if(userExists)
            //      res.status(400).json({message: "User already exists" });
            const user: UserDocument = await userService.create(req.body as UserInput);
            res.status(201).json(user);            
        } catch (error) {
            if (error instanceof ReferenceError)
                res.status(400).json({message: "User already exists" });
            res.status(500).json(error);
        }
    }

    public async get (req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id); 
            if (!user){
                res.status(404).json({message: `User with id:${req.params.id} not found`})
            }
            res.json(user);   
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.findAll(); 
            res.json(users);            
        } catch (error) {
            res.status(500).json(error);
        }    
    }

    public async update(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            if (!user){
                res.status(404).json({message: `User with id:${req.params.id} not found`})
            }            
            res.json(user);            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete (req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.delete(req.params.id);
            if (!user){
                res.status(404).json({message: `User with id:${req.params.id} not found`})
            }            
            res.json(user);          
        } catch (error) {
            res.status(500).json(error);
        }    
    }
}

export default new userController();