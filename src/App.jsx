import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Login from './pages/Login';
import Register from './pages/Register';
import CharacterDetail from './pages/CharacterDetail';
import CreateCharacter from './pages/CreateCharacter';
import CharacterBattle from './components/CharacterBattle';
import PrivateRoute from './components/PrivateRoute';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd700', // Star Wars gold
    },
    secondary: {
      main: '#4a90e2', // Star Wars blue
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Star Jedi", "Arial", sans-serif',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="app">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/characters/:id" element={<CharacterDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/create-character"
                  element={
                    <ProtectedRoute>
                      <CreateCharacter />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/battle"
                  element={
                    <PrivateRoute>
                      <CharacterBattle />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;