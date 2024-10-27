import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateUser from './UpdateUser';

const mockUserKey = '42';
const mockUser = { username: 'Goku', password: 'jakeFromStateFarm', isAdmin: false };

describe('UpdateUser Component', () => {

    test('Update User Button Renders', () => {
        render(
            <MemoryRouter>
                <UpdateUser userKey={mockUserKey} user={mockUser}>Update User</UpdateUser>
            </MemoryRouter>
        );
        const buttonElement = screen.getByText(/Update User/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('Confirms Popup Screen', () => {
        render(
            <MemoryRouter>
                <UpdateUser userKey={mockUserKey} user={mockUser}>Update User</UpdateUser>
            </MemoryRouter>
        );

        const button = screen.getByText(/Update User/i);
        fireEvent.click(button);

        const popupTitle = screen.getByText(/Update Current User/i);
        expect(popupTitle).toBeInTheDocument();
    });

    test('Error when empty username', async () => {
        render(
            <MemoryRouter>
                <UpdateUser userKey={mockUserKey} user={mockUser}>Update User</UpdateUser>
            </MemoryRouter>
        );

        const button = screen.getByText(/Update User/i);
        fireEvent.click(button);

        const usernameInput = screen.getByLabelText(/User Name/i);
        fireEvent.change(usernameInput, { target: { value: '' } });

        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        const errorMessage = await screen.findByText(/You need to enter a user name/i);
        expect(errorMessage).toBeInTheDocument();
    });

});
