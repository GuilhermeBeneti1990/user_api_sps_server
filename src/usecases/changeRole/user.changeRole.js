import UserRepository from "../../infra/repositories/user.repository.js"
import userExists from "../../infra/utils/validator.js";
import response from "../../infra/utils/response.js";

export default class UserChangeRole {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id, role) {
        const userFound = await userExists(id, this.userRepository);
        
        if(!userFound) {
            return null;
        }

        const user = await this.userRepository.changeRole(id, role);

        return response(user);
    }

}