$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$('#regboton').on('click', fnRegistrar)
})

function fnRegistrar() {
  password1 = $$('#regcontrasena').val();
  password2 = $$('#reg-conf-contrasena').val();

  if (password1 == password2) {
    password = $$('#regcontrasena').val();
    email = $$('#regemail').val();
  } else {
    console.log('La cotraseña no son iguales');
  }



  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      $$('#regMensaje').html('Su registro es correcto');

      mainView.router.navigate('/registro-datos/')

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      // ..

      switch (errorCode) {
        case 'auth/weak-password': mensaje = 'La clave es muy devil';
          break

        case 'auth/email-already-in-use': mensaje = 'El correo ya se encuentra registrado';
          break

        default: mensaje = 'Intente de nuevo';

      }

      $$('#regMensaje').html(`Hay un error: ${mensaje}`);

    });
}


$$(document).on('page:init', '.page[data-name="registro-datos"]', function (e) {
  $$('#btnFinReg').on('click', fnRegistrofin);

});

function fnRegistrofin() {

  //identificador  
  elId = email;

  //recupero los datos del formulario.
  nombre = $$('#regNombreFin').val();
  apellido = $$('#regApellidoFin').val();
  identificacion = $$('#regIdentificacionFin').val();
  telefono = $$('#regTelefonoFin').val();
  direccion = $$('#regDireccionFin').val();

  //contrucion del json
  var datos = {
    nombre: nombre,
    apellido: apellido,
    identificacion: identificacion,
    telefono: telefono,
    direccion: direccion,
    rol: rol
  }

  colUsuarios.doc(elId).set(datos)
    .then(function (ok) { console.log('Registro de usuario ok:' ) });
  mainView.router.navigate('/panel-propietario/')
    .catch(function (error) { console.log(`Error intentar registrar usuario: ${error}`) });

}



