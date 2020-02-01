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
    let teamConference;
    let big10 = document.getElementById("selectorBIG10");
    let big12 = document.getElementById("selectorBIG12");
    let acc = document.getElementById("selectorACC");
    let pac12 = document.getElementById("selectorPAC12");
    let sec = document.getElementById("selectorSEC");
    let atlarge1 = document.getElementById("selectorATLARGE1");
    let atlarge2 = document.getElementById("selectorATLARGE2");
    let atlarge3 = document.getElementById("selectorATLARGE3");
    for(let conferenceCursor = 0; conferenceCursor <= 19; conferenceCursor++) {
        for(let teamCursor = 0; teamCursor <= data.conferenceData[conferenceCursor]['Teams'].length - 1; teamCursor++) {
            teamName = data.conferenceData[conferenceCursor]['Teams'][teamCursor]["School"]+ " " + data.conferenceData[conferenceCursor]['Teams'][teamCursor]["Name"];
            teamConference = data.conferenceData[conferenceCursor]['ConferenceName'];
            addTeamToTeamLibrary();
            seperateTeamIntoSelector(teamConference, teamName);
        }  
    } 

    function seperateTeamIntoSelector(teamConference,teamName) {
        var opt = document.createElement('option');
        opt.value = teamName;
        opt.innerHTML = teamName;

        if(teamConference === "Big Ten") {
            big10.add(opt);
        }
        else if(teamConference === "Atlantic Coast") {
            acc.add(opt);
        }
        else if(teamConference === "SEC") {
            sec.add(opt);
        }
        else if(teamConference === "Pac-12") {
            pac12.add(opt);
        }
        else if(teamConference === "Big 12") {
            big12.add(opt);
        }
        else {
            let optalt1 = document.createElement("option");
            let optalt2 = document.createElement("option");
            optalt1.value = teamName;
            optalt1.innerHTML = teamName;
            optalt2.value = teamName;
            optalt2.innerHTML = teamName;
            atlarge1.add(opt);
            atlarge2.add(optalt1);
            atlarge3.add(optalt2);
        }
    }

    function addTeamToTeamLibrary() {
        teamLibrary[teamName] = new teamScore(teamName);
    }
}

function createLeagueParticipant(id) {
    let big10Team = document.getElementById("selectorBIG10").value;
    leagueData[id].push(big10Team);
    let big12Team = document.getElementById("selectorBIG12").value;
    leagueData[id].push(big12Team);
    let secTeam = document.getElementById("selectorSEC").value;
    leagueData[id].push(secTeam);
    let pac12Team = document.getElementById("selectorPAC12").value;
    leagueData[id].push(pac12Team);
    let accTeam = document.getElementById("selectorACC").value;
    leagueData[id].push(accTeam);
    let atlarge1Team = document.getElementById("selectorATLARGE1").value;
    leagueData[id].push(atlarge1Team);
    let atlarge2Team = document.getElementById("selectorATLARGE2").value;
    leagueData[id].push(atlarge2Team);
    let atlarge3Team = document.getElementById("selectorATLARGE3").value;
    leagueData[id].push(atlarge3Team);
}

function createLeague() {
    league = new League(leagueData);
}

let scoreAbleGames = {};
let teamLibrary = {};
let scoredGameLibrary = {};
let leagueData = {};
var data = new gameDictionary();
data.fetchGameData();
data.fetchConferenceData();
let league;
leagueData["participant1"] = [];
leagueData["participant2"] = [];

document.getElementById("generateTeam1").onclick = function(){createLeagueParticipant("participant1");};
document.getElementById("generateTeam2").onclick = function(){createLeagueParticipant("participant2");};
document.getElementById("createLeague").onclick = createLeague();

window.setTimeout(()=> {
    dataCreator();
    updateAllScores();
    // leagueData["participant1"] = [];
    // leagueData["participant2"] = [];
},500);

// Debug Code
window.setTimeout(()=> {
    console.log(teamLibrary);
    console.log(scoredGameLibrary);
    console.log(league);
    console.log(data.conferenceData);
},10000);