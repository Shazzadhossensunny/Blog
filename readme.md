# Blog Project

## Live URL

This application is hosted at: [Live URL](#)

## Description

The Blog Management Application is a RESTful API service that allows users to manage blogs effectively. Users can create, update, delete, and retrieve blogs. It also supports authentication and role-based access control to ensure secure operations, and error handling.

---

## Features

- User Authentication (Login/Register) system using JWT.
- Role-based Access Control.
- Create, Read, Update, and Delete (CRUD) operations for blogs.
- Search and filter blogs by title, content, and author.
- Input validation using Zod schema.
- Global error handling for consistent responses.
- Secure password hashing using bcrypt.

---

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Error Handling**: Custom error handlers and middleware

---

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/blog-management-system.git
   cd blog-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/blog
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   NODE_ENV=development
   ```

4. Start the application:

   ```bash
   npm run start:dev
   ```

### API Endpoints

#### Authentication

- **POST** `/api/auth/register`: Register user.
- **POST** `/api/auth/login`: Login user.

#### Blogs

- **POST** `/api/blogs`: Create a new blog (requires authentication).
- **GET** `/api/blogs`: Retrieve all blogs.
- **PATCH** `/api/blogs/:id`: Update a blog (requires authentication).
- **DELETE** `/api/blogs/:id`: Delete a blog (requires admin privileges).

#### Admin

- **PATCH** `/api/admin/users/:userId/block`: Block a user (Authorization: Bearer <admin_token>).
- **DELETE** `/api/admin/blogs/:id`: Delete a blog (Authorization: Bearer <admin_token>).
