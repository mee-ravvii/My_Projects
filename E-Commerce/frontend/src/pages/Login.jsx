import React from 'react'
import { useState } from 'react'
import { loginUser } from '../services/authServices'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css'

const Login = () => {

    const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const [res, setRes] = useState({})

  const handleSubmit = async () => {

    const data = await loginUser(userData);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user',JSON.stringify(data.user));
    localStorage.setItem('username', data.user.name)

    navigate('/')

    setRes(data)
  }
  // console.log(res.);
  
  

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue shopping</p>
        </div>

        <div className="login-form">

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e.target.value
                })
              }
            />
          </div>

          {res.success === false && (
            <p className="login-error">
              {res.message} Pls Enter a correct Credentials
            </p>
          )}

          {res.success === true && (
            <p className="login-success">
              Login successful!
            </p>
          )}

          <input
            className="login-submit"
            type="button"
            onClick={handleSubmit}
            value="Login"
          />

        </div>

        <div className="register-link">
          <span>Don't have an account?</span>

          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Login