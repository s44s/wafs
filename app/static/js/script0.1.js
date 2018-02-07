// Initialize application
//console.log('global scope');

// Create local scope
(function(){

	//TO DO: use strict

	//console.log('local scope');
	var app = {
		//method (typeof = function)
		//key-value pairs
		init: function(){
			routes.init()
			//console.log('app initialised');
			//eventHandlers or global app stuff

		},
		//property
		rootElement: document.body
	}

	// Handle routes & state
	var routes = {
		init: function(){
			window.addEventListener("hashchange", function(){
				var route = location.hash
				sections.toggle(route)
				//console.log(location.hash)
			})
		}
	}

	// Render / toggle section
	var sections = {
		toggle: function(route){
			//In de toggle functie zorg je ervoor dat de gewenste sectie wordt getoond en alle andere secties (in dit geval één) worden verborgen
			if(route == "#best-practices"){
				document.getElementById("best-practices").style.display = "none"
				document.getElementById("home").style.display = "block"
				//console.log("best-practices!!!");
			}else{
				document.getElementById("home").style.display = "none"
				document.getElementById("best-practices").style.display = "block"
				//console.log("home!!!")
			}
		}
	}

	// Start the application
	app.init()
})()
