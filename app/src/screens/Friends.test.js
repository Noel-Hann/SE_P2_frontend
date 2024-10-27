import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Friends from "./Friends";

describe('Friends Component', () => {
    it('Friends Loads', () => {
        render(
            <Router>
                <Friends />
            </Router>
        );
        const headerElement = screen.getByText(/View Friends Wishlist/i);
        expect(headerElement).toBeInTheDocument();
    });
});