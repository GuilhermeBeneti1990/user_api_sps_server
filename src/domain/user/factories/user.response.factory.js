import UserResponse from "../dtos/user.response.js";

export default class UserResponseFactory {

    static create(id, name, email, type) {
        return new UserResponse(id, name, email, type);
    }

}