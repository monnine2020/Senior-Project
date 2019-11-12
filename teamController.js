import gameDictionary from '/js/fetchAPI.js';
import gameScorer from '/js/gameScorer.js';
import teamScore from '/js/teamScore.js';

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
    console.log(data.conferenceData);
    console.log(data.gameData);
},2500);