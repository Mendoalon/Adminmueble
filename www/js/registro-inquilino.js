//Funcion para crear inquilinos
$$(document).on('page:init', function () {
  $$('#btncrearinquilino').on('click', crearInquilino)
  $$('#mostrarinquilino').on('click', verInquilinos)
  $$('#btnMensajeInquil').on('click', msnCraedoInquilino)
});

//borrar mensaje de creado inquilino
function msnCraedoInquilino(e) {
  e.preventDefault();
  document.getElementById('formCreInquili').reset();
  $$('#mensajeInquilino').html(``);
}



function crearInquilino(e) {
  e.preventDefault();

  //creacion de autenticacion en firebase
  let password1 = $$('#pwsInquilino2').val();
  let password2 = $$('#pwsInquilino').val();

  if (password1 == password2) {
   let password = password1
    email = $$('#emailInquilino').val();

    console.log("entrada 1");

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {

        //Guardando los datos del inquilino.
        const datosInquilino = {
          nombreCompleto: $$('#nombreInquilino').val(),
          identificacion: $$('#identiInquilino').val(),
          telefono: $$('#telefInquilino').val(),
          email: email,
          email_propie: emailRol,
          rol: 'inquilino'
        }

        db.collection("Usuarios").doc(email).set(datosInquilino)
          .then(() => {

            document.getElementById('formCreInquili').reset();
            $$('#mensajeInquilino').html(`Inquilino creado correctamente`);
            verInquilinos();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;


        switch (errorCode) {
          case 'auth/weak-password' : $$('#mensajeInquilino').html(`La clave es muy devil`);
            break

          case 'auth/email-already-in-use': $$('#mensajeInquilino').html(`El correo ya se encuentra registrado`);
            break

          default: mensaje = $$('#mensajeInquilino').html(`Verifique los datos ingresados`);

        }


      });
  } else {
    $$('#mensajeInquilino').html(`Las contraseñas no son iguales`);
  }

}


//Funcion mostrar inquilinos
function verInquilinos() {
  let inquilino = '';
  //INICIO
  db.collection("Usuarios").where('email_propie', '==', emailRol).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      inquilino += `
          <div class="card">
          <div class="card-header"> <p><b> Tipo:</b> ${doc.data().nombreCompleto}</p></div>
          <div class="card-content card-content-padding text-align-center">
          <p><b> Dirección:</b> ${doc.data().identificacion} </p>
          <p><b> Matrícula:</b> ${doc.data().email} </p>
          </div>
          <div class="card-footer">
          <p class="row">
          <button class="col button button-small button-fill color-blue"> Editar </button>
          <button class="col button button-small button-fill color-red"> Eliminar</button>          
          </p>     
          </div>
        </div>
          `;
    })
    $$('#datosInquilino').html(inquilino);

  })

}


