//Funcion para crear Inmueble
$$(document).on('page:init', function () {
  $$('#btncrearinmueble').on('click', crearInmueble);
  $$('#mostrarinmuebles').on('click', verInmuebles);
  $$('#btnMensajeInmueb').on('click', msnCreadoInmueble)
});

function msnCreadoInmueble(e) {
  e.preventDefault();
  $$('#msnInmueb').html(``);
  document.getElementById('formCreInmueb').reset();
  
  verInmuebles(e);
}

//Funcion crear inmuebles
function crearInmueble(e) {
  e.preventDefault();

  let IdInmueble = $$('#matriInmueble').val();

  const datosInmueble = {
    tipo: $$('#tipoInmueble').val(),
    direccion: $$('#dirInmueble').val(),
    matricula: $$('#matriInmueble').val(),
    estado: $$('#estadoImueble').val(),
    email_propietario: emailRol,
    email_inquilino: $$('#emailInqui').val()
  }


  colInmuebles.doc(IdInmueble).set(datosInmueble)
    .then(() => {
      document.getElementById('formCreInmueb').reset();
      $$('#msnInmueb').html(`Inmueble creado correctamente`);
      console.log("Document successfully written!fffg");

    })
    .catch(() => {
      $$('#msnInmueb').html(`Error al crear inmueble`);
      console.log("Document successfully written!");
    });

}

//Funcion mostrar inmuebles
function verInmuebles(e) {
  e.preventDefault();

  let Inmuebles = '';
  //INICIO
  colInmuebles.where('email_propietario', '==', emailRol).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      Inmuebles += `
         <div class="card">
         <div class="card-header"> <p><b> Tipo:</b> ${doc.data().tipo}</p></div>
         <div class="card-content card-content-padding text-align-center">
         <p><b> Dirección:</b> ${doc.data().direccion} </p>
         <p><b> Matrícula:</b> ${doc.data().matricula} </p>
         <p><b> Email Inquilino:</b> ${doc.data().email_inquilino}</p>
         <p><b> Estado:</b> ${doc.data().estado} </p>
         </div>
         <div class="card-footer">
         <p class="row">
         <button class="col button button-fill color-blue"> Editar </button>
         <button class="col button button-fill color-red"> Eliminar </button>
          <button  id=${doc.data().email_inquilino} class="col button button-fill color-gray btnNovedad popup-open" href="#" data-popup=".popup-novedad"> Novedad </button>
          
        </p>       
             
         </div>
       </div>
         `;   
    })
    $$('#listaInmuebles').html(Inmuebles);

     $$('.btnNovedad').on('click', function () {
      
      fnId(this.id, this.idd);
 
  })


})

}
