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
      { path: '/registro-datos/', url: 'registro-datos.html',}, 
      { path: '/panel-usuario/', url: 'panel-usuario.html',},
      { path: '/about/', url: 'about.html', },  
    ]

    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var db;
var colPersonas;
var rol = 'propietario';


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
      console.log("Device is ready!");
      
      db = firebase.firestore();
      colPersonas = db.collection('Usuarios');
      //sembrado();

});


//function sembrado(){
  /* 
  console.log('Iniciando el sembrado de datos');
  var data ={nombre: 'Luis', apellido: 'Mendoza', rol:'admin'};
  elId = 'luis.mendoza0321@gmail.com';
  clave = 'admin1';
  firebase.auth().createUserWithEmailAndPassword(elId, clave)
  .then( function (){

  colUsuarios.doc(elId).set(data)
  .then(function(ok){ console.log('ok: ' + ok)})
  .catch(function(error){console.log(error)})

})
.catch(function(error){console.log(error)})
*/
//}



//   db.collection('persona').add(data)
//   .then(function(datosPersona){

//     console.log(`Los datos guardados ok ${datosPersona.id}`);
//   })


//   .catch(function(error){
//     console.log(error);
//   })
  

//   console.log('fin del sembrado de datos');
// };



// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    
    // console.log(e);   

});


