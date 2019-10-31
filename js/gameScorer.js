export default class gameScorer {
    constructor(game) {
        this.homeTeam = game['HomeTeamName'];
        this.homeTeamScore = game['HomeTeamScore'];
        this.awayTeam = game['AwayTeamName'];
        this.awayTeamScore = game['AwayTeamScore'];
    }
    getWinningTeam() {
        if(this.homeTeamScore > this.awayTeamScore) {
            return this.homeTeam
        }
        else {
            return this.awayTeam;
        }
    }
    score(){
        let points = 5;
        let winningTeam = this.getWinningTeam();
        let scoredGame = {"winningTeam" : winningTeam, "points": points};
        return scoredGame;
    }
}