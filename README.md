# Build a Book Your Mentor App

## Tools & Resources:

1. [MongoDB](https://www.mongodb.com/) - To Store Orders and Users information

```bash
npm install mongoose
```

2. [Express]() - To Handle Backend Server

3. [NodeJs]() - Backend Language and Server Side Programming

-[POSTMAN](https://www.postman.com/) - Helps to Build, Test, Debug, and Document APIs-much-faster.

-[VS Code](https://code.visualstudio.com/) - Most Popular and Most Used Code Editor that lets you write any Programming Language you love.

-[JWT - JSON WEB TOKEN](https://jwt.io/) - Never blocks the business to be dependent on just one server. Security is top Notch.

-[Git](https://git-scm.com/) - A free and open source version control system that powers more than 70% of the world's application.

-[GitHub](https://github.com/) - Well, Github has become my favorite platform to read, contribute, and share projects code.

## API USAGE & ENDPOINTS

### Register a User [POST /api/register]

- Request: Add User and Request JSON web Token for Auth

  - Headers

    Content-type: application/json

  - Body

    {
    "name": "",
    "email": "",
    "password": ""
    }

- Response: 200 (application/json)

  - Body

          {
            "token": ""
          }

### Login with a User [POST /api/login]

- Request: Login with credentials to receive a JSON web token

  - Headers

        Content-type: application/json

  - Body

            {
              "email": "",
              "password": ""
            }

- Response: 200 (application/json)

  - Body

          {
            "token": ""
          }

### Update Users Information [PUT /api/login/:id]

- Request: Update Users Info and Get msg and the User

  - Headers

    Content-type: application/json
    x-auth-token: YOURJWT

  - Body

    {
    "email": "",
    "password": ""
    }

- Response: 200 (application/json)

  - Body

          {
            "msg": "",
            "user": {},
          }

### Book a Mentor [POST /api/proceed-to-checkout]

- Request: Send Mentor Booking Id and receive checkout url and Order Details;

  - Headers

    Content-type: application/json

  - Body

    {
    "bookingId": 12
    }

- Response: 200 (application/json)

  - Body

          {
            "url": "",
            "orderDetails": {},
          }

### Get Users Orders [GET /api/orders]

- Request: Send Mentor Booking Id and receive checkout url and Order Details;

  - Headers

    Content-type: application/json
    x-auth-token: YOURJWT

  - Body

    {
    "bookingId": 12
    }

- Response: 200 (application/json)

  - Body

          {
            "url": "",
            "orderDetails": {},
          }

Thanks, 
Nitesh