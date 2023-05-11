import React from "react";
import InputField from "./InputField";

function CounterField(props) {

    const { name, label, isReadOnly, value, className, onChange } = props;
    
    const handleCountChange = (newValue) => {
        onChange && onChange(newValue);
    }

    return (
        <InputField 
            className={`CounterField ${className || ''}`}
            type="number"
            name={name}
            label={label}
            isReadOnly={isReadOnly}
            value={value}
            minValue={0}
            maxValue={99}
            onChange={handleCountChange}
        />
    );
}

export default CounterField;