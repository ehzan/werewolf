function describeRole(role) {
    var myjson = text2json(description_of_roles);
    var myparsedjson = JSON.parse(myjson);
    for (var key in myparsedjson)
        if (myparsedjson[key][role]) return myparsedjson[key][role];
    return null;
}

function text2json(str) {
    str = str.replace(/(?<=^)\s/g, '');
    str = str.replace(/\t/g, ' ');
    str = str.replace(/ +/g, ' ');
    str = str.replace(/( (?=\n))|((?<=\n) )/g, '');
    str = str.replace(/\n\n+/g, '\n\n');
    str = str.replace(/\s:/g, ':');
    str = str.replace(/:(?=\S)/g, ': ');
    str = str.replace(/: /g, '": "');
    str = str.replace(/:\n/g, '": {\n');
    str = str.replace(/\n(?=\S)/g, '\n"');
    str = str.replace(/\n*$/g, '');
    str = str.replace(/(?<!(\{|\n))\n/g, '"\n');
    str = str.replace(/\n(?=.*{)/g, '},\n');
    str = str.replace(/"(?=\n(?!}))/g, '",');
    str = str.replace(/^/g, '{\n"');
    str = str.replace(/$/g, '"\n}\n}');
    return str;
}

function load() {

    var option1;
    for (var i = 6; i <= 20; ++i) {
        option1 = document.createElement("option");
        option1.text = i.toString(); option1.value = i;
        NumberOfPlayers.add(option1, i);
    }
    NumberOfPlayers.selectedIndex = 4;

    for (var i = 0; i < CityRoles.length; i++) {
        (CityRoles[i][2] ? pCity : pCity2).innerHTML += "&nbsp; <input type=checkbox id=chk_" + CityRoles[i][0] + " onChange=checkboxChange_handler(event) >" +
            CityRoles[i][0] + " <div class=info> ⓘ <div class=tooltip>" + describeRole(CityRoles[i][0]) + "</div></div></br>";
    }
    for (var i = 0; i < MafiaRoles.length; i++) {
        (MafiaRoles[i][2] ? pMafia : pMafia2).innerHTML += "&nbsp; <input type=checkbox id=chk_" + MafiaRoles[i][0] + " onChange=checkboxChange_handler(event) >" +
            MafiaRoles[i][0] + " <div class=info> ⓘ <div class=tooltip>" + describeRole(MafiaRoles[i][0]) + "</div></div></br>";
    }
    document.getElementById("chk_" + CityRoles[CityRoles.length - 1][0]).disabled = true;
    document.getElementById("chk_" + MafiaRoles[MafiaRoles.length - 1][0]).disabled = true;
    setDefaults();
}

function checkboxChange_handler(e) {
    switch (e.target.id) {
        case "chk_Armored": chk_Bulletproof.checked &&= !e.target.checked;
            break;
        case "chk_Bulletproof": chk_Armored.checked &&= !e.target.checked;
            break;
        case "chk_Sniper": chk_Commando.checked &&= !e.target.checked;
            break;
        case "chk_Commando": chk_Sniper.checked &&= !e.target.checked;
            break;
    }
}

function setDefaults() {
    var n_players = NumberOfPlayers.value;
    pTeams.innerText = Math.ceil(2 * n_players / 3) + " Innocents, " + Math.floor(n_players / 3) + " Mafiosi";
    document.querySelectorAll("[id^='chk_']").forEach(item => {
        item.checked = /chk_(Detective|Doctor|Sniper|Citizen|Godfather|Mafioso)/i.test(item.id);
        if (item.id == "chk_Armored") item.checked = (n_players % 3 != 2);
        if (item.id == "chk_Godfather") item.checked = (n_players > 6);
    });
}

var CityRoles = [
    ["Detective", "کارآگاه", true, "At night, the Detective can investigate whether a player is Mafia. (The Godfather appears Innocent when investigated.)"],
    ["Doctor", "دکتر", true, "The Doctor protects one (or two) person(s) at night, who will survive any night-time attack. (Doctor's protection doesn't save the players who are died from guilt.)"],
    ["Armored", "زره‌پوش", true, "The Armored is invulnerable at night. Besides, if they're chosen to be killed during the daytime, they stay on the game, but lose their power."],
    ["Bulletproof", "ضدگلوله", true, "The Bulletproof citizen is invulnerable at night."],
    ["Sniper", "تک‌تیرانداز", true, "The Sniper has the ability to shoot at night once (or twice) per game. If they target a mafioso, the target dies, except for the Godfather. Whereas if they target an Innocent, the Sniper dies from guilt. (If they target the Godfather, nobody dies.)"],
    ["Commando", "تکاور", true, "Once atteked by the Mafia at night, the Commando is given a chance to shoot. If they target a mafioso, they stay on the game, and their target dies, except for the Godfather. Whereas if they target an Innocent, the Commando dies from guilt. (If they target the Godfather, nobody dies.)"],
    ["Gunner", "تفنگ‌دار", false, "..."],
    ["Thief", "دزد", false, "The Thief steals the role of another player after the opening day. The player whose role was stolen, gets the Citizen role."],
    ["Nurse", "پرستار", false, "The Nurse gains the Doctor's ability if the Doctor dies."],
    ["Stranger", "غریبه", false, "The Stranger is an Innocent player, who appears as Mafia to the Detective when investigated."],
    ["Governor", "فرماندار", false, "The Governor can reprieve those eleminated by the voting during the daytime."],
    ["Citizen", "شهروند", true, "Citizens are ordinary Innocent players. Thay can discuss and vote to eliminate players during the daytime."]];

var MafiaRoles = [
    ["Godfather", "رئیس مافیا", true, "The Godfather is the Mafia leader. They appear Innocent to the detective, and are immune to the night-time attaks."],
    ["MafiaDoctor", "دکتر مافیا", false, "The Mafia Doctor can protect a Mafia member from any night-time attack."],
    ["Negotiator", "مذاکره کننده", false, "مذاکره"],
    ["Shaman", "جادوگر", false, "جادوگر"],
    ["Mafioso", "مافیای ساده", true, "The Mafioso wakes up at night and silently consult their team to pick a victim to be killed."]];

function go() {
    var n_players = NumberOfPlayers.value;
    var n_mafias = Math.floor(n_players / 3);
    var n_citizens = n_players - n_mafias;
    CityRoles.forEach(
        item => item[2] = document.getElementById("chk_" + item[0]).checked);
    MafiaRoles.forEach(
        item => item[2] = document.getElementById("chk_" + item[0]).checked);
    //	for (i=0 ; i<CityRoles.length ; ++i)	CityRoles[i][2]=document.getElementById("chk"+i).checked;
    //	CityRoles.forEach( (item, index) => p1.innerText+=item[0]+":"+item[2]+"\n");
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

function show_hide() {
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

function createTestSample() {
    aTest.style.display = "none";
    var testSize = parseInt(prompt("Test sample size?", "1000"));
    if (!testSize) return;
    var content = [""];
    for (var i = 1; i <= NumberOfPlayers.value; ++i)
        content[0] += i.toString() + ",";
    content[0] += "\n";
    for (var i = 1; i <= testSize; ++i) {
        go();
        str = p1.innerText;
        str = str.replace(/\r?\n|\r/g, '___');
        str = str.replace(/\W/g, '');
        str = str.replace(/[0-9]/g, '');
        str = str.replace(/___/g, ',');
        content[i] = str + "\n";
    }
    var file1 = new File(content, "filename", { type: "text/csv;charset=UTF-8" });
    aTest.href = URL.createObjectURL(file1);
    aTest.style.display = "inline";
}