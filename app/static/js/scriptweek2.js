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

			//2.4 staat routie hier op de juiste plek?
			routie({
				'home': function(){
					request.getData()
					var route = location.hash
					template.toggle(route)
				},

				'songs': function(){
					console.log('songsss pagina')
					request.getData()
					var route = location.hash
					template.toggle(route)
				},
				'songs/ID': function(){
					//2.5 Zorg ervoor dat je met behulp van de router kan doorlinken naar detail sections van de items uit de lijst met items opgehaald uit de API.
				}
			})
			this.handleEvents()
		},

		//2.4 kan ik de onload hier laten staan?
		handleEvents: function(){
			window.addEventListener("load", function(){
				var start = document.querySelector('section:first-of-type')
				var songs = document.querySelector('#songs')
				start.classList.add('active')
				history.pushState("", document.title, window.location.pathname)
			})
		}
	}

	var request = {
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
			var request = new XMLHttpRequest()
			request.open('GET', 'http://ws.audioscrobbler.com/2.0/?' + this.url(), true)

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					var data = JSON.parse(request.responseText)
					template.render(data)
				} else {
				 // We reached our target server, but it returned an error
				}
			}

			request.onerror = function() {
				// There was a connection error of some sort
			}
			request.send()
		}
	}

	// Render / toggle section
	var template = {
		render: function (data) {
			console.log(data)
			console.log(data.toptracks.track)
			var songs = document.querySelector('#songs ul')
			var toptracks = data.toptracks.track

			Transparency.render(songs, toptracks)
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
