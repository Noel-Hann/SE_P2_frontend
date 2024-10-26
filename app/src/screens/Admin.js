import React , { useState, useEffect } from 'react';

import '../styles/Explore.css';

import Snowflake from '../Snowflake';
import UpdateUser from "./updateUser";

import Swal from 'sweetalert2';
import {useLocation, useNavigate} from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    const [snowflakes, setSnowflakes] = useState([]);
    const [users, setUsers] = useState([]);

    const location = useLocation();
    const { user } = location.state || {};
    const userKey = user || localStorage.getItem("userKey");

    const icons = new Map([
        ["electronics", "https://cdn-icons-png.flaticon.com/512/13114/13114437.png"],
        ["clothing", "https://cdn4.iconfinder.com/data/icons/christmas-day-26/64/Christmas_sweater-sweater-Christmas_tree-clothes-pullover-512.png"],
        ["food", "https://cdn3.iconfinder.com/data/icons/christmas-food-and-drink-filled/64/christmas_food-38-512.png"],
        ["toys", "https://cdn-icons-png.flaticon.com/512/2242/2242585.png"],
        ["jewelry", "https://cdn-icons-png.flaticon.com/512/3851/3851092.png"],
        ["home", "https://cdn3.iconfinder.com/data/icons/colorline-christmas/64/christmas_winter_home_house_icon-512.png"],
        ["pets", "https://cdn-icons-png.flaticon.com/512/3826/3826862.png"]
    ]);

    const handleDeleteUser = async (delUserKey, delUser) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you really want to delete ${delUser.username}? This action cannot be undone.`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yessir',
            denyButtonText: 'No, don\'t delete',
        });

        if(result.isDenied){
            console.log("No delete");
            return;
        }

        try {
            const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/user/remove/${delUserKey}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`User with key ${delUserKey} deleted successfully.`);
            } else {
                console.error(`Failed to delete user with key ${delUserKey}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting user with key ${delUserKey}:`, error);
        }
        setUsers(users.filter(user => user.id !== delUserKey));
    };

    const checkForUser = () =>{
        if(userKey === {} || userKey === undefined){
            Swal.fire({
                icon: 'error',
                title: 'No user Found',
                text: `Returning to Login Screen`,
                timer: 1500,
                showConfirmButton: false,
            });
            navigate('/');
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            checkForUser();

            try {

                const response = await fetch('https://jomo-se-722e825d9259.herokuapp.com/api/user/get-all');

                const data = await response.json();

                console.log(response);

                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    },[]);

    const getImg = () =>{
        return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
    };

    // Generate snowflakes for visual effects
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
        <div className="explore-container">
            <div className="snowflake-container">{snowflakes}</div>
            <div className="explore-card">
                <h1 className="explore-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/2410/2410020.png" alt="Tree" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    View/Delete Users
                    <img src="https://cdn-icons-png.flaticon.com/512/2410/2410020.png" alt="Tree" style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                </h1>
                <p className="explore-subtitle">Click "-" to remove any user</p>

                <div className="item-card-container">
                    {users.map((user) => (
                        <div key={user.id} className="item-card">
                            <h2 className="item-title">{user.username}</h2>
                            <img className="user-image" src= {getImg()} alt={"no img"}/>

                            <UpdateUser userKey={user.id} user = {user}>
                                <p
                                    className="item-description-link"
                                >
                                    Update user info...
                                </p>
                            </UpdateUser>

                            <button className="add-to-wishlist-button" onClick={() => handleDeleteUser(user.id, user)}>- Remove User</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Admin;