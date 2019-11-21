export default class league {
    constructor(participantName, teamName) {
        this.participants = participantName;
        this.teams = teamName;
    }
    getParticpants() {
        return this.participants;
    }
    getTeamNames() {
        return this.teams;
    }
}