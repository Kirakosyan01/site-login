import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate  } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

export default function Router() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getIsAuth = async () => {
      const result = await fetch("http://localhost:3005/userData?isAuth=true");
      const [user] = await result.json()
      if(user) {
        navigate("/profile", {state: user.id});
      }
      setIsLoading(false);
    }
    getIsAuth();
  }, [navigate])

  return (
    <Routes>
        <Route path="/" element={isLoading ? <div>Loading...</div> : <LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
    </Routes>
  )
}
