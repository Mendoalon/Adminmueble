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