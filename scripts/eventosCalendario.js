/*
 * Metodo Sakamoto para calcular día de la semana que corresponde a una fecha concreta
 * const dias = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    if (mes < 3) año -= 1;
    let resultado = (año + Math.floor(año / 4) - Math.floor(año / 100) + Math.floor(año / 400) + dias[mes - 1] + día) % 7;
 * 
 */
//variables globales para controlar tiempo y hora actualizados
let tiempo = null;
let tiempomoviendose = false;
//variables para controlar los eventos
const anioSelec = document.querySelector("#anioId");
const mesSelec = document.querySelector("#mesId");
const list = document.querySelector("#listaDiasId");
const nombreMesH1 = document.querySelector("#nombreMesId");

//variables que voy a usar para la formula que calcula el día de la semana que corresponde al 1 de Enero del año elegido
const codigoMeses =[{Mes:"Enero", Codigo:0}, {Mes:"Febrero", Codigo:3}, {Mes:"Marzo", Codigo:2}, {Mes:"Abril", Codigo:5}, {Mes:"Mayo", Codigo:0}, {Mes:"Junio", Codigo:3}, {Mes:"Julio", Codigo:5}, {Mes:"Agosto", Codigo:1}, {Mes:"Septiembre", Codigo:4}, {Mes:"Octubre", Codigo:6}, {Mes:"Noviembre", Codigo:2}, {Mes:"Diciembre", Codigo:4}];
const codigoSemana =["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado","Domingo"];
let resultado;//guarda el número del día de la semana
let mesElegido;
let anioCorregido;



function fecha(){//recoge la fecha actual, le da formato y la escribe en el label "fecha" de la pagina
    let fecha_hoy = new Array();
    let hoy = new Date();
    fecha_hoy[0] = ((hoy.getMonth()<9) ? "0" : "") + (hoy.getMonth() + 1) + " / " ;
    fecha_hoy[1] = ((hoy.getDate()<9) ? "0" : "") + hoy.getDate() + " / " ;
    fecha_hoy[2] = ((hoy.getYear()+1900));
    let auxf =fecha_hoy[1]+fecha_hoy[0] + fecha_hoy[2];
    document.getElementById('fecha').innerHTML= auxf;
   
}
function stopreloj(){//para el temporizador
    if(tiempomoviendose)clearTimeout(tiempo);
    tiempomoviendose=false;
}
function startreloj(){//pone fecha y hora en la cabecera de la pagina
    stopreloj();
    fecha();
    muestra_tiempo();
}
function muestra_tiempo(){//muestra la hora con una frecuencia de refresco de 1 segundo
    let ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes(); var segundos = ahora.getSeconds();
    let hora = horas;
    hora += ((minutos<10)? ":0" : ":") + minutos;
    hora += ((segundos<10)? ":0" : ":") + segundos;
    document.getElementById('hora_actual').innerHTML= hora;
    tiempo = setTimeout(muestra_tiempo, 1000);
    tiempomoviendose = true;
}
//código programa principal
function calculoDia(){
    let auxCodigoMeses;//codigo mes correspondiente
    resultado=0;
    mesElegido =0;
    anioCorregido=0;
    codigoMeses.forEach((mes,indice) =>{
        if(mesSelec.value === mes.Mes){
            auxCodigoMeses = mes.Codigo;
            mesElegido=indice+1;
        }
    });
    (mesElegido<3) ? anioCorregido = anioSelec.value -1 : anioCorregido = parseInt(anioSelec.value);
    resultado = (anioCorregido + Math.trunc(anioCorregido / 4) - Math.trunc(anioCorregido / 100) + Math.trunc(anioCorregido / 400) + auxCodigoMeses + 1) % 7;
}

//Controlo los eventos del año y el mes seleccionados
    anioSelec.addEventListener("change", () =>{//Rango de años [1900-2300]
        if((anioSelec.value<1900)||(anioSelec.value>=2300) )  anioSelec.value = 2024;
        mesSelec.value = "Enero";
        crearCalendario("Enero");          
    });
    mesSelec.addEventListener("change", () => {//calculo el día 1 del mes seleccionado
        crearCalendario(mesSelec.value);
    });

function crearCalendario(mes) {
    calculoDia();//calculo que dia de la semana era el uno de enero del año seleccionado
    //Calculo los días que tiene el mes elegido en ese año.
    let dias = 31;
    if (mes === "Febrero") {//control de año bisiesto
        (((anioSelec.value%4==0) && (anioSelec.value%100!=0)) || ((anioSelec.value%4==0) && (anioSelec.value%100==0) && (anioSelec.value%400==0))) ? dias =29 : dias = 28;
    } else if (mes === "Abril" || mes === "Junio" || mes === "Septiembre" || mes === "Noviembre"){
          dias = 30;
    }
    list.textContent = "";
    nombreMesH1.textContent = mes;
    //window.confirm(resultado);
    if(resultado==0) resultado=7;
    let diasResul= dias + resultado;
    diasResul +=7;//los primeros 7 elementos van a ser los nombres de los días de la semana
    //genero los elementos de la lista que voy a usar como cajas para contener los días del mes
        for (let i = 1; i < diasResul; i++) {
            const listItem = document.createElement("li");
            if(i>=(resultado+7)) {
                listItem.textContent = (i-7) - resultado +1;
                (i%7!=0)?listItem.style.setProperty("background-color", "blue"):listItem.style.setProperty("background-color", "red");
            }
            else if(i<8){
                listItem.textContent = codigoSemana[i-1];
                listItem.style.setProperty("background-color", "green");
            }
            else{
                listItem.style.setProperty("background-color", "transparent");
            }
            //Doy estilo a los elementos de la lista
            listItem.style.setProperty("text-align", "center");
            listItem.style.setProperty("border", "2px solid white");
            listItem.style.setProperty("padding", "1.5%");
            listItem.style.setProperty("width", "10%");
            listItem.style.setProperty("height", "8%");
            listItem.style.setProperty("color", "white");
            list.appendChild(listItem);
        }
}
//genero un calendario por defecto
mesSelec.value = "Enero";
crearCalendario("Enero");
startreloj();


