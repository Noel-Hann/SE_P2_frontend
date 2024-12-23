import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Homepage.css';
import CreateWishlist from './CreateWishlist';
import UpdateWishlist from './UpdateWishlist';
import UpdateUser from "./updateUser";
import Swal from 'sweetalert2';

import Snowflake from '../Snowflake';
import santaBear from '../assets/santaBear.webp';
import presentBox from '../assets/presentBox.webp';
import christmasTree from '../assets/christmasTree.webp'



function Homepage() {
    const navigate = useNavigate();
    // state for storing snowflake animation and retrieving user info
    const [snowflakes, setSnowflakes] = useState([]);
    const location = useLocation();
    var { userID, user, unHashed} = location.state || {};
    user = JSON.parse(localStorage.getItem("user")) || {};
    unHashed = localStorage.getItem("unHashed") || {};
    userID = localStorage.getItem("userKey") || {};
  
    const userKey = userID || localStorage.getItem("userKey");

    // create snowflake animation when component mounts
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


    // check for a logged in user; if not found, redirect to login
    if (userID === null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "no user logged in... signing out"
        });
        navigate("/")
    }

    // handle navigation for admin access based on user's role
    const handleAdmin = () => {
        try{
            console.log("user:",user.username);
            console.log(userID);
            console.log(unHashed)
            if ((user.admin) || (userKey === 6)) {

                navigate('/admin', { state: { user } });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "YOU SHALL NOT PASS",
                    text: "You are not an Admin"
                });
            }
        }catch (error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "something happened"
            });
        }


    };

     // render main homepage structure with options for wishlist creation, update, and exploration
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
                    <Link to="/explore" state={ {userID} } className="homepage-button btn-primary">
                        <img src={presentBox} alt="Present" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                        Explore Items
                    </Link>

                    <CreateWishlist userKey={userKey}>
                        <button className="homepage-button btn-secondary">
                            <img src={santaBear} alt="Santa" style={{ width: '24px', height: '24px' }} />
                            Create Wish List
                        </button>
                    </CreateWishlist>

                    <UpdateWishlist userKey={userKey} className="homepage-button btn-info">
                        📝 Update Wish List
                    </UpdateWishlist>

                    <Link to="/friends" state={{ userID }}  className="homepage-button btn-quartary">
                        <img src="https://www.drawhipo.com/wp-content/uploads/2023/04/Christmas-Color-7-Santa-Claus-Curved.png" alt="Present" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                        Friends Wish List
                    </Link>

                    <button onClick={handleAdmin} className="homepage-button btn-quinary">
                        <img src="https://cdn-icons-png.flaticon.com/512/9112/9112394.png" alt="Santa" style={{ width: '24px', height: '24px' }} />
                        View/Delete Users
                    </button>

                    <UpdateUser userKey={userKey} user = {user} unHashedPassword={unHashed}>
                        <div className="profile-description-link">
                            View/Update Profile...
                        </div>

                    </UpdateUser>
                </div>
            </div>
        </div>
    );
}
export default Homepage;