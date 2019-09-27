export default class gameData {
	constructor(){
		this.data = dataGen();
	}
	dataGen() {
        const response = fetch('https://api.sportsdata.io/v3/cfb/scores/json/GamesByDate/2019-SEP-7?key=9da2786fbdbd46a780193a8126deafb5')
        const scoreDataDictionary = await response.json();
        return scoreDataDictionary;
    }
}