var role_map;

function build_dataSet() {
    role_map = new Map();
    let role_json = JSON.parse(role_list.textContent);
    for (let role of role_json) role_map.set(role.name, role);
    // i.e. role_map = new Map(role_json.map(key => [key.name, key]));
    console.log(role_map);
    // Object.values(role_json) , Object.keys(role_json), Array.prototype.values(role_map.values())
    // Array.from(map.values()) i.e. ...map.values
    // for (const [key, value] of Object.entries(role_json)) console.log(`${key}: ${value}`);
}

function load() {
    build_dataSet();
    for (let role of role_map.values()) {
        let divId = 'p' + (role.team == 'w' ? 'City' : 'Mafia') + (role.default ? '' : '2');
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

    {///TODO: delete this block
        for (var i = 0; i < CityRoles.length; i++)
            (CityRoles[i][2] ? pCity : pCity2).innerHTML += "&nbsp; <input type=checkbox id=chk_" +
                CityRoles[i][0] + " onChange=checkboxChange_handler(event) >" + CityRoles[i][0] + " <br>";
        for (var i = 0; i < MafiaRoles.length; i++)
            (MafiaRoles[i][2] ? pMafia : pMafia2).innerHTML += "&nbsp; <input type=checkbox id=chk_" +
                MafiaRoles[i][0] + " onChange=checkboxChange_handler(event) >" + MafiaRoles[i][0] + " <br>";

        document.getElementById("chk_" + CityRoles[CityRoles.length - 1][0]).disabled = true;
        document.getElementById("chk_" + MafiaRoles[MafiaRoles.length - 1][0]).disabled = true;
    }

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
    var n_players = NumberOfPlayers.value;
    pTeams.innerText = Math.ceil(2 * n_players / 3) + " Innocents, " + Math.floor(n_players / 3) + " Mafiosi";
    document.querySelectorAll("[id^='fck_']").forEach(item => {
        item.checked = role_map.get(item.id.substr(4)).checked;
        if (item.id == "fck_Godfather") item.checked = (n_players > 6);
        if (item.id == "fck_Armored") item.checked = (n_players % 3 != 2);
    });
    ///TODO: delete this block
    document.querySelectorAll("[id^='chk_']").forEach(item => {
        item.checked = /chk_(Detective|Doctor|Sniper|Citizen|Godfather|Mafioso)/i.test(item.id);
        if (item.id == "chk_Armored") item.checked = (n_players % 3 != 2);
        if (item.id == "chk_Godfather") item.checked = (n_players > 6);
    });
}

var CityRoles = [
    ["Detective", "کارآگاه", true],
    ["Doctor", "دکتر", true],
    ["Armored", "زره‌پوش", true],
    ["Bulletproof", "ضدگلوله", true],
    ["Sniper", "تک‌تیرانداز", true],
    ["Commando", "تکاور", true],
    ["Gunner", "تفنگ‌دار", false],
    ["Thief", "دزد", false],
    ["Nurse", "پرستار", false],
    ["Stranger", "غریبه", false],
    ["Governor", "فرماندار", false],
    ["Citizen", "شهروند", true]];
var MafiaRoles = [
    ["Godfather", "رئیس مافیا", true],
    ["Negotiator", "مذاکره کننده", false],
    ["Sly", "ناتو", true],
    ["Mafia-Doctor", "دکتر مافیا", false],
    ["Shaman", "جادوگر", false],
    ["Mafioso", "مافیای ساده", true]];

var allRoles = [
    ["Detective", "کارآگاه", true],
    ["Doctor", "دکتر", true],
    ["Armored", "زره‌پوش", true],
    ["Bulletproof", "ضدگلوله", true],
    ["Sniper", "تک‌تیرانداز", true],
    ["Commando", "تکاور", true],
    ["Gunner", "تفنگ‌دار", false],
    ["Thief", "دزد", false],
    ["Nurse", "پرستار", false],
    ["Stranger", "غریبه", false],
    ["Governor", "فرماندار", false],
    ["Citizen", "شهروند", true],

    ["Godfather", "رئیس مافیا", true],
    ["Negotiator", "مذاکره کننده", false],
    ["Sly", "ناتو", true],
    ["Mafia-Doctor", "دکتر مافیا", false],
    ["Shaman", "جادوگر", false],
    ["Mafioso", "مافیای ساده", true]
]

function go() {
    var n_players = NumberOfPlayers.value;
    var n_mafias = Math.floor(n_players / 3);
    var n_citizens = n_players - n_mafias;
    CityRoles.forEach(
        item => item[2] = document.getElementById("chk_" + item[0]).checked);
    MafiaRoles.forEach(
        item => item[2] = document.getElementById("chk_" + item[0]).checked);

    var Players = [];
    for (var i = 0, j = 0, l = CityRoles.length - 1; i < n_citizens; i++, j++) {
        if (j < l)
            if (CityRoles[j][2])
                Players.push({ role: CityRoles[j][0] + " - " + CityRoles[j][1], key: Math.random() });
            else i--;
        else
            Players.push({ role: CityRoles[l][0] + " - " + CityRoles[l][1], key: Math.random() });
    }
    for (var i = 0, j = 0, l = MafiaRoles.length - 1; i < n_mafias; ++i, j++)
        if (j < l)
            if (MafiaRoles[j][2])
                Players.push({ role: MafiaRoles[j][0] + " - " + MafiaRoles[j][1], key: Math.random() });
            else --i;
        else
            Players.push({ role: MafiaRoles[l][0] + " - " + MafiaRoles[l][1], key: Math.random() });
    Players.sort((a, b) => a.key - b.key);
    p1.innerText = "";
    Players.forEach((item, index) => p1.innerText += (index + 1).toString() + ". " + Players[index].role + "\n");
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