//Funcion para traer datos de propietario
$$(document).on('page:init', function () {
  $$('#btnverPorpietario').on('click', verPropietario);

});

function verPropietario() {
  let datosPropi = '';

  

  //INICIO
  var docRef = colUsuarios.doc(emailRol);

  docRef.get().then((doc) => {
    if (doc.exists) {
      datosPropi = `
          <div class="card">
          <div class="card-header"> <p><b> Nombres: </b> ${doc.data().nombreCompleto}</p></div>
          <div class="card-content card-content-padding text-align-center">
          <p><b> Identificacion: </b> ${doc.data().identificacion} </p>
          <p><b> Correo: </b> ${doc.id} </p>
          <p><b> Direccion: </b> ${doc.data().direccion} </p>
          <p><b> Telefono: </b> ${doc.data().telefono} </p>
          </div>
          <div class="card-footer">
          <p class="row">
          <button id="editarPropi" class="col button button-small button-fill color-blue popup-open" data-popup=".popup-editarPrie"> Editar </button>
          <p><b> Rol: </b> ${doc.data().rol} </p>
        
          </p>     
          </div>
        </div>
          `;
      $$('#datosPropietario').html(datosPropi);

      $$('#nombres').val(doc.data().nombreCompleto);
      $$('#identificacion').val(doc.data().identificacion);
      $$('#direccion').val(doc.data().direccion);
      $$('#telefono').val(doc.data().telefono);
      $$('#correo').val(doc.id);


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }


  }).catch((error) => {
    console.log("Error getting document:", error);
  });

}


//Funcion para editar inquilino
$$(document).on('page:init', function () {
  $$('#btnactupropie').on('click', actualpropietario);
  $$('#btnMensajeActu').on('click', msnActuPropi);

});


function msnActuPropi(e) {
  e.preventDefault();
  $$('#msnnovedad').html(``);
  verPropietario();
}


//Funcion para editar propietario
function actualpropietario(event) {

  event.preventDefault();

  const datosActuPropi = {
    nombreCompleto: $$('#nombres').val(),
    identificacion: $$('#identificacion').val(),
    direccion: $$('#direccion').val(),
    telefono: $$('#telefono').val(),
  }

  if (!(datosActuPropi.nombreCompleto == "" || datosActuPropi.identificacion == "" || datosActuPropi.direccion == "" || datosActuPropi.telefono == "")) {

    colUsuarios.doc(emailRol).update(datosActuPropi).then(function () {
      console.log("Document successfully updated!");
      $$('#msnnovedad').html(`Se actualizaron su datos correctamente`);
      document.getElementById('formedicPropi').reset();
    })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  } else {
    $$('#msnnovedad').html(`Todos los campos son obligatorios`);
  }
}