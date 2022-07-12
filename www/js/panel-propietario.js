// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="panel-propietario]', function (e) {

  // si es propietario => mostrar los datos del propietario.
  direccionUsuario, identificacionUsuario, telefonoUsuario;


  datosCard = `
  <div class="card">
        <div class="card-header">${nombreUsuario} ${apellidoUsuario}</div>
          <div class="card-content card-content-padding">
            <div class="row">
              <div class="col-100">${direccionUsuario}</div>
              <div class="col-50">${identificacionUsuario}</div>
              <div class="col-50">${telefonoUsuario}</div>
            </div>
          </div>
        <div class="card-footer">ROL: ${rolUsuario}</div>
      </div>
      `;


  
  $$('#datosCard').html(datosCard);

});

console.log(datosCard);