import React , { useState, useEffect } from 'react';
import { Link,useNavigate, useLocation } from 'react-router-dom';
import '../styles/Homepage.css';
import CreateWishlist from './CreateWishlist';


import Swal from 'sweetalert2';

import Snowflake from '../Snowflake';
import santaBear from '../assets/santaBear.webp';
import presentBox from '../assets/presentBox.webp';
import christmasTree from '../assets/christmasTree.webp'


function Homepage() {
    const navigate = useNavigate();

    const [snowflakes, setSnowflakes] = useState([]);
    const location = useLocation();
    const { user } = location.state || null;


   const userKey = user || localStorage.getItem("userKey");

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

    if(user === null){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "no user logged in... signing out"
        });
        navigate("/")
    }

    return (
        <div className="homepage-container">
            <div className="snowflake-container">{snowflakes}</div>
            <div className="homepage-card">
                <h1 className="homepage-header">
                    <img src={christmasTree} alt="Tree" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    Welcome to Your Wish List App
                    <img src={christmasTree} alt="Tree" style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                </h1>
                <p className="homepage-subtitle">Make your Christmas wishlist come true!</p>

                <div className="button-group">
                    <Link to="/explore" state={{ user }}  className="homepage-button btn-primary">
                        <img src={presentBox} alt="Present" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                        Explore Items
                    </Link>

                    <CreateWishlist>
                        <button className="homepage-button btn-secondary">
                            <img src={santaBear} alt="Santa" style={{ width: '24px', height: '24px' }} />
                            Create Wish List
                        </button>
                    </CreateWishlist>

                    <Link to="/update" className="homepage-button btn-info">
                        📝 Update Wish List
                    </Link>
                    <Link to="/friends" state={{ user }}  className="homepage-button btn-warning">
                        👥 Friends Wish List
                    </Link>
                    <Link to="/profile" className="homepage-button btn-success">
                        ✏️ Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Homepage;