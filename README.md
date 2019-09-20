# Backend Assessment

## What is this app

This API REST provides a set of functions that allow the user to request/response some information obtained from external resources.

## Getting Started

### Clone the repository

Clone this repository to your local machine

```
git clone git@github.com:sergiocrol/back-assessment.git
```

### installation

Install the dependencies

```
npm install
```

### run app

Start the application (will be running on port 3000)

```
nodemon start-dev
```


## API Endpoints

API entry point: http://localhost:3000/api

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                 
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ---------------------------------------
| POST        | /api/login                  | {email}                      | 200            | 400          | check if the email is in the data received from external API. If it is, save token.
| POST        | /api/logout                 |                              | 200            | 400          | Clear cookie. Logout of user.
| GET         | /api/users/id               | {id}                         | 200            | 404          | Check if there is an existing token and get the user's data by the id passed in the body
| GET         | /api/users/name             | {name}                       | 200            | 404          | Check if there is an existing token and get user data by username passed in the body
| GET         | /users/policy               | {policyId}                   | 200            | 404          | Check if there is an existing token and if the logged in user is an admin. Get the user data linked to policy
| GET         | /policies/:name             | {name}                       | 200            | 404          | Check if there is an existing token and if the logged in user is an admin. Get all the policies linked to username

### Git

[Repository Link](https://github.com/sergiocrol/back-assessment)

## Author

[Sergio Cordero Rol](https://github.com/sergiocrol)