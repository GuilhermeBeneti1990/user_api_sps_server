import User from "../entities/User";

export default class UserFactory {

    static create(name, email, password) {
        return new User(name, email, password);
    }

}