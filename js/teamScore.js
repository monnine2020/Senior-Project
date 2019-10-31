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
}