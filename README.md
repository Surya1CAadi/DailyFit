# 🏋️ DailyFit

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📋 Overview

**DailyFit** ([github.com/Surya1CAadi/DailyFit](https://github.com/Surya1CAadi/DailyFit)) is a **MERN stack-based fitness web platform** built using React, Node.js, Express, MongoDB, and Tailwind CSS.

It enables users to easily connect with gyms nearby and access short-term fitness services through day passes — eliminating the hassle of long-term memberships.

### 🧩 Key Highlights

* Users can **sign up, log in, find nearby gyms**, and **purchase 1-day passes** instantly.
* Supports **booking management** with date and time slot selection based on gym availability.
* Gym owners get a **dedicated dashboard** to check subscribers, manage gym details, update pricing, and track performance.
* Designed to **facilitate flexible fitness access** by connecting short-term users with gyms.

---

## 🚀 Tech Stack

**Frontend:** React, Tailwind CSS, Vite
**Backend:** Node.js, Express.js, MongoDB
**Utilities:** Nodemailer, JWT Authentication, REST APIs

---

## 📁 Full Folder & File Structure

```
DailyFit-main/
├── .gitignore
│
├── Backend/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   ├── controllers/
│   │   ├── authControllerOwner.js
│   │   ├── authControllerUser.js
│   │   ├── errorController.js
│   │   ├── gymControllers.js
│   │   ├── otherController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   │
│   ├── emailHtml/
│   │   └── variousHtml.js
│   │
│   ├── model/
│   │   ├── BillModel.js
│   │   ├── BookingModel.js
│   │   ├── GymModel.js
│   │   ├── OwnerModel.js
│   │   ├── SlotModel.js
│   │   ├── UserModel.js
│   │   └── WeeklyBookings.js
│   │
│   ├── routes/
│   │   ├── gymRouters.js
│   │   ├── ownerRouters.js
│   │   └── userRouters.js
│   │
│   ├── util/
│   │   ├── APIFeatures.js
│   │   ├── appError.js
│   │   ├── catchAsync.js
│   │   ├── dateFunctions.js
│   │   ├── email.js
│   │   └── usefulFunctions.js
│
├── Frontend/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   │
│   ├── public/
│   │   └── vite.svg
│   │
│   │── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── assets/ (if any images/icons)
│   │   ├── components/ (React UI components)
│   │   ├── pages/ (page-level React views)
│   │   └── hooks/ (custom React hooks, if any)
│   │   └── helpfulFunctions/ 
│   
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Surya1CAadi/DailyFit.git
cd DailyFit-main
```

### 2. Backend Setup

```bash
cd Backend
npm install
npm start  # or nodemon server.js
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file inside the `Backend` folder with:

```
PORT=8000
USER_NAME=ABCD

DATABASE=**********
DATABASE_PASSWORD=********

NODE_ENV=development

JWT_SECRET=******

EMAIL_USERNAME_CONTACTUS= *********
EMAIL_PASSWORD_CONTACTUS="********"
EMAIL_HOST_CONTACTUS=smtp.gmail.com
EMAIL_PORT_CONTACTUS=465

EMAIL_USERNAME=**********
EMAIL_PASSWORD="********"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

JWT_EXPIRES_IN=90d

RAZ_KEY= ***
RAZ_SECRET=***

```

---

## 💡 Core Features

✅ User & Owner authentication (JWT-based)
✅ Find nearby gyms & purchase instant passes
✅ Gym slot booking & management system
✅ Email notifications for confirmations
✅ Owner dashboard for gym data & pricing
✅ Mobile-responsive design with Tailwind CSS

---

## 🧑‍💻 Author

**Aditya Maurya**
📧 [Email](mailto:adityamaurya1319@gmail.com)
🌐 [GitHub](https://github.com/Surya1CAadi)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

> 💪 *DailyFit — Connecting short-term gym users with fitness centers effortlessly.*
