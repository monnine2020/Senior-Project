export default class scoreGame {
    constructor(game) {
        this.game = game;
        this.homeTeam = getHomeTeam();
        this.homeTeamScore = getHomeTeamScore();
        this.awayTeam = getAwayTeam();
        this.awayTeamScore = getAwayTeamScore();
        this.winningTeam = this.getWinningTeam();
    }
    getHomeTeam(){
        return game['HomeTeamName'];
    }
    getHomeTeamScore(){
        return game['HomeTeamScore']
    }
    getAwayTeam(){
        return game['AwayTeamName']
    }
    getAwayTeamScore(){
        return game['AwayTeamScore']
    }
    getWinningTeam(){
        if(this.homeTeamScore > this.AwayTeamScore) {
            return HomeTeamName;
        }
        return AwayTeamName;
    }
    score(){
        points = 5;
        let scoredGame = {winningTeam, points}
        return scoredGame;
    }
}