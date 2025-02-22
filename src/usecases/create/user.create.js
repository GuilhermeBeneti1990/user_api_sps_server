import { v4 as uuid } from "uuid";
import UserRepository from "../../infra/repositories/user.repository.js"
import UserResponseFactory from "../../domain/user/factories/user.response.factory.js";
import { ROLE } from "../../domain/user/entities/User.js";

export default class UserCreate {

    constructor() {
        this.userRepository = new UserRepository();
    }
    
    response(user) {
        const result = UserResponseFactory.create({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type
        });

        return result;
    }

    async execute(user) {
        const userAlreadyExist = await this.userRepository.findByEmail(user.email);

        if(userAlreadyExist) {
            return null;
        }

        const userToCreate = {
            id: uuid(),
            name: user.name,
            email: user.email,
            password: user.password,
            type: ROLE.USER
        }

        const result = await this.userRepository.create(userToCreate);

        return result;
    }
        
}