/* promises = alternatief voor callbacks
	 voordeel van callbacks:
	 - error (catch) kun je beter afhandelen
	 - bij een promise heb je de mogelijkheid om te returnen, je kan de then chainen
	 - je kan meerdere promises aanmaken
*/

var obtainClown = function() {
	var promise = new Promise(function(resolve, reject)){
		document.body.addEventListener('click', function(event){
			//click in de body kan in de toekomst gebeuren = asynchroon event
			var clown = {
				name: 'pipo',
				shoeSize: 72
			}
			resolve(clown)
		})

	})

	return promise
}

obtainClown().then(function(data){
	//new Promise() aan de hand van de data van de eerste
	var array = [1, 2, 3, 4, 5]
	var newArr = array.map(function(item){
			return item * 3
	})

	return newArr
	// console.log(data)
	// return data

}).then(function(newArr){
	// console.log(data)

	var even = newArr.filter(function(item){
		return item % 2 == 0
	})

	conole.log(even)

}).catch() //alle errors opvangen


/* */
var numbers = [1, 2, 3, 4, 5]
var mapped = numbers.map(function(item, index){
	return item * 2 * index
})

var filtered = numbers.filter(function(item){
	return item % 2 == 0
})

var objs = [{een: 1}, {twee: 2}]
// var newObjs = objs.map((obj, i)
// )

//accumalor = houdt bij wat de huidige waarde is
var reduced = numbers.reduce(function(accumalor, item){
	return accumulator + item //alle waardes bij elkaar op geteld
})


// urlTrack: function(){
// 	/* https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object */
// 	var searchParams = new URLSearchParams()
// 	var search =  {
// 		method:'track.getInfo',
// 		artist: 'AC/DC',
// 		track: data,
// 		user: config.user,
// 		api_key: config.api_key,
// 		format: 'json'
// 	}
// 	Object.keys(search).forEach(key => searchParams.append(key, search[key]))
// 	return searchParams.toString()
// }
// http://www.html5rocks.com/en/tutorials/es6/promises/
