import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

import Snowflake from '../Snowflake';
import santaBear from '../assets/santaBear.webp';
import presentBox from '../assets/presentBox.webp';
import  christmasTree from '../assets/christmasTree.webp'

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snowflakes, setSnowflakes] = useState([]);

    const handleSignup = () => {
        navigate('/signup');
    };
    const handleLogin = () => {
        console.log('Username and Password'); // For testing purposes
        navigate('/homepage');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSnowflakes((prevSnowflakes) => [
                ...prevSnowflakes,
                <Snowflake key={Math.random()} />,
            ]);
        }, 150);

        setTimeout(() => clearInterval(interval), 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="login-container">
            <div className="snowflake-container">{snowflakes}</div>
            <div className="login-card">

                <h1 className="login-header">
                <img src={christmasTree} alt="Santa" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Gift Helper
                <img src={christmasTree} alt="Santa" style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                </h1>
                <h2 className="login-subtitle">A Christmas Wishlist App</h2>
                <h2 className="login-subtitle">Please login to continue</h2>

                <input name = "username"
                    type="text"
                    className="login-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input name = "password"
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button name="login" onClick={handleLogin} className="login-button">

                    {/*img source: icon-icons.com/icon/bear-grizzly-christmas-wild-animal/159326*/}
                    <img src={santaBear} alt="Santa" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                    Login
                    <img src={santaBear} alt="Santa" style={{ width: '24px', height: '24px', marginLeft: '8px' }} />
                </button>


                <button name = "signup" onClick={handleSignup} className="signup-button">
                    <img src={presentBox} alt="Santa" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                    Sign Up
                    <img src={presentBox} alt="Santa" style={{ width: '24px', height: '24px', marginLeft: '8px' }} />
                </button>
            </div>
        </div>
    );
}
export default Login;

