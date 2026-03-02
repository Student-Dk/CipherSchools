# Myproject

 This project is a browser-based SQL practice platform where users can attempt pre-defined SQL assignments and execute their queries in real time.

This project focuses on helping students practice SQL in a controlled sandbox environment with guided hints instead of full solutions.

---

## Project Purpose

The goal of this project is to:

- Allow users to practice SQL queries  
- Execute queries safely on a sandbox PostgreSQL database  
- Provide intelligent hints using LLM integration  
- Build a clean and responsive user interface using React and SCSS  

This is not a database creation tool. All assignments and sample data are pre-inserted into the database.

---

## Features

### Assignment Listing

- Displays all available SQL assignments  
- Shows difficulty and description  
- Allows user to attempt an assignment  

### Assignment Attempt Page

- Question panel  
- Sample table schema viewer  
- SQL editor (Monaco Editor)  
- Execute Query button  
- Results table  
- Get Hint button (LLM-powered)  

### Query Execution

- Executes only SELECT queries  
- Query validation and sanitization implemented  
- Returns formatted results or error messages  

### LLM Hint System

- Provides conceptual hints  
- Does not return full SQL solutions  
- Designed using prompt control to avoid answer leakage  

---

## Tech Stack

### Frontend

- React.js  
- Vanilla SCSS (mobile-first approach)  
- Monaco Editor  

### Backend

- Node.js  
- Express.js  

### Databases

- PostgreSQL (Sandbox execution database)  
- MongoDB (Assignments & persistence)  

### LLM Integration

- Gemini / OpenAI API (Hint generation only)  

---

## Folder Structure

```
SQLPracticeStudio/
│
├── frontend/
│   ├── styles/
|   |   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
|   |    
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   └── server.js
│
└── README.md
```

---

## SCSS Architecture

The styling follows a modular SCSS structure:

- abstracts → variables, mixins  
- base → reset and global styles  
- components → button, cards, editor styles  
- services → utility/helper styles  

Mobile-first responsive design is implemented for:

- 320px  
- 641px  
- 1024px  
- 1281px  

BEM naming convention is followed for clarity.

---

## How Query Execution Works

1. User writes SQL query in editor.  
2. Clicks "Execute Query".  
3. Frontend sends POST request to backend.  
4. Backend validates query (only SELECT allowed).  
5. Query runs on PostgreSQL sandbox database.  
6. Results returned as JSON.  
7. Frontend updates state.  
8. Results displayed in table.  

---

## Hint Flow

1. User clicks "Get Hint".  
2. Backend sends assignment context to LLM API.  
3. LLM returns a conceptual hint.  
4. Hint displayed in UI.  

---

## Installation

### Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
POSTGRES_URI=postgres_connection
MONGO_URI=mongodb_connection
LLM_API_KEY=gemini_api_key
```

Run backend:

```
npm run dev
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Security Considerations

- Only SELECT queries allowed  
- Input validation applied  
- No direct database exposure to frontend  
- Separate sandbox DB used for execution  

---

## What I Learned

- Frontend-backend integration  
- Secure query validation  
- Handling database execution safely  
- LLM prompt control  
- Mobile-first SCSS structuring  

---

## Author

**Dhiraj Kumar**  
Full Stack Developer  
React | Node.js | PostgreSQL | MongoDB  