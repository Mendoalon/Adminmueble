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
          direccion: $$('#direccionInquilino').val(),
          telefono: $$('#telefInquilino').val(),
          email: email,
          estado:"activo",
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
          <div class="card-header"> <p><b> Nombres: </b> ${doc.data().nombreCompleto}</p></div>
          <div class="card-content card-content-padding text-align-center">
          <p><b> Identificación: </b> ${doc.data().identificacion} </p>
          <p><b> Teléfono: </b> ${doc.data().telefono}</p>
          <p><b> Email: </b> ${doc.id} </p>
          <p><b> Rol: </b> ${doc.data().rol} </p>
          </div>
          <div class="card-footer">
          <p class="row">
          <button class="col button button-small button-fill color-blue btneditar popup-open" data-popup=".popup-estado-inquilino" id=${doc.id}>CAMBIAR</button>
          </p>    
          <p><b> Estado: </b> ${doc.data().estado} </p> 
          </div>
        </div>
          `;
          
    })
    $$('#datosInquilino').html(inquilino);


    //BOTON DESHABILITAR INQUILINO
     $$('.btneditar').on('click', function () { 
    idEstado = this.id;
      
 })
})
}


//Funcion para cambiar estado de inquilino MODAL
$$(document).on('page:init', function (e) {
  e.preventDefault();
  $$('#btnEstadoInquilino').on('click', cambioEstadoInquilino);
  $$('#btnmsnEstadiinqui').on('click', msnEStadoInquilino);
});


// function fnIdEstado(id){
//   var idEstado = id;
// } 


function cambioEstadoInquilino(e) {
  e.preventDefault();
  
  let id = idEstado;
  let estadoInquilino = $$('#estadoInquilino').val();
 colUsuarios.doc(id).update({ estado: estadoInquilino })  .then(() => {
    $$('#msnnovedad').html(`Estado cambiado a: ${estadoInquilino} correctamente`);
   verInquilinos();
 } ).catch((error) => {
   console.error("Error writing document: ", error);
 } );     

} 


// ////prueba de funciones



function msnEStadoInquilino(e) {
  e.preventDefault();
  $$('#msnnovedad').html(``);
  
}
