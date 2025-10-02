# Backend API Documentation

## /users/register Endpoint Documentation

### Description

The `/users/register` endpoint registers a **new user**. It accepts user details, hashes the password, and saves the user to the database. Upon successful registration, it returns the created user's information along with a JSON Web Token (JWT) for authentication.

-----

### HTTP Method

#### POST

-----

### URL

`/users/register`

-----

### Request Body

The endpoint expects a **JSON object** with the following structure:

```json
{
  "fullName": {
    "firstName": "string (required, minimum 2 characters)",
    "lastName": "string (optional, minimum 2 characters)"
  },
  "email": "string (required, valid email, minimum 5 characters)",
  "password": "string (required, minimum 6 characters)"
}
```

-----

### Successful Response

* **Status Code:** `201 Created`

* **Headers:**

    ```text
    Authorization: Bearer <token>
    ```

* **Response Body:**

    ```json
    {
      "user": {
        "_id": "string",
        "fullName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string",
        "createdAt": "Date"
        // other user properties except password
      },
      "token": "string"
    }
    ```

-----

### Error Responses (Registration)

#### Validation Error

* **Status Code:** `400 Bad Request`

* **Response Body:**

    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```

#### Internal Server Error

* **Status Code:** `500 Internal Server Error`

* **Response Body:** (Typically an empty body or a generic error object indicating server failure.)

-----

### Notes

* The endpoint uses **express-validator** to perform server-side validations.
* Passwords are hashed using **bcrypt** before storage. See `user.model.js` for hashing implementation.
* A **JWT** is generated for the new user using the secret specified in the `.env` file and returned in the response header.

-----

-----

## /users/login Endpoint Documentation

### Overview

The `/users/login` endpoint authenticates an existing user. It verifies the provided email and password, and if valid, returns the user's information along with a **JSON Web Token (JWT)** for authentication.

-----

## Http Method

`POST`

-----

### URL Endpoint

`/users/login`

-----

### Request Body(Login)

The endpoint expects a **JSON object** with the following structure:

```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

-----

### Successful Response (login)

* **Status Code:** `200 OK`

* **Headers:**

    ```text
    Authorization: Bearer <token>
    ```

* **Response Body:**

    ```json
    {
      "user": {
        "_id": "string",
        "fullName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string",
        "createdAt": "Date"
        // other user properties except password
      },
      "token": "string"
    }
    ```

-----

### Error Responses

#### Validation Error (Login)

* **Status Code:** `400 Bad Request`

* **Response Body:** (Same format as the registration endpoint's validation error.)

    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```

#### Authentication Error

* **Status Code:** `401 Unauthorized`

* **Response Body:**

    ```json
    {
      "msg": "Invalid credentials." 
      // or similar message indicating email/password mismatch
    }
    ```

#### Internal Server Error(Login)

* **Status Code:** `500 Internal Server Error`

* **Response Body:** (Typically an empty body or a generic error object indicating server failure.)

-----

### Notes(login)

* The endpoint uses **express-validator** to validate the request body.
* Passwords are compared using **bcrypt**. See `user.model.js` for password comparison implementation.
* A **JWT** is generated for the authenticated user using the secret specified in the `.env` file and returned in the response header.

-----
