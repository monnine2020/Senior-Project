export default class league {
    constructor(leagueDictionary) {
        this.participants = Object.keys(leagueDictionary);
        this.leagueDictionary = leagueDictionary;
    }
    getParticpants() {
        return this.participants;
    }
    getTeamsOfParticipant(participantKey) {
        return this.leagueDictionary[participantKey];
    }
}