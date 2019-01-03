import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import Counter from './index';

test(
    'counter increment de count',
    () => {
        const {container, getByTestId} = render(<Counter/>);
        const button = getByTestId('home-button');
        expect(button.textContent).toBe('0');
        fireEvent.click(button);
        expect(button.textContent).toBe('1');
    }
);