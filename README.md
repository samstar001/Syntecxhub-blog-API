# User Authentication System

A secure RESTful API built with Node.js, Express, and MongoDB for managing user
registration, authentication, and session management. This project was developed
as part of the Syntecxhub Backend Development Internship (Week 2, Task 1).

```
🚀 Features

  - User Registration: Securely create accounts with unique usernames and
    emails.
  - Password Hashing: Implemented bcryptjs to hash passwords before storing them
    in the database.
  - JWT Authentication: Issued JSON Web Tokens (JWT) upon successful login for
    secure stateless authentication.
  - Protected Routes: Custom middleware to restrict access to specific endpoints
    only for authorized users.
  - Modern ES Modules: Built using ESM (import/export) syntax for better
    maintainability.
```

```
🛠️ Tech Stack

  - Runtime: Node.js
  - Framework: Express.js
  - Database: MongoDB (Mongoose ODM)
  - Security: Bcrypt.js & JSON Web Token
  - Environment Management: Dotenv
```

📁 Folder Structure

```
Syntecxhub_User_Authentication/
├── config/          # Database connection configuration
├── controllers/     # Signup and login request handling
├── middleware/      # JWT authentication/verification middleware
├── models/          # Mongoose schemas, including the User model
├── routes/          # API route definitions
├── .env             # Private environment variables
├── .gitignore       # Git ignored files and folders
├── package.json     # Dependencies and npm scripts
└── server.js        # Application entry point
```

```
⚙️ Setup & Installation

1. Clone the repository

git clone https://github.com/samstar001/Syntecxhub_User_Authentication
cd Syntecxhub_User_Authentication

2. Install dependencies

npm install

3. Environment Variables

Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

4. Run the application

# Production mode
- npm start

# Development mode (requires nodemon)
npm run dev
```

📑 API Endpoints

```
| Method   | Endpoint           | Description                   | Access  |
| :------- | :----------------- | :---------------------------- | :------ |
| POST     | `/api/auth/signup` | Register a new user           | Public  |
| POST     | `/api/auth/login`  | Authenticate user & get token | Public  |
| GET      | `/api/auth/me`     | Access protected user profile | Private |

Example Request (Protected Route)

To access protected routes, include the JWT in the headers:

Authorization: Bearer <your_jwt_token>
```

```
🛡️ Security Implementations
```

1.  Hashing: Passwords are never stored in plain text. I use a salt factor of 10 to hash passwords securely.
2.  Error Handling: Generic error messages are used during login (e.g., "Invalid Credentials") to prevent user enumeration attacks.
3.  Validation: Checks for existing users before registration to ensure data integrity.

```
👨‍💻 Author
- Michael Samuel Oche

  - LinkedIn: www.linkedin.com/in/samuel-michael-0a2a47383

📝 License

This project is for educational purposes under the Syntecxhub Internship
program.


```
