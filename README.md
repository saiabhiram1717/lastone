# MadFood Full Stack - Clean Structure

## Project structure

- `frontend/` — all HTML pages and frontend integration JavaScript
- `backend/` — Node.js + Express + MongoDB API

## Setup

1. Install Node.js.
2. Open a terminal in `backend/`.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Put your MongoDB Atlas URI and JWT secret in `.env`.
6. Run `npm run dev`.
7. Open **http://localhost:5000/**.

Do not open the HTML files with `file://` or Live Server. The Express backend serves the frontend so both are connected through the same server.

## API health

Open: `http://localhost:5000/api/health`

## Main flow

Browser → frontend HTML/JS → Express API → MongoDB Atlas
