# Food App

**Admin Authorization and Authentication System**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

🔒 This project implements a robust authentication and authorization system for a Node.js backend application. It includes middleware to validate user tokens, check user roles, and handle permissions for secure routes. This setup is ideal for projects that require role-based access control, such as admin dashboards or secure API backends.

---

## Features

✨ **User Authentication**: Secure user login with JWT.

- **Role-Based Authorization**: Distinguish between admin and client roles.
- 🛡️ **Token Validation**: Middleware to validate and decode JWT tokens.
- 🚨 **Error Handling**: Detailed error messages for unauthorized access.
- ⚙️ **Scalable Structure**: Modular design for easy scalability.

---

## Technologies Used

💻 **Node.js**: Backend runtime environment.

- 🌐 **Express.js**: Web framework for handling HTTP requests.
- 🔐 **JSON Web Token (JWT)**: For secure user authentication.
- 🗄️ **MongoDB**: NoSQL database for storing user data.
- 📜 **Mongoose**: ODM library for MongoDB.

---

## Setup and Installation

📦 Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/wahid3150/food-app.git
   cd <repository-folder>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongo_connection_string
   ```

4. **Start the Server**:

   ```bash
   npm start
   ```

   🚀 The server will run at `http://localhost:8080`.

---

## Usage

✅ Authenticate users by sending a POST request with credentials to the login endpoint.

- 🔒 Protect secure routes using the provided middleware.
- 🔑 Assign roles (`admin`, `client`, etc.) to users to manage access control.

---

## API Endpoints

### Authentication

- **POST** `api/v1/auth/login`: Authenticate user and return a JWT token.
- **POST** `api/v1/auth/register`: Register a new user.

### Admin Routes

- **POST** `/api/admin/create-admin`: Create a new admin user (restricted to admin roles).

### Middleware

- **authMiddleware**: Validates JWT tokens.
- **adminMiddleware**: Restricts access to admin-only routes.

---

## Contributing

🤝 Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Submit a pull request.

---

## Acknowledgments

🙏 - Thanks to the developers of the libraries used in this project.
💼 Connect with me on [LinkedIn](https://www.linkedin.com/in/wahidanon/)!
