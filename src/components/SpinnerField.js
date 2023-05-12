import '../css/SpinnerField.scss';
import React from "react";
import Button from "./Button";
import FieldLabel from "./FieldLabel";

function SpinnerField(props) {
    
    const { fieldName, label, value, minValue, maxValue, onChange, readOnly } = props;

    const handleChange = (newValue) => {
        if (typeof maxValue === 'number' && newValue > maxValue) return;
        if (typeof minValue === 'number' && newValue < minValue) return;
        onChange && onChange(newValue);
    }

    return (
        <div className={`SpinnerField InputField ${props.className || ''}`}>
            { label && <FieldLabel fieldName={fieldName} text={label} /> }
            <div className="SpinnerInput" >
                <Button className="down" onClick={() => handleChange(parseInt(value) - 1)} text=" - " />
                <input 
                    type="number"
                    id={fieldName}
                    name={fieldName}
                    readOnly={readOnly}
                    value={value}
                    onChange={e => handleChange(e.target.value)}
                />
                <Button className="up" onClick={() => handleChange(parseInt(value) + 1)} text=" + " />
            </div>
        </div>
    );
}

export default SpinnerField;