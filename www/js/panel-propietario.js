// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="registro-inmuebles"]', function (e) {
  $$('#btncrearinmueble').on('click', crearInmueble)
})


function crearInmueble() {
   
console.log('entrando a la funcion');

  let IdInmueble = matricula = $$('#matriInmueble').val();

  const datosInmueble = {
    tipo : $$('#tipoInmueble').val(),
    direccion : $$('#dirInmueble').val(),
   matricula : $$('#matriInmueble').val(),
   estado : $$('#estadoImueble').val(),
    email_propietario : $$('#emailPropie').val(),
    email_inquilino : $$('#emailInqui').val()
  }
 

   db.collection("Inmuebles").doc(IdInmueble).set(datosInmueble)
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});



}

