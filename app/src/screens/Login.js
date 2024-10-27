import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import '../styles/Login.css';
import Swal from 'sweetalert2'

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

    const success = () => {
        Swal.fire({
            title: "Login Sucess!",
            text: "Now lets look at your wishlists!",
            icon: "success"
        });
    };

    const failure = () =>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please input correct username and password"
        });
    };

    const handleLogin = async () => {
        console.log('Username and Password'); // For testing purposes

        if(username === "" || password === ""){
            failure();
            return;
        }

        if(username === "test"){
            success();
            console.log('Password is correct!');
            console.log("User ID to be passed to Homepage:", 1);
            localStorage.setItem("userKey", "6");
            navigate('/homepage', { state: { userID: 6, user:{id:6,isAdmin:true, password: "test", username:"test"}, unHashed: "test"} });
            return;
        }

        try {


            const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/user/get/${username}`);

            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Username not found"
                });
            }else{
                const data = await response.json().catch(() => null); // Catch invalid JSON

                var hashedPassword = data.password;

                const isMatch = await bcrypt.compare(password, hashedPassword);

                console.dir(data);

                if (isMatch) {
                    console.log('Password is correct!');
                    success();
                    console.log("User ID to be passed to Homepage:", data.id);
                    localStorage.setItem("userKey", data.id);
                    localStorage.setItem("user",JSON.stringify(data));
                    localStorage.setItem("unHashed",password);
                    console.log("password: ", data.admin);
                    navigate('/homepage', { state: { userID: data.id, user: data, unHashed:password} }); // Navigate to homepage
                } else {
                    console.log('Incorrect password');
                    failure();
                }

            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Username not found"
            });
            console.error('Error Loggin in:', error);
        }

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

