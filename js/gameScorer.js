//  This class takes a game and data from a college football conference.
//  It then decides which team won the game and how many points the were awarded.
//  It returns a object that contains the winning team and the points they earned.
//  By Ethan Monnin
export default class gameScorer {
    constructor(game,confData) {
        this.homeTeam = game['HomeTeamName'];
        this.homeTeamScore = game['HomeTeamScore'];
        this.awayTeam = game['AwayTeamName'];
        this.awayTeamScore = game['AwayTeamScore'];
        this.awayTeamKey = game['AwayTeam']
        this.homeTeamKey = game['HomeTeam']
        this.conferenceData = confData;
        this.isConferenceGame = this.checkTeamOne();
    }

    getWinningTeam() {
        if(this.homeTeamScore > this.awayTeamScore) {
            return this.homeTeam
        }
        else {
            return this.awayTeam;
        }
    }
    checkTeamOne() {
        for(let conferenceCursor = 0; conferenceCursor <= 19; conferenceCursor++) {
            for(let teamCursor = 0; teamCursor <= this.conferenceData[conferenceCursor]['Teams'].length - 1; teamCursor++) {
                if(this.homeTeamKey == this.conferenceData[conferenceCursor]['Teams'][teamCursor]['Key']) {
                    return this.checkTeamTwo(conferenceCursor, this.conferenceData[conferenceCursor]['ConferenceName']);
                }  
            }  
        } 
    }
    checkTeamTwo(conferenceIndex, conferenceName) {
        let conferenceCursor;
        let conferenceLimit;
        if(conferenceIndex == 0) {
            conferenceCursor = 0;
            conferenceLimit = 1;
        }
        else if(conferenceIndex == 19) {
            conferenceCursor = 19;
            conferenceLimit = 19;
        }
        else {
            conferenceLimit = conferenceIndex + 1;
            conferenceCursor = conferenceIndex - 1;
        }
        for(conferenceCursor; conferenceCursor <= conferenceLimit; conferenceCursor++) {
            for(let teamCursor = 0; teamCursor <= this.conferenceData[conferenceCursor]['Teams'].length - 1; teamCursor++) {
                if(this.awayTeamKey == this.conferenceData[conferenceCursor]['Teams'][teamCursor]['Key']) {
                    if(this.conferenceData[conferenceCursor]['ConferenceName'] == conferenceName) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    score() {
        let points = 5;
        if(this.isConferenceGame) {
            points = points + 5;
        }
        let winningTeam = this.getWinningTeam();
        let scoredGame = {"winningTeam" : winningTeam, "points": points};
        return scoredGame;
    }
}