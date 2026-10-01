# Blog API with Pagination & Filtering

A RESTful API built with Node.js, Express, and MongoDB for managing blog posts,
with support for pagination, filtering, and sorting. This project was developed
as part of the Syntecxhub Backend Development Internship (Project 2), and is
linked to the User Authentication System built in Project 1 — posts are owned
by authenticated users.

## 🚀 Features

- **Post CRUD**: Create, read, update, and delete blog posts (title, body, author, tags).
- **Ownership-based access**: Only a post's original author can update or delete it.
- **Pagination**: `page`/`limit` query params, capped at 10 posts per page.
- **Filtering**: by tag (single or multiple), author, and date range.
- **Sorting**: newest or oldest first.
- **Centralized error handling**: consistent error responses across the API.
- **Modern ES Modules**: built using ESM (`import`/`export`) syntax.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Token (shared with the User Authentication System)
- **Environment Management**: Dotenv

## 📁 Folder Structure

```
Syntecxhub_Blog_API/
├── config/          # Database connection configuration
├── controllers/     # Post request handling (CRUD, pagination, filtering)
├── middleware/       # Auth middleware, centralized error handler
├── models/          # Mongoose schemas (Post, User reference)
├── routes/          # API route definitions
├── .env             # Private environment variables
├── .gitignore       # Git ignored files and folders
├── package.json     # Dependencies and npm scripts
└── server.js        # Application entry point
```

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```
   git clone https://github.com/samstar001/Syntecxhub_Blog_API
   cd Syntecxhub_Blog_API
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   > Note: `JWT_SECRET` must match the one used in the User Authentication System, since tokens issued there are used here.

4. **Run the application**
   ```
   # Production mode
   npm start

   # Development mode (requires nodemon)
   npm run dev
   ```

## 📑 API Endpoints

| Method | Endpoint          | Description                              | Access  |
| :----- | :---------------- | :---------------------------------------- | :------ |
| POST   | `/api/posts`       | Create a new post                        | Private |
| GET    | `/api/posts`       | List posts (pagination, filters, sort)   | Public  |
| GET    | `/api/posts/:id`   | Get a single post by ID                  | Public  |
| PATCH    | `/api/posts/:id`   | Update a post (author only)              | Private |
| DELETE | `/api/posts/:id`   | Delete a post (author only)              | Private |

### Query Parameters for `GET /api/posts`

| Param    | Type   | Default | Description                                   |
| :------- | :----- | :------ | :--------------------------------------------- |
| `page`   | number | 1       | Page number                                   |
| `limit`  | number | 10      | Items per page (capped at 10)                 |
| `tag`    | string | —       | Filter by one tag or several, comma-separated |
| `author` | string | —       | Filter by author's user ID                    |
| `from`   | date   | —       | Posts created on or after this date           |
| `to`     | date   | —       | Posts created on or before this date          |
| `sort`   | string | newest  | `newest` or `oldest`                          |

### Example Request (Protected Route)

To create, update, or delete a post, include the JWT from the User Authentication System:

```
Authorization: Bearer <your_jwt_token>
```

### Example List Request

```
GET /api/posts?tag=node,backend&sort=oldest&page=1&limit=5
```

## 🛡️ Security Implementations

1. **Ownership checks**: `author` is always set from the verified token (`req.user.id`), never from the request body. Updates and deletes are rejected with `403` unless the requester is the post's author.
2. **Input validation**: malformed or missing pagination/filter parameters fall back to safe defaults rather than erroring.
3. **ID validation**: requests with a malformed MongoDB ID return `400` before reaching the database; nonexistent but well-formed IDs return `404`.
4. **Centralized error handling**: all errors are normalized into a consistent response shape via a single error-handling middleware.

## 🧪 Testing

All endpoints were tested manually with Postman, covering:
- Successful create/read/update/delete flows
- Pagination and filter combinations
- Attempting to update/delete another user's post (expects `403`)
- Invalid and nonexistent post IDs (expects `400`/`404`)

## 👨‍💻 Author

- Michael Samuel Oche (Samstar)
  - GitHub: [samstar001](https://github.com/samstar001)

## 📝 License

This project is for educational purposes under the Syntecxhub Internship program.