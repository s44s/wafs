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
			window.addEventListener("load", function(){
				var start = document.querySelector('section:first-of-type')
				start.classList.add('active')
			})

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
			// for (var i=0; i < sections.length; i++) {
			// 	sections[i].classList.remove("active")
			// }
			sections.forEach(function(element) {
				element.classList.remove('active')
			})
		},

		show: function (route){
			// show active section (hash /route)
			document.querySelector(route).classList.add('active')
		},

		toggle: function(route){
			// hide all sections
			this.hide()
			// hide all sections
			this.show(route)
		}
	}

	// Start the application
	app.init()
})()
