function createTestSample(event) {
    aTest.style.display = 'none';
    let n_players = NumberOfPlayers.value;
    let testSize = parseInt(prompt('Test sample size?', '1000'));
    if (!testSize) return;

    let content = [];
    for (let i = 1; i <= n_players; ++i)
        content[0] += i.toString() + ',';
    content[0] += '\n';
    for (let i = 1; i <= testSize; ++i) {
        go(event);
        str = p1.innerText;
        str = str.replace(/\r?\n|\r/g, '___');
        str = str.replace(/\W/g, '');
        str = str.replace(/[0-9]/g, '');
        str = str.replace(/___/g, ',');
        content[i] = str + '\n';
    }
    let file1 = new File(content, 'filename', { type: 'text/csv;charset=UTF-8' });
    aTest.href = URL.createObjectURL(file1);
    aTest.style.display = 'inline';
}