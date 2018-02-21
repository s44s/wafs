/* TODO
	MUST HAVE:
	- Code omzetten naar modules

	- Schrijf een goede readme met features, usage, wishlist en sources
	- Interaction Diagram maken + in readme plaatsen
	- Flow Diagram checken + in readme plaatsen
	- Aangeven dat ik gewerkt heb met tweede API https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2

	NICE TO HAVE:
	- CSS toevoegen
	- omschrijven naar ES6 https://es6.io/
*/

// Initialize application

// Create local scope
(function(){

	"use strict"

	var app = {
		init: function(){
			routes.init()
			this.eventHandlers()
			//eventHandlers or global app stuff
		},
		eventHandlers: function(){
			var username = document.querySelector("#songs form input")
			var submit = document.querySelector("#songs button")
			var select = document.querySelector("#songs select")

			submit.addEventListener('click', function(e){
				e.preventDefault()
				getTopTracks.init(username.value.toString(), select.value)
			})
		}
	}

	// Handle routes & state
	var routes = {
		init: function(){

			routie({
				'home': function(){
					var route = location.hash
					template.toggle(route)
				},

				'songs': function(){
					var route = location.hash
					template.toggle(route)

					getTopTracks.init()
				},

				'songs/:id': function(id){
					var route = location.hash
					template.toggleID(route)

					getTrackInfo.init(id)

				}
			})
		}
	}

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
				user: username, //'flappahs',
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

  //map, filter, reduce
	var dataCollected = {
		topTracks: function(data){
			template.renderTopTracks(data)
		},
		topTracksDetails: function(data){
			template.renderTopTracksDetails(data)
		}
	}

	// Render / toggle section
	var template = {
		renderTopTracks: function (data) {

			var target = document.querySelector('#songs ul')

			var directives = {
			  image: {
			    src: function(params) {
						 return this.image
			    }
			  },
				id: {
					href: function(params) {
						return '#songs/' + this.id
					}
				}
			}

			Transparency.render(target, data, directives)
		},
		renderTopTracksDetails: function(dataTrack){
			var target = document.querySelector('#songDetail')

			if (typeof dataTrack.track.album != "undefined"){
				var directives = {
					image: {
						src: function(params) {
							return this.album.image[3][Object.keys(this.album.image[3])[0]]
						}
					}
				}
			}

			Transparency.render(target, dataTrack.track, directives)
		},
		renderError: function(data) {
			var target = document.querySelector('#songs ul')
			document.querySelector('#songs ul li').style.display = "none"


			Transparency.render(target, data)
		},
		hide: function(){
			var sections = document.querySelectorAll('section')
			sections.forEach(function(element) {
				element.classList.remove('active')
			})
		},
		show: function (route){
			// show active section (hash /route)
			document.querySelector(route).classList.add('active')
		},
		toggle: function(route){
			this.hide()
			this.show(route)
		},
		toggleID: function(route){
			var sections = document.querySelectorAll('section')
			sections.forEach(function(element) {
				element.classList.remove('active')
			})
			route = route.substring(0, 5) + 'Detail'
			document.querySelector(route).classList.add('active')

		}
	}

	var loader =  {
		show: function() {
			document.querySelector('main').classList.add('loader')
		},
		hide: function() {
			document.querySelector('main').classList.remove('loader')
		}
	}

	// Start the application
	app.init()
})()
