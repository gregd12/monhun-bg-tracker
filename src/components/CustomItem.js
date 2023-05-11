import '../css/CustomItem.scss';
import React from "react";
import InputField from "./InputField";
import SpinnerField from './SpinnerField';

function CustomItem(props) {

    const { itemId, itemName, itemCount, hasCount, onNameChange, onCountChange, className } = props;

    const handleNameChange = (newName) => {
        onNameChange && onNameChange(newName);
    }

    const handleCountChange = (newCount) => {
        onCountChange && onCountChange(newCount);
    }

    return (
        <div className={`CustomItem ${className || ''} ${hasCount ? 'CustomCounterItem' : ''}`}>
            <InputField 
                className="CustomItem_name"
                fieldName={`name-${itemId}`}
                value={itemName} 
                onChange={handleNameChange} 
                placeholder="Enter item name"
            />
            { hasCount && ( 
                <SpinnerField
                    className="CustomItem_count"
                    fieldName={`count-${itemId}`}
                    value={itemCount}
                    onChange={handleCountChange}
                /> 
            )}
        </div>
    );

}

export default CustomItem;