import UserRepository from "../../infra/repositories/user.repository.js"
import jwt from "jsonwebtoken";

export default class Login {
    constructor() {
        this.userRepository = new UserRepository();
    }

    token(user) {
        return jwt.sign({ email: user.email, name: user.name, type: user.type}, process.env.JWT_SECRET, {expiresIn: '1h'});
    }

    async execute(email, password) {
        const userFound = await this.userRepository.findByEmail(email);
        
        if(!userFound) {
            return null;
        }

        if(password === userFound.password) {
            return await this.token(userFound);
        }
    }
}