let expect = chai.expect;
import gameDictionary from '../js/fetchAPI.js';

describe('Basic fetchAPI class functionality', () => {
    var testGameDictionary = new gameDictionary();
    beforeEach(function(done) {
        this.timeout(3000);
        setTimeout(done, 200);
      });
    it('Class successfully creates gameData dictionary', () => {
        expect(testGameDictionary.gameData).to.not.equal(null);
    });
    it('Class successfully creates conferenceData dictionary', () => {
        expect(testGameDictionary.conferenceData).to.not.equal(null);
    });

    testGameDictionary.fetchGameData();
    testGameDictionary.fetchConferenceData();

    it('gameData is correctly updated', () => {
        expect(testGameDictionary.gameData[0]['HomeTeamScore']).to.equal(14);
        expect(testGameDictionary.gameData[0]['AwayTeamScore']).to.equal(12);
        expect(testGameDictionary.gameData[0]['HomeTeamName']).to.equal('Florida Gators');
        expect(testGameDictionary.gameData[0]['AwayTeamName']).to.equal('Miami Hurricanes');
    });
    it('conferenceData is correctly updated', () => {
        expect(testGameDictionary.conferenceData[0]['Teams'][0]['School']).to.equal("Temple");
        expect(testGameDictionary.conferenceData[0]['Teams'][0]['Conference']).to.equal("American Athletic - East");
        expect(testGameDictionary.conferenceData[0]['Teams'][0]['ConferenceWins']).to.not.equal(null);
        expect(testGameDictionary.conferenceData[0]['Teams'][0]['ConferenceLosses']).to.not.equal(null);
        expect(testGameDictionary.conferenceData[0]['Teams'][0]['Wins']).to.not.equal(null);
        expect(testGameDictionary.conferenceData[0]['Teams'][0]['Losses']).to.not.equal(null);
    });
});