import gameDictionary from '/js/fetchAPI.js';
import gameScorer from '/js/gameScorer.js';
import teamScore from '/js/teamScore.js';
import League from '/js/league.js'

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

function updateLeagueAndPage() {
    league = new League(leagueData);
    updatePage();
}

function addPart1() {
    let teamName = document.getElementById("teamSelector").value;
    leagueData["participant1"].push(teamName);
    updateLeagueAndPage();
}
function addPart2() {
    let teamName = document.getElementById("teamSelector").value;
    leagueData["participant2"].push(teamName);
    updateLeagueAndPage();
}

function updatePage() {
    let teamName;
    let points;
    let team1Total;
    let team2Total;
    let part1teams = league.getTeamsOfParticipant("participant1");
    let part2teams = league.getTeamsOfParticipant("participant2");

    teamName = part1teams[0];
    points = teamLibrary[teamName].getScore();
    document.getElementById("team1part1").innerHTML = teamName;
    document.getElementById("team1part1score").innerHTML = points;
    team1Total = points;

    teamName = part2teams[0];
    points = teamLibrary[teamName].getScore();
    document.getElementById("team1part2").innerHTML = teamName;
    document.getElementById("team1part2score").innerHTML = points;
    team2Total = points;

    teamName = part1teams[1];
    points = teamLibrary[teamName].getScore();
    document.getElementById("team2part1").innerHTML = teamName;
    document.getElementById("team2part1score").innerHTML = points;
    team1Total = team1Total + points;

    teamName = part2teams[1];
    points = teamLibrary[teamName].getScore();
    document.getElementById("team2part2").innerHTML = teamName;
    document.getElementById("team2part2score").innerHTML = points;
    team2Total = team2Total + points;

    document.getElementById("team1total").innerHTML = team1Total;
    document.getElementById("team2total").innerHTML = team2Total;
}

let scoreAbleGames = {};
let teamLibrary = {};
let scoredGameLibrary = {};
let leagueData = {};
var data = new gameDictionary();
data.fetchGameData();
data.fetchConferenceData();
let league;

document.getElementById("addTeam1").onclick = addPart1;
document.getElementById("addTeam2").onclick = addPart2;

window.setTimeout(()=> {
    dataCreator();
    updateAllScores();
    leagueData["participant1"] = [];
    leagueData["participant2"] = [];
},2000);

// Debug Code
window.setTimeout(()=> {
    console.log(teamLibrary);
    console.log(scoredGameLibrary);
    console.log(league);
},10000);