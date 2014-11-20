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
    $('#contact-link').on('click', view.containerIn);
    $('#portfolio-link').on('click', view.containerIn);
    $('.close').on('click', view.close);
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
  containerIn: function(e){
    e.preventDefault()
    var prefix = e.target.id.split('-')[0]
    $("#"+prefix+"-container").fadeIn()
  },

  contactOut: function(){
    $("#contact-container").fadeOut()
  },

  close: function(e){
    e.preventDefault()
    var parent = $('#'+e.target.parentElement.id)
    parent.fadeOut()
    setTimeout(function(){parent.removeClass('error okay')},1000)
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
    $('#alert-box').addClass("error").fadeIn()
    $('#alert-box span').text(text)

  },

  dispOkay: function(text){
    $('#alert-box').addClass("error").fadeIn()
    $('#alert-box span').text(text)
  },

  play: function() {
    this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 5000;
    this.scene = new THREE.Scene();

    // table
    for ( var i = 0; i < text.length; i += 3 ) {
      var letter = document.createElement( 'div' );
      letter.className = 'letter';
      letter.textContent = text[i];
      var object = new THREE.CSS3DObject( letter );
      object.position.x = ( text[ i + 1 ] * 140 ) - 2200;
      object.position.y = - ( text[ i + 2 ] * 180 ) + 750;
      scene.add( object );

      objects.push( object );

      var object = new THREE.Object3D();
      object.position.x = ( text[ i + 1 ] * 140 ) - 2200;
      object.position.y = - ( text[ i + 2 ] * 180 ) + 750;

      targets.table.push( object );
    }
    // Sphere
    var vector = new THREE.Vector3();
    for ( var i = 0, l = objects.length; i < l; i ++ ) {
      var phi = Math.acos( -1 + ( 2 * i ) / l );
      var theta = Math.sqrt( l * Math.PI ) * phi;
      var object = new THREE.Object3D();
      object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
      object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
      object.position.z = 800 * Math.cos( phi );
      vector.copy( object.position ).multiplyScalar( 2 );
      object.lookAt( vector );
      targets.sphere.push( object );
    }
    // helix
    var vector = new THREE.Vector3();
    for ( var i = 0, l = objects.length; i < l; i ++ ) {
      var phi = i * 0.175 + Math.PI;
      var object = new THREE.Object3D();
      object.position.x = 900 * Math.sin( phi );
      object.position.y = - ( i * 16 ) + 900;
      object.position.z = 900 * Math.cos( phi );
      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;
      object.lookAt( vector );
      targets.helix.push( object );
    }

 /  / doubleHelix
    var vector = new THREE.Vector3();
    for ( var i = 0, l = objects.length; i < l; i ++ ) {
      if (i%2===1){
        var phi = i * 0.175 + 2*Math.PI;
      }
      else {
        var phi = i * 0.175 + Math.PI;
      }
      var object = new THREE.Object3D();
      object.position.x = 450 * Math.sin( phi );
      object.position.y = - ( i * 64 ) + 1800;
      object.position.z = 450 * Math.cos( phi );
      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;
      object.lookAt( vector );
      targets.doubleHelix.push( object );
    }

    // grid
    for ( var i = 0; i < objects.length; i ++ ) {
      var object = new THREE.Object3D();
      object.position.x = ( ( i % 5 ) * 400 ) - 800;
      object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
      object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
      targets.grid.push( object );
    }

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    document.getElementById( 'container' ).appendChild( renderer.domElement );

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', render );

    transform( targets.sphere, 5000 );
    }
}
