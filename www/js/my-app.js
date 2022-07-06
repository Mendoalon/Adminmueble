// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      { path: '/index/', url: 'index.html',},
      { path: '/registro/', url: 'registro.html',},  
      { path: '/panel-usuario/', url: 'panel-usuario.html',},
      { path: '/about/', url: 'about.html', },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    //  console.log("Device is ready!");

  

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    
    // console.log(e);   

});



$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$('#regboton').on('click', fnRegistrar);
});

function fnRegistrar(){
  password1 = $$('#regcontrasena').val();
  password2 = $$('#reg-conf-contrasena').val();

  if (password1 ==password2) {
    password = $$('#regcontrasena').val();
  }else{
    console.log('La cotraseña no son iguales');
  } 
  email = $$('#regemail').val(); 
  

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

    $$('#regMensaje').html('Su registro es correcto');

    mainView.router.navigate('/index/')

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    // ..

    switch(errorCode){
      case 'auth/weak-password': mensaje = 'La clave es muy devil';
      break

      case 'auth/email-already-in-use': mensaje = 'El correo ya se encuentra registrado';
      break

      default: mensaje = 'Intente de nuevo';

    }
    
    $$('#regMensaje').html(`Hay un error: ${mensaje}`);

  });
  

}




// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$('#ingboton').on('click', fnLogin); 
});


function fnLogin(){

  email = $$('#logemail').val();
  password = $$('#logcontrasena').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    $$('#logMensaje').html('Su registro es correcto');

    mainView.router.navigate('/panel-usuario/');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;


    console.log(errorCode);
    console.log(errorMessage);

    switch(errorCode){
      case 'auth/wrong-password': mensaje = 'La clave es incorrecta';
      break

      case 'auth/user-not-found': mensaje = 'El correo es invalido';
      break

      default: mensaje = 'Intente de nuevo';

    }
    
    $$('#logMensaje').html(`Hay un error: ${mensaje}`);
  });
}





