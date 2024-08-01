import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({navigate}) => {
  const [action, setAction] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/post', { name, email, password })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/log', { name, password })
      .then(result => {
        console.log(result);
       if (result.data === "Success") {
          navigate('home')
        } else {
          alert(result.data);
        }
      } 
    )
      .catch(err => {
        console.error(err);
      });
  };

  const registerLink = (e) => {
    e.preventDefault();
    setAction(' active');
  };

  const loginLink = (e) => {
    e.preventDefault();
    setAction('');
  };

  return (
    <div className={`wrapper${action}`}>
      <div className='form-box login'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Login</button>
          <div className="Register">
            <p>New user? <a href="#" onClick={registerLink}>Register</a></p>
          </div>
        </form>
      </div>

      <div className={`form-box register${action}`}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="New Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Register</button>
          <div className="Register">
            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
