// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="registro-inmuebles"]', function (e) {
  $$('#btncrearinmueble').on('click', crearInmueble)
  $$('#mostrarinmuebles').on('click', verInmuebles)

  $$('#emailPropie').val(emailRol);

});


//Funcion crear inmuebles
function crearInmueble() {


  let IdInmueble = $$('#matriInmueble').val();

  const datosInmueble = {
    tipo: $$('#tipoInmueble').val(),
    direccion: $$('#dirInmueble').val(),
    matricula: $$('#matriInmueble').val(),
    estado: $$('#estadoImueble').val(),
    email_propietario: emailRol,
    email_inquilino: $$('#emailInqui').val()
  }


  db.collection("Inmuebles").doc(IdInmueble).set(datosInmueble)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

}

//Funcion mostrar inmuebles
function verInmuebles() {
  let Inmuebles = '';
  //INICIO
  db.collection("Inmuebles").where('email_propietario', '==', emailRol ).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      Inmuebles += `
        <div class="card">
        <div class="card-header"> <p><b> Tipo:</b> ${doc.data().tipo}</p></div>
        <div class="card-content card-content-padding text-align-center">
        <p><b> Dirección:</b> ${doc.data().direccion} </p>
        <p><b> Matrícula:</b> ${doc.data().matricula} </p>
        <p><b> Email Propietario:</b> ${doc.data().email_propietario} </p>
        <p><b> Email Inquilino:</b> ${doc.data().email_inquilino} </p>
        <p><b> Estado:</b> ${doc.data().estado} </p>
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
    $$('#listaInmuebles').html(Inmuebles);

  })
}



//Funcion para crear inquilinos
$$(document).on('page:init', function (e) {
  $$('#btncrearinquilino').on('click', crearInquilino)
  $$('#mostrarinquilino').on('click', verInquilinos)

});

function crearInquilino() {


 //Guardando los datos del inquilino.
  let IdInquilino = $$('#emailInquilino').val();

  const datosInquilino = {
    nombreCompleto: $$('#nombreInquilino').val(),
    identificacion: $$('#identiInquilino').val(),
    telefono: $$('#telefInquilino').val(),
    email: $$('#emailInquilino').val(),
    email_propie: emailRol,
    rol: 'inquilino'
  }


  //creacion de autenticacion en firebase
  password1 = $$('#pwsInquilino2').val();
  password2 = $$('#pwsInquilino').val();

  if (password1 == password2) {
    password = password1
    email = $$('#emailInquilino').val();

    console.log("entrando ");

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

     console.log("finalizando ");

     db.collection("Usuarios").doc(IdInquilino).set(datosInquilino)
   .then(() => {
     console.log("Document successfully written!");
   })
   .catch((error) => {
     console.error("Error writing document: ", error);
   });

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
  } else {
    console.log('La cotraseña no son iguales');
  }

}



//Funcion mostrar inquilinos
function verInquilinos() {
  let inquilino = '';
  //INICIO
  db.collection("Usuarios").where('email_propie', '==', emailRol).get().then((querySnapshot) => {

    console.log(querySnapshot);
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
