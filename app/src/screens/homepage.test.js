import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './Homepage';


describe('Homepage', () => {
    // Test 1: the homepage renders
    it('should render the homepage', () => {
        render(
            <Router>
                <Homepage />
            </Router>
        );
        expect(screen.getByText(/welcome to your wish list app/i)).toBeInTheDocument();
        expect(screen.getByText(/make your christmas wishlist come true/i)).toBeInTheDocument();
    });

    // Test 2: the buttons render
    it('should render all the buttons', () => {
        render(
            <Router>
                <Homepage />
            </Router>
        );
        expect(screen.getByText(/explore items/i)).toBeInTheDocument();
        expect(screen.getByText(/create wish list/i)).toBeInTheDocument();
        expect(screen.getByText(/update wish list/i)).toBeInTheDocument();
        expect(screen.getByText(/friends wish list/i)).toBeInTheDocument();
        expect(screen.getByText(/update profile/i)).toBeInTheDocument();
    });

});

