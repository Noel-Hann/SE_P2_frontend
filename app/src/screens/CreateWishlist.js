import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/CreateWishlist.css';

function CreateWishlist({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    // track the input for wishlist name and description
    const [wishlistName, setWishlistName] = useState("");
    const [wishlistDescription, setWishlistDescription] = useState("");

    const handleSave = () => {
        // check if wishlist name is empty
        if (wishlistName.trim() === "") {
            Swal.fire({
                title: "Oops...",
                text: "You need to enter a wishlist name.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // check if wishlist description is empty
        if (wishlistDescription.trim() === "") {
            Swal.fire({
                title: "Oops...",
                text: "You need to enter a wishlist description.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
        // close the dialog and show success sweetAlert
        setIsOpen(false);
        Swal.fire({
            title: "Wishlist Created!",
            text: `Your wishlist "${wishlistName}" with description "${wishlistDescription}" has been successfully created.`,
            icon: "success",
            confirmButtonText: "OK"
        });
        // clear the input fields after saving
        setWishlistName("");
        setWishlistDescription("");
    };

    return (
        <>
            {/* Open Dialog on Click */}
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>

            {/* Dialog Structure */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel
                        className={`max-w-lg space-y-4 bg-white p-8 rounded shadow-lg dialog-panel ${isOpen ? 'show' : ''}`}
                    >
                        <DialogTitle className="text-lg font-bold dialog-title">Create a New Wishlist</DialogTitle>
                        <form>
                            {/* wishlist name input */}
                            <div className="mb-4">
                                <label htmlFor="wishlist-name" className="block text-sm font-medium text-gray-700">
                                    Wishlist Name
                                </label>
                                <input
                                    id="wishlist-name"
                                    name="wishlist-name"
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="Enter wishlist name"
                                    value={wishlistName}
                                    onChange={(e) => setWishlistName(e.target.value)}
                                />
                            </div>
                            {/* wishlist description input */}
                            <div className="mb-4">
                                <label htmlFor="wishlist-description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="wishlist-description"
                                    name="wishlist-description"
                                    className="input-field"
                                    placeholder="Enter wishlist description"
                                    value={wishlistDescription}
                                    onChange={(e) => setWishlistDescription(e.target.value)}
                                />
                            </div>
                            {/* buttons */}
                            <div className="wishlist-button-group">
                                <button type="button" className="btn btn-primary" onClick={handleSave}>
                                    Save
                                </button>
                                <button type="button" className="btn btn-warning" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default CreateWishlist;
