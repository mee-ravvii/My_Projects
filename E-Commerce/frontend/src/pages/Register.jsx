import React, { useState } from 'react'
import { RegisterUser } from '../services/authServices'
import { Link, useNavigate } from 'react-router-dom'
import '../css/register.css'

const Register = () => {
    const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [res, setRes] = useState({})

  const handleSubmit = async () => {

    const data = await RegisterUser(userData)

    alert(data.message)

    setRes(data);
    navigate('/login')
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">
          <h1>Create Account ✨</h1>
          <p>Join us and start shopping</p>
        </div>


        <div className="register-form">


          <div className="register-input-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={userData.name}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  name: e.target.value
                })
              }
            />

          </div>


          <div className="register-input-group">

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

          <div className="register-input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
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
            <p className="register-error">
              {res.message}
            </p>
          )}


          {res.success === true && (
            <p className="register-success">
              Registration successful!
            </p>
          )}

          <input
            className="register-submit"
            type="button"
            onClick={handleSubmit}
            value="Create Account"
          />

        </div>


        <div className="login-link">

          <span>Already have an account?</span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Register