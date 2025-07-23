import { Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage,'
import SignInPage from './pages/SignInPage'
import useAuthHook from './hooks/useAuthhooks'
import { useEffect } from 'react'

function App() {
  const { authUser, checkAuth } = useAuthHook();

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <NavBar authUser={authUser}/>

      {/* Define your routes here */}
      <Routes>
         <Route path="/" element={<SignUpPage />} />
        {/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={<SettingsPage />} /> */}
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to="/" />} /> */}
      </Routes>
    </div>
  )
}

export default App