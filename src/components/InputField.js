import '../css/InputField.scss';
import React from "react";
import FieldLabel from './FieldLabel';

function InputField(props) {
    const { fieldName, label, isReadOnly, value, minValue, maxValue, onChange, placeholder } = props;
    const type = props.type || 'text';

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange && onChange(newValue);
    }

    return (
        <div className={ `InputField ${props.className || ''}`}>
            { label && <FieldLabel fieldName={fieldName} text={label} /> }
            <input 
                type={type}
                id={fieldName}
                name={fieldName}
                readOnly={isReadOnly || false}
                value={value}
                placeholder={placeholder}
                min={minValue}
                max={maxValue}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputField;