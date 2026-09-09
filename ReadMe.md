# TO-DO List App

# BACKEND
## Social Media API

## Tools used

- Node.js : Runtime environment to run js in backend.
- Express.js : provides a robust set of features for API developent.
- mongoose : MongoDB database driver.
- @hapi/joi : library used for data validation and schema description.
- bcryptjs : libarary used to hash password.
- body-parser : used to parse request body.
- cors : enforce the Same-Origin Policy.
- jsonwebtoken : used for request verification and authorization
- nodemon : command-line tool that automatically restarts a Node.js application after change is detected.

---

## Request Routes

- Get: User user with id
- Post: Create user with email and password
- Post: Login user with email and password
- Delete: Delete user from DB
- Patch: Update the user information

### Example

API link: `https://xw9f6w-3000.csb.app//api/user/login`

    - header: content-type must be application/json
    - body:
    {
    "email":"abc123@gmail.com",
    "password":"123123"
    }

    - response will be the auth-token
    - use the auth-token in the header to request private routes
    - get request link that requires auth-token: `https://xw9f6w-3000.csb.app//api/posts/`
    will return the userid and created timestamp. If no auth-token is provided the server will return 403 code.

---


# Frontend
## Node.js, MySql, React.js, TailwindCSS



# Steps to run the application

- Start the backend app by navigation to Backend folder
    - Run command `npm start`
    - Backend server will start on `http://localhost:3030/`
- Start the frontend app by navigation to Frontend folder
    - Run command `npm start`
    - Frontend server will start on `http://localhost:3000/`
