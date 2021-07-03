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
    //alert(Players.map(item => item.role));
    request_id = 100;
    request_players = Players.map(item => item.role);
    Players.map(item => item.role)
    const httpr = new XMLHttpRequest();
    const url1 = document.URL + `../game/insert/?id=${request_id}&Players=${request_players}`;
    httpr.open('GET', url1);
    httpr.send();
    p1.innerText = "";
    Players.forEach((item, index) =>
        p1.innerText += `${(index + 1)}. ${item.role} - ${role_map.get(item.role).persianName}\n`);
}