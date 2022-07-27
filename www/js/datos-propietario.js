//Funcion para traer datos de propietario
$$(document).on('page:init', function (e) {
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
          <div class="card-header"> <p><b> nombre:</b> ${doc.data().nombre}</p></div>
          <div class="card-content card-content-padding text-align-center">
          <p><b> identificacion:</b> ${doc.data().identificacion} </p>
          <p><b> direccion:</b> ${doc.data().direccion} </p>
          </div>
          <div class="card-footer">
          <p class="row">
          <button id="editarPropi" class="col button button-small button-fill color-blue popup-open" data-popup=".popup-about"> Editar </button>
                    
          </p>     
          </div>
        </div>
          `;
          $$('#datosPropietario').html(datosPropi);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    
}).catch((error) => {
    console.log("Error getting document:", error);
});


}