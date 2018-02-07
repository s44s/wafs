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
			//what's in the hash? - haschange eventlistener
			window.addEventListener("hashchange", function(){
				var route = location.hash
				sections.toggle(route)
				//console.log(location.hash)
			})
		}
	}

	// Render / toggle section
	var sections = {
		hide: function(){
			var sections = document.querySelectorAll('section')
			for (var i=0; i < sections.length; i++) {
				sections[i].classList.remove("active")
			}
		},

		toggle: function(route){
			//1. hide all sections
			this.hide()
			//2. show active section (hash /route)
			document.querySelector(route).classList.add('active')
		}
	}

	// Start the application
	app.init()
})()
