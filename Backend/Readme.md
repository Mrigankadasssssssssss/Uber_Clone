# Backend API Documentation

## /users/register Endpoint Documentation

### Description

The `/users/register` endpoint registers a **new user**. It accepts user details, hashes the password, and saves the user to the database. Upon successful registration, it returns the created user's information along with a **JSON Web Token (JWT)** for authentication.

-----

### HTTP Method

`POST`

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

### Error Responses

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

## /users/login Endpoint Documentation

### Overview

The `/users/login` endpoint authenticates an existing user. It verifies the provided email and password, and if valid, returns the user's information along with a **JSON Web Token (JWT)** for authentication.

-----

### HTTP Method(LOGIN)

`POST`

-----

### URL Endpoint

`/users/login`

-----

### Request Body(LOGIN)

The endpoint expects a **JSON object** with the following structure:

```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

-----

### Successful Response(LOGIN)

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

### Error Responses(LOGIN)

#### Validation Error(LOGIN)

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

#### Internal Server Error(LOGIN)

* **Status Code:** `500 Internal Server Error`

* **Response Body:** (Typically an empty body or a generic error object indicating server failure.)

-----

### Notes(LOGIN)

* The endpoint uses **express-validator** to validate the request body.
* Passwords are compared using **bcrypt**. See `user.model.js` for password comparison implementation.
* A **JWT** is generated for the authenticated user using the secret specified in the `.env` file and returned in the response header.

-----

## /users/profile Endpoint Documentation

### Description(PROFILE)

The `/users/profile` endpoint retrieves the profile of the currently **authenticated user**. The user must provide a valid JWT token to access this endpoint.

-----

### HTTP Method(PROFILE)

`GET`

-----

### URL(PROFILE)

`/users/profile`

-----

### Headers

The request must include the following header for authentication:

```text
Authorization: Bearer <token>
```

-----

### Successful Response(PROFILE)

* **Status Code:** `200 OK`

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
      }
    }
    ```

-----

### Error Responses(PROFILE)

#### Unauthorized Error

* **Status Code:** `401 Unauthorized`

* **Response Body:**

    ```json
    {
      "errors": [
        {
          "msg": "Unauthorized User"
        }
      ]
    }
    ```

#### Internal Server Error(PROFILE)

* **Status Code:** `500 Internal Server Error`

* **Response Body:** (Typically an empty body or a generic error object indicating server failure.)

-----

### Notes(PROFILE)

* The endpoint uses **JWT authentication** to verify the user's identity.
* The token must be valid and not blacklisted.

-----

## /users/logout Endpoint Documentation

### Description(LOGOUT)

The `/users/logout` endpoint logs out the currently authenticated user by **blacklisting their JWT token**. The user must provide a valid JWT token to access this endpoint.

-----

### HTTP Method(LOGOUT)

`GET`

-----

### URL(LOGOUT)

`/users/logout`

-----

### Headers(LOGOUT)

The request must include the following header for authentication:

```text
Authorization: Bearer <token>
```

-----

### Successful Response(LOGOUT)

* **Status Code:** `200 OK`

* **Response Body:**

    ```json
    {
      "message": "Logged out successfully"
    }
    ```

-----

### Error Responses(LOGOUT)

#### Unauthorized Error(LOGOUT)

* **Status Code:** `401 Unauthorized`

* **Response Body:**

    ```json
    {
      "errors": [
        {
          "msg": "Unauthorized User"
        }
      ]
    }
    ```

#### Internal Server Error(LOGOUT)

* **Status Code:** `500 Internal Server Error`

* **Response Body:** (Typically an empty body or a generic error object indicating server failure.)

-----

### Notes(LOGOUT)

* The endpoint **blacklists** the user's JWT token, preventing its further use.
* The token is stored in the blacklist database and typically expires after a set duration (e.g., 24 hours).

-----

## /drivers/register Endpoint Documentation

### Description(REGISTER/DRIVERS)

The `/drivers/register` endpoint registers a **new driver**. It accepts driver details including personal information and vehicle details, hashes the password, and saves the driver to the database. Upon successful registration, it returns the created driver's information along with a **JSON Web Token (JWT)** for authentication.

-----

### HTTP Method(REGISTER/DRIVERS)

`POST`

-----

### URL(REGISTER/DRIVERS)

`/drivers/register`

-----

### Request Body(REGISTER/DRIVERS)

The endpoint expects a **JSON object** with the following structure:

```json
{
  "fullName": {
    "firstName": "string (required, minimum 2 characters)",
    "lastName": "string (required, minimum 2 characters)"
  },
  "email": "string (required, valid email)",
  "password": "string (required, minimum 6 characters)",
  "vehicle": {
    "color": "string (required)",
    "numberPlate": "string (required, minimum 5 characters)",
    "capacity": "number (required, minimum 2)",
    "vehicleType": "string (required, must be 'car', 'bike', or 'auto')"
  }
}
```

-----

### Successful (REGISTER/DRIVERS)

* **Status Code:** `201 Created`

* **Response Body:**

    ```json
    {
      "driver": {
        "_id": "string",
        "fullName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string",
        "vehicle": {
          "color": "string",
          "numberPlate": "string",
          "capacity": "number",
          "vehicleType": "string"
        },
        "createdAt": "Date"
        // other driver properties except password
      },
      "token": "string"
    }
    ```

-----

### Error (REGISTER/DRIVERS)

#### Validation Error(REGISTER/DRIVERS)

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

#### Duplicate Email Error

* **Status Code:** `400 Bad Request`

* **Response Body:**

    ```json
    {
      "error": "Driver with this email already exists"
    }
    ```

#### Internal Server Error(REGISTER/DRIVERS)

* **Status Code:** `500 Internal Server Error`

* **Response Body:** (Typically an empty body or a generic error object indicating server failure.)

-----

### Notes(REGISTER/DRIVERS)

* The endpoint uses **express-validator** to perform server-side validations.
* Passwords are hashed using the same mechanism as user registration.
* Vehicle type must be one of: 'car', 'bike', or 'auto'.
* A **JWT** is generated for the new driver using the secret specified in the `.env` file.
