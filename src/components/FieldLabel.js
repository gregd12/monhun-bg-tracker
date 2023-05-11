import React from "react";

function FieldLabel(props) {
    const { text, fieldName } = props;
    return (
        <label className="FieldLabel" htmlFor={fieldName}>{text}</label>
    );
}

export default FieldLabel;