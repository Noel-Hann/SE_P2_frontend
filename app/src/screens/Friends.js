import React, {useState, useEffect, useRef} from 'react';

import '../styles/Friends.css';

import Snowflake from '../Snowflake';
import christmasTree from '../assets/christmasTree.webp';
import Swal from 'sweetalert2';
import {useLocation, useNavigate} from "react-router-dom";

const icons = new Map([
    ["electronics", "https://cdn-icons-png.flaticon.com/512/13114/13114437.png"],
    ["clothing", "https://cdn4.iconfinder.com/data/icons/christmas-day-26/64/Christmas_sweater-sweater-Christmas_tree-clothes-pullover-512.png"],
    ["food", "https://cdn3.iconfinder.com/data/icons/christmas-food-and-drink-filled/64/christmas_food-38-512.png"],
    ["toys", "https://cdn-icons-png.flaticon.com/512/2242/2242585.png"],
    ["jewelry", "https://cdn-icons-png.flaticon.com/512/3851/3851092.png"],
    ["home", "https://cdn3.iconfinder.com/data/icons/colorline-christmas/64/christmas_winter_home_house_icon-512.png"],
    ["pets", "https://cdn-icons-png.flaticon.com/512/3826/3826862.png"],
    ["decorations","https://cdn4.iconfinder.com/data/icons/holidays-culture-color/128/christmas-ornament-red-512.png"],
    ["collectibles","https://cdn-icons-png.flaticon.com/512/2507/2507035.png"]
]);

function Friends() {
    const navigate = useNavigate();
    const [snowflakes, setSnowflakes] = useState([]);
    const [items, setitems] = useState([]);
    const [friendWishlist, setFriendWishlist] = useState([]);
    const [searchFriend, setSearchFriend] = useState('');
    const searchFriendRef = useRef(null);
    const location = useLocation();


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

    useEffect(() => {
        const setFriendList = async () => {
            if(searchFriend){
                var friendUser=0;
                try{
                    const response2 = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/user/get/${searchFriend}`);

                    friendUser = await response2.json();

                    if(!response2.ok){
                        Swal.fire({
                            icon: "error",
                            title: "Fail",
                            text: "Friend does not exist!"
                        });
                        setitems([]);
                        return;
                    }

                }catch(error){
                    Swal.fire({
                        icon: "error",
                        title: "Fail",
                        text: "Friend does not exist!"
                    });
                    setitems([]);
                    return;
                }

                var friendWishlist;
                try{
                    const response3 = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/wishlist/get-users/${friendUser.id}`);

                    friendWishlist = await response3.json();

                    if(!response3.ok || friendWishlist.length<=0){
                        Swal.fire({
                            icon: "error",
                            title: "Fail",
                            text: "Friend does not have a wishlist!"
                        });
                        setFriendWishlist({name:"no friend selected", description:" null"});
                        setitems([]);
                        return;
                    }
                    setFriendWishlist(friendWishlist[0]);

                }catch(error){
                    Swal.fire({
                        icon: "error",
                        title: "Fail",
                        text: "Friend does not have a wishlist2!"
                    });
                    setFriendWishlist({name:"no friend selected", description:" null"});
                    setitems([]);
                    return;
                }

                try {

                    const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/entry/get-all/${friendWishlist[0].wishlistNum}`);

                    const data = await response.json();

                    console.log("" +
                        ":",data);

                    if (data.length<=0 || !response.ok){
                        Swal.fire({
                            icon: "error",
                            title: "Fail",
                            text: "Friends wishlist is empty!"
                        });
                        // setFriendWishlist({name:"no friend selected", description:" null"});
                        setitems([]);
                        return;
                    }

                    var friendItems = []

                    for(let i = 0;i<data.length;i++){
                        const response2 = await fetch('https://jomo-se-722e825d9259.herokuapp.com/api/item/get/'+data[i].itemId);
                        const dataItem = await  response2.json();
                        friendItems.push(dataItem)
                    }

                    console.log(response);

                    setitems(friendItems);
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Fail",
                        text: "Error getting friends wishlist, try again!"
                    });
                    setitems([]);
                    setFriendWishlist({name:"no friend selected", description:" null"});
                    console.error('Error fetching items:', error);
                }
            }else{
                setitems([]);
            }

        }
        setFriendList()
    },[searchFriend]);

    const handleSearchChange = (event) => {

        setSearchFriend(searchFriendRef.current.value);
    };

    return (
        <div className="explore-container">
            <div className="snowflake-container">{snowflakes}</div>
            <div className="explore-card">
                <h1 className="explore-header">
                    <img src={christmasTree} alt="Tree" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    View Friends Wishlist
                    <img src={christmasTree} alt="Tree" style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                </h1>

                <div className={"center-container"}>
                    <div className="search-card">
                        <div className="search-innerCard">
                            <div className="search-container">
                                <div className="Icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                </div>
                                <div className="InputContainer">
                                    <input className="input-search" ref={searchFriendRef} placeholder="Search by Username"/>
                                </div>
                                <button className="button-name" onClick={handleSearchChange}> Search</button>

                            </div>
                        </div>
                    </div>
                </div>

                <div className = "friend-subtitle">
                    Wishlist Title: {friendWishlist.name}
                </div>

                <div className="item-card-container-friends">
                    {items.map((item) => (
                        <div key={item.id} className="item-card">
                            <h2 className="item-title">{item.name}</h2>
                            <img className="item-image" src= {icons.get(item.type)} alt={"no img"}/>
                            <p className="item-price">${item.price}</p>
                            <p
                                className="item-description-link"
                                onClick={() => showitemDescription(item)}
                            >
                                View more details...
                            </p>
                        </div>
                    ))}

                </div>

                <div className="description-container">
                    <img className="description-imageL"  src="https://cdn.creazilla.com/icons/7912022/christmas-icon-md.png"/>
                    <div className="description-card ">
                        <h1 className="friend-description">Description: {friendWishlist.description}</h1>
                    </div>
                    <img className="description-imageR"  src="https://cdn.creazilla.com/icons/7912022/christmas-icon-md.png"/>

                </div>



            </div>
        </div>
    );
}

export default Friends;