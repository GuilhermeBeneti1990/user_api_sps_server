import { ROLE } from "../../domain/user/entities/User.js";
import usersDb from "../dbFake/users.db.js";

export default class UserRepository {

    async create(user) {
        try {
            const { id, name, email, password, type } = user;
            const userCreated = {
                id,
                name,
                email,
                password,
                type
            };

            usersDb.push(userCreated);

        return userCreated;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao cadastrar usuário no banco de dados!");
        }
    }

    async findAll() {
        try {
            return usersDb;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao listas usuários no banco de dados!");
        }
    }

    async findById(id) {
        try {
            return await usersDb.find(user => user.id === id);
        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao recuperar usuário: ${id}`);
        }
    }

    async findByEmail(email) {
        try {
            return await usersDb.find(user => user.email === email);
        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao recuperar usuário: ${id}`);
        }
    }

    async update(id, name, email, password) {
        try {
            const userFound = await this.findById(id);

            userFound.name = name;
            userFound.email = email;
            userFound.password = password;

            return userFound;
        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao atualizar usuário: ${id}`);
        }
    }

    async changeRole(id, role) {
        try {
            const userFound = await this.findById(id);

            switch (role) {
                case "admin":
                    userFound.type = ROLE.ADMIN
                    break;
                case "user":
                    userFound.type = ROLE.USER
                default:
                    break;
            }

            return userFound;
        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao mudar permissão do usuário: ${id}`);
        }
    }

    async delete(id) {
        try {
            const index = await usersDb.findIndex(user => user.id === id);

            if(index !== -1) {
                return usersDb.splice(index, 1)[0];
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao remover usuário: ${id}`);
        }
    }

}