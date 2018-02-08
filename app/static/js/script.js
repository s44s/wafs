// maak een object vd dingen in de opdracht
// dit is een object literal - dit heeft key value pairs. in dit geval is init de key en function is de pair
// create local scope - dus alle code die er staat, staat in de scope van de IIFE

'use strict';

//console.log('global scope');
(function(){
  //Initialize application
  var app = {
    //hieronder is een method
    init: function(){
      //console.log('app initialized');
      //console.log(location.hash);
      routes.init(); // hier in moet de hashchange
    }
  }

  // Handle routes and states
  var routes = {
    init: function(){
      // whats in the hash? / wat zit er in de link/# ?
      var route = location.hash
      sections.toggle(route)

      route != '' ? sections.toggle(route) : window.location.hash = '#start'

      window.addEventListener('hashchange', function() {
          sections.toggle(window.location.hash) // pakt de section met de # waar de link (aan het einde) naar veranderd
      })
    }
  }


  // Render toggle sections
  var sections = {
    toggle: function(route){

      var elements = document.querySelectorAll('section');

      // loop-ed door alle sections heen & adds class .hidden
      elements.forEach(function(el){
        '#' + el.id === route ? el.classList.remove('hidden') : el.classList.add('hidden')
      })
    }
  }

  // Start the application
  //app.init app = object, init = method
  app.init()
})()
