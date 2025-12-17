#🐾 Petora: Pet Adoption Platform
Petora is a full-stack web application designed to connect pets in need of a home with potential adopters. It features a public-facing gallery, a detailed pet application process, and a secure administration dashboard for shelter staff to manage pet listings and review adoption applications.

#✨ Features
🏡 Public Homepage: Engaging layout featuring a pet gallery and a clear 3-step guide for adoption.

🐶 Pet Catalog: Browse available pets with filtering options (species, size, status).

✍️ Adoption Application: A public form for users to apply for a specific pet.

🔒 Admin Dashboard: Login for shelter staff and super-admins.

📋 Application Management: Admins can view, approve, or reject applications.

🖼️ Pet Management: Admins can securely add pet listings, including image uploads.

🎨 Custom Theming: Utilizes a consistent, custom Petora brand theme and color palette.

🛠️ Installation and Setup
Follow these steps to get the Petora application running locally on your machine.

Prerequisites
Node.js (v14+) and npm

MongoDB (local instance or cloud service like MongoDB Atlas)

1. Backend Setup (Server)
Navigate to your backend directory (e.g., cd backend).

#Install dependencies:
npm install express mongoose cors dotenv jsonwebtoken bcryptjs multer path fs axios

Create a .env file in the backend root directory and add your configurations:

Code snippet
MONGO_URI="mongodb://localhost:27017/Petora" # Replace with your actual MongoDB connection string
JWT_SECRET="YOUR_STRONG_JWT_SECRET" # Use a long, secure, random string

Run the server from backend directory:
npm run dev
The server should confirm: MongoDB connected. and Server is running on http://localhost:5000.

2. Frontend Setup (Client)
Navigate to your frontend directory (e.g., cd frontend).

#Install dependencies:
npm install react react-dom react-router-dom axios

#Start the client application:
npm start
The application will open in your browser, typically at http://localhost:3000.

Ensure the server is running (from Step 1).

🔑 Usage and Login
Public Site: Access the main site at http://localhost:3000.

Admin Login: Navigate to shelter and use the credentials
admin@gmail.com 
admin@12301

Post-Login: You will be redirected to the Admin Dashboard to manage pets and applications.