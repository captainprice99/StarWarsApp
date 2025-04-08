# 🌌 Star Wars Universe App 🚀

A dynamic and immersive Star Wars application that brings the galaxy far, far away to your browser! Experience character battles, explore the Star Wars universe, and create your own characters in this feature-rich application.

## ✨ Features

### 🎮 Battle System
- Real-time character battles with spectator mode
- Dynamic battle outcomes based on character attributes
- Live spectator count and battle status updates
- Interactive battle interface with character cards

### 👥 User Experience
- Secure authentication with Firebase
- Personalized user profiles
- Protected routes for authenticated users
- Persistent user sessions

### 🌟 Character Exploration
- Browse official Star Wars characters from SWAPI
- Detailed character profiles with images
- Search and filter functionality
- Create and customize your own characters

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js with Vite for blazing fast development
- 🎨 Material-UI for beautiful, responsive design
- 🔄 React Router for seamless navigation
- 🎭 Framer Motion for smooth animations
- 🎮 Socket.io for real-time features
- 🎯 Zustand for state management
- 🧪 Jest & React Testing Library for testing

### Backend & Services
- 🔥 Firebase Authentication & Firestore
- 🌐 Express.js server
- 🔌 Socket.io for real-time communication
- 📡 Star Wars API (SWAPI) integration
- 🔄 Axios for API requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/star-wars-app.git
   cd star-wars-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Add your Firebase configuration to `src/firebase.js`

4. Start the development servers:
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run server
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── CharacterBattle.jsx  # Battle arena component
│   └── Navbar.jsx     # Navigation component
├── context/           # React context providers
├── pages/            # Page components
├── firebase.js       # Firebase configuration
└── App.jsx           # Main application component
```

## 🎮 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Star Wars API (SWAPI) for character data
- Firebase for authentication and database
- Material-UI for UI components
- The Star Wars franchise for inspiration

## 🎯 Future Features

- [ ] 3D character models with Three.js
- [ ] Character customization system
- [ ] Battle animations and effects
- [ ] User achievements and leaderboards
- [ ] Real-time chat between users
- [ ] Character trading marketplace
