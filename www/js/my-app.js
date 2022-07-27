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
    { path: '/index/', url: 'index.html', },
    { path: '/registro/', url: 'registro.html', },
    { path: '/registro-datos/', url: 'registro-datos.html', },
    { path: '/panel-admin/', url: 'panel-admin.html', },
    { path: '/panel-propietario/', url: 'panel-propietario.html', },
    { path: 'panel-inquilino/', url: 'panel-inquilino.html', },
    { path: '/registro-inmuebles/', url: 'registro-inmuebles.html', },
    { path: '/registro-inquilino/', url: 'registro-inquilino.html', },
    { path: '/datos-propietario/', url: 'datos-propietario.html', },
    { path: '/about/', url: 'about.html', },
  ]

  // ... other parameters
});

var mainView = app.views.create('.view-main');

var db;
var colUsuarios;
var colInmuebles;
var emailRol;



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!!");

  db = firebase.firestore();
  colUsuarios = db.collection('Usuarios');
  colInmuebles = db.collection('Inmuebles');
  
});


