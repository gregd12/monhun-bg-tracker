import "../css/HunterTracker.scss";
import React from 'react';
import InputField from './InputField';
import CustomItemSection from './CustomItemSection';
import TrackerSection from "./TrackerSection";
import SpinnerField from "./SpinnerField";

function HunterTracker(props) {

    const { hunter, onHunterUpdate } = props;
    const { hunterName, playerName, palicoName, commonMaterials, otherMaterials, monsterParts, inventoryItems, notes } = hunter;

    const handleHunterUpdate = (hun) => {
        onHunterUpdate && onHunterUpdate(hun);
    };

    const up = (fn) => {
        fn && fn(hunter);
        handleHunterUpdate(hunter);
    };

    const onItemSetChange = (itemSet, i, newItem) => {
        up(() => itemSet[i] = newItem);
    }

    const renderCommonMaterial = (id, name) => {
        return (
            <SpinnerField 
                fieldName={id}  
                label={name}
                value={commonMaterials[id] || 0} 
                onChange={v => up(h => h.commonMaterials[id] = v)}
            />
        );
    }

    return (
        <div className="HunterTracker">
            <div className="_header">
                <div className="_left">
                    <InputField 
                        fieldName="name"        
                        label="Hunter Name:" 
                        value={hunterName}    
                        onChange={v => up(h => h.hunterName = v)} />
                    <InputField 
                        fieldName="playerName"  
                        label="Player Name:" 
                        value={playerName}
                        onChange={v => up(h => h.playerName = v)} />
                </div>
                <div className="_right">
                    <InputField 
                        fieldName="palicoName"  
                        label="Palico Name:" 
                        value={palicoName}
                        onChange={v => up(h => h.palicoName = v)} />
                </div>
            </div>
            <div className="_body">
                <TrackerSection className="common" title="Common Bones, Ores and Hides:" collapsible={true} >
                    <div className="_left">
                        { renderCommonMaterial("carbalite", "Carbalite Ore") }
                        { renderCommonMaterial("machalite", "Machalite Ore") }
                        { renderCommonMaterial("dragonite", "Dragonite Ore") }
                        { renderCommonMaterial("fucium", "Fucium Ore") }
                        { renderCommonMaterial("qualityBone", "Quality Bone") }
                        { renderCommonMaterial("boneSmall", "Monster Bone S") }
                        { renderCommonMaterial("boneMedium", "Monster Bone M") }
                    </div>
                    <div className="_right">
                        { renderCommonMaterial("boneLarge", "Monster Bone L") }
                        { renderCommonMaterial("keenbone", "Monster Keenbone") }
                        { renderCommonMaterial("hardbone", "Monster Hardbone") }
                        { renderCommonMaterial("ancientBone", "Ancient Bone") }
                        { renderCommonMaterial("boulderBone", "Boulder Bone") }
                        { renderCommonMaterial("dragonvein", "Dragonvein Crystal") }
                        { renderCommonMaterial("wingdrakeHide", "Wingdrake Hide") }
                    </div>
                </TrackerSection>
                <CustomItemSection 
                    className="OtherMats" 
                    title="Other Ores, Bones and Hides:"
                    items={otherMaterials}
                    withCounters={true}
                    collapsible={true}
                    onItemChange={(i, item) => onItemSetChange(otherMaterials, i, item)}
                />
                <CustomItemSection 
                    className="MonsterParts" 
                    title="Monster Parts:"
                    items={monsterParts}
                    withCounters={true}
                    collapsible={true} 
                    onItemChange={(i, item) => onItemSetChange(monsterParts, i, item)}
                />
                <CustomItemSection 
                    className="Inventory"
                    title="Inventory:"
                    items={inventoryItems}
                    collapsible={true} 
                    onItemChange={(i, item) => onItemSetChange(inventoryItems, i, item)}
                />
                <TrackerSection title="Notes:" className="Notes" collapsible={true} >
                    <textarea 
                        name="notes" 
                        placeholder="Type notes here..."
                        onChange={e => up(h => h.notes = e.target.value)}
                        value={notes}
                    />
                </TrackerSection>
            </div>
        </div>
    );
}

export default HunterTracker;