import React from "react";
import PropTypes from 'prop-types';
import './styles.css'

const getType = (type) =>{
    switch(type){
        case 'primary': 
            return 'primary-btn'
        case 'default':
            return 'default-btn'
        case 'danger':
            return 'danget-btn'
        default: 
            return new Error()
    }
}

const Button = ({text, onClick = () => null, type, styles}) => {
    return (
        <button
        className = {`medal-btn ${getType(type)}`}
        onClick = { () => onClick()}
        style = { {...styles} }
        >
            {text}
        </button>
    )
};

Button.propTypes ={
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'default', 'danger']),
    style: PropTypes.object
}

export default Button;