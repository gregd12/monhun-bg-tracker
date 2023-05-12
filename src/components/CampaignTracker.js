import "../css/CampaignTracker.scss";
import React, { useState } from "react";
import HunterTracker from "./HunterTracker";
import InputField from "./InputField";
import SpinnerField from "./SpinnerField";
import TrackerSection from "./TrackerSection";
import { getOrCreateCampaign, saveCampaign } from '../data';
import GatheringTracker from "./GatheringTracker";

const FIRST_HUNTER_TAB = 1;
const CALENDAR_DAYS_PER_ROW = 5;

// todo: gathering phase tracker
// todo: phone support
// todo: remember app position (routing?)
// todo: export / perma-link
// todo: drop-downs / suggestions / typeahead
// todo: dynamic sizing of items sets
// todo: trading items
// todo: styling quirks

function CampaignTracker(props) {
    const campaign = getOrCreateCampaign();
    const { campaignName, campaignDays, campaignType, campaignGoal, hunters, currentDay, potions } = campaign;

    const [activeTab, setActiveTab] = useState(0);
    const [update, setUpdate] = useState(false);

    const forceUpdate = () => {
        setUpdate(!update);
    } 

    const handleCampaignStateUpdate = () => {
        saveCampaign(campaign);
        forceUpdate();
    }

    // const getCurrentDay = () => {
    //     const lastCompleteDay = dailyEvents && dailyEvents
    //         .filter(day => day.complete)
    //         .map(day => day.number)
    //         .sort()
    //         .reverse()[0] || 0;

    //     return lastCompleteDay + 1;
    // }

    // const currentDay = getCurrentDay();

    const changeTabs = (n) => {
        setActiveTab(n);
    }

    const renderTabPickers = () => {
        const tabs = [];

        tabs.push(
            <div 
                className={`TabPicker ${activeTab === tabs.length ? '_active' : ''}`}
                key={tabs.length}
                onClick={() => changeTabs(0)}
            >
                <span>Campaign</span>
            </div>
        );

        const firstHunterTab = tabs.length;
        const lastHunterTab = firstHunterTab + 4;
        for (let i = firstHunterTab; i < lastHunterTab; i++) {
            const hunterIndex = i - firstHunterTab;
            tabs.push(renderHunterTabPicker(i, hunterIndex));
        }

        return tabs;
    }

    const renderHunterTabPicker = (tabIndex, hunterIndex) => {
        const hunter = hunters[hunterIndex] || {};
        const name = `H${hunterIndex + 1}`;
        return (
            <div 
                key={tabIndex}
                className={`TabPicker ${activeTab === tabIndex ? '_active' : ''}`} 
                onClick={() => changeTabs(tabIndex)}
            >
                <span>{name}</span>
            </div>
        );
    }

    const renderCalendarDay = (day) => {
        // const events = getDailyEvents(day);
        const isComplete = day < currentDay;
        const isCurrent = currentDay === day;
        const className = `${isComplete ? 'complete ' : ''} ${isCurrent ? 'current' : ''}`;
        return (
            <td 
                key={day}
                className={className}
                onClick={e => up(c => c.currentDay = day)}
            >
                <span>{day}</span>
            </td>
        );
    };

    const renderCalendarRows = () => {
        const rows = [];
        const cells = [];
        for (let day = 1; day <= campaignDays; day++) {
            cells.push(renderCalendarDay(day));
            if (cells.length === CALENDAR_DAYS_PER_ROW) {
                rows.push(<tr key={rows.length}>{cells.splice(0, cells.length)}</tr>);
            }
        }
        if (cells.length) {
            rows.push(<tr key={rows.length}>{cells.splice(0, cells.length)}</tr>);
        }
        return rows;
    }

    const up = (fn) => {
        fn && fn(campaign);
        handleCampaignStateUpdate();
    }

    const renderCampaignTab = () => {
        return (
            <div className="CampaignTab">
                <div className="_header" >
                    <div className="_left">
                        <InputField     label="Campaign Name:"  value={campaignName} onChange={v => up(c => c.campaignName = v)} />
                        <InputField     label="Campaign Goal:"           value={campaignGoal} onChange={v => up(c => c.campaignGoal = v)} />
                    </div>
                    <div className="_right">
                        <InputField     label="Campaign Type:"  value={campaignType} onChange={v => up(c => c.campaignType = v)} />
                        <SpinnerField   
                            label="Total Days:"     
                            value={campaignDays} 
                            minValue={1}
                            maxValue={99}
                            onChange={v => up(c => c.campaignDays = v)} 
                        />
                    </div>
                </div>
                <TrackerSection >
                    <SpinnerField label="Potions:" value={potions} minValue={0} maxValue={10} onChange={v => up(c => c.potions = v)} />
                </TrackerSection>
                <TrackerSection className="CampaignCalendar" title="Calendar:" collapsible={true}>
                    <table>
                        <tbody>{ renderCalendarRows() }</tbody>
                    </table>
                </TrackerSection>
                <TrackerSection className="GatheringTracker" title="Gathering Phase Tracker:" collapsible={true} collapsed={true} >
                    <GatheringTracker />
                </TrackerSection>
            </div>
        )
    }

    const renderHunterTab = (hunterIndex) => {
        const hunter = hunters[hunterIndex] || {};
        return (
            <HunterTracker 
                key={activeTab}
                hunter={hunter}
                onHunterUpdate={h => up(c => c.hunters[hunterIndex] = h)}
            />
        );
    };

    const renderActiveTab = () => {
        if (activeTab === 0) {
            return renderCampaignTab();
        } else if (activeTab >= FIRST_HUNTER_TAB) {
            return renderHunterTab(activeTab - FIRST_HUNTER_TAB);
        }
    }

    // const getDailyEvents = (n) => {
    //     let ev = dailyEvents.filter(day => day.number === n)[0];
    //     if (!ev) {
    //         ev = { number: n, complete: false };
    //         dailyEvents.push(ev);
    //     }

    //     return ev;
    // }

    return (
        <div className="CampaignTracker" >
            <div className="TabBar" >
                { renderTabPickers() }
            </div>
            {/* <div className="HamburgerMenu">
                <span></span>
                <span></span>
                <span></span>
            </div> */}
            <div className="Title">

            </div>
            { renderActiveTab() }
        </div>
    );
}

export default CampaignTracker;