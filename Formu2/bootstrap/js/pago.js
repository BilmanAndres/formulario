// document.getElementById("pagado").addEventListener ("Keyup", (Event)=> {
//     let pago = $(Event.target). val ();
//     let interse = $ ("#interes").val ();
//     let deuda = $ ("#pretamo").val ();
//     let numCouta = (pago/(deuda/parseFloat(interse)));
// $("#cuota"). val (Number(numerocuota.tofixed(1)));
// }); 

// document.getElementById("interes").addEventListener ("Keyup", (Event)=> {
//     let pago = $(Event.target). val ();
//     let interse = $ ("#interes").val ();
//     let deuda = $ ("#pretamo").val ();
//     let numCouta = (pago/(deuda/parseFloat(interse)));
// });


// $(document).ready(function () {
//   // lee todo el documento y que trabaje con todo lo que esta dentro
//   calcularPago();
//   let deuda;
//   // $("#botonModal").click((e) => {
//   $('#modalPago').on('show.bs.modal', (e) => {

//     const formu = $('.formulario')[0];

//     console.log(formu);

//     $("#total_pagarl").val() !== "" ? (deuda = $("#total_pagar").val()) : (deuda = $("#valor_prestamo").val());
//     // total!==''? deuda = total : deuda = val;

//     $("#valor_prestamo").val(deuda);
//     let interes = $("#interescli").val();
//     $("#interes").val(interes);

//     $("#valor_pagado").keyup((e) => { 
//       //funcion call back
//       let pago = $(e.target).val();

//       calcularPago(pago, deuda, interes)
//         .then((resultado) => {
//           // una promesa
//           $("#cuota").val(resultado.numCuota);
//           $("#valor_interes").val(resultado.valorin);
//           $("#pago_capital").val(resultado.valorCapital);
//           $("#valor_actual_prestamo").val(resultado.valorPrestamo);
//           $("#guardar").click((e) => {
//             $("#total_pagar").val(resultado.valorPrestamo);

//           })
//         })
//         .catch((error) => {
//           console.error("error al calcular", error);
//         });
//     });
//     // $('total').val()!==''? deuda=$('#val_press').val("#total"):deuda=$().val();
//   });
// });
// function calcularPago(p, d, i) {
//   return new Promise((resolve, reject) => {
//     let inter = d / parseFloat(i);
//     let cuota = (p / inter).toFixed(1);
//     if (cuota >= 0) {
//       let cuotap = $('#cuotaP').val();
//       let valor_interes = ((p / cuotap) * cuota);
//       let pagoCapital = p - valor_interes;
//       let valorPres = d - pagoCapital;
//       resolve({
//         numCuota: Number(cuota),
//         valorin: Number(valor_interes),
//         valorCapital: Number(pagoCapital),
//         valorPrestamo: Number(valorPres)
//       });
//     } else {
//       reject("el calculo de la cuota es invalido");
//     }
//   });
// }
$(document).ready(function () {
    const form = $('.formulario')[0];
    let fecha;
    $('#fecha_prestamo').change((e) => { //
        fecha = $(e.target).val();
        cacularfecha(fecha)
            .then(result => {
                // si la promesa se resulve correctamente, muestra el resultado
                $("#cuopendiente").val(result.Cuotapendiente);
            }).catch(err => {
                // si la promesa se resulve incorrectamente, muestra el error
                console.error("Error al calcular", err);
            });
    });//
   
    $('#valor_prestamocli').keyup((e)=> {   
        form.add('was-validated')
        const valor_pres = parseInt($(e.target).val());
        const cuotas_pe = parseInt($('#cuopendiente').val());
        const val_int = parseInt($('#interes').val());

        const tot = ((valor_pres +valor_pres * val_int /100) * cuotas_pe);
        $('#total_pagar').val(tot);
    });
    

    $('#modalPago').on('show.bs.modal', (e) => {
        // $('#botonModal').click((e) => {
        // $('#modalpagos').modal('show'); el modal
        const modal = $('.formulario')[0];

        if (!form.checkValidity()) {
            e.preventDefault()//Evita abrir el modal 
            e.stopPropagation()
            form.classList.add('was-validated')

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe llenar todos los campos!",

            });
            return; //detiene el modal
        } else {

            // let interes = parseFloat($("#interes").val());

            // let pendientes = parseFloat($("#pendientes").val());
            // let valpres = parseFloat($("#valor_prestamocli").val());
            // const tot = $('#total_pagar.val').val();


            // if( isNaN(interes) || isNaN(valpres){  
            //     form.classList.remove('was-validated');
            //     e.preventDefault();//evita abrir el modal
            //     e.stopPropagation();
            //     isNaN(interes) ? $ ("#interes").addClass('is-invalid') : $("#valor_prestamocli").addClass('is-invalid')
            //     form.classList.add('was-invalid')
            //     return; // detinen el modal

            // } else {
            //     $ ('.invalid-feedback').css('display', 'none');
            //     const formulario = $ ('.formulario');
            //     const formu = formulario.find('input');
            //     formu.each(function (){
            //         $(this).removeClass('is-valid');
            //     })
            // }
            


            let deuda
            $('#total_pagar').val() !== '' ? deuda = $('#total_pagar').val() : deuda = $('#valor_prestamocli').val();
            $('#valor_prestam').val(deuda);
            let interes = $("#interescli").val();
            console.log(interes);
            $('#interes').val(interes + ' %');
            let pendiente = $("#cuopendiente").val();


            $('#valor_pagado').keyup((e) => {
                let pago = $(e.target).val();
                calcularPago(pago, deuda, interes, pendiente)
                    .then(resultado => {
                        // si la promesa se resulve correctamente, muestra el resultado
                        $('#cuota').val(resultado.numCuota);
                        $("#valor_prestamocli").val(resultado.pagoInteres);
                        $("#pago_capital").val(resultado.pagoCapital);
                        $("#valor_actual_prestamo").val(resultado.valorActual);
                        // console.log(percentage);
                        console.log(pagoIntereso);

                    }).catch(error => {
                        // si la promesa se resulve incorrectamente, muestra el error
                        console.error("Error al calcular", error);
                    });
            });
        }
    });

    function calcularPago(p, d, i, pe) {
        return new Promise((resolve, reject) => {
            let valInt = d / parseFloat(i);//para saber el valor de la cuota
            let cuota = (p / valInt).toFixed(1);
            let pago_interes = pe * valInt; // total de interes pagados
            let capital = p - pago_interes;
            let valActual = d - capital;

            console.log(pago_interes);



            if (cuota >= 0) {
                resolve({
                    numCuota: Number(cuota),
                    pagoCapital: capital,
                    pagoInteres: pago_interes,
                    valorActual: valActual

                });
                console.log(cuota); //
                reject('El cálculo de la cuota es invalido');
            }
        });
    }

    function cacularfecha(fec) {
        return new Promise((resolve, reject) => {

            let fecha_pres = new Date(fec);
            let fechaActual = new Date();
            // Calcular la diferencia en años y meses
            let difAnios = fechaActual.getFullYear() - fecha_pres.getFullYear();
            let difMes = fechaActual.getMonth() - fecha_pres.getMonth();
            let difdia = fechaActual.getDate() - fecha_pres.getDate();
            //Si la diferencia de los dias es negativa no ha pasado un mes
            if (difdia <= 0) {
                difMes -= 1;
            }
            let pendiente = (difAnios * 12) + difMes;
            if (pendiente === 0) {
                pendiente = 1;
            }
            resolve({
                Cuotapendiente: pendiente
            });
            reject('El cálculo de la cuota pendiente es invalida.');

        });
    }
});


