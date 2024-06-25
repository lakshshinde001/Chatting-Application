import React, {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const {handleUserRegister} = useAuth();

    const [credentials, setCredentials] = useState({
        name : '',
        email : '',
        password1 :'',
        password2 :''
    })
    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCredentials({...credentials, [name]:value})
    }

  return (
    <div className='auth--container'>
        <div className='form--wrapper'>
          <form onSubmit={(e) => {handleUserRegister(e,credentials)}} >
          <div className='field--wrapper'>
              <label> Name : </label>
              <input
                required
                type='text'
                name='name'
                placeholder='Enter name .. '
                value={credentials.name}
                onChange={handleInputChange}

              />
            </div>
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
                name='password1'
                placeholder='Enter your password '
                value={credentials.password1}
                onChange={handleInputChange}

              />
            </div>
            <div className='field--wrapper'>
              <label>Comfirm Password : </label>
              <input
                required
                type='password'
                name='password2'
                placeholder='Comfirm your password '
                value={credentials.password2}
                onChange={handleInputChange}

              />
            </div>

            <div className='field--wrapper'>
              <input className='btn btn--lg btn--main' type='submit' value="Register"/>
            </div>

          </form>
          <p>Already have an account? Login <Link to="/login"> here </Link> </p>
        </div>


    </div>
  )
}

export default RegisterPage