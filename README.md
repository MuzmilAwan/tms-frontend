# MERN Task Manager (CRUD Management System)

A beginner-friendly yet production-structured **Task Management System** built using the **MERN stack**. This project was developed as part of an assignment with a strong focus on **clean architecture, security, SDLC practices, and real-world features**.


##  Features

### Authentication & Security

* User registration & login
* JWT-based authentication
* Password hashing with bcrypt
* Protected routes (user-specific data)
* Security middleware: Helmet & CORS

### Task Management (CRUD)

* Create, read, update, delete tasks
* Task status (todo, in-progress, done)
* Priority levels (low, medium, high)
* Tags support
* Proper HTTP status codes


###  Frontend UI

* Clean dashboard layout
* Responsive design
* Empty states & visual badges


## Tech Stack

### Frontend

* React (Vite)
* React Router
* Context API
* Custom API wrapper (Axios)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT
* bcrypt
* Helmet
* CORS


## API Overview

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | /api/auth/register | Register user                    |
| POST   | /api/auth/login    | Login user                       |
| GET    | /api/tasks         | Get tasks (filters + pagination) |
| POST   | /api/tasks         | Create task                      |
| PUT    | /api/tasks/:id     | Update task                      |
| DELETE | /api/tasks/:id     | Delete task                      |


## Testing

* Manual UI testing
* API testing using Postman
* Authentication & authorization validation
* Verified HTTP status codes (200, 201, 400, 401, 404)

## SDLC Mapping

This project follows the **complete Software Development Life Cycle**:

1. Requirement Analysis
2. System Design
3. Development
4. Testing
5. Deployment 

## Deployment 

* Backend + Frontend : Vercel
* Database: MongoDB Atlas

## Learning Outcomes

* Full MERN stack CRUD implementation
* Secure authentication & authorization
* REST API design
* Clean frontend UI
* SDLC-based development approach


## Author

**Malik Muzammil**

MERN Stack Developer 
