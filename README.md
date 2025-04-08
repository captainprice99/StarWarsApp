# Star Wars Universe App

A comprehensive Star Wars application that allows users to explore the Star Wars universe, create custom characters, and engage in character battles.

## Features

- **User Authentication**
  - Secure login and registration using Firebase Authentication
  - Protected routes for authenticated users
  - Persistent user sessions

- **Character Exploration**
  - Browse official Star Wars characters from SWAPI
  - View detailed character information
  - Search and filter characters

- **Character Creation**
  - Create custom Star Wars characters
  - Upload character images
  - Save characters to your profile

- **Battle Arena**
  - Select two characters to battle
  - Compare character attributes
  - Determine battle outcomes based on character stats
  - Interactive battle interface

## Tech Stack

- **Frontend**
  - React.js with Vite
  - Material-UI for styling
  - React Router for navigation
  - TypeScript for type safety
  - Zustand for state management
  - Jest and React Testing Library for testing

- **Backend & Services**
  - Firebase Authentication
  - Firebase Firestore
  - Star Wars API (SWAPI)
  - Axios for API requests

## Getting Started

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

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React context providers
├── pages/            # Page components
├── firebase.js       # Firebase configuration
└── App.jsx           # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Star Wars API (SWAPI) for character data
- Firebase for authentication and database
- Material-UI for UI components
