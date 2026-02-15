<div align="center">

  <h1>📝 Blog Pro Platform</h1>
  
  <p>
    A robust <b>Content Management System (CMS)</b> built with the <b>MERN Stack</b>. 
    Features comprehensive role-based access control, real-time interactivity, and enterprise-grade security.
  </p>

  <p>
    <img src="https://img.shields.io/badge/MERN-Stack-000000?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Redux-Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white" />
    <img src="https://img.shields.io/badge/Security-Hardened-green?style=for-the-badge&logo=security&logoColor=white" />
  </p>

  <br />

  <img src="https://placehold.co/800x400/1a1a1a/FFF?text=Project+Preview+(Add+Your+Image+Here)" alt="Project Preview" width="100%" style="border-radius: 10px;" />

</div>

<br />

## 🔥 Key Features

### 🛡️ Security & Performance (Backend Engineering)
* **Secure Authentication:** JWT implementation with HTTP-Only cookies and password complexity enforcement (Joi).
* **Protection Layers:** Integrated **Helmet** (Headers security), **XSS-Clean** (Sanitization), **HPP** (Parameter Pollution), and **Rate Limiting** to prevent brute-force attacks.
* **Image Optimization:** Cloud-based media management using **Cloudinary**.

### 👤 User Experience (Frontend)
* **Interactive Community:** Nested comments system, real-time likes, and rich-text post creation.
* **User Profiles:** Complete profile management with avatar uploads and a **Follow/Unfollow system**.
* **Dark/Light Mode:** Fully responsive UI with theme toggling.

### ⚡ Admin Capabilities
* **Centralized Dashboard:** Full control to manage Users, Posts, Categories, and Comments.
* **Analytics:** View platform statistics and user growth.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, React Router, Bootstrap, Axios, Toastify |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose) |
| **Security** | Helmet, CORS, XSS-Clean, Express-Mongo-Sanitize, BcryptJS |
| **Services** | Cloudinary (Storage), Nodemailer (Email Services) |

---

## 🚀 Getting Started Locally

Since this project is designed for enterprise usage, follow these steps to deploy it locally:

### 1. Clone & Install
```bash
# Clone the repo
git clone [https://github.com/Ali-Haggag7/blog-pro.git](https://github.com/Ali-Haggag7/blog-pro.git)
cd blog-pro

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

---

### 2. Environment Setup (.env)
```bash
# Create a .env file in the backend folder and add your credentials
PORT=8000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_super_secret_key
APP_EMAIL_ADDRESS=your_email@gmail.com
APP_EMAIL_PASSWORD=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_DOMAIN=http://localhost:3000
```

---

### 3. Run the System
```bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm start
```

---

## 📸 More Previews

| **Admin Dashboard** | **User Profile** |
| :---: | :---: |
| <img src="https://placehold.co/400x250/1a1a1a/FFF?text=Admin+Panel+Preview" width="100%" /> | <img src="https://placehold.co/400x250/1a1a1a/FFF?text=User+Profile+Preview" width="100%" /> |

<br />

| **Single Post & Comments** | **Login & Security** |
| :---: | :---: |
| <img src="https://placehold.co/400x250/1a1a1a/FFF?text=Post+Details+Preview" width="100%" /> | <img src="https://placehold.co/400x250/1a1a1a/FFF?text=Login+Screen+Preview" width="100%" /> |

---

<div align="center">
  <br />
  <p><b>🚀 Designed & Developed by Ali Haggag</b></p>
  
  <a href="https://www.linkedin.com/in/ali-haggag7/">
    <img src="https://img.shields.io/badge/Connect-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:ali.haggag2005@gmail.com">
    <img src="https://img.shields.io/badge/Contact-Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  <a href="https://github.com/Ali-Haggag7">
    <img src="https://img.shields.io/badge/Portfolio-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  
  <br />
  <br />
  <p><i>Building complex systems with clean code.</i></p>
</div>
