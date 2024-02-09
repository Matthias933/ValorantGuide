async function GetAllAgents(){
    try {
        const response = await fetch("https://valorant-api.com/v1/agents");
        
        if (!response.ok) {
            throw new Error("Server response was not ok");
        }

        const responseData = await response.json();
        const agentData = responseData.data;
        return agentData;
    } catch (error) {
        console.error("There was an error in getting all agents:", error);
        throw error;
    }
}

async function GetAllMaps(){
    try{
        const response = await fetch("https://valorant-api.com/v1/maps");

        if(!response.ok){
            throw new Error("Server response was not ok");
        }

        const responseData = await response.json();
        const mapData = responseData.data;
        return mapData; 
    } catch(error){
        console.error("There was an error in getting all maps: ", error);
        throw error;
    }
    

}

async function GetAllRanks(){
    try{
        var response = await fetch("https://valorant-api.com/v1/competitivetiers")

        if(!response.ok){
            throw new Error("Server response was not ok");
        }

        var responseData = await response.json();
        var rankData = responseData.data;
        var lastRank = rankData[rankData.length -1];
        return lastRank;
    }catch(error){
        console.error("There was an error in getting all ranks: ", error);
        throw error;
    }
}

async function GetAllEvents(){
    try{
        var response = await fetch("https://valorant-api.com/v1/events");

        if(!response.ok){
            throw new Error("Server response was not oj");
        }

        var respondeData = await response.json();
        var eventData = respondeData.data;
        eventData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
        return eventData;
    
    }catch(error){
        console.error("There was an error in getting all events; ", error);
        throw error;
    }
}

async function GetAllGameModes(){
    try{
        var response = await fetch("https://valorant-api.com/v1/gamemodes");

        if(!response.ok){
            throw new Error("Server response was not ok");
        }

        var responseData = await response.json();
        var gameModeData = responseData.data;
        return gameModeData;

    }catch(error){
        console.error("Ther was an error in getting all game mdoes: ",error);
        throw error;
    }
}

async function GetAllWeapons(){
    try{
       var response = await fetch("https://valorant-api.com/v1/weapons");

       if(!response.ok){
        throw new Error("Server response was not ok");
       }

       var responseData = await response.json();
       var weaponData = responseData.data;
       return weaponData;

    }catch(error){
        console.log("There was an error in getting all weapons: ", error);
        throw error;
    }
}

async function GetAllGears(){
    try{
        var response = await fetch("https://valorant-api.com/v1/gear");

        if(!response.ok){
            throw new Error("Server response was not ok");
        }
        var respondeData = await response.json();
        var gearData = respondeData.data;
        return gearData;
    }catch(error){
        console.error("There was an error in getting all gears: ", error);
        throw error;
    }
}


async function GetAgentContent(){
    const data = await GetAllAgents();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.forEach(agent =>{
        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const image = document.createElement("img");    
        image.classList.add("p-8", "rounded-t-lg");
        image.src = agent.displayIcon;
        image.alt = "Agent image";

    
        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600"); 
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white");
        name.textContent = agent.displayName;
    
        const inspectLink = document.createElement("a");
        inspectLink.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        inspectLink.textContent = "Inspect agent";

        inspectLink.addEventListener("click", function(){
            ShowAgentModal(agent);
        });
    
        card.appendChild(image);
        content.appendChild(name);
        content.appendChild(document.createElement("br"));
        content.appendChild(inspectLink);

        card.appendChild(content);
        container.appendChild(card);
    });
}

async function GetMapContent(){
    const data = await GetAllMaps();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.forEach(map =>{
        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const image = document.createElement("img");    
        image.classList.add("p-8", "rounded-t-lg");
        image.src = map.displayIcon;
        image.alt = "Map image";

    
        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600"); 
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white");
        name.textContent = map.displayName;
    
        const inspectLink = document.createElement("a");
        inspectLink.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        inspectLink.textContent = "Inspect map";

        inspectLink.addEventListener("click", function(){
            ShowMapModal(map);
        });
    
        card.appendChild(image);
        content.appendChild(name);
        content.appendChild(document.createElement("br"));
        content.appendChild(inspectLink);

        card.appendChild(content);
        container.appendChild(card);
    });
}

async function GetRankContent(){
    const data = await GetAllRanks();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.tiers.forEach(rank =>{
        if(!rank.smallIcon){
            return;
        }
        const card = document.createElement("div");
        card.classList.add("max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const image = document.createElement("img");    
        image.classList.add("p-8", "rounded-t-lg"); 
        image.src = rank.smallIcon;
        image.alt = "Map image";

    
        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600"); 
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white", "text-center");
        name.textContent = rank.tierName;

        card.appendChild(image);
        content.appendChild(name);
        content.appendChild(document.createElement("br"));

        card.appendChild(content);
        container.appendChild(card);
    });
}

async function GetWeaponContent(){
    const data = await GetAllWeapons();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.forEach(weapon =>{
        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const image = document.createElement("img");    
        image.classList.add("p-8", "rounded-t-lg");
        image.src = weapon.displayIcon;
        image.alt = "weapon image";

    
        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600");
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white");
        name.textContent = weapon.displayName;
    
        const inspectLink = document.createElement("a");
        inspectLink.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        inspectLink.textContent = "Inspect weapon";

        inspectLink.addEventListener("click", function(){
            ShowGunModal(weapon);
        });
    
        card.appendChild(image);
        content.appendChild(name);
        content.appendChild(document.createElement("br"));
        content.appendChild(inspectLink);

        card.appendChild(content);
        container.appendChild(card);
    });
}

async function GetGearContent(){
    const data = await GetAllGears();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.forEach(gear =>{
        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const image = document.createElement("img");    
        image.classList.add("p-8", "rounded-t-lg");
        image.src = gear.displayIcon;
        image.alt = "gear image";

    
        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600");
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white");
        name.textContent = gear.displayName;
    
        const inspectLink = document.createElement("a");
        inspectLink.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        inspectLink.textContent = "Inspect gear";

        inspectLink.addEventListener("click", function(){
            ShowGearModal(gear);
        });
    
        card.appendChild(image);
        content.appendChild(name);
        content.appendChild(document.createElement("br"));
        content.appendChild(inspectLink);

        card.appendChild(content);
        container.appendChild(card);
    });
}

async function GetGamemodeContent(){
    const data = await GetAllGameModes();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.forEach(mode =>{
        if(!mode.displayIcon){
            return;
        }
        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const image = document.createElement("img");    
        image.classList.add("p-8", "rounded-t-lg"); 
        image.src = mode.displayIcon;
        image.alt = "mode image";

    
        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600"); 
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white");
        name.textContent = mode.displayName;
    
        const inspectLink = document.createElement("a");
        inspectLink.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        inspectLink.textContent = "Inspect mode";

        inspectLink.addEventListener("click", function(){
            ShowGamemodeModal(mode);
        });
    
        card.appendChild(image);
        content.appendChild(name);
        content.appendChild(document.createElement("br"));
        content.appendChild(inspectLink);

        card.appendChild(content);
        container.appendChild(card);
    });
}

async function GetEventContent(){
    const data = await GetAllEvents();
    const container = document.getElementById('container');
    container.innerHTML = "";
    data.forEach(event =>{
        const card = document.createElement("div");
        card.classList.add("w-full", "max-w-sm", "bg-gray-400", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700", "mx-4", "my-4");

        const content = document.createElement("div");
        content.classList.add("px-5", "pb-5", "dark:bg-gray-900", "bg-gray-600", "rounded-lg");
    
        const name = document.createElement("h5");
        name.classList.add("text-xl", "font-semibold", "tracking-tight", "text-white", "dark:text-white", "text-center");
        name.textContent = event.displayName;

        const inspectLink = document.createElement("a");
        inspectLink.classList.add("text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "text-center", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800");
        inspectLink.textContent = "Inspect event";

        inspectLink.addEventListener("click", function(){
            ShowEventModal(event);
        });
    
        content.appendChild(name);
        content.appendChild(document.createElement("br"));
        content.appendChild(inspectLink);

        card.appendChild(content);
        container.appendChild(card);
    });
}

function ShowAgentModal(agent){
    const modal = document.getElementById("default-modal");
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    modal.style.borderRadius = "10px";
    modal.style.transition = "all 0.3s ease";

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    modalTitle.textContent = agent.displayName;
    modalTitle.style.fontSize = "2em";
    modalTitle.style.fontWeight = "bold";

    modalContent.innerHTML = "";

    const displayImage = document.createElement("img");
    displayImage.src = agent.displayIcon;
    displayImage.style.width = "100%";
    displayImage.style.borderRadius = "10px";
    modalContent.appendChild(displayImage);

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = agent.description;
    descriptionParagraph.style.marginTop = "10px";
    modalContent.appendChild(descriptionParagraph);

    const roleHeader = document.createElement("h4");
    roleHeader.textContent = "Role:";
    roleHeader.style.marginTop = "20px";
    roleHeader.style.fontSize = "1.5em";
    modalContent.appendChild(roleHeader);

    const roleParagraph = document.createElement("p");
    roleParagraph.textContent = agent.role.displayName;
    roleParagraph.style.fontSize = "1.2em";
    modalContent.appendChild(roleParagraph);

    const abilitiesHeader = document.createElement("h4");
    abilitiesHeader.textContent = "Abilities:";
    abilitiesHeader.style.marginTop = "20px";
    abilitiesHeader.style.fontSize = "1.5em";
    modalContent.appendChild(abilitiesHeader);

    agent.abilities.forEach(ability => {
        const abilityName = document.createElement("p");
        abilityName.textContent = ability.displayName;
        abilityName.marginTop = "10px";
        abilityName.style.fontSize = "1.2em";
        abilityName.style.fontWeight = "bold";
        modalContent.appendChild(abilityName);

        const abilityDescription = document.createElement("p");
        abilityDescription.textContent = ability.description;
        modalContent.appendChild(abilityDescription);
    });

    modal.classList.remove("hidden");
}

function ShowGunModal(gun) {
    // Get modal elements
    const modal = document.getElementById("default-modal");
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    modal.style.borderRadius = "10px";
    modal.style.transition = "all 0.3s ease";

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    modalTitle.textContent = gun.displayName;
    modalTitle.style.fontSize = "2em";
    modalTitle.style.fontWeight = "bold";

    modalContent.innerHTML = "";

    const gunImage = document.createElement("img");
    gunImage.src = gun.displayIcon;
    gunImage.style.width = "100%";
    gunImage.style.borderRadius = "10px";
    modalContent.appendChild(gunImage);

    const categoryParagraph = document.createElement("p");
    const idx = gun.category.indexOf(":");
    result = gun.category.substring(idx + 2).trim();
    categoryParagraph.textContent = "Category: " + result;
    categoryParagraph.style.marginTop = "10px";
    modalContent.appendChild(categoryParagraph);

    if(gun.shopData){
        const costParagraph = document.createElement("p");
        costParagraph.textContent = "Cost: " + gun.shopData.cost;
        costParagraph.style.fontSize = "1.2em";
        modalContent.appendChild(costParagraph);
    }

    if(gun.weaponStats){
        const fireRateParagraph = document.createElement("p");
        fireRateParagraph.textContent = "Fire Rate: " + gun.weaponStats.fireRate;
        fireRateParagraph.style.fontSize = "1.2em";
        modalContent.appendChild(fireRateParagraph);
    }

    if(gun.magazineSize){
        const magazineSizeParagraph = document.createElement("p");
        magazineSizeParagraph.textContent = "Magazine Size: " + gun.weaponStats.magazineSize;
        magazineSizeParagraph.style.fontSize = "1.2em";
        modalContent.appendChild(magazineSizeParagraph);
    }

    if(gun.damageRange){
        const damageRangesHeader = document.createElement("h4");
        damageRangesHeader.textContent = "Damage Ranges:";
        damageRangesHeader.style.marginTop = "20px";
        damageRangesHeader.style.fontSize = "1.5em";
        modalContent.appendChild(damageRangesHeader);
    
        gun.weaponStats.damageRanges.forEach(damageRange => {
            const rangeHeader = document.createElement("p");
            rangeHeader.textContent = `Range: ${damageRange.rangeStartMeters}m - ${damageRange.rangeEndMeters}m`;
            rangeHeader.style.fontSize = "1.2em";
            rangeHeader.style.fontWeight = "bold";
            modalContent.appendChild(rangeHeader);

            const headDamageParagraph = document.createElement("p");
            headDamageParagraph.textContent = `Head Damage: ${damageRange.headDamage}`;
            headDamageParagraph.style.fontSize = "1.2em";
            modalContent.appendChild(headDamageParagraph);

            const bodyDamageParagraph = document.createElement("p");
            bodyDamageParagraph.textContent = `Body Damage: ${damageRange.bodyDamage}`;
            bodyDamageParagraph.style.fontSize = "1.2em";
            modalContent.appendChild(bodyDamageParagraph);

            const legDamageParagraph = document.createElement("p");
            legDamageParagraph.textContent = `Leg Damage: ${damageRange.legDamage}`;
            legDamageParagraph.style.fontSize = "1.2em";
            modalContent.appendChild(legDamageParagraph);
        });
    }

    // Show the modal
    modal.classList.remove("hidden");
}

function ShowMapModal(map) {
    const modal = document.getElementById("default-modal");
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    modal.style.borderRadius = "10px";
    modal.style.transition = "all 0.3s ease";

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    modalTitle.textContent = map.displayName;
    modalTitle.style.fontSize = "2em";
    modalTitle.style.fontWeight = "bold";

    modalContent.innerHTML = "";

    const displayIconImage = document.createElement("img");
    displayIconImage.src = map.displayIcon;
    displayIconImage.alt = map.displayName;
    displayIconImage.style.width = "100%";
    displayIconImage.style.borderRadius = "10px";
    modalContent.appendChild(displayIconImage);

    const narrativeDescriptionHeader = document.createElement("h4");
    narrativeDescriptionHeader.textContent = "Description:";
    narrativeDescriptionHeader.style.marginTop = "20px";
    narrativeDescriptionHeader.style.fontSize = "1.5em";
    modalContent.appendChild(narrativeDescriptionHeader);

    const narrativeDescriptionParagraph = document.createElement("p");
    narrativeDescriptionParagraph.textContent = map.narrativeDescription;
    modalContent.appendChild(narrativeDescriptionParagraph);

    const tacticalDescriptionParagraph = document.createElement("p");
    tacticalDescriptionParagraph.textContent = map.tacticalDescription;
    modalContent.appendChild(tacticalDescriptionParagraph);

    modal.classList.remove("hidden");
}

function ShowGearModal(gear) {
    const modal = document.getElementById("default-modal");
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    modal.style.borderRadius = "10px";
    modal.style.transition = "all 0.3s ease";

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    modalTitle.textContent = gear.displayName;

    modalContent.innerHTML = "";

    const displayIconImage = document.createElement("img");
    displayIconImage.src = gear.displayIcon;
    displayIconImage.alt = gear.displayName;
    modalContent.appendChild(displayIconImage);

    const descriptionHeader = document.createElement("h4");
    descriptionHeader.textContent = "Description:";
    descriptionHeader.style.fontSize = "1.5em";
    modalContent.appendChild(descriptionHeader);

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = gear.description;
    modalContent.appendChild(descriptionParagraph);

    const shopDataHeader = document.createElement("h4");
    shopDataHeader.textContent = "Shop Data:";
    shopDataHeader.style.fontSize = "1.5em";
    shopDataHeader.style.marginTop = "20px";
    modalContent.appendChild(shopDataHeader);

    const shopDataList = document.createElement("ul");

    const costListItem = document.createElement("li");
    costListItem.textContent = `Cost: ${gear.shopData.cost}`;
    shopDataList.appendChild(costListItem);

    const categoryListItem = document.createElement("li");
    categoryListItem.textContent = `Category: ${gear.shopData.category}`;
    shopDataList.appendChild(categoryListItem);


    modalContent.appendChild(shopDataList);

    modal.classList.remove("hidden");
}

function ShowGamemodeModal(gameMode) {
    const modal = document.getElementById("default-modal");
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    modal.style.borderRadius = "10px";
    modal.style.transition = "all 0.3s ease";

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    modalTitle.textContent = gameMode.displayName;

    modalContent.innerHTML = "";

    const displayIconImage = document.createElement("img");
    displayIconImage.src = gameMode.displayIcon;
    displayIconImage.alt = gameMode.displayName;
    modalContent.appendChild(displayIconImage);

    const durationHeader = document.createElement("h4");
    durationHeader.textContent = "Duration:";
    durationHeader.style.marginTop = "20px";
    durationHeader.style.fontSize = "1.5em";
    modalContent.appendChild(durationHeader);

    const durationParagraph = document.createElement("p");
    durationParagraph.textContent = gameMode.duration;
    modalContent.appendChild(durationParagraph);

    modal.classList.remove("hidden");
}

function ShowEventModal(eventData) {
    const modal = document.getElementById("default-modal");
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    
    modal.style.borderRadius = "10px";
    modal.style.transition = "all 0.3s ease";

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    modalTitle.textContent = eventData.displayName;

    modalContent.innerHTML = "";

    const startTimeHeader = document.createElement("h4");
    startTimeHeader.textContent = "Start Time:";
    startTimeHeader.style.fontSize = "1.5em";
    modalContent.appendChild(startTimeHeader);

    const startTimeParagraph = document.createElement("p");
    startTimeParagraph.textContent = eventData.startTime;
    modalContent.appendChild(startTimeParagraph);

    const endTimeHeader = document.createElement("h4");
    endTimeHeader.textContent = "End Time:";
    endTimeHeader.style.fontSize = "1.5em";
    endTimeHeader.style.marginTop = "20px";
    modalContent.appendChild(endTimeHeader);

    const endTimeParagraph = document.createElement("p");
    endTimeParagraph.textContent = eventData.endTime;
    modalContent.appendChild(endTimeParagraph);

    modal.classList.remove("hidden");
}

async function GetHome() {
    const container = document.getElementById('container');
    container.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("flex", "justify-center", "items-center", "h-full", "bg-gray-400", "dark:bg-gray-800", "rounded-lg", "shadow-md", "p-6");

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("max-w-lg", "mx-auto");

    const title = document.createElement("h2");
    title.classList.add("text-2xl", "font-bold", "text-gray-800", "dark:text-gray-100", "mb-4");
    title.textContent = "Welcome to the Valorant Beginner Guide";

    const introText = document.createElement("p");
    introText.classList.add("text-base", "text-gray-600", "dark:text-gray-300", "mb-8");
    introText.textContent = "Explore Valorant Agents, ranks, maps, weapons, gears, game modes, and upcoming events.";

    const attribution = document.createElement("p");
    attribution.classList.add("text-xs", "text-gray-600", "dark:text-gray-300");
    attribution.textContent = "Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.";

    contentContainer.appendChild(title);
    contentContainer.appendChild(introText);
    contentContainer.appendChild(attribution);

    card.appendChild(contentContainer);

    container.appendChild(card);
}





function hideModal() {
    const modal = document.getElementById("default-modal");
    modal.classList.add("hidden");
}
