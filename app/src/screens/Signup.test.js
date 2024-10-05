import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import Signup from './Signup';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-alert', () => ({
    useAlert: () => ({
        show: jest.fn(), // Mock the show function
    }),
}));
describe(Signup, () => {

    it("Signup displays buttons", () => {

        act(() => {
            render(
                <Router>
                    <Signup handleReturn={() => {}} handleSignup={() => {}}  />
                </Router>
            );
        })

        expect(screen.getByText(/Already a user\? Login here/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Santa Signup Santa"})).toBeInTheDocument();

    })

    it('renders Signup component with buttons and input fields', () => {
        act(() => {
            render(
                <Router>
                    <Signup handleReturn={() => {}} handleSignup={() => {}}  />
                </Router>
            );
        })

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Input Password Again')).toBeInTheDocument();
    });

    it('calls handleSignup when Signup button is clicked', () => {
        let consoleLogSpy;
        consoleLogSpy = jest.spyOn(global.console, 'log','').mockImplementation(() => {
        });

        act(() => {
            render(
                <Router>
                    <Signup handleReturn={() => {}} handleSignup={() => {}}  />
                </Router>
            );
        })

        const signupButton = screen.getByRole('button', { name: "Santa Signup Santa"});

        fireEvent.click(signupButton);

        expect(consoleLogSpy).toHaveBeenCalledWith('Username and Password and PasswordCheck');
    });
});