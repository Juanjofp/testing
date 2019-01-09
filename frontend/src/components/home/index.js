import React, { useState, useEffect } from 'react';

const useCount = ({ init = 0, step = 1 } = {}) => {
    const [count, setCount] = useState(init);
    const increment = () => setCount(count => count + step);

    return {count, increment};
};
const ComponentView = (props) => (<div><p>Componente {props.name}</p></div>);
export const Home = (props) => {
    const initialState = () => Number(window.localStorage.getItem('count'));
    const {count, increment} = useCount({init: initialState});
    useEffect(() => {
        console.log('Saving count to LS', count);
        window.localStorage.setItem('count', count);
    }, [count]);
    const element = ComponentView({name: 'hola'});
    // element.foo = '12345'; Element is inmutable, this is not permited
    const componentJSX = <ComponentView name='hola'/>
    const componentJS = React.createElement(ComponentView, {name: 'hola'});
    //console.log('Element:', element, componentJSX, componentJS);
    return (
        <div data-testid='public-main'>
            <div>
                <button data-testid='home-button' onClick={increment}>{count}</button>
                {element}
                {componentJSX}
                {componentJS}
            </div>
        </div>
    );
};

export default Home;