import template from './template.js'

var dataCollected = {
	topTracks: function(data){
		template.renderTopTracks(data)
	},
	topTracksDetails: function(data){
		template.renderTopTracksDetails(data)
	}
}


export default dataCollected
