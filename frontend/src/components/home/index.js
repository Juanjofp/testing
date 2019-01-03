import React, { useState, useEffect } from 'react';

const useCount = ({ init = 0, step = 1 } = {}) => {
    const [count, setCount] = useState(init);
    const increment = () => setCount(count => count + step);

    return {count, increment};
};
export const Home = (props) => {
    const initialState = () => Number(window.localStorage.getItem('count'));
    const {count, increment} = useCount({init: initialState});
    useEffect(() => {
        console.log('Saving count to LS', count);
        window.localStorage.setItem('count', count);
    }, [count]);
    return (
        <div data-testid='public-main'>
            <div>
                <button data-testid='home-button' onClick={increment}>{count}</button>
            </div>
        </div>
    );
};

export default Home;