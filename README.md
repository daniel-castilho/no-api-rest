# API REST
Esta API é utilizada para...
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todoss os games cadastrados no banco de dados.
#### Parâmetros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exemplo de resposta:
```

{
    "user": {
        "id": 1,
        "email": "dan.castilho@gmail.com"
    },
    "games": [
        {
            "id": 1,
            "title": "Call of Duty MW",
            "year": 2019,
            "price": 60
        },
        {
            "id": 2,
            "title": "Sea of Thieves",
            "year": 2018,
            "price": 60
        },
        {
            "id": 3,
            "title": "Minecraft",
            "year": 2012,
            "price": 20
        }
    ]
}

```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso signifca que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```

{
    "err": "Token inválido!"
}

```


## Endpoints
### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parâmetros
email:  Email do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado email.

Exemplo:
```

{
    "email": "dan.castilho@gmail.com",
    "password": "123456"
}

```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYW4uY2FzdGlsaG9AZ21haWwuY29tIiwiaWF0IjoxNjE2MTI2Mzg5LCJleHAiOjE2MTYxMjk5ODl9.NVuTRMTmIW5mfVGD3Jt7aGNe6CUNuH7RrvmfB2sC_LE"
}

```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso signifca que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou/e Email incorretos.

Exemplo de resposta:
```

{
    "err": "Credenciais inválidas!"
}

```
