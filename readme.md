# URL Shortener

A modern URL shortener built with React (frontend) and Node.js/Express (backend).

## Features
- **Shorten URLs** : Convert long URLs into compact links.
- **View Statistics** : Track the number of clicks for each shortened URL.
- **Update URLs** : Modify the original URL associated with a shortened link.
- **Delete URLs** : Remove unwanted shortened URLs from the system.


## Technologies Used
- **Frontend** : React, Tailwind CSS (custom CSS classes for styling).
- **Backend** : Node.js, Express.js.
- **Database** : MongoDB.
- **Other Tools** : nanoid for generating unique short codes.

## Project Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/MQ-06/mariam-innovaxel-qadeem.git
```

### Step 2: Install Dependencies
#### Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### Frontend
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

### Step 4: Start the Application
#### Backend
Run the backend server:
```bash
cd backend
node index.js
```
The backend will start on [http://localhost:5000](http://localhost:5000).

#### Frontend
Run the React development server:
```bash
cd ../frontend/url-shortener-frontend
npm run dev
```
The frontend will start on [http://localhost:3000](http://localhost:3000).

### Step 5: Access the Application
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to use the URL Shortener.

## API Endpoints
- **POST** `/api/shorten` : Create a new shortened URL.
- **GET** `/api/shorten/:shortCode` : Redirect to the original URL.
- **PUT** `/api/shorten/:shortCode` : Update the original URL.
- **DELETE** `/api/shorten/:shortCode` : Delete a shortened URL.
- **GET** `/api/stats/:shortCode` : View statistics for a shortened URL.

## Notes
I tried to match the innovaxel color theme for the frontend and you can test the required functionality through frontend.

