Travel Buddy ✈️
Welcome to Travel Buddy! This web application helps users discover nearby places and plan trips based on their university's location. Whether you're looking for a cheap weekend getaway with friends or a moderate family outing, Travel Buddy has you covered.

✨ Features
User Authentication: Secure login system for users.

City-Based University Search: Browse universities by selecting a city.

Dynamic Trip Planner: Get personalized trip suggestions based on:

University Location

Trip Type (Friends, Family, Weekend, etc.)

Budget (Cheap, Moderate, Expensive)

Modern & Responsive UI: A clean, card-based interface that works beautifully on all devices.

🛠️ Tech Stack
This project is built with the following technologies:

Frontend: React, React Router, Axios

Backend: Node.js, Express.js

Database: MySQL

Styling: Custom CSS for a modern, responsive design

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (which includes npm)

A running MySQL server instance

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/travel-buddy.git](https://github.com/your-username/travel-buddy.git)
cd travel-buddy

Setup the Backend:

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file from the example
cp .env.example .env

Open the .env file and fill in your database credentials and other required values. See the Environment Variables section below for details.

Setup the Frontend:

# Navigate to the frontend folder from the root directory
cd frontend

# Install dependencies
npm install

Running the Application
You will need two separate terminals to run both the backend and frontend servers.

Start the Backend Server:

# In the /backend directory
npm run dev

The server should now be running on http://localhost:10000.

Start the Frontend Development Server:

# In the /frontend directory
npm start

The application will open automatically in your browser at http://localhost:3000.

⚙️ Environment Variables
The backend relies on an .env file for configuration. Make sure to replace the placeholder values with your actual credentials.

# Server Port
PORT=10000

# Database Connection
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_db_pass
DB_NAME=travel_buddy

# Security
JWT_SECRET=change_this_secret

# Optional: For email features
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

📂 Project Structure
The repository is organized into two main folders:

/backend          # Contains the Node.js/Express server
/frontend         # Contains the React client application
  /src
    /pages        # Main page components (Login, Planner, etc.)
    /api.js       # Axios instance for API calls
    /App.js       # Main app component with routing
    /styles.css   # Global stylesheet
README.md         # This file

Happy travels!
