//  This class makes a League object that stores participants and their teams that they chose.
//  By Ethan Monnin
export default class League {
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

    getTeamAtPosition(participantKey,position) {
        return this.leagueDictionary[participantKey][position];
    }
}