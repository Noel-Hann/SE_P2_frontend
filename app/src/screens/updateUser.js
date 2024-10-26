import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/CreateWishlist.css';
import bcrypt from "bcryptjs";


function UpdateUser({ children, userKey,user = "" }) {
    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [userPassword,setUserPassword] = useState("");


    const handleSave = async () => {

        if (username.trim() === "") {
            Swal.fire({
                title: "Oops...",
                text: "You need to enter a user name.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }


        const salt = await bcrypt.genSalt(10);
        var hashedPassword;

        if(userPassword.trim() === ""){
            hashedPassword = user.password
        }else{
            hashedPassword = await bcrypt.hash(userPassword, salt);
        }

        //user object to send to the API
        const userItem = {
            username: username,
            password: hashedPassword,
            id: userKey,
            isAdmin: user.isAdmin
        }

        console.log(userItem.userKey); //test

        try {
            const response = await fetch(`https://jomo-se-722e825d9259.herokuapp.com/api/user/update/${userKey}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userItem),
            });
            const result = await response.json();

            console.log("Response from server:", result);

            if (response.ok) {
                setIsOpen(false);
                Swal.fire({
                    title: "User Updated!",
                    text: `Your user "${username}" with password "${userPassword}" has been successfully updated.`,
                    icon: "success",
                    confirmButtonText: "OK"
                });

                setUsername("");
                setUserPassword("");

            } else {

                Swal.fire({
                    title: "Error",
                    text: "There was an issue creating your wishlist. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (error) {

            console.error("Error creating wishlist:", error);
            Swal.fire({
                title: "Error",
                text: "An unexpected error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>

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
                        <DialogTitle className="text-lg font-bold dialog-title">Update Current User</DialogTitle>
                        <form>

                            <div className="mb-4">
                                <label htmlFor="wishlist-name" className="block text-sm font-medium text-gray-700">
                                    User Name
                                </label>

                                <input
                                    id="wishlist-name"
                                    name="wishlist-name"
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="Enter new Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            {/* user password input */}
                            <div className="mb-4">
                                <label htmlFor="wishlist-description" className="block text-sm font-medium text-gray-700">
                                    password
                                </label>
                                <textarea
                                    id="wishlist-description"
                                    name="wishlist-description"
                                    className="input-field"
                                    placeholder="Enter User password"
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
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

export default UpdateUser;