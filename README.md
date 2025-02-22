# 📌 Next.js Full-Stack Application

## 🚀 Project Overview
This project is a **Full-Stack web application** built with **Next.js**, **TypeScript**, and a **MongoDB, Node.js, Express backend**. It features a **fully responsive UI**, an **admin panel**, **OTP-based authentication**, **RESTful API implementation**, **server-side rendering (SSR)**, and advanced functionalities like **pagination, sorting, filtering, and nested routes**.

---

## 🛠 Tech Stack

### **Frontend (Next.js & React)**
- **Next.js** → Server-side rendering (SSR), routing, API routes
- **TypeScript** → Type safety, improved maintainability
- **Tailwind CSS** → Utility-first styling, responsive design
- **React Query** → State management, API data fetching and caching
- **Axios** → HTTP requests to backend
- **Middleware Handler** → Custom middleware for authentication, logging, and request validation

### **Authentication & Authorization**
- **OTP-based login & signup** → Secure authentication using One-Time Passwords
- **JWT-based authorization** → Role-based access for users and admins
- **Middleware for protected routes** → Ensures only authorized users can access restricted content

### **Advanced UI Features**
- **Nested Routes** → Clean and modular routing
- **Pagination** → Optimized data loading with page navigation
- **Sorting & Filtering** → Efficient data manipulation for a better user experience
- **Fully Responsive Design** → Works seamlessly on all devices

### **Admin Panel**
- **Dashboard for site owners** → Manage users, content, and site settings
- **Admin Role Authorization** → Only admins can access and modify specific data

### **Backend (Node.js, Express & MongoDB)**
- **Node.js & Express.js** → REST API implementation, request handling
- **MongoDB** → NoSQL database for scalable data storage
- **Mongoose** → ODM for MongoDB schema and model management
- **REST API Implementation** → Full CRUD operations with authentication

---

## 🛠 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Nima-Moradi1/NimaKala.git
cd NimaKala
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and configure your environment variables:
```sh
>>Frontend :
NEXT_PUBLIC_API_URL=http://localhost:5000
>>Backend : 
APP_DB=####
KAVENEGAR_API_KEY=####
ACCESS_TOKEN_SECRET_KEY=####
REFRESH_TOKEN_SECRET_KEY=####
COOKIE_PARSER_SECRET_KEY=####
TOKEN_SECRET_KEY=####
ZARINPAL_CALLBACK_URL=/api/payment/verify
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5002
NODE_ENV=development
PORT=5002
ALLOW_CORS_ORIGIN=http://localhost:3000
DOMAIN=localhost
```

### **4️⃣ Run the Development Server**
Frontend (Next.js):
```sh
npm run dev
```

Backend (Express.js):
```sh
cd backend
npm start
```

### **5️⃣ Build for Production**
```sh
npm run build && npm start
```

---

## 🔥 Features
✅ Full **Next.js** & **TypeScript** support  
✅ **Fully responsive** design with TailwindCSS  
✅ **React Query** for data fetching & caching  
✅ **JWT-based authentication & OTP login**  
✅ **Nested routes**, **pagination**, **sorting & filtering**  
✅ **Admin panel** for site owners  
✅ **RESTful API** with Express & MongoDB  
✅ **Middleware handlers** for security & access control  
✅ **Server-Side Rendering (SSR)** for better performance  
✅ **Full authorization & role-based access**  
✅ **Full CRUD operations** on the backend  

---

## 📜 API Endpoints (Examples)
 🚀Provided in a JSON file for you in the repository🚀

---

## 🤝 Contribution Guidelines
Feel free to contribute! 🚀
1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes (`git commit -m 'Added new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Create a pull request

---

## 📬 Contact
For any questions or collaborations, reach out at:
📧 **your.mnima8100@gmail.com**  
GitHub: [Nima-Moradi1](https://github.com/Nima-Moradi1)

---
### 🎉 Happy Coding! 🚀

