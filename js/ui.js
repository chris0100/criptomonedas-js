class Interfaz {

    constructor() {
        this.init();
    }

    init() {   //llama al metodo para construir datos de select al inicio
        this.construirSelect();
    }


    /////////////////////////////////////////////////////////
    //CONSTRUYE LOS SELECT DE LAS CRYPTO
    ////////////////////////////////////////////////////////
    construirSelect() {
        cotizadorApi.obtenerMonedasAPI()
            .then(monedas => {

                const selector = document.querySelector('#criptomoneda');

                //recorrer objeto
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //añadir el simbolo y el nombre como opciones de nuestro select
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    selector.appendChild(opcion);
                }
            })
    }


    //////////////////////////////////////////////////////////
    //MOSTRAR MENSAJES YA SEA DE ERROR O SUCCESS
    /////////////////////////////////////////////////////////
    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //enviar mensaje a locacion
        const padreMensaje = document.querySelector('.mensajes');
        padreMensaje.appendChild(div);
        setTimeout(() => {
            padreMensaje.removeChild(div);
        }, 3000)
    }


    //////////////////////////////////////////////////////////
    //IMPRIME EL RESULTADO DE LA COTIZACION ENVIADA
    /////////////////////////////////////////////////////////
    mostrarResultado(resultado, moneda, crypto) {

        const datosMoneda = resultado[crypto][moneda];

        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            variacion = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-CO');

        //construir template
        let template = `<div class="card bg-warning">
                            <div class="card-body text-light">
                                <h2 class="card-title">Resultado:</h2>
                                <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda 
                                ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                                <p>Variacion ultimo dia: % ${variacion}</p>
                                <p>Ultima actualizacion: ${actualizado}</p>
                           </div>
                        </div>`;

        while(document.querySelector('#resultado').hasChildNodes()){
            document.querySelector('#resultado').firstChild.remove();
        }

/*        if (document.querySelector('#resultado').childElementCount != 0) {
            document.querySelector('#resultado').firstChild.remove();
        }*/
        this.toggleSpinner('block');

        setTimeout(() => {

            //insertar el resultado
            document.querySelector('#resultado').innerHTML = template;
            this.toggleSpinner('none');
        }, 3000);
    }


    /////////////////////////////////////////////////
    //MUESTRA/OCULTA EL SPINNER DE CARGA
    /////////////////////////////////////////////////
    toggleSpinner(valor) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = valor;
    }
}
