$$(document).on('page:init', function (e) {
  $$('#mostrarinquilino').on('click', verInquilinos)

});


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