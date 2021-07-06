function go(event) {
    let selected_roles = select_roles(NumberOfPlayers.value);
    selected_roles.sort((a, b) => a.key - b.key);

    if (event.target.id == 'btnGo') {
        const xhttp = new XMLHttpRequest();
        const url = location.origin + '/game/'      //GET: /?selected_roles=${selected_roles.map(item => item.role)}`
        xhttp.open('POST', url);
        xhttp.setRequestHeader('Content-Type', 'application/json'); //application/x-www-form-urlencoded
        xhttp.send(JSON.stringify(selected_roles));        //GET: xhttp.send(`selected_roles=${selected_roles.map(item => item.role)}`);
    }
    p1.innerText = "";
    selected_roles.forEach((item, index) =>
        p1.innerText += `${(index + 1)}. ${item.role} - ${role_map.get(item.role).persianName}\n`);
}

function select_roles(n) {
    const n_mafiosi = Math.floor(n / 3);
    const n_citizens = n - n_mafiosi;

    for (let role of role_map.values())
        role['selected'] = document.getElementById('fck_' + role.name) &&   //!==null
            document.getElementById('fck_' + role.name).checked

    let selected = [];
    let i_citizens = 0, i_mafiosi = 0;
    for (let role of role_map.values())
        if (role.selected && role.team == 'w' && i_citizens < n_citizens) {
            selected.push({ 'role': role.name, 'key': Math.random() });
            i_citizens++;
        }
        else if (role.selected && role.team == 'b' && i_mafiosi < n_mafiosi) {
            selected.push({ 'role': role.name, 'key': Math.random() });
            i_mafiosi++;
        }
    while (i_citizens++ < n_citizens)
        selected.push({ 'role': 'Citizen', 'key': Math.random() });
    while (i_mafiosi++ < n_mafiosi)
        selected.push({ 'role': 'Mafioso', 'key': Math.random() });

    return selected;
}