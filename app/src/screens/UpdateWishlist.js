import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateWishlist.css';

function UpdateWishlist({ userKey, children, className }) {
    const navigate = useNavigate();

    const [wishlistName, setWishlistName] = useState('');
    const [wishlistDescription, setWishlistDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false); 

    const fetchWishlist = async () => {
        try {
            const storedWishlistName = localStorage.getItem('wishlistName');
            const storedWishlistDescription = localStorage.getItem('wishlistDescription');

            if (storedWishlistName && storedWishlistDescription) {
                setWishlistName(storedWishlistName);
                setWishlistDescription(storedWishlistDescription);
            } else {
                const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/wishlist/get-users/${userKey}`);
                const wishlist = await response.json();

                if (wishlist.length > 0) {
                    setWishlistName(wishlist[0].name);
                    setWishlistDescription(wishlist[0].description);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'No Wishlist Found',
                        text: 'Please create a wishlist first',
                    });
                    navigate('/homepage');
                }
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while fetching your wishlist.',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [userKey]);

    const handleSave = async () => {
        if (wishlistName.trim() === '' || wishlistDescription.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter both wishlist name and description.',
            });
            return;
        }

        const updatedWishlist = {
            name: wishlistName,
            description: wishlistDescription,
            userKey: userKey,
        };

        try {
            const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/wishlist/update/${userKey}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWishlist),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Wishlist Updated!',
                    text: 'Your wishlist has been successfully updated.',
                });

                localStorage.setItem('wishlistName', wishlistName);
                localStorage.setItem('wishlistDescription', wishlistDescription);

                setIsOpen(false);
                navigate('/homepage');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while updating your wishlist.',
                });
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
            });
        }
    };
    return (
        <>
            {/* Button to open the modal */}
            <button onClick={() => setIsOpen(true)} className={className}>
                {children}
            </button>

            {/* Dialog for updating the wishlist */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className={`dialog-panel ${isOpen ? 'show' : ''}`}>
                        <DialogTitle className="dialog-title">Update Your Wishlist</DialogTitle>

                        <div className="form-group">
                            <label htmlFor="wishlistName">Wishlist Name</label>
                            <input
                                id="wishlistName"
                                name="wishlistName"
                                type="text"
                                className="input-field"
                                placeholder="Enter wishlist name"
                                value={wishlistName}
                                onChange={(e) => setWishlistName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="wishlistDescription">Description</label>
                            <textarea
                                id="wishlistDescription"
                                name="wishlistDescription"
                                className="input-field"
                                placeholder="Enter wishlist description"
                                value={wishlistDescription}
                                onChange={(e) => setWishlistDescription(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="wishlist-button-group">
                            <button onClick={handleSave} className="btn btn-primary">
                                Save
                            </button>
                            <button onClick={() => setIsOpen(false)} className="btn btn-warning">
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default UpdateWishlist;
