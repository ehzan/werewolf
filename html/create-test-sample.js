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