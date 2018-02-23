import dataCollected from './dataCollected.js'
import loader from './loader.js'
import template from './template.js'

var getTopTracks = {
	init: function(username, period){

		var user = config.user
		if(username){
			user = username
		}

		var periodTime = '1month'
		if(period){
			periodTime = period
		}

		var url = this.url(user, periodTime)
		this.request(url)
		.then(getTopTracks.map)
		.then(dataCollected.topTracks)
		.catch(function(error){
			document.querySelector('#songs h1').innerHTML = "API ERROR...."
		})

	},
	url: function(username, period){

		/* https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object */
		var searchParams = new URLSearchParams()
		var search =  {
			method:'user.gettoptracks',
			user: username,
			api_key: config.api_key,
			format: 'json',
			limit: '10',
			period: period
		}
		Object.keys(search).forEach(key => searchParams.append(key, search[key]))
		return searchParams.toString()
	},
	request: function(url){
		loader.show()

		var promise = new Promise(function(resolve, reject){
			var request = new XMLHttpRequest()

			request.open('GET', 'http://ws.audioscrobbler.com/2.0/?' + url, true)

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					loader.hide()
					var data = JSON.parse(request.responseText)

					if(Object.keys(data)[0] === 'error') {
						document.querySelector('#songs h1').innerHTML = "There is an error"
						template.renderError(data)
					} else if(data.toptracks.track.length == 0) {
						document.querySelector('#songs h1').innerHTML = "There are no tracks found"
						template.renderError(data)
					}
					else {
						document.querySelector('#songs h1').innerHTML = "Mijn meest beluisterde songs"
						resolve(data)
					}
				} else {
				 // We reached our target server, but it returned an error
				 console.log('neeeee')
				 reject(data)
				}
			}

			request.onerror = function() {
				// There was a connection error of some sort
			}
			request.send()
		})

		return promise;
	},
	map: function(data) {
		//second HTTP request

		var allArtist =
		data.toptracks.track.map(function(element, index){
			return {
				id: index,
				artist: element.artist.name,
				track: element.name,
				playcount: element.playcount,
				image: element.image[3][Object.keys(element.image[3])[0]]
			}
		})
		getTopTracks.topTracksData = allArtist
		return allArtist

	},
	topTracksData: []
}

export default getTopTracks
