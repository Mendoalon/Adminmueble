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
    { path: '/panel-propietario/', url: './page-propietario/panel-propietario.html', },
    { path: '/datos-propietario/', url: './page-propietario/datos-propietario.html', },
    { path: '/registro-inquilino/', url: './page-propietario/registro-inquilino.html', },
    { path: '/registro-inmuebles/', url: './page-propietario/registro-inmuebles.html', },
    { path: '/panel-inquilino/', url: './page-inquilino/panel-inquilino.html', },
    { path: '/datos-inquilino/', url: './page-inquilino/datos-inquilino.html', },
    { path: '/inmuebles-inquilino/', url: './page-inquilino/inmuebles-inquilino.html', },
    { path: '/novedad/', url: './page-propietario/novedad.html', },
    { path: '/about/', url: 'about.html', },

  ]

  // ... other parameters
});

var mainView = app.views.create('.view-main');

var db;
var colUsuarios;
var colInmuebles;
var colNovedades;
var emailRol;
var nombreUsuario;
var idEstado



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!!");

  db = firebase.firestore();
  colUsuarios = db.collection('Usuarios');
  colInmuebles = db.collection('Inmuebles');
  colNovedades = db.collection('Novedades');

  
});





