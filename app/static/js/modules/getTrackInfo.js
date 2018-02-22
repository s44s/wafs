import getTopTracks from './getTopTracks.js'
import loader from './loader.js'
import dataCollected from './dataCollected.js'

var getTrackInfo = {
	init: function(id) {
		var data = getTopTracks.topTracksData
		var specificTrack = getTrackInfo.filter(data, id)
		var url = this.url(specificTrack)
		this.request(url)
	},
	filter: function(data, id) {

		var data =
		data.filter(function(el){
			return Number(el.id) == Number(id)
		})
		return data
	},
	url: function(trackData){
		/* https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object */
		// var array = data.map(function(item){
			var searchParams = new URLSearchParams()
			var search =  {
				method:'track.getInfo',
				artist: trackData[0].artist,
				track: trackData[0].track,
				user: config.user,
				api_key: config.api_key,
				format: 'json'
			}

			Object.keys(search).forEach(key => searchParams.append(key, search[key]))
			return searchParams.toString()

		// })
		return array
	},
	request: function(url) {
		loader.show()

			var requestTrack = new XMLHttpRequest()
			requestTrack.open('GET', 'http://ws.audioscrobbler.com/2.0/?' + url, true)

			requestTrack.onload = function() {
				if (requestTrack.status >= 200 && requestTrack.status < 400) {
					loader.hide()
					var dataTrack = JSON.parse(requestTrack.responseText)
					dataCollected.topTracksDetails(dataTrack)
				} else {
				 // We reached our target server, but it returned an error
				 reject(data)
				}
			}

			requestTrack.onerror = function() {
				// There was a connection error of some sort
			}
			requestTrack.send()
	}
}


export default getTrackInfo
