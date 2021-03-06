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
    for(let conferenceCursor = 0; conferenceCursor <= 19; conferenceCursor++) {
        for(let teamCursor = 0; teamCursor <= data.conferenceData[conferenceCursor]['Teams'].length - 1; teamCursor++) {
            teamName = data.conferenceData[conferenceCursor]['Teams'][teamCursor]["School"]+ " " + data.conferenceData[conferenceCursor]['Teams'][teamCursor]["Name"];
            teamConference = data.conferenceData[conferenceCursor]['ConferenceName'];
            addTeamToTeamLibrary();
            seperateTeamIntoSelector(teamConference);
        }  
    } 

    function seperateTeamIntoSelector(teamConference) {
        let currentSelector = selectors[teamConference];

        if(teamConference === "Big Ten") {
            populateSelector(currentSelector);
        }
        else if(teamConference === "Atlantic Coast") {
            populateSelector(currentSelector);
        }
        else if(teamConference === "SEC") {
            populateSelector(currentSelector);
        }
        else if(teamConference === "Pac-12") {
            populateSelector(currentSelector);
        }
        else if(teamConference === "Big 12") {
            populateSelector(currentSelector);
        }
        else {
            populateAtLargeSelector();
        }
    }

    function populateSelector(currentSelector) {
        var opt = document.createElement('option');
        opt.value = teamName;
        opt.innerHTML = teamName;
        currentSelector.add(opt);
    }

    function populateAtLargeSelector() {
        let opt1 = document.createElement("option");
        let opt2 = document.createElement("option");
        let opt3 = document.createElement("option");
        opt1.value = teamName;
        opt1.innerHTML = teamName;
        opt2.value = teamName;
        opt2.innerHTML = teamName;
        opt3.value = teamName;
        opt3.innerHTML = teamName;
        selectors["atlarge1"].add(opt1);
        selectors["atlarge2"].add(opt2);
        selectors["atlarge3"].add(opt3);
    }
    function addTeamToTeamLibrary() {
        teamLibrary[teamName] = new teamScore(teamName);
    }
}

function updateHTML() {
    for(let participantID = 0; participantID < teamsGenerated; participantID++) { 
        let participantString = "participant" + (participantID + 1);
        updateParticipantInfo(participantString, participantID);
        updateTotalHtml(participantID);
        let participantTotal = 0;
        for(let teamCursor = 0; teamCursor < 8;teamCursor++) {
            let { teamPosition, teamScorePosition } = generateGridLocationStrings(teamCursor, participantID);
            let teamName = league.getTeamAtPosition(participantString ,teamCursor);
            let teamScore = teamLibrary[teamName].getScore();
            document.getElementById(teamPosition).innerHTML = teamName;
            document.getElementById(teamScorePosition).innerHTML = teamScore;
            participantTotal = participantTotal + teamScore;
        }
        updateTotalTeamPoints(participantID, participantTotal);
    }

    function updateParticipantInfo(participantString, participantID) {
        document.getElementById(participantString).innerHTML = participantString.toUpperCase();
        document.getElementById("teampoints" + (participantID + 1)).innerHTML = "Points";
    }

    function updateTotalHtml(participantID) {
        document.getElementById("part" + (participantID + 1) + "Total").innerHTML = "Team Total:";
    }

    function generateGridLocationStrings(teamCursor, participantID) {
        let end = teamCursor + 1;
        let start = participantID + 1;
        let teamPosition = "T" + start + end;
        let teamScorePosition = "T" + start + end + "S";
        return { teamPosition, teamScorePosition };
    }

    function updateTotalTeamPoints(participantID, participantTotal) {
        document.getElementById("part" + (participantID + 1) + "TotalPoints").innerHTML = participantTotal;
    }
}


function createLeagueParticipant(id) {
    teamsGenerated = teamsGenerated + 1;
    leagueData[id].push(selectors["Big Ten"].value);
    leagueData[id].push(selectors["Big 12"].value);
    leagueData[id].push(selectors["Pac-12"].value);
    leagueData[id].push(selectors["SEC"].value);
    leagueData[id].push(selectors["Atlantic Coast"].value);
    leagueData[id].push(selectors["atlarge1"].value);
    leagueData[id].push(selectors["atlarge2"].value);
    leagueData[id].push(selectors["atlarge3"].value);
    if(teamsGenerated >= 2) {
        document.getElementById("generateTeam1").onclick = function(){};
        document.getElementById("generateTeam2").onclick = function(){};
    }
}

function createLeague() {
    league = new League(leagueData);
    updateHTML();
}

var scoreAbleGames = {};
var teamLibrary = {};
var scoredGameLibrary = {};
var leagueData = {};
leagueData["participant1"] = [];
leagueData["participant2"] = [];
var data = new gameDictionary();
data.fetchGameData();
data.fetchConferenceData();
var league;
var teamsGenerated = 0;
var selectors = {"Big Ten" : document.getElementById("selectorBIG10"),
                "Big 12" : document.getElementById("selectorBIG12"),
                "Atlantic Coast" : document.getElementById("selectorACC"),
                "Pac-12" : document.getElementById("selectorPAC12"),
                "SEC": document.getElementById("selectorSEC"),
                "atlarge1" : document.getElementById("selectorATLARGE1"),
                "atlarge2" : document.getElementById("selectorATLARGE2"),
                "atlarge3" : document.getElementById("selectorATLARGE3")};

document.getElementById("generateTeam1").onclick = function(){createLeagueParticipant("participant1");};
document.getElementById("generateTeam2").onclick = function(){createLeagueParticipant("participant2");};
document.getElementById("createLeague").onclick = function(){createLeague();};
document.getElementById("reloadPage").onclick = function(){document.location.reload();}

window.setTimeout(()=> {
    dataCreator();
    updateAllScores();
},50);

// Debug Code
window.setTimeout(()=> {
    console.log(teamLibrary);
    console.log(scoredGameLibrary);
    console.log(league);
    console.log(data.conferenceData);
},5000);