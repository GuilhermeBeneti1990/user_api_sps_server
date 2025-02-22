import { Router } from "express";
import UserFindAll from "../../usecases/findAll/user.findAll.js";
import UserRepository from "../repositories/user.repository.js";
import UserCreate from "../../usecases/create/user.create.js";
import UserFindById from "../../usecases/findById/user.findById.js";
import UserUpdate from "../../usecases/update/user.update.js";
import UserDelete from "../../usecases/delete/user.delete.js";
import UserChangeRole from "../../usecases/changeRole/user.changeRole.js";
import Login from "../../usecases/login/login.js";
import jwt from "jsonwebtoken";
import Register from "../../usecases/register/register.js";

const routes = Router();
const repository = new UserRepository();

//AUTHENTICATION MIDDLEWARE
function autheticate(req, res, next) {
  const token = req.headers["authorization"] && req.headers['authorization'].split(' ')[1];

  if(!token) {
    return res.status(401).send({ message: "Autenticação falhou!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = user;
    next();
  });
}

routes.post("/register", async (req, res) => {
  const service = new Register();
  const { name, email, password, confirmPassword } = req.body;
  const userToken = await service.execute(name, email, password, confirmPassword);
  if(userToken) {
    res.status(200).send({
      userToken
    });
  } else {
    res.status(400).send({
      message: "Falha no registro, verifique seus dados e tente novamente!"
    })
  }
});

routes.post("/login", async (req, res) => {
  const service = new Login();
  const { email, password } = req.body;
  const userToken = await service.execute(email, password);
  if(userToken) {
    res.status(200).send({
      token: userToken
    });
  } else {
    res.status(400).send({
      message: "Falha no login, verifique seus dados e tente novamente!"
    });
  }
});

routes.get("/users", autheticate, async (req, res) => {
  const service = new UserFindAll(repository);
  const users = await service.execute();
  res.status(200).send(users);
});

routes.post("/users", autheticate, async (req, res) => {
  const service = new UserCreate(repository);
  const { body } = req;
  const user = await service.execute(body);
  if(!user) {
    res.status(400).send({
      message: "Falha ao criar um usuário, email já existente!"
    });
  } else {
    res.status(201).send(user);
  }
});

routes.get("/users/:id", autheticate, async (req, res) => {
  const service = new UserFindById(repository);
  const id = req.params.id
  const user = await service.execute(id)
  if(!user) {
    res.status(404).send({
      message: "User not found!"
    })
  } else {
    res.status(200).send(user);
  }
});

routes.put("/users/:id", autheticate, async (req, res) => {
  const service = new UserUpdate(repository);
  const id = req.params.id
  const { name, email, password } = req.body; 
  const user = await service.execute(id, name, email, password);
  if(!user) {
    res.status(404).send({
      message: "User not found!"
    })
  } else {
    res.status(200).send(user);
  }
});

routes.patch("/users/:id/roles", autheticate, async (req, res) => {
  const service = new UserChangeRole(repository);
  const id = req.params.id
  const { role } = req.body; 
  const user = await service.execute(id, role);
  if(!user) {
    res.status(404).send({
      message: "User not found!"
    })
  } else {
    res.status(200).send(user);
  }
});

routes.delete("/users/:id", autheticate, async (req, res) => {
  const service = new UserDelete(repository);
  const id = req.params.id
  const idUserRemoved = await service.execute(id);
  if(!user) {
    res.status(404).send({
      message: "User not found!"
    })
  } else {
    res.status(200).send(idUserRemoved);
  }
});

export default routes;
