import template from './template.js'
import getTopTracks from './getTopTracks.js'
import getTrackInfo from './getTrackInfo.js'

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

export default routes
