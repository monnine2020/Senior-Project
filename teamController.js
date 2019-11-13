import gameDictionary from '/js/fetchAPI.js';
import gameScorer from '/js/gameScorer.js';
import teamScore from '/js/teamScore.js';

function dataCreator() {
    createAllTeams();
    genDecidedListOfGames();
    scoreAllTeams();
}

function genDecidedListOfGames() {
    let game;
    for(let gameCursor = 0; gameCursor < Object.keys(data.gameData).length; gameCursor++) {
        console.log(gameCursor);
        if(data.gameData[gameCursor]["GameEndDateTime"] !== null) {
            game = data.gameData[gameCursor];
            scoreAbleGames[gameCursor] = game;
        }
        else {
            scoreAbleGames[gameCursor] = "Not Complete";
        }
    } 
}

function updateAllScores() {
    console.log("Test4");
    let scoredGame;
    let teamName;
    for(let scoredGameCursor = 0; scoredGameCursor < Object.keys(scoredGameLibrary).length; scoredGameCursor++) {
        if(scoredGameLibrary[scoredGameCursor] !== undefined) {
            scoredGame = scoredGameLibrary[scoredGameCursor];
            if(scoredGame["winningTeam"] in teamLibrary) {
                teamName = scoredGame["winningTeam"];
                teamLibrary[teamName].updateScore(scoredGame);
            }
        }
    }
}

function scoreAllTeams() {
    console.log("Test3");
    let scoredGame;
    let game;
    for(let gameCursor = 0; gameCursor < Object.keys(scoreAbleGames).length; gameCursor++) {
        if(scoreAbleGames[gameCursor] !== "Not Complete"){
            game = scoreAbleGames[gameCursor];
            scoredGame = new gameScorer(game,data.conferenceData);
            scoredGameLibrary[gameCursor] = scoredGame.score();
        }
    } 
}

function createAllTeams() {
    let teamName;
    for(let conferenceCursor = 0; conferenceCursor <= 19; conferenceCursor++) {
        for(let teamCursor = 0; teamCursor <= data.conferenceData[conferenceCursor]['Teams'].length - 1; teamCursor++) {
            teamName = data.conferenceData[conferenceCursor]['Teams'][teamCursor]["School"]+ " " + data.conferenceData[conferenceCursor]['Teams'][teamCursor]["Name"];
            teamLibrary[teamName] = new teamScore(teamName);
        }  
    } 
}

let scoreAbleGames = {};
let teamLibrary = {};
let scoredGameLibrary = {};
var data = new gameDictionary();
data.fetchGameData();
data.fetchConferenceData();

window.setTimeout(()=> {
    dataCreator();
    updateAllScores();
},2000);

window.setTimeout(()=> {
    console.log(teamLibrary);
    console.log(scoredGameLibrary)
},10000);