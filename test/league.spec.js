let expect = chai.expect;
import league from '../js/league.js';

describe('Basic league class functionality', () => {
    let testDictionary = {"Ethan": ["Purdue Boilermakers", "Clemson Tigers"]
        ,"Paxton":["Oregon Ducks", "Cincinatti Bearcats"]};

    let testLeague = new league(testDictionary);

    it('League class is not undefined', () => {
        expect(testLeague).to.not.equal(undefined);
    });

    it('Class object getters correctly pulls data', () => {
        expect(testLeague.getParticpants()).to.have.members(['Ethan','Paxton']);
        expect(testLeague.getTeamsOfParticipant("Ethan")).to.have.members(["Purdue Boilermakers", "Clemson Tigers"]);
        expect(testLeague.getTeamsOfParticipant("Paxton")).to.have.members(["Cincinatti Bearcats", "Oregon Ducks"]);
        expect(testLeague.getTeamsOfParticipant("Bill")).to.equal(undefined);
    });

    it('Class function of getting team at position correctly pulls data', () => {
        expect(testLeague.getTeamAtPosition("Paxton",0)).to.equal("Oregon Ducks");
        expect(testLeague.getTeamAtPosition("Ethan",0)).to.equal("Purdue Boilermakers");
        expect(testLeague.getTeamAtPosition("Ethan",1)).to.equal("Clemson Tigers");
        expect(testLeague.getTeamAtPosition("Ethan",2)).to.equal(undefined);
    });
});