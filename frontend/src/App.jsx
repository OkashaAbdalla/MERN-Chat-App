import { Navigate, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import useAuthHook from "./hooks/useAuthhooks"; 
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth } = useAuthHook();

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Toaster position="top-right" />
      <NavBar authUser={authUser} />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/signin" />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
        />

        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/signin" />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/signin" />}
        />

        <Route
          path="/signin"
          element={!authUser ? <SignInPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
