let expect = chai.expect;
import gameScorer from '../js/gameScorer.js';

describe('Basic scoring algorithm class functionality', () => {
	let playedGame = {
		'HomeTeamScore': 21,
		'HomeTeamName': "Purdue Boilermakers",
		'AwayTeamScore': 20,
		'AwayTeamName': "Indiana Hoosiers"};
	let fakeConferenceData = {
		"conferenceID" : 10, "ConferenceName": "Big Ten", "Teams": [
			{"School":"Purdue", "Name": "Boilermakers"},
			{"School":"Indiana", "Name": "Hoosiers"}
		]
	};
	let testGameScorer = new gameScorer(playedGame, fakeConferenceData);
	it('Class object is successfully created given a game', () => {
		expect(testGameScorer).to.not.equal(null);
	});
	it('Class object has correct attributes given game', () => {
		expect(testGameScorer.homeTeam).to.equal("Purdue Boilermakers");
		expect(testGameScorer.awayTeam).to.equal("Indiana Hoosiers");
        expect(testGameScorer.homeTeamScore).to.equal(21);
        expect(testGameScorer.awayTeamScore).to.equal(20);
	})
	it('Function for deciding winner of game works correctly', ()=> {
		let winningTeam = testGameScorer.getWinningTeam();
		expect(winningTeam).to.equal("Purdue Boilermakers");
	})
	it('Function for scoring correctly puts out data', () => {
		let returnedData = testGameScorer.score();
		expect(returnedData['winningTeam']).to.equal("Purdue Boilermakers");
		expect(returnedData['points']).to.equal(5);
	})
});