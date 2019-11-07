import gameDictionary from '/js/fetchAPI.js';
import gameScorer from '/js/gameScorer.js';
import teamScore from '/js/teamScore.js';

function showFirstGame() {
    document.getElementById("homeTeamScore").innerHTML = data.gameData[500]['HomeTeamScore'];
    document.getElementById("awayTeamScore").innerHTML = data.gameData[500]['AwayTeamScore'];
    document.getElementById("homeTeamName").innerHTML = data.gameData[500]['HomeTeamName'];
    document.getElementById("awayTeamName").innerHTML = data.gameData[500]['AwayTeamName'];
    document.getElementById("homeTeamTotal").innerHTML = data.gameData[500]["HomeTeamName"] + ": " + winningTeam.getScore();
    document.getElementById("awayTeamTotal").innerHTML = data.gameData[500]["AwayTeamName"] + ": " + losingTeam.getScore();
}

function showFourTeams() {
    document.getElementById("team").innerHTML = data.conferenceData[0]['Teams'][0]['School'];
    document.getElementById("conference").innerHTML = data.conferenceData[0]['Teams'][0]['Conference'];
    document.getElementById("confwins").innerHTML = "Conference Wins: " + data.conferenceData[0]['Teams'][0]['ConferenceWins'];
    document.getElementById("conflosses").innerHTML = "Conference Losses: " + data.conferenceData[0]['Teams'][0]['ConferenceLosses'];
    document.getElementById("wins").innerHTML = "Wins: " + data.conferenceData[0]['Teams'][0]['Wins'];
    document.getElementById("losses").innerHTML = "Losses: " + data.conferenceData[0]['Teams'][0]['Losses'];

    document.getElementById("team1").innerHTML = data.conferenceData[1]['Teams'][0]['School'];
    document.getElementById("conference1").innerHTML = data.conferenceData[1]['Teams'][0]['Conference'];
    document.getElementById("confwins1").innerHTML = "Conference Wins: " + data.conferenceData[1]['Teams'][0]['ConferenceWins'];
    document.getElementById("conflosses1").innerHTML = "Conference Losses: " + data.conferenceData[1]['Teams'][0]['ConferenceLosses'];
    document.getElementById("wins1").innerHTML = "Wins: " + data.conferenceData[1]['Teams'][0]['Wins'];
    document.getElementById("losses1").innerHTML = "Losses: " + data.conferenceData[1]['Teams'][0]['Losses'];

    document.getElementById("team2").innerHTML = data.conferenceData[2]['Teams'][0]['School'];
    document.getElementById("conference2").innerHTML = data.conferenceData[2]['Teams'][0]['Conference'];
    document.getElementById("confwins2").innerHTML = "Conference Wins: " + data.conferenceData[2]['Teams'][0]['ConferenceWins'];
    document.getElementById("conflosses2").innerHTML = "Conference Losses: " + data.conferenceData[2]['Teams'][0]['ConferenceLosses'];
    document.getElementById("wins2").innerHTML = "Wins: " + data.conferenceData[2]['Teams'][0]['Wins'];
    document.getElementById("losses2").innerHTML = "Losses: " + data.conferenceData[2]['Teams'][0]['Losses'];

    document.getElementById("team3").innerHTML = data.conferenceData[3]['Teams'][0]['School'];
    document.getElementById("conference3").innerHTML = data.conferenceData[3]['Teams'][0]['Conference'];
    document.getElementById("confwins3").innerHTML = "Conference Wins: " + data.conferenceData[3]['Teams'][0]['ConferenceWins'];
    document.getElementById("conflosses3").innerHTML = "Conference Losses: " + data.conferenceData[3]['Teams'][0]['ConferenceLosses'];
    document.getElementById("wins3").innerHTML = "Wins: " + data.conferenceData[3]['Teams'][0]['Wins'];
    document.getElementById("losses3").innerHTML = "Losses: " + data.conferenceData[3]['Teams'][0]['Losses'];
}

document.getElementById("firstGameOfSeason").onclick = showFirstGame;
document.getElementById("pullFourTeams").onclick = showFourTeams;

var data = new gameDictionary();
data.fetchGameData();
data.fetchConferenceData();

let winningTeam = new teamScore("Eastern Michigan Eagles");
let losingTeam = new teamScore("Western Michigan Broncos");
let game;

window.setTimeout(()=> {
    let game0 = data.gameData[500];
    game = new gameScorer(game0,data.conferenceData);
    winningTeam.updateScore(game.score());
},2500);



