import gameDictionary from '/js/fetchAPI.js';
import gameScorer from '/js/gameScorer.js';
import teamScore from '/js/teamScore.js';
import league from '/js/league.js'

function dataCreator() {
    createAllTeams();
    genDecidedListOfGames();
    scoreAllTeams();
}

function genDecidedListOfGames() {
    let game;
    for(let gameCursor = 0; gameCursor < Object.keys(data.gameData).length; gameCursor++) {
        if(gameIsComplete(gameCursor)) {
            generateValidGame(gameCursor);
        }
        else {
            generateNotValidGame(gameCursor);
        }
    } 


    function gameIsComplete(gameCursor) {
        return data.gameData[gameCursor]["GameEndDateTime"] !== null;
    }

    function generateValidGame(gameCursor) {
        game = data.gameData[gameCursor];
        scoreAbleGames[gameCursor] = game;
    }

    function generateNotValidGame(gameCursor) {
        scoreAbleGames[gameCursor] = "Not Complete";
    }
}

function updateAllScores() {
    let scoredGame;
    let teamName;
    for(let scoredGameCursor = 0; scoredGameCursor < Object.keys(scoredGameLibrary).length; scoredGameCursor++) {
        if(gameExists(scoredGameCursor)) {
            scoredGame = scoredGameLibrary[scoredGameCursor];
            if(teamIsValid()) {
                updateTeamScore();
            }
        }
    }

    function gameExists(scoredGameCursor) {
        return scoredGameLibrary[scoredGameCursor] !== undefined;
    }

    function updateTeamScore() {
        teamName = scoredGame["winningTeam"];
        teamLibrary[teamName].updateScore(scoredGame);
    }

    function teamIsValid() {
        return scoredGame["winningTeam"] in teamLibrary;
    }
}

function scoreAllTeams() {
    let scoredGame;
    let game;
    for(let gameCursor = 0; gameCursor < Object.keys(scoreAbleGames).length; gameCursor++) {
        if(gameIsComplete(gameCursor)){
            scoreAndStoreGame(gameCursor);
        }
    } 

    function scoreAndStoreGame(gameCursor) {
        game = scoreAbleGames[gameCursor];
        scoredGame = new gameScorer(game, data.conferenceData);
        scoredGameLibrary[gameCursor] = scoredGame.score();
    }

    function gameIsComplete(gameCursor) {
        return scoreAbleGames[gameCursor] !== "Not Complete";
    }
}

function createAllTeams() {
    let teamName;
    let selector = document.getElementById("teamSelector");
    for(let conferenceCursor = 0; conferenceCursor <= 19; conferenceCursor++) {
        for(let teamCursor = 0; teamCursor <= data.conferenceData[conferenceCursor]['Teams'].length - 1; teamCursor++) {
            teamName = data.conferenceData[conferenceCursor]['Teams'][teamCursor]["School"]+ " " + data.conferenceData[conferenceCursor]['Teams'][teamCursor]["Name"];
            addTeamToTeamLibrary();
            updateTeamSelector();
        }  
    } 


    function updateTeamSelector() {
        var opt = document.createElement('option');
        opt.value = teamName;
        opt.innerHTML = teamName;
        selector.add(opt);
    }

    function addTeamToTeamLibrary() {
        teamLibrary[teamName] = new teamScore(teamName);
    }
}

function getScoreOfTeam() {
    let teamName = document.getElementById("teamSelector").value;
    let points = teamLibrary[teamName].getScore();
    document.getElementById("points").innerHTML= "Total Points: " + points;
}

let scoreAbleGames = {};
let teamLibrary = {};
let scoredGameLibrary = {};
var data = new gameDictionary();
data.fetchGameData();
data.fetchConferenceData();

//document.getElementById("teamGetter").onclick = getScoreOfTeam;

window.setTimeout(()=> {
    dataCreator();
    updateAllScores();
},2000);

// Debug Code
// window.setTimeout(()=> {
//     console.log(teamLibrary);
//     console.log(scoredGameLibrary)
// },10000);