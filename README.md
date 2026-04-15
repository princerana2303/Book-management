
# 📚 Book Management System — MERN Stack

A modern **full-stack MERN learning project** demonstrating how to build a **real-world SaaS-style application** with authentication, CRUD operations, search, pagination, and a responsive dashboard.

This frontend is built using **React + Vite** and communicates with a **secure JWT-based Node.js backend API**.

The project simulates a **production-style SaaS dashboard application**.

---

# 🚀 Tech Stack

## Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Context API
- Custom CSS

## Backend (Separate Repository)
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

# 🎯 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Automatic logout on token expiration

---

## 📚 Book Management
- Create Book
- Edit Book
- Delete Book
- View Books List

---

## 🔎 Search
- Search by **title**
- Search by **author**
- Live filtering

---

## 📄 Pagination
- Backend-driven pagination
- Page navigation
- Dynamic page buttons

---

## 🎯 UX Improvements
- Loading spinner
- Login progress bar
- Success notifications
- Error handling
- Disabled buttons during loading

---

## 🧭 Interactive Product Tour

First-time users see a guided tour explaining:

1. Add Book  
2. Edit Book  
3. Delete Book  
4. Search Books  
5. Pagination  

The tour runs **only once using localStorage**.

---

## 📱 Responsive UI

Fully responsive design supporting:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors
- Large screens / projectors

---

## 🧑‍💻 Dashboard Layout

A **SaaS-style dashboard UI** including:

- Sidebar navigation
- Top navbar
- Main content panel

---

# 📂 Project Structure

```
client/
│
├── src/
│   ├── api/
│   │   └── axios.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Books.jsx
│   │
│   ├── styles/
│   │   ├── books.css
│   │   ├── auth.css
│   │   ├── navbar.css
│   │   └── dashboard.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧠 Architecture Overview

## Pages

### Home.jsx
Landing page explaining:
- Project overview
- Features
- Technology stack

### Login.jsx
Handles:
- User authentication
- JWT token storage
- Redirect to dashboard
- Login progress indicator

### Register.jsx
Handles:
- User registration
- Form validation
- Redirect to login page

### Books.jsx
Core application page implementing:
- CRUD operations
- Search
- Pagination
- Onboarding tour
- Responsive layout

---

# 🔐 Authentication Flow

```
User logs in
      ↓
Backend returns JWT
      ↓
Token stored in localStorage
      ↓
Axios interceptor attaches token
      ↓
Protected routes allow access
      ↓
Expired token → auto logout
```

---

# 🌐 Environment Variables

Create `.env` in the project root:

```
VITE_API_BASE_URL=http://localhost:8800/api
```

⚠️ Never commit `.env` to GitHub.

---

# ▶️ Run the Project

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

Expected output:

```
VITE ready
Local: http://localhost:5173
```

---

# 🌍 Live Deployment

Frontend  
 http://localhost:5174/

Backend  
[book-management-jrnp.vercel.app](https://book-management-jrnp.vercel.app/api/auth)

---

# 👨‍💻 Author

** Prince Rana **  
Full Stack Web Developer  

Tech Interests:
- React
- Node.js
- MongoDB
- AI
- Cloud

---

# ⭐ Project Goal

This project helps developers learn **real-world MERN development** by building a **complete full-stack application**, rather than following small isolated tutorials.

It demonstrates:

- Authentication systems
- Dashboard UI architecture
- API integration
- State management
- Production-ready project structure
