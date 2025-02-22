import UserRepository from "../../infra/repositories/user.repository.js"
import userExists from "../../infra/utils/validator.js";
import response from "../../infra/utils/response.js";

export default class UserFindById {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id) {
        const userFound = await userExists(id, this.userRepository);

        if(!userFound) {
            return null;
        }

        const user = await this.userRepository.findById(id)

        return response(user);
    }

}