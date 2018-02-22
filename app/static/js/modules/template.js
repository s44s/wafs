import dataCollected from './dataCollected.js'
import loader from './loader.js'

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

export default template
