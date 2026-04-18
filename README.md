# ESA Newsletter Database Setup

This project sets up a newsletter subscription system with MySQL database integration using XAMPP.

## Prerequisites

1. **XAMPP**: Make sure XAMPP is installed on your system
2. **Node.js**: Ensure Node.js is installed
3. **MySQL**: XAMPP includes MySQL/MariaDB

## Setup Instructions

### 1. Start XAMPP
- Open XAMPP Control Panel
- Start the **Apache** and **MySQL** modules
- Make sure MySQL is running on port 3306 (default)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
# or
node server.js
```

The server will:
- Connect to MySQL database
- Create database named `dbESAvcode` if it doesn't exist
- Create `newsletters` table with columns: id, email, subscribe_date
- Start listening on port 3000

### 4. Test the Newsletter
- Open `index.html` in your browser
- Fill in the newsletter form with an email
- Submit the form
- The email will be stored in the `dbESAvcode` database

## Database Structure

Database: `dbESAvcode`
Table: `newsletters`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `email` (VARCHAR(255), NOT NULL, UNIQUE)
- `subscribe_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## Troubleshooting

- **Port 3000 in use**: If you get "EADDRINUSE" error, either:
  - Kill the process using port 3000: `npx kill-port 3000`
  - Or change the port in server.js: `const PORT = 3001;`

- **MySQL connection error**: Make sure XAMPP MySQL is running and accessible

- **Database creation fails**: Check MySQL user permissions (default XAMPP user is 'root' with no password)