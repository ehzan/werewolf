function addTooltips() {
    document.querySelectorAll("[id^='chk_']").forEach(item => {
        var roleName = item.id.substring(4);
        var divElement = document.createElement('div');
        divElement.className = "info";
        divElement.innerHTML = " ⓘ <div class=tooltip>" + describeRole(roleName) + "</div>";
        item.nextSibling.after(divElement);
    });
}

const myparsedjson = JSON.parse(text2json(description_of_roles));

function describeRole(role) {
    for (var key in myparsedjson)
        if (myparsedjson[key][role])
            return myparsedjson[key][role];
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