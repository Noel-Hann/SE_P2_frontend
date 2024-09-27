
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/homepage');
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Login</h1>
                <button onClick={handleLogin} className="login-button">
                    Go to Homepage
                </button>
            </header>
        </div>
    );
}

export default Login;
