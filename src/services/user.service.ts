import UserModel, {UserDocument, UserInput}  from "../models/user.model";

class UserService {

    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if(userExists)
                 throw  new ReferenceError("User already exists");
            const  user = await  UserModel.create(userInput);
            return user;            
        } catch (error) {
           throw error; 
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null > {
        try {
            const  user = await  UserModel.findOne({email});
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async findAll(): Promise<UserDocument[] > {
        try {
            const  users = await  UserModel.find();
            return users;
        } catch (error) {
           throw error; 
        }
    }    

    public async findById(id: string): Promise<UserDocument | null > {
        try {
            const  user = await  UserModel.findById(id);
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const  user: UserDocument | null = await  UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});
            return user;            
        } catch (error) {
           throw error; 
        }
    }

    public async delete(id: string): Promise<UserDocument | null> {
        try {
            const  user: UserDocument | null = await  UserModel.findByIdAndDelete(id);
            return user;            
        } catch (error) {
           throw error; 
        }
    }    
}

export default new UserService();