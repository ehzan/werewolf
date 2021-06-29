var role_map;

function build_dataSet() {
    role_map = new Map();
    let role_json = JSON.parse(role_list.textContent);
    for (let role of role_json) role_map.set(role.name, role);
    // i.e. role_map = new Map(role_json.map(key => [key.name, key]));

    // Object.values(role_json) , Object.keys(role_json), Array.prototype.values(role_map.values())
    // Array.from(map.values()) i.e. ...map.values
    // for (const [key, value] of Object.entries(role_json)) console.log(`${key}: ${value}`);
}

function load() {
    build_dataSet();
    for (let role of role_map.values()) {
        let divId = 'p' + (role.team == 'w' ? 'City' : 'Mafia') + (role.primary ? '' : '2');
        document.getElementById(divId).innerHTML += "&nbsp; " +
            "<input type=checkbox id=fck_" + role.name + " onchange=checkboxChange_handler(event) >" +
            role.name + " <br>";
        // chkbox = document.createElement('input'); chkbox.type = 'checkbox'; chkbox.id = 'fuck_' + role.name; chkbox.onchange = event => alert(event);
        // document.getElementById(divId).append(chkbox);
        // chkbox.insertAdjacentHTML('beforebegin', '&nbsp; '); chkbox.insertAdjacentHTML('afterend', role.name + '<br>');
    }
    if (fck = document.getElementById("fck_Citizen"))
        fck.disabled = true;
    if (fck = document.getElementById("fck_Mafioso"))
        fck.disabled = true;

    setDefaults();
    addTooltips();
}

function checkboxChange_handler(e) {
    switch (e.target.id) {
        case "fck_Armored": fck_Bulletproof.checked &&= !e.target.checked;
            break;
        case "fck_Bulletproof": fck_Armored.checked &&= !e.target.checked;
            break;
        case "fck_Sniper": fck_Commando.checked &&= !e.target.checked;
            break;
        case "fck_Commando": fck_Sniper.checked &&= !e.target.checked;
            break;
    }
}

function setDefaults() {
    let n_players = NumberOfPlayers.value;
    pTeams.innerText =
        `${Math.ceil(2 * n_players / 3)} Innocents, ${Math.floor(n_players / 3)} Mafiosi`;
    document.querySelectorAll("[id^='fck_']").forEach(item => {
        item.checked = role_map.get(item.id.substr(4)).default;
    });
    fck_Godfather.checked &&= (n_players > 6);
    fck_Armored.checked &&= (n_players % 3 != 2);
}

function go() {
    const n_players = NumberOfPlayers.value;
    const n_mafiosi = Math.floor(n_players / 3);
    const n_citizens = n_players - n_mafiosi;
    role_map.forEach(role =>
        role['selected'] = document.getElementById("fck_" + role.name).checked);

    let Players = [];
    let i_citizens = 0, i_mafiosi = 0;
    for (let role of role_map.values())
        if (role.selected && role.team == 'w' && i_citizens < n_citizens) {
            Players.push({ 'role': role.name, 'key': Math.random() });
            i_citizens++;
        }
        else if (role.selected && role.team == 'b' && i_mafiosi < n_mafiosi) {
            Players.push({ 'role': role.name, 'key': Math.random() });
            i_mafiosi++;
        }
    while (i_citizens++ < n_citizens)
        Players.push({ 'role': 'Citizen', 'key': Math.random() });
    while (i_mafiosi++ < n_mafiosi)
        Players.push({ 'role': 'Mafioso', 'key': Math.random() });

    Players.sort((a, b) => a.key - b.key);
    p1.innerText = "";
    Players.forEach((item, index) =>
        p1.innerText += `${(index + 1)}. ${item.role} - ${role_map.get(item.role).persianName}\n`);
}

function show_hide_roles() {
    if (link.innerText == "More Roles") {
        link.innerText = "Less Roles";
        pCity2.style.setProperty("display", "inline");
        pMafia2.style.setProperty("display", "inline");
    }
    else {
        link.innerText = "More Roles";
        pCity2.style.setProperty("display", "none");
        pMafia2.style.setProperty("display", "none");
    }
}