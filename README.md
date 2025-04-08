# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Star Wars Universe Application

A full-stack web application for exploring and managing Star Wars characters, built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Browse Star Wars characters with filtering and search
- Create, read, update, and delete character entries
- Responsive design with a Star Wars-themed UI
- Pagination for character listings
- Detailed character profiles

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Axios
- Context API for state management

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd StarWarsApp
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/starwars
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user info

### Characters
- GET `/api/characters` - Get all characters (with pagination)
- GET `/api/characters/:id` - Get character by ID
- POST `/api/characters` - Create new character
- PUT `/api/characters/:id` - Update character
- DELETE `/api/characters/:id` - Delete character

## Project Structure

```
StarWarsApp/
├── src/
│   ├── components/
│   │   └── NavBar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Characters.jsx
│   │   │   ├── CharacterDetail.jsx
│   │   │   ├── CreateCharacter.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   ├── backend/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Character.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── characters.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   └── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Star Wars API for character data
- Material-UI for the component library
- The Star Wars franchise for inspiration
