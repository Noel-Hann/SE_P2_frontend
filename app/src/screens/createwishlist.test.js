import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateWishlist from './CreateWishlist'; 
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn() 
}));

describe('CreateWishlist component', () => {
    beforeEach(() => {
        Swal.fire.mockClear(); 
    });

    test('renders CreateWishlist button and form correctly', () => {
        render(<CreateWishlist userKey="testUserKey">Create Wishlist</CreateWishlist>);

        // button open the dialog is rendered
        const openDialogButton = screen.getByText(/Create Wishlist/i);
        expect(openDialogButton).toBeInTheDocument();

        // button opens the dialog
        fireEvent.click(openDialogButton);

        // dialog opens and renders its content
        expect(screen.getByText('Create a New Wishlist')).toBeInTheDocument();
        expect(screen.getByLabelText('Wishlist Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    test('shows error when Wishlist Name is empty', () => {
        render(<CreateWishlist userKey="testUserKey">Create Wishlist</CreateWishlist>);

        fireEvent.click(screen.getByText(/Create Wishlist/i));

        // only the description is filled, wishlist name is empty
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });

        fireEvent.click(screen.getByText(/Save/i));

        // error is called
        expect(Swal.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "You need to enter a wishlist name.",
            icon: "error",
            confirmButtonText: "OK"
        });
    });

    test('shows error when Description is empty', () => {
        render(<CreateWishlist userKey="testUserKey">Create Wishlist</CreateWishlist>);

        fireEvent.click(screen.getByText(/Create Wishlist/i));

        // only the wishlist name is filled, description is empty
        fireEvent.change(screen.getByLabelText('Wishlist Name'), { target: { value: 'Test Wishlist' } });

        fireEvent.click(screen.getByText(/Save/i));

        // error SweetAlert is called
        expect(Swal.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "You need to enter a wishlist description.",
            icon: "error",
            confirmButtonText: "OK"
        });
    });

    test('shows success alert when both fields are filled', () => {
        render(<CreateWishlist userKey="testUserKey">Create Wishlist</CreateWishlist>);

        fireEvent.click(screen.getByText(/Create Wishlist/i));

        // fill both fields
        fireEvent.change(screen.getByLabelText('Wishlist Name'), { target: { value: 'Test Wishlist' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });

        fireEvent.click(screen.getByText(/Save/i));

        // success SweetAlert is called
        expect(Swal.fire).toHaveBeenCalledWith({
            title: "Wishlist Created!",
            text: 'Your wishlist "Test Wishlist" with description "Test Description" has been successfully created.',
            icon: "success",
            confirmButtonText: "OK"
        });
    });
});
