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
    $('#contact-form').submit(this.sendMailWrapper);
    $('#contact-link').on('click', view.contactIn);
    $('#close').on('click', view.contactOut);
  },

  sendMailWrapper: function(e){
    e.preventDefault();
    var formData = view.getFormData();
    if (model.prepMail(formData)){
      view.contactOut()
      view.dispOkay("Message sent successfully")
    }
    else{
      view.dispError("Oops, there was a problem. Please try again.")
    }
  }
}

function Model(){
  this.lasllaves = "w0G3bYcspMgrO8ewpZGelA";
  this.address = "https://mandrillapp.com/api/1.0/messages/send.json"
  this.i=0;
}

Model.prototype = {
  prepMail: function(mail){
    var data = {
      key: this.lasllaves,
      message: mail
    }
    return this.sendMail(data)
  },

  sendMail: function(data){
    var ajaxReq = $.ajax({
    url: this.address,
    type: "POST",
    data: JSON.stringify(data),
    }).done(function(r) {
      if(r[0].status=="sent"){
        return true
      }
      else{
        return false
      }
    })
  },

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
  },
  dispError: function(text){
    alert(text)
  },
  dispOkay: function(text){
    alert(text)
  }
}
