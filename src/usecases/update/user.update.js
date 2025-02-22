import UserRepository from "../../infra/repositories/user.repository.js"
import userExists from "../../infra/utils/validator.js";
import response from "../../infra/utils/response.js";

export default class UserUpdate {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id, name, email, password) {
        const userFound = await userExists(id, this.userRepository);
        
        if(!userFound) {
            return null;
        }

        return response(await this.userRepository.update(id, name, email, password));
    }

}