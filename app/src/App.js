//dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//screens
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import Signup from './screens/Signup';
import Explore from './screens/Explore';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/signup" element={<Signup />} /> 
        </Routes>
    );
}

export default App;

