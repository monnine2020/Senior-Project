let expect = chai.expect;
import teamScore from '../js/teamScore.js';

describe('Basic class functionality', () => {
	let testTeam = new teamScore("Team One");
	it('Class object correctly made given a team name', () => {
		expect(testTeam.teamName).to.equal("Team One");
		expect(testTeam.totalScore).to.equal(0);
	});

	it('Class object getters correctly work', () => {
		expect(testTeam.getTeamName()).to.equal("Team One");
		expect(testTeam.getScore()).to.equal(0);
	});

	it('Update Score function works correctly with given winning team', () => {
		let testGame = {"points": 10, "winningTeam": "Team One"};
		testTeam.updateScore(testGame);
		expect(testTeam.getScore()).to.equal(10);
	});
});