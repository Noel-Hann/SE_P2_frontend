import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

import Snowflake from '../Snowflake';
import santaBear from '../assets/santaBear.webp';
import  christmasTree from '../assets/christmasTree.webp'
import Swal from 'sweetalert2'


function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [snowflakes, setSnowflakes] = useState([]);

    const success = () => {
        Swal.fire({
            title: "Signup Sucess!",
            text: "Now lets go to the homepage!",
            icon: "success"
        });
    };

    const failureFields = () =>{
        Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Please fill out every field correctly!"
        });
    };

    const failurePassword = () =>{
        Swal.fire({
            icon: "error",
            title: "Fail",
            text: "Passwords do not match!"
        });
    };

    const handleSignup = () => {
        console.log('Username and Password and PasswordCheck'); // For testing purposes

        if(username === "" || password === ""||passwordCheck === ""){
            failureFields();
            return;
        }

        if(password !== passwordCheck){
            failurePassword()
            return;
        }

        success();

        navigate('/homepage');
    };

    const handleReturn = () => {
        navigate('/')
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

                <h2 className="login-subtitle">Please Sign Up to continue</h2>

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

                <input name = "passwordCheck"
                       type="password"
                       className="login-input"
                       placeholder="Input Password Again"
                       value={passwordCheck}
                       onChange={(e) => setPasswordCheck(e.target.value)}
                />

                <button name="signup" onClick={handleSignup} className="login-button">

                    {/*img source: icon-icons.com/icon/bear-grizzly-christmas-wild-animal/159326*/}
                    <img src={santaBear} alt="Santa" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                    Signup
                    <img src={santaBear} alt="Santa" style={{ width: '24px', height: '24px', marginLeft: '8px' }} />

                </button>

                <h2 className="login-click" onClick={handleReturn}> Already a user? Login here</h2>

            </div>
        </div>
    );
}

export default Signup;
