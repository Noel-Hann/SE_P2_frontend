import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Explore from './Explore';
import { BrowserRouter as Router } from 'react-router-dom';

describe(Explore, () => {

    it('Explore Loads', () => {
            render(
                <Router>
                    <Explore />
                </Router>
            );

    });

});