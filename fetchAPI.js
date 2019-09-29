export default class gameData {
	constructor(){
		this.dataDictionary;
	}
	async dataGen() {
        const response = await fetch('https://api.sportsdata.io/v3/cfb/scores/json/GamesByDate/2019-SEP-7?key=9da2786fbdbd46a780193a8126deafb5');
        const scoreDataDictionary = await response.json();
        this.dataDictionary = scoreDataDictionary;
    }
}
