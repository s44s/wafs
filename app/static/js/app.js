/* TODO
	MUST HAVE:
	- CSS
	- Afbeelding van applicatie toevoegen

	NICE TO HAVE:
	- license?
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
