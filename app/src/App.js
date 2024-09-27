//dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//screens
import Login from './screens/Login';
import Homepage from './screens/Homepage';

function App() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
        </Routes>
    );
}

export default App;

