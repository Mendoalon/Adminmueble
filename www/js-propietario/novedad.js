$$(document).on('page:init', function (e) {
  e.preventDefault();
  $$('#btncrearNovedad').on('click', fncrearNovedad);
  $$('#btnmsnNovedad').on('click', msnNovedad);
  
});

function msnNovedad(e) {
  e.preventDefault();
  document.getElementById('formCreNovedad').reset();
  $$('#msnnovedad').html(``);
}


var EmailRecep;
function  fnId(id){
  EmailRecep = id;

}
 
function fncrearNovedad(e) {
  e.preventDefault();            
  let today = new Date();
  const datosNovedad = {
    Titulo: $$('#tituloNovedad').val(),
    Descripcion: $$('#descriNovedad').val(),
    Estado: $$('#estadoNovedad').val(),
    Solicitante: nombreUsuario,
    EmailEmisor: emailRol,
    EmailReceptor: EmailRecep,
    Fecha: today.toLocaleString(), 
  }

  
  if (!(datosNovedad.Titulo == "" || datosNovedad.Descripcion =="" || datosNovedad.Estado == "")) {
    colNovedades.add(datosNovedad).then(docRef => {
      $$('#msnnovedad').html(`Novedad creada correctamente`);  
      console.log("Novedad creada correctamente");
      document.getElementById('formCreNovedad').reset();
    })
    .catch(e => $$('#msnnovedad').html(`No se pudo crear la novedad`));
  }else{
    $$('#msnnovedad').html(`Todos los campos son obligatorios`);
  } 

}



$$(document).on('page:init', function (e) {
  e.preventDefault();
  $$('#btnmostrarnovedad').on('click', verNovedad);
  
});


//Funcion para ver novedad.
function verNovedad() {
let novedades = '';
//INICIO
db.collection('Novedades').where("EmailEmisor", "==", emailRol)
.get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    novedades += `
       <div class="card">
       <div class="card-header"> <p><b> Solicitante: </b> ${doc.data().Solicitante}</p></div>
       <div class="card-content-padding ">
       <p><b> Titulo: </b> ${doc.data().Titulo}</p>
       <p><b> Descripción: </b> ${doc.data().Descripcion}</p>
       <p><b> Dirección: </b> ${doc.data().EmailEmisor} </p>
       <p><b> Estado: </b> ${doc.data().Estado} </p>
       </div>
       <div class="card-footer">
       <p class="row">
       <button class="col button button-fill color-blue"> Responder </button>
        <p><b> Fecha :</b> ${doc.data().Fecha}</p>
      </p>         
       </div>
     </div>
       `;

  })
  $$('#listaNovedad').html(novedades);


});

}


 //Funcion para eliminar inmueble
 $$(document).on('page:init', function (e) {
  e.preventDefault();
  $$('#btneliminarInmueble').on('click', EliminarInmueble);
  
});

var IdInmueble;
function  fnIdImueble(id){
   IdInmueble = id;
}

  function EliminarInmueble(event) {
    event.preventDefault();
   colInmuebles.doc(IdInmueble).delete().then(() => {
    $$('#msnnovedad').html(`Inmueble eliminado correctamente`);
   }).catch(() => {
     console.log("Error removing document");
   });
} //FIN

