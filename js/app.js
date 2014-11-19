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
    $('#contact-form').submit(this.sendMail);
    $('#contact-link').on('click', view.contactIn);
    $('#close').on('click', view.contactOut);
  },

  sendMail: function(e){
    e.preventDefault();
    console.log("SendMail function activated")
    var formData = view.getFormData();
    debugger
  }
}

function Model(){
  this.lasllaves = "w0G3bYcspMgrO8ewpZGelA";
  this.i=0;
}

Model.prototype = {
}

function View(){}

View.prototype = {
  contactIn: function(){
    $("#contact-container").fadeIn()
  },

  contactOut: function(){
    $("#contact-container").fadeOut()
  },

  getFormData: function(){
    var formRaw=$('form').serializeArray();

    var formData = {
      name:formRaw[0].value,
      from_email:formRaw[1].value,
      html:"<p>"+formRaw[2].value+"</p>",
      text:formRaw[2].value,
      subject:"Nuevo contacto: "+formRaw[1].value,
      to:[{email:"alosada@gmail.com"}]
    };

    return formData
  }

}
