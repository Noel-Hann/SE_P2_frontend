import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from './Admin';

describe('Admin Test', () => {

    test('ensure render', () => {
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );
    });

    test('displays the correct header', () => {
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        const header = screen.getByText(/View\/Delete Users/i);
        expect(header).toBeInTheDocument();
    });

    test('Displays correct subtitle', () => {
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        const subtitle = screen.getByText(/Click "-" to remove any user/i);
        expect(subtitle).toBeInTheDocument();
    });

});
