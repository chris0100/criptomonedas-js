//Definicion de selectores
const formulario = document.querySelector('#formulario');
const moneda = document.querySelector('#moneda');
const criptomoneda = document.querySelector('#criptomoneda');
const cotizadorApi = new API('207fe95397f8c5586b1264bfcfc742f66de535d061739a5bf4c0bcddb0182588');
const ui = new Interfaz();


//////////////////////////////////////////////////////////
//se activa cuando se presione el boton de cotizar
//////////////////////////////////////////////////////////
formulario.addEventListener('submit', e => {
    e.preventDefault();
    const monedaSeleccionada = moneda.options[moneda.selectedIndex].value;
    const criptomonedaSeleccionada = criptomoneda.options[criptomoneda.selectedIndex].value;

    if (monedaSeleccionada === '' || criptomonedaSeleccionada === '') {
        ui.mostrarMensaje('Revisar los campos', 'alert alert-danger text-center');
    } else {
        cotizadorApi.obtenerValores(monedaSeleccionada, criptomonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptomonedaSeleccionada);
            })

    }
});






