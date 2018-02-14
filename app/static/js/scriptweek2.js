/* TODO
	- songs/:id werkend maken
	- een tweede HTTP request
	- map, filter, reduce toepassen
*/


// Initialize application

// Create local scope
(function(){

	"use strict"

	var app = {
		init: function(){
			routes.init()
			//eventHandlers or global app stuff
		}
	}

	// Handle routes & state
	var routes = {
		init: function(){

			routie({
				'home': function(){
					var route = location.hash
					template.toggle(route)
					api.getTrackData()

				},

				'songs': function(){
					var route = location.hash
					template.toggle(route)
					api.getData().then(function(data){
						template.render(data)

					})//.catch(err)
				},
				'songs/:id': function(id){
					//dataCollected.id
					//2.5 Zorg ervoor dat je met behulp van de router kan doorlinken naar detail sections van de items uit de lijst met items opgehaald uit de API.
				},
				'*': function() {

				}
			})
			this.handleEvents()
		},

		//TODO: omschrijven naar * van routie
		handleEvents: function(){
			window.addEventListener("load", function(){
				var start = document.querySelector('section:first-of-type')
				var songs = document.querySelector('#songs')
				start.classList.add('active')
				history.pushState("", document.title, window.location.pathname)
			})
		}
	}

	var api = {
		url: function(){
			/* https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object */
			var searchParams = new URLSearchParams()
			var search =  {
				method:'user.gettoptracks',
				user: config.user,
				api_key: config.api_key,
				format: 'json',
				limit: '5',
				period: '1month'
			}
			Object.keys(search).forEach(key => searchParams.append(key, search[key]))
			return searchParams.toString()
		},
		getData: function(){
			var promise = new Promise(function(resolve, reject){
				var request = new XMLHttpRequest()
				request.open('GET', 'http://ws.audioscrobbler.com/2.0/?' + api.url(), true)

				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						var data = JSON.parse(request.responseText)
						//template.render(data)
						resolve(data)
						//dataCollected.allStories(data)
					} else {
					 // We reached our target server, but it returned an error
					 //reject(data)
					}
				}

				request.onerror = function() {
					// There was a connection error of some sort
				}
				request.send()
			})

			return promise;
		},
		urlTrack: function(artists, tracks){
					/* https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object */
					var array = []
					artists.forEach(function(item, index){
						var searchParams = new URLSearchParams()
						var search =  {
							method:'track.getInfo',
							artist: item,
							track: tracks[index],
							user: config.user,
							api_key: config.api_key,
							format: 'json'
						}

						Object.keys(search).forEach(key => searchParams.append(key, search[key]))
						array.push(searchParams.toString())
					})
					return array
		},
		getTrackData: function() {
			//second HTTP request
			this.getData().then(function(data){

			var artist = []
				data.toptracks.track.forEach(function(element) {
					artist.push(element.artist.name)
				})

			var trackName = []
				data.toptracks.track.forEach(function(element) {
					trackName.push(element.name)
				})

			var allUrl = api.urlTrack(artist, trackName)


				allUrl.forEach(function(url){
					var requestTrack = new XMLHttpRequest()
					requestTrack.open('GET', 'http://ws.audioscrobbler.com/2.0/?' + url, true)

					requestTrack.onload = function() {
						if (requestTrack.status >= 200 && requestTrack.status < 400) {
							var dataTrack = JSON.parse(requestTrack.responseText)
							//template.render(data)
							console.log(dataTrack)
							//dataCollected.allStories(data)
						} else {
						 // We reached our target server, but it returned an error
						 //reject(data)
						}
					}

					requestTrack.onerror = function() {
						// There was a connection error of some sort
					}
					requestTrack.send()


				})
			})
		}
	}


  //map, filter, reduce
	// var dataCollected = {
	// 	allStories: function(data){
	// 		//template.render()
  //
	// 	},
	// 	filter: function(data, keyword) {
	// 		data.filter(function(item){
	// 			return item.title.contains(keyword) //contains klopt niet
	// 		})
	// 	}
	// }

	// Render / toggle section
	var template = {
		render: function (data) {
			console.log(data)
			// console.log(data.toptracks.track)
			var target = document.querySelector('#songs ul')
			var toptracks = data.toptracks.track

			Transparency.render(target, toptracks)
			//3.3 Genereer ook detailsections van de individuele items uit de lijst.
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
		}
	}

	// Start the application
	app.init()
})()
