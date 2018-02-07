
// dit is een object literal pattern - van de meerdere var hebben wij een object van gemaakt / objecten met functies waar code in komen / komt de logica vd applicatie in / niet te veel functies in je methoden

// waarom hebben we van de var een object gemaakt

(function(){
var settings: {}

var app = {
  init:function(){
    position.set(); //je roept het objects obj.methode
  }
}

var position = {
  set: function(){
    helper.isNumber('1')
    this.check()
  },
  check: function(){
    var el = document.body
    var self = this
    this.set()

    el.addEvemtlistener('touchstart', function(){
      this.update()
    })
  },
  update: function(){},
  getDistance: function(){}
}

var gMap = {
  generate: function(){},
  update: function(){}
}

var helper = {
  isNumber: function(num){

  }, // dit is een helper object
  getElement: function(element){
    return document.querySelector(element)
  }, // dit is een helper object
  getElements:function(elements){
    return document.querySelectorAll(elements)
  },
}

var $ = helper.getElement()

// start de applicatie
app.init

})()
