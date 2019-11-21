let expect = chai.expect;
import gameDictionary from '../js/league.js';
import league from '../js/league.js';

describe('Basic league class functionality', () => {
    let participant = "Ethan";
    let team = "Purdue Boilermakers";

    let testLeague = new league(participant, team);

    it('League class is not undefined', () => {
        expect(testLeague).to.not.equal(undefined);
    });

    it('Class object getters correctly pulls data', () => {
        expect(testLeague.getParticpants()).to.equal("Ethan");
        expect(testLeague.getTeamNames()).to.equal("Purdue Boilermakers");
    });
});