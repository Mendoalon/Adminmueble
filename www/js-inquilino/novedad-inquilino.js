$$(document).on('page:init', function (e) {
  e.preventDefault();
  $$('#btnmostrarnovedadInquil').on('click', verNovedadInqui);
  
});


//Funcion para ver novedad.
function verNovedadInqui() {
let novedadesInqui = '';
//INICIO
db.collection('Novedades').where("EmailReceptor", "==", emailRol)
.get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    novedadesInqui += `
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
  $$('#listaNovedadInqui').html(novedadesInqui);

 
});

}



