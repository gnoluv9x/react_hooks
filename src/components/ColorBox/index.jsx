import React, { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {
    
};

function getRandomColor(){
    const COLOR_LIST = ['blue' , 'red' , 'brown' , 'orange' , 'yellow'];
    const indexColor = Math.trunc(Math.random() * 5);
    return COLOR_LIST[indexColor];
}

function ColorBox() {
    
    const [color , setColor] = useState( () => {
        const initColor = localStorage.getItem('color_box') || 'deeppink';
        return initColor
    });

    function handleBoxClick(){
       // get random color -> set color
        const randomColor = getRandomColor();
        setColor(randomColor);

        localStorage.setItem('color_box', randomColor);
    }


    return (
        <div
            className='color-box'
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
            
        </div>
    );
}

export default ColorBox;