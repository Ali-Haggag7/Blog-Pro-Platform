# Blog App

A full-featured blog application built with the MERN stack that allows users to register, create posts, comment, and interact with each other.

## Features

- User registration with email verification  
- Create, edit, and delete posts with categories and image uploads  
- Commenting and nested replies  
- Likes on posts and comments  
- User profiles with followers system  
- Admin dashboard to manage users, posts, categories, and comments  
- Dark & light mode toggle  
- Password reset via email

## Tech Stack

*Frontend:*  
React.js, React Router DOM, Redux Toolkit, Axios, React Toastify, SweetAlert, Bootstrap, React Bootstrap, Moment.js, React Moment, React Loader Spinner

*Backend:*  
Node.js, Express.js, MongoDB, Mongoose, Joi, Joi Password Complexity, BcryptJS, JSON Web Token (JWT), Multer, Cloudinary, Nodemailer

*Security & Optimization:*  
Helmet, CORS, Express Rate Limit, Express Mongo Sanitize, XSS-Clean, HPP, dotenv

*Other Tools:*  
Cloudinary for image storage  
Nodemailer for email verification & password reset

## Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Ali-Haggag7/blog-pro.git
cd blog-pro

2. Install dependencies

For the backend:

cd backend
npm install

For the frontend:

cd ../frontend
npm install

3. Add environment variables

You’ll need to create one .env file:

In backend/.env, include:

PORT=8000
MONGO_URI=your_mongo_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret  
APP_EMAIL_ADDRESS=your_email_address  
APP_EMAIL_PASSWORD=your_email_password_or_app_password  
CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret  
CLIENT_DOMAIN=http://localhost:3000

> Make sure to replace placeholders with your actual config values.



4. Run the project

Start the backend:

cd backend
npm start

Start the frontend:

cd ../frontend
npm start

The app will be running at http://localhost:3000

License

This project is for educational and portfolio purposes only.
