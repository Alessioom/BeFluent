import React from 'react';
import { Link } from 'react-router-dom';

function LoginBambino() {
  return (
    <>

      <Link to="/login">
        <button className="login-button">
          Login
        </button>
      </Link>
    </>
  );
}

export default LoginBambino;