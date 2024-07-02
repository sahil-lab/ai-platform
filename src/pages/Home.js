import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to My AI Platform</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/dashboard">
        <button>Get Started with Text Generation</button>
      </Link>
      <Link to="/generate-image">
        <button>Get Started with Image Generation</button>
      </Link>
    </div>
  );
}

export default Home;
