# Backend

A simple Express + MongoDB backend scaffold for the frontend app.

## Available routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/books`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

## Setup

1. Copy `.env.example` to `.env`
2. Add your MongoDB connection string to `MONGO_URL`
3. Add a secure `JWT_SECRET`

## Install

```bash
cd backend
npm install
```

## Run

```bash
npm run dev
```

The backend will start on `http://localhost:8800` by default.
