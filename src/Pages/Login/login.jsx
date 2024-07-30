import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';
import './Login.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login',{ email,password});
            const data = response.data;
            if (data.success) {
                console.log('Login successful, user data:', data.user);
    
                login(data.user, data.token);
                navigate('/');
            } else {
                setMessage('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage('Error logging in. Please try again.');
        }

    };

    return (
        <div className="login">
            <h2>Welcome to FitNet</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    placeholder='Enter your email'
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    placeholder='Enter your password'
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <p>
        Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;
