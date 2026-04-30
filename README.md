# 🔗 Short URL Generator

This project is a full-stack web application that converts long URLs into short, shareable links.

---

## 🚀 Project Overview

The Short URL Generator allows users to:
- Enter a long URL
- Generate a short URL with a random 6-character code
- Redirect to the original URL when the short link is accessed

---

## 🛠 Tech Stack

- Frontend: React.js (Create React App)
- Backend: PHP
- Database: MySQL
- Server: XAMPP (Apache)

---

## 📁 Project Structure

```
ShortURLGenerator/
│
├── frontend/        # React application
├── backend/         # PHP API
│   ├── db.php
│   ├── shorten.php
│   ├── redirect.php
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Start XAMPP

Open XAMPP Control Panel and start:
- Apache
- MySQL

---

### 2. Move Project Folder

Place the project inside:

```
C:\xampp\htdocs\
```

Final path:

```
C:\xampp\htdocs\ShortURLGenerator
```

---

### 3. Setup Database (phpMyAdmin)

Open your browser and go to:

```
http://localhost/phpmyadmin
```

Create a new database:

```
short_url
```

---

### 4. Run SQL Command

Go to the **SQL tab** and run:

```sql
CREATE TABLE urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 5. Configure Database Connection

Open file:

```
backend/db.php
```

Make sure it contains:

```php
$conn = new mysqli("localhost", "root", "", "short_url");
```

---

## ▶️ Running the Application

### Start Frontend (React)

Open terminal and run:

```bash
cd frontend
npm install
npm start
```

Then open:

```
http://localhost:3000
```

---

### Backend (PHP)

The backend runs automatically via XAMPP (Apache):

```
http://localhost/ShortURLGenerator/backend/shorten.php
```

---

## 🔗 How It Works

1. User inputs a long URL  
2. React sends request to PHP API  
3. PHP:
   - Validates URL  
   - Generates random short code  
   - Stores data in MySQL  
4. Returns a short URL  
5. When accessed, it redirects to the original URL  

---

## 🔍 Example

Input:
```
https://www.google.com/search?q=force-tech
```

Output:
```
https://short.me/JXie23
```

(Note: `short.me` is simulated for display purposes)

---

## 📦 Available Scripts (Frontend)

Inside the `frontend` folder:

- `npm start` → Runs development server  
- `npm run build` → Builds for production  
- `npm test` → Runs tests  

---

## ❗ Notes

- This project runs locally using XAMPP  
- Short URL domain is simulated (not deployed online)  

---

## 👨‍💻 Author

Chan Xin Kai  
Software Engineering Student

---
