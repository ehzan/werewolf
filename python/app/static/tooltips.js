function addTooltips() {
    document.querySelectorAll("[id^='fck_']").forEach(item => {
        let roleName = item.id.substr(4);
        let divElement = document.createElement('div');
        divElement.className = "info";
        divElement.innerHTML = " ⓘ <div class=tooltip>" + role_map.get(roleName).description + "</div>";
        item.nextSibling.after(divElement);
    });
}