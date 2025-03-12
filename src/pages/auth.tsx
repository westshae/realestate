import AuthStore from '@/components/logic/authStore';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { email, password, isAdmin };
    setIsRegisterSuccess(false);
    setIsRegisterError(false);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await response.json();
        setIsRegisterSuccess(true);
      } else {
        setIsRegisterError(true);
      }
    } catch {
      setIsRegisterError(true);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { email, password };
    setIsLoginSuccess(false);
    setIsLoginError(false);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        AuthStore.saveToken(result.token, result.email);
        setIsLoginSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setIsLoginError(true);
      }
    } catch {
      setIsLoginError(true);
    }
  };

  const handleLogout = () => {
    AuthStore.logout();
    router.push('/auth');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h1>Register: NOTE, WILL ONLY WORK ON LOCAL DEV BUILD</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Is Admin
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
        {isRegisterSuccess && <p style={{ color: 'green' }}>Registration was successful!</p>}
        {isRegisterError && <p style={{ color: 'red' }}>There was an error with the registration.</p>}
      </div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {isLoginSuccess && <p style={{ color: 'green' }}>Login was successful!</p>}
        {isLoginError && <p style={{ color: 'red' }}>There was an error with the login.</p>}
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AuthPage;
