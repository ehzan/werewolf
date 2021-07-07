function addTooltips() {
    for (let item of document.querySelectorAll('[id^=fck_]')) {
        let roleName = item.id.substr(4);
        let divElement = document.createElement('div');
        divElement.className = 'info';
        divElement.innerHTML =
            ` ⓘ <div class=tooltip> ${role_map.get(roleName).description} </div>`;
        item.nextSibling.after(divElement);
    }
}