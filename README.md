# Node.js Backend Assignment - SWIFT Company

This is a backend project built using **Node.js**, **TypeScript**, and **MongoDB**. It was developed as part of an internship assignment for SWIFT Company. The application provides a set of RESTful APIs to manage users, their posts, and comments, all sourced from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

## 🚀 Features

- Node.js server built with TypeScript
- MongoDB integration using official `mongodb` driver
- Collections: `users`, `posts`, `comments`
- RESTful API endpoints
- Typed request and response bodies
- Fetches and stores dummy data from JSONPlaceholder

---

## 🛠️ Technologies Used

- Node.js
- TypeScript
- MongoDB
- ts-node (for running TypeScript directly)

---

## 📁 Project Setup (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/node_assignment.git
cd node_assignment
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Add TypeScript Configuration

If not already present, create a tsconfig.json file:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```
---

### 4. Ensure MongoDB is Running
- Make sure your MongoDB server is running locally on the default port (27017).

---

### 5. Run the Application

```bash
npx ts-node src/server.ts
```

- You can also install ts-node globally if needed:

```bash
npm install -g ts-node
```

---

## 📌 API Endpoints

### GET /load

- Loads 10 users from JSONPlaceholder along with their posts and comments.

- Stores them into MongoDB in respective collections (users, posts, comments).

- Response: 200 OK with empty body

- On error: 500 Internal Server Error

---

### DELETE /users

- Deletes all users from the database.

- Response: 204 No Content

---

### DELETE /users/:userId

- Deletes a specific user by their userId.

Response:

- 200 OK if the user is deleted

- 404 Not Found if user does not exist

---

### GET /users/:userId
- Fetches a user by userId along with their posts and comments on those posts.

- Response:

```bash
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "leanne@example.com",
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "body": "Post body",
      "comments": [
        {
          "id": 1,
          "name": "Commenter",
          "body": "Comment body"
        }
      ]
    }
  ]
}
```

---

### PUT /users
- Adds a new user to the database.

- Request Body Example:

```bash
{
  "id": 11,
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com"
}
```

Responses:

- 201 Created with Location header

- 409 Conflict if user already exists

- 400 Bad Request if body is invalid

---

## ⚙️ Allowed Dependencies
- As per the instructions, the only dependencies allowed are:

```bash
{
  "name": "node_assignment",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^5.0.2"
  },
  "dependencies": {
    "mongodb": "^5.1.0"
  }
}
```

## 🧠 Notes
- Data is sourced from JSONPlaceholder

- Follows REST API best practices:

- Returns appropriate status codes (200, 201, 204, 400, 404, 409)

- Uses typed request and response structures

- Includes Location header on resource creation

- Error handling for missing resources, invalid inputs, and duplicates is implemented


## 📚 References

- JSONPlaceholder

- MongoDB Node.js Driver Guide

- Smashing Magazine REST API Guide

- TypeScript in 5 Minutes

## 👨‍💻 Author
Sudarshana Rao
📧 Email: pandu.sudha2003@gmail.com
🔗 GitHub: https://github.com/swift-backend-assignment
