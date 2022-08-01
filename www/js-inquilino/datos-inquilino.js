//Funcion para traer datos de propietario
$$(document).on('page:init', function (e) {
  $$('#btnverInquilino').on('click', verInquilino);

});

function verInquilino() {
  let datosInqui = '';

  //INICIO
  var docRef = colUsuarios.doc(emailRol);

  docRef.get().then((doc) => {
    if (doc.exists) {
      datosInqui = `
          <div class="card">
          <div class="card-header"> <p><b> Nombres:</b> ${doc.data().nombreCompleto}</p>
          <p><span class="material-icons">person</span></p></div>
          <div class="card-content card-content-padding">
          <p><b> Identificación:</b> ${doc.data().identificacion} </p>
          <p><b> Dirección:</b> ${doc.data().direccion} </p>
          <p><b> Email:</b> ${doc.data().email} </p>
          <p><b> Teléfono:</b> ${doc.data().telefono} </p>
          </div>
          <div class="card-footer">
          <p class="row">
          <button id="editarPropi" class="col button button-small button-fill color-blue popup-open" data-popup=".popup-editarInqui"> Editar </button>
          </p>    
          <p><b> Rol:</b> ${doc.data().rol} </p> 
          </div>
        </div>
          `;
      $$('#datosInquilino').html(datosInqui);

      $$('#nombreinqui').val(doc.data().nombreCompleto);
      $$('#identificacionInqui').val(doc.data().identificacion);
      $$('#direccionInqui').val(doc.data().direccion);
      $$('#telefonoInqui').val(doc.data().telefono);
      $$('#correoinqui').val(doc.id);

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
  $$('#btnactuInqui').on('click', actualinquilino);
  $$('#btnMensajeActu').on('click', msnActuInqui);

});


function msnActuInqui(e) {
  e.preventDefault();
  $$('#msnnovedad').html(``);
  verInquilino();
}

//Funcion para editar Inquilino
function actualinquilino() {

  event.preventDefault();

  const datosActuInqui = {
    nombreCompleto: $$('#nombreinqui').val(),
    identificacion: $$('#identificacionInqui').val(),
    direccion: $$('#direccionInqui').val(),
    telefono: $$('#telefonoInqui').val(),
  }

  if (!(datosActuInqui.nombreCompleto == "" || datosActuInqui.identificacion == "" || datosActuInqui.direccion == "" || datosActuInqui.telefono == "")) {

    colUsuarios.doc(emailRol).update(datosActuInqui).then(function () {
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