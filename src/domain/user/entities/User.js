import UserResponseFactory from "../factories/user.response.factory.js";

export const ROLE = {
    ADMIN: "admin",
    USER: "user"
}

export default class User {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = ROLE.USER;
        this.validate();
    }

    validate() {
        if(!this.name) {
            throw new Error("Name is required");
        }
        if(!this.email) {
            throw new Error("Name is required");
        }
        if(!this.password) {
            throw new Error("Password is required");
        }
    }

    toAdmin() {
        this.type = ROLE.ADMIN;
    }

    userResponse(id, name, email, type) {
        return UserResponseFactory(id, name, email, type);
    }

}