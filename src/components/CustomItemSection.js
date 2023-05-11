import React from "react";
import CustomItem from "./CustomItem";
import TrackerSection from "./TrackerSection";

function CustomItemSection(props) {

    const { title, className, withCounters, collapsible, items, onItemChange } = props;

    const handleItemChange = (i, newItem) => {
        onItemChange && onItemChange(i, newItem);
    }

    const handleItemNameChange = (i, newName) => {
        const item = items[i] || {}; 
        item.name = newName;
        handleItemChange(i, item)
    }

    const handleItemCountChange = (i, newCount) => {
        const item = items[i] || {}; 
        item.count = newCount;
        handleItemChange(i, item)
    }

    const renderItems = () => {
        const results = [];
        const size = items ? items.length : 0;
        if (size > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const name = item.name || '';
                const count = item.count || 0;
                const isEven = i % 2 !== 0;
                const className = isEven ? '_right' : '_left'
                results.push(
                    <CustomItem 
                        className={className}
                        key={i}
                        itemId={i}
                        itemName={name}
                        hasCount={withCounters}
                        itemCount={count}
                        onNameChange={(newName) => handleItemNameChange(i, newName)}
                        onCountChange={(newCount) => handleItemCountChange(i, newCount)}
                    />
                );
            };
        }

        return results;
    }

    return (
        <TrackerSection 
            title={title} 
            className={`CustomItemSection ${className || ''}`}
            collapsible={collapsible}
        >
            { renderItems() }
        </TrackerSection>
    );
}

export default CustomItemSection;