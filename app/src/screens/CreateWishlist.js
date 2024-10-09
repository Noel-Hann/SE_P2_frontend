import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/CreateWishlist.css';

function CreateWishlist({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    // debugging
    console.log('Is Dialog Open:', isOpen);

    const handleSave = () => {
        setIsOpen(false);

        // sweetAlert after saving
        Swal.fire({
            title: "Wishlist Created!",
            text: "Your wishlist has been successfully created.",
            icon: "success",
            confirmButtonText: "OK"
        });
    };

    return (
        <>
            <div
                onClick={() => {
                    console.log('Button clicked'); // check if the click works
                    setIsOpen(true); // set the dialog to open
                }}
            >
                {children}
            </div>

            {/* debugging: Check if the dialog is rendering */}
            {/* {isOpen && console.log('Dialog is rendering')} */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel
                        className={`max-w-lg space-y-4 bg-white p-8 rounded shadow-lg dialog-panel ${isOpen ? 'show' : ''}`}
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}
                    >
                        <DialogTitle className="text-lg font-bold dialog-title">Create a New Wishlist</DialogTitle>
                        <form>
                            <div>
                                <label htmlFor="wishlist-name" className="block text-sm font-medium text-gray-700">
                                    Wishlist Name
                                </label>
                                <input
                                    id="wishlist-name"
                                    name="wishlist-name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter wishlist name"
                                />
                            </div>
                            <div className="mt-4 flex gap-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSave} // Trigger SweetAlert on save
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => setIsOpen(false)}
                                >
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
