# Recipe Management System

A full-stack recipe management application built with **Node.js + Express + MongoDB + Cloudinary + TheMealDB API**.

---

## Features

✅ User authentication (Register/Login with JWT)  
✅ Create, Read, Update, Delete recipes  
✅ Upload recipe images to Cloudinary  
✅ Search recipes by title  
✅ Fetch recipes from TheMealDB API  
✅ Protected routes with authentication middleware  
✅ MongoDB database for data persistence  

---

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer + Cloudinary
- **External API**: TheMealDB API
- **Testing**: Postman

## Project Structure

```
recipe-backend/
│
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary configuration
│
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── upload.js          # File upload handler
│
├── models/
│   ├── User.js            # User schema
│   └── Recipe.js          # Recipe schema
│
├── routes/
│   ├── authroutes.js      # Auth endpoints
│   ├── reciperoutes.js    # Recipe endpoints
│   └── externalroutes.js  # TheMealDB endpoints
│
├── .env                   # Environment variables
├── .gitignore             # Git ignore
├── package.json           # Dependencies
└── server.js              # Main server file


## Environment Setup

### MongoDB Atlas
1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a cluster
3. Get connection string
4. Add to `.env` as `MONGO_URI`

### Cloudinary 
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, API Secret
4. Add to `.env`

### TheMealDB API
- No authentication needed
- Base URL: `https://www.themealdb.com/api/json/v1/1`

---
