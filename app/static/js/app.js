/* TODO
	MUST HAVE:
	- Schrijf een goede readme met features, usage, wishlist en sources
	- Aangeven dat ik gewerkt heb met tweede API https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2
	- Interaction Diagram maken + in readme plaatsen

	NICE TO HAVE:
	- songs in local storage opslaan
	- omschrijven naar ES6 https://es6.io/
*/

// Initialize application

import routes from './modules/routes.js'
import getTopTracks from './modules/getTopTracks.js'

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

	// Start the application
	app.init()
})()
