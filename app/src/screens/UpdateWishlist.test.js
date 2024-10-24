import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateWishlist from './UpdateWishlist';

const mockUserKey = '12345';

describe('UpdateWishlist Component', () => {

    // test 1: check if the Update Wishlist button renders
    test('renders Update Wishlist button', () => {
        render(
            <MemoryRouter>
                <UpdateWishlist userKey={mockUserKey}>Update Wishlist</UpdateWishlist>
            </MemoryRouter>
        );
        const buttonElement = screen.getByText(/Update Wishlist/i);
        expect(buttonElement).toBeInTheDocument();
    });

    // test 2: check if the modal opens when the Update Wishlist button is clicked
    test('opens modal when Update Wishlist button is clicked', () => {
        render(
            <MemoryRouter>
                <UpdateWishlist userKey={mockUserKey}>Update Wishlist</UpdateWishlist>
            </MemoryRouter>
        );

        const buttonElement = screen.getByText(/Update Wishlist/i);
        fireEvent.click(buttonElement);

        // check if the modal content appears (update text as per actual modal title)
        const modalElement = screen.getByText(/Update Your Wishlist/i);
        expect(modalElement).toBeInTheDocument();
    });

    // test 3: check if an error is shown when saving with empty fields
    test('shows error when saving with empty fields', () => {
        render(
            <MemoryRouter>
                <UpdateWishlist userKey={mockUserKey}>Update Wishlist</UpdateWishlist>
            </MemoryRouter>
        );

        const buttonElement = screen.getByText(/Update Wishlist/i);
        fireEvent.click(buttonElement);

        // try to save with empty fields
        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        const errorMessage = screen.getByText(/Please enter both wishlist name and description/i); 
        expect(errorMessage).toBeInTheDocument();
    });

    // test 4: check if the form is saved with correct input
    test('calls the save function with correct input', () => {
        render(
            <MemoryRouter>
                <UpdateWishlist userKey={mockUserKey}>Update Wishlist</UpdateWishlist>
            </MemoryRouter>
        );
//
        const buttonElement = screen.getByText(/Update Wishlist/i);
        fireEvent.click(buttonElement);

        const nameInput = screen.getByLabelText(/Wishlist Name/i);
        fireEvent.change(nameInput, { target: { value: 'My Wishlist' } });

        const descriptionInput = screen.getByLabelText(/Description/i);
        fireEvent.change(descriptionInput, { target: { value: 'Description of my wishlist' } });

        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        // check if the wishlist name is saved
        const savedName = screen.getByText(/My Wishlist/i);
        expect(savedName).toBeInTheDocument();
    });
});
