import gameData from '/fetchAPI.js';

function showGame() {
    document.getElementById("homeTeamScore").innerHTML = data.dataDictionary[0]['HomeTeamScore'];
    document.getElementById("awayTeamScore").innerHTML = data.dataDictionary[0]['AwayTeamScore'];
    document.getElementById("homeTeamName").innerHTML = data.dataDictionary[0]['HomeTeamName'];
    document.getElementById("awayTeamName").innerHTML = data.dataDictionary[0]['AwayTeamName'];
}

document.getElementById("pullData").onclick = showGame;

var data = new gameData();
data.dataGen();