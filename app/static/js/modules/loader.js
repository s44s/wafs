var loader =  {
	show: function() {
		document.querySelector('main').classList.add('loader')
	},
	hide: function() {
		document.querySelector('main').classList.remove('loader')
	}
}


export default loader
