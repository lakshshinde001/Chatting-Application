import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {

  const {user,handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email : "",
    password : ""
  })

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [])

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({...credentials, [name]:value})
    // console.log(credentials);
  }

  return (
    <div className='auth--container'>
        <div className='form--wrapper'>
          <form onSubmit={(e) => {handleUserLogin(e,credentials)}} >
            <div className='field--wrapper'>
              <label>Email : </label>
              <input
                required
                type='email'
                name='email'
                placeholder='Enter your email '
                value={credentials.email}
                onChange={handleInputChange}

              />
            </div>

            <div className='field--wrapper'>
              <label>Password : </label>
              <input
                required
                type='password'
                name='password'
                placeholder='Enter your password '
                value={credentials.password}
                onChange={handleInputChange}

              />
            </div>

            <div className='field--wrapper'>
              <input className='btn btn--lg btn--main' type='submit' value="Log in"/>
            </div>

          </form>
          <p>Don't have an account? Register <Link to="/register"> here </Link> </p>
        </div>


    </div>
  )
}

export default LoginPage