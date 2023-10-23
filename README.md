## Authentication

- Created a nodejs server for authentication

## Routes

- POST localhost:3000/auth/signup
```js
{
    "name": "Test",
    "email": "test@mail.com",
    "password": "12345"
}
```

- POST localhost:3000/auth/login
```js
{
    "email": "test@mail.com",
    "password": "12345"
}
```

- GET localhost:3000/auth/getAllUsers (This request is protected and only logged in users will be able to call this.)

- POST localhost:3000/auth/logout 
