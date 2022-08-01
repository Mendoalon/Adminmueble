// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$('#ingboton').on('click', fnLogin);
});

var  rolUsuario;

function fnLogin() {

  email = $$('#logemail').val();
  password = $$('#logcontrasena').val();

  console.log('entrada 1');
  //login valida si usuario existe. 
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('entrada 2');
      //validacion para verificar si el usuario es admin, propietario o inquilino.
      var docRef = colUsuarios.doc(email);

      docRef.get().then((doc) => {
        console.log('entrada 3');
        if (doc.exists) {
          //console.log("Document data:", doc.data());
          nombreUsuario = (doc.data().nombreCompleto);
          estado = (doc.data().estado);
          rolUsuario = doc.data().rol;
          

          if (rolUsuario == "inquilino" && estado == "activo") {
            emailRol = email;
            mainView.router.navigate('/panel-inquilino/');
          } else if (rolUsuario == "propietario" && estado == "activo") {
            emailRol = email;
            mainView.router.navigate('/panel-propietario/' );
          } else if(rolUsuario == "admin" && estado == "activo"){
            emailRol = email;
            mainView.router.navigate('/panel-admin/');
          }else{
            $$('#mensajelogin').html(`Estado: ${estado}, Comuníquese con su administrador`);
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

        case 'auth/user-not-found': mensaje = 'El correo es inválido';
          break

        default: mensaje = 'Intente de nuevo';

      }

      $$('#mensajelogin').html(`Hay un error: ${mensaje}`);
    });

    
}
