import UserRepository from "../../infra/repositories/user.repository.js"
import UserResponseFactory from "../../domain/user/factories/user.response.factory.js";

export default class UserFindAll {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute() {
        return await this.userRepository.findAll();
    }

}