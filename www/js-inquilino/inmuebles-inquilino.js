//Funcion para crear Inmueble
$$(document).on('page:init', function () {

  $$('#inmueblesInquilino').on('click', InmubleInqui);
  
});

function InmubleInqui() {

    let Inmuebles = '';
    //INICIO
    colInmuebles.where('email_inquilino', '==', emailRol ).get().then((querySnapshot) => {
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
          <button class="col button button-small button-fill color-blue">Generar Novedad </button>
                  
          </p>     
          </div>
        </div>
          `;

      })
      $$('#verInmuebleInqui').html(Inmuebles);
    })
  }

