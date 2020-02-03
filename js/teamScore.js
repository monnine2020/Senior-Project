//  This class is used to store and update the total amount of points an individual football team has.
//  By Ethan Monnin
export default class teamScore {
    constructor(teamName) {
        this.totalScore= 0;
        this.teamName = teamName;
    }
    updateScore(scoredGame) {
        let gameScore = scoredGame["points"];
        this.totalScore = this.totalScore + gameScore;
    }
    getScore() {
        return this.totalScore;
    }
    getTeamName() {
        return this.teamName;
    }
}