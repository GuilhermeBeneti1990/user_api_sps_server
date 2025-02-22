import UserRepository from "../../infra/repositories/user.repository.js"
import userExists from "../../infra/utils/validator.js";

export default class UserDelete {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id) {
        const userFound = await userExists(id, this.userRepository);
        
        if(!userFound) {
            return null;
        }

        await this.userRepository.delete(id);

        return id;
    }

}