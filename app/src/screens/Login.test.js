import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-alert', () => ({
    useAlert: () => ({
        show: jest.fn(), // Mock the show function
    }),
}));

//source: https://www.youtube.com/watch?v=JBSUgDxICg8&t=733s
describe(Login, () => {

    it('Login displays buttons', () => {
        act(() => {
            render(
                <Router>
                    <Login />
                </Router>
            );
        });

        expect(screen.getByRole('button', { name: "Santa Login Santa"})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "Santa Sign Up Santa" })).toBeInTheDocument();
    });

    it('renders Login component with buttons and input fields', () => {
        act(() => {
            render(
                <Router>
                    <Login handleLogin={() => {}} handleSignup={() => {}}  />
                </Router>
            );
        })

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('calls handleLogin when Login button is clicked', () => {
        let consoleLogSpy;
        consoleLogSpy = jest.spyOn(global.console, 'log','').mockImplementation(() => {
        });

        act(() => {
            render(
                <Router>
                    <Login handleLogin={() => {}} handleSignup={() => {}}  />
                </Router>
            );
        })

        const loginButton = screen.getByRole('button', { name: "Santa Login Santa"});

        fireEvent.click(loginButton);

        expect(consoleLogSpy).toHaveBeenCalledWith('Username and Password');
    });
});