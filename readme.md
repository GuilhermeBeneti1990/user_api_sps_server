# Teste NODE

- Criar um CRUD (API REST) em node para cadastro de usuários
- Para a criação do teste utilizar um repositório fake dos usuários. (Pode ser em memória)

## Regras

- Deve existir um usuário admin previamente cadastrado para utilizar autenticação (não precisa criptografar a senha);
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin"
    password: "1234"
  }

- Criar rota de autenticação (Jwt token)
- As rotas da API só podem ser executadas se estiver autenticada
- Deve ser possível adicionar usuários. Campos: email, nome, type, password
- Não deve ser possível cadastrar o e-mail já cadastrado
- Deve ser possível remover usuário
- Deve ser possível alterar os dados do usuário

----------------------------------
ROTAS
----------------------------------
## [POST] /register - Registo de usuário (Sign Up)
-  Não necessita de autenticação
-  Body:
  ```
  {
    name: "John Doe",
    email: "john@email.com.br",
    password: "123",
    confirmPassword: "123"
  }
```
-  Response:
  ```
{
   user: {
    id: "uuidv412312434",
    name: "John Doe",
    email: "john@email.com.br",
    type: "user"
  },
  token: "12hoadg0dyqsakdjghajfghofdghsisg34543fzgdfgdfg534"
}
```
* O ID será gerado automaticamente e o type por default sempre será "user" ao cadastrar/registrar um novo usuário.
* Retorna um token e as informações do user


## [POST] /login - Login de usuário
-  Não necessita de autenticação
-  Body:
  ```
  {
    email: "john@email.com.br",
    password: "123"
  }
```
* Retorna um token.


## [GET] /users - Listagem de usuários
-  Necessita de autenticação
-  Response:
  ```
  [
   {
      id: "uuidv412312434",
      name: "John Doe",
      email: "john@email.com.br",
      password: "123",
      type: "user"
    },
    {
      id: "uuidv4as84928742",
      name: "John Doe 2",
      email: "john2@email.com.br",
      password: "123",
      type: "user"
    },
  ]
```
* Retorna uma lista de users.


## [POST] /users - Criação de usuários
-  Necessita de autenticação
-  Body:
  ```
  {
    name: "John Doe",
    email: "john@email.com.br",
    password: "123"
  }
```
-  Response:
```
 {
    id: "uuidv412312434",
    name: "John Doe",
    email: "john@email.com.br",
    type: "user"
  }
```
* Retorna o user criado.


## [GET] /users/:id - Usuário por ID
-  Necessita de autenticação
-  Response:
  ```
 {
    id: "uuidv412312434",
    name: "John Doe",
    email: "john@email.com.br",
    type: "user"
  }
```
* Retorna o user de acordo com o id.



## [PUT] /users/:id - Update de usuário
-  Necessita de autenticação
-  Body:
  ```
  {
    name: "John Doe Atualizado",
    email: "johnatualizado@email.com.br",
  }
```
-  Response:
  ```
 {
    id: "uuidv412312434",
    name: "John Doe Atualizado",
    email: "johnatualizado@email.com.br",
    type: "user"
  }
```
* Retorna o user atualizado.



## [PATCH] /users/:id/roles - Atualização de tipo de usuário
-  Necessita de autenticação
-  Body:
  ```
  {
    role: "admin"
  }
```
-  Response:
  ```
 {
    id: "uuidv412312434",
    name: "John Doe",
    email: "john@email.com.br",
    type: "admin"
  }
```
* Retorna o user já com o tipo de usuário atualizado.



## [DELETE] /users/:id/roles - Remoção de usuário
-  Necessita de autenticação
-  Response:
  ```
 {
    id: "uuidv412312434"
  }
```
* Retorna o id do user que foi removido.
