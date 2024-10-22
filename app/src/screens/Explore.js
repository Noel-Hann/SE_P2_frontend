import React , { useState, useEffect } from 'react';

import '../styles/Explore.css';

import Snowflake from '../Snowflake';
import christmasTree from '../assets/christmasTree.webp';
import Swal from 'sweetalert2';
import {useLocation, useNavigate} from "react-router-dom";

function Explore() {
    const navigate = useNavigate();
    const [snowflakes, setSnowflakes] = useState([]);
    const [items, setitems] = useState([]);
    const [Wishlist, setWishlist] = useState([]);

    const location = useLocation();
    const { user } = location.state || {};

    const icons = new Map([
        ["electronics", "https://cdn-icons-png.flaticon.com/512/13114/13114437.png"],
        ["clothing", "https://cdn4.iconfinder.com/data/icons/christmas-day-26/64/Christmas_sweater-sweater-Christmas_tree-clothes-pullover-512.png"],
        ["food", "https://cdn3.iconfinder.com/data/icons/christmas-food-and-drink-filled/64/christmas_food-38-512.png"],
        ["toys", "https://cdn-icons-png.flaticon.com/512/2242/2242585.png"],
        ["jewelry", "https://cdn-icons-png.flaticon.com/512/3851/3851092.png"],
        ["home", "https://cdn3.iconfinder.com/data/icons/colorline-christmas/64/christmas_winter_home_house_icon-512.png"]
    ]);

    const showitemDescription = (item) => {
        Swal.fire({
            title: item.name,
            text: item.shortDescription,
            imageUrl: icons.get(item.type),
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: item.title,
            confirmButtonText: 'Close',
        });
    };

    const handleAddToWishlist = async (item) => {

        try{
            const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/wishlist/get-users/${user}`);

            const data = await response.json();

            console.log(data);

            if(data[0].name === Wishlist.name){
                const response2 = await fetch('https://jomo-se-722e825d9259.herokuapp.com/api/entry/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        wishlistNum: data[0].wishlistNum,
                        itemId: item.id,
                    }),
                });
                console.log(response2.ok); //debugging person
            }

            Swal.fire({
                icon: 'success',
                title: 'Item Added',
                text: `${item.name} has been added to your wishlist!`,
                timer: 1000,
                showConfirmButton: false,
            });

        }catch(error){
            console.log(error);
        }

    };

    const checkForUser = () =>{
        if(user === {}){
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
        const fetchItems = async () => {
            try {

                const response = await fetch('https://jomo-se-722e825d9259.herokuapp.com/api/item/get-all');

                const data = await response.json();

                console.log(response);

                setitems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
        fetchItems()
    },[]);

    useEffect(() => {
        checkForUser();
        const fetchWishlist = async () => {
            try {

                const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/wishlist/get-users/${user}`);

                if(response.ok){
                    const data = await response.json();

                    console.log(response);

                    setWishlist(data[0]);
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'No Wishlist Found',
                        text: `Please create wishlist`,
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    navigate('/homepage', { state: { user: user} });
                }

            } catch (error) {

                console.error('Error fetching wishlists:', error);
            }
        }
        fetchWishlist()
    },[user ]);

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
                    <img src={christmasTree} alt="Tree" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    Explore Items
                    <img src={christmasTree} alt="Tree" style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                </h1>
                <p className="explore-subtitle">Click "+" to add to wishlist: {Wishlist.name}</p>

                <div className="item-card-container">
                    {items.map((item) => (
                        <div key={item.id} className="item-card">
                            <h2 className="item-title">{item.name}</h2>
                            <p className="item-price">${item.price}</p>
                            <p
                                className="item-description-link"
                                onClick={() => showitemDescription(item)}
                            >
                                View more details...
                            </p>
                            <button className="add-to-wishlist-button" onClick={() => handleAddToWishlist(item)}>+ Add to Wishlist</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Explore;