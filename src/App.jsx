import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'

function App() {

return (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path='/login' element= {<LoginPage/>} />
        <Route path='/register' element= {<RegisterPage/>} />

        <Route element={<PrivateRoute/>} >
          <Route path='/' element={<Room/>} />
        </Route>
        
      </Routes>
    </AuthProvider>
  </Router>
)

}

export default App
