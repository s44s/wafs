// maak een object vd dingen in de opdracht
// dit is een object literal - dit heeft key value pairs. in dit geval is init de key en function is de pair
// create local scope - dus alle code die er staat, staat in de scope van de IIFE

console.log('global scope');

(function(){

  //Initialize application
  var app = {
    //hieronder is een method
    init: function(){
      // console.log('app initialized')
      routes.init()
    }
  }

  // app.color = 'red'

  // Handle routes and states
  var routes = {
    init: function(){
      // whats in the hash? / wat zit er in de link/# ?
      var route = 'I don\'t know yet?' // hier moet miss de hash cange
      sections.toggle(route)
    }
  }

  // Renden toggle sections
  var sections = {
    toggle: function(route){
      console.log(route)

    }
  }

  // Start the application
  //app.init app = object, init = method
  app.init()
})()
