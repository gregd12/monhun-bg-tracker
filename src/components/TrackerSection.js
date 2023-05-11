import '../css/TrackerSection.scss';
import React, { useState } from "react";
import FieldLabel from "./FieldLabel";
import Button from "./Button";

function TrackerSection(props) {
    const { title, className, collapsible, children } = props;
    const [collapsed, setCollapsed] = useState(props.collapsed);

    const toggleCollapsed = () => {
        collapsible && setCollapsed(!collapsed);
    }

    return (
        <div className={`TrackerSection ${className || ''} ${collapsible ? '_collapsible' : ''}`} >
            { title &&  (
                <div className="_header" onClick={toggleCollapsed}>
                    <div className="_left">
                        <FieldLabel text={title} />
                    </div>
                    { collapsible && ( 
                        <div className="_right">
                            <Button className="CollapseButton" text={collapsed ? 'Expand' : 'Collapse'} onClick={toggleCollapsed} />
                        </div>
                    )}
                </div>
            )}
            { !collapsed && ( 
                <div className="_body">
                    { children }
                </div>
            )}
        </div>
    );
}

export default TrackerSection;