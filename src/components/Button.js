import React  from "react";

function Button(props) {
    const extraClass = props.className || '';
    return (
        <input 
            className={`Button ${extraClass}`}
            type="button" 
            value={props.text || "+"}
            onClick={props.onClick}
        />
    );
}

export default Button;