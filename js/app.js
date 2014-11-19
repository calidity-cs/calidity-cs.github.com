window.addEventListener('load',function(){
controller = new Controller
view = new View
model = new Model
controller.initialize(model, view)
})

function Controller(){}

Controller.prototype = {
  initialize: function(model, view){
    this.model = model
    this.view = view
    this.bindListeners()
  },

  bindListeners: function(){
    //$('#contact-form').submit(sendMail);
    $('#contact-link').on('click', view.contactIn);
    $('#close').on('click', view.contactOut);
  }
}

function Model(){
  this.lasllaves = "w0G3bYcspMgrO8ewpZGelA";
  this.i=0;
}

Model.prototype = {}

function View(){}

View.prototype = {
  contactIn: function(){
    $("#contact-container").fadeIn()
  },

  contactOut: function(){
    $("#contact-container").fadeOut()
  }

}
