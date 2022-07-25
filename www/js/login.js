// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$('#ingboton').on('click', fnLogin);
});

var nombreUsuario, apellidoUsuario, direccionUsuario, identificacionUsuario, rolUsuario, telefonoUsuario;

function fnLogin() {

  email = $$('#logemail').val();
  password = $$('#logcontrasena').val();

  //login valida si usuario existe. 
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      //validacion para verificar si el usuario es admin, propietario o inquilino.
      var docRef = colUsuarios.doc(email);

      docRef.get().then((doc) => {

        if (doc.exists) {
          //console.log("Document data:", doc.data());

          nombreUsuario = doc.data().nombre;
          apellidoUsuario = doc.data().apellido;
          direccionUsuario = doc.data().direccion;
          identificacionUsuario = doc.data().identificacion;
          rolUsuario = doc.data().rol;
          telefonoUsuario = doc.data().telefono;

          if (rolUsuario == "admin") {
            emailRol = email;
            mainView.router.navigate('/panel-admin/');
          } else if (rolUsuario == "propietario") {
            emailRol = email;
            mainView.router.navigate('/panel-propietario/');
          } else {
            emailRol = email;
            mainView.router.navigate('/panel-inquilino/');
          }

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      switch (errorCode) {
        case 'auth/wrong-password': mensaje = 'La clave es incorrecta';
          break

        case 'auth/user-not-found': mensaje = 'El correo es invalido';
          break

        default: mensaje = 'Intente de nuevo';

      }

      $$('#logMensaje').html(`Hay un error: ${mensaje}`);
    });

    
}

console.log(emailRol);