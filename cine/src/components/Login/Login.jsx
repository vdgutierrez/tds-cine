import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  return (
    <div className='wrapper'>
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>¿No tienes una cuenta?</p>
          <a href="/register">Registrate</a>
        </div>

      </form>
    </div>
  );
};

export default Login;
