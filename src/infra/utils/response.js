import UserResponseFactory from "../../domain/user/factories/user.response.factory.js";

export default function response(user) {
    const result = UserResponseFactory.create({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type
    });

    return result;
}