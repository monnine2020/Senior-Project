//  This class fetches data and stores it in a useable dictionary
//
//  By Ethan Monnin
export default class gameDictionary {
	constructor(){
        this.gameData;
        this.conferenceData;
    }
    //Use Commented out code for a live server fetch.
	async fetchGameData() {
        //const response = await fetch('https://api.sportsdata.io/v3/cfb/scores/json/Games/2019?key=9da2786fbdbd46a780193a8126deafb5');
        const response = await fetch('./data/201920FBSGames.json');
        const data = await response.json();
        this.gameData = data;
    }

    async fetchConferenceData() {
        //const response = await fetch('https://api.sportsdata.io/v3/cfb/scores/json/LeagueHierarchy?key=9da2786fbdbd46a780193a8126deafb5');
        const response = await fetch('./data/ConferenceData1920.json');
        const data = await response.json();
        this.conferenceData = data;
    }
}
