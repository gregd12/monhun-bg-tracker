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
                    <FieldLabel text={title} />
                    { collapsible && ( 
                        <div className="_fill">
                            <Button className="CollapseButton" text={collapsed ? 'Show' : 'Hide'} onClick={toggleCollapsed} />
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