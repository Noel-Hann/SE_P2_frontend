//dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//screens
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import Signup from './screens/Signup';
import Explore from './screens/Explore';
import Friends from './screens/Friends'
import UpdateWishlist from './screens/UpdateWishlist';
import Admin from './screens/Admin';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/update" element={<UpdateWishlist />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}

export default App;

