import { ROLE } from "../../domain/user/entities/User.js";
import UserRepository from "../../infra/repositories/user.repository.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

export default class Register {
    constructor() {
        this.userRepository = new UserRepository();
    }

    token(user) {
        return jwt.sign({ email: user.email, name: user.name, type: user.type}, process.env.JWT_SECRET, {expiresIn: '1h'});
    }

    async execute(name, email, password, confirmPassword) {
        if(password === confirmPassword) {
            const userToCreate = {
                id: uuid(),
                name,
                email,
                password,
                type: ROLE.USER
            }
    
            const result = await this.userRepository.create(userToCreate);

            return {
                user: result,
                token: await this.token(result)
            }
        } else {
            return null;
        }
    }
}