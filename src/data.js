const MAX_OTHER_MATS = 10;
const MAX_MONSTER_PARTS = 10;
const MAX_INVENTORY = 12;

const getOrCreateCampaign = () => {
    let campaign; 

    try {
        const campaignJson = window.localStorage.getItem('campaign');
        campaign = campaignJson && JSON.parse(campaignJson);
        console.debug("LOADED", campaign);
    } catch (e) {
        console.error("LOAD ERROR", e);
    }
 
    if (!campaign) {
        campaign = {
            campaignName: '',
            campaignType: 'normal',
            campaignDays: 30,
            potions: 0,
            currentDay: 1,
            dailyEvents: [],
            hunters: []
        };
    }

    campaign.hunters = campaign.hunters || [];
    fillArray(campaign.hunters, 4, createHunter);

    campaign.hunters.forEach(hun => {
        hun.otherMaterials = fillArray(hun.otherMaterials || [], MAX_OTHER_MATS, createEmptyItem);
        hun.monsterParts = fillArray(hun.monsterParts || [], MAX_MONSTER_PARTS, createEmptyItem);
        hun.inventoryItems = fillArray(hun.inventoryItems || [], MAX_INVENTORY, createEmptyItem);
    });

    return campaign;
};

const saveCampaign = (campaign) => {
    try {
        window.localStorage.setItem('campaign', JSON.stringify(campaign));
    } catch (e) {
        console.log("SAVE ERROR", e);
    }
}

const fillArray = (arr, fillTo, supplier) => {
    if (typeof arr.length === 'number' && arr.length < fillTo) {
        for (let i = arr.length; i < fillTo; i++) {
            const newItem = supplier();
            arr.push(newItem);
        }
    }
    return arr;
};

const createEmptyItem = () => {
    return { name: '', count: 0 };
};

const createHunter = () => {
    return {
        hunterName: '',
        playerName: '',
        palicoName: '',
        commonMaterials: {
            carbalite: 0, 
            machalite: 0, 
            dragonite: 0, 
            fucium: 0, 
            qualityBone: 0, 
            boneSmall: 0, 
            boneMedium: 0, 

            boneLarge: 0, 
            keenbone: 0, 
            hardbone: 0, 
            ancientBone: 0, 
            boulderBone: 0, 
            dragonvein: 0, 
            wingdrakeHide: 0 
        },
        otherMaterials: [],
        monsterParts: [],
        inventoryItems: [],
        notes: ''
    };
};

export {
    getOrCreateCampaign,
    saveCampaign,
    fillArray
};