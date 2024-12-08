const anioSelec = document.querySelector("#anioId");
const mesSelec = document.querySelector("#mesId");
const list = document.querySelector("#listaDiasId");
const nombreMesH1 = document.querySelector("#nombreMesId");

//variables que voy a usar para la formula que calcula el día de la semana que corresponde al 1 de Enero del año elegido
// Resultado = (codigoSiglos + codigoAnios + codigoAnioBisiesto + codigoMeses + codigoDia) % 7
const codigoSiglos ={XX: "1", XXI: "0", XXII: "-2", XXIII: "-4"};
let codigoAnios=0; //Las dos últimas cifras del año más un cuarto de esa cifra: (anioSelec%100) + Math.round((anioSelec%100)/4)
let codigoAnioBisiesto=0; //si el año es bisiesto y el mes es enero o febrero, el valor es -1, el resto es 0
const codigoMeses ={Enero:6, Febrero:2, Marzo:2, Abril:5, Mayo:0, Junio:3, Julio:5, Agosto:1, Septiembre:4, Octubre:6, Noviembre:2, Diciembre:4};
let codigoDia=1; // corresponde al día del año, en mi caso siempre el 1, pero uso let para reutilizar código en otras webs
const codigoResultado ={Domingo:0, Lunes:1, Martes:2, Miercoles:3, Jueves:4, Viernes:5, Sabado:6};
let resultado=0;

//Controlo los eventos del año y el mes seleccionados
    anioSelec.addEventListener("change", () =>{//Rango de años [1900-2300]
        if((anioSelec.value<1900)||(anioSelec.value>=2300) )  anioSelec.value = 2024;
        mesSelec.value = "Enero";
        
        crearCalendario("Enero");          
    });
    mesSelec.addEventListener("change", () => {
        const mesEleg = mesSelec.value;
        //calcularDia1();//calculo el día 1 del mes seleccionado
        crearCalendario(mesEleg);
    });
function calcularDia1(){
    let auxSiglo;//codigo siglo correspondiente
    let auxCodigoMeses;//codigo mes correspondiente
    
            switch(Math.trunc(anioSelec.value/100)){
                case 19:
                    auxSiglo=codigoSiglos.XX;
                    break;
                case 20:
                    auxSiglo= codigoSiglos.XXI;
                    break;
                case 21:
                    auxSiglo= codigoSiglos.XXII;
                    break;
                case 22:
                    auxSiglo= codigoSiglos.XXIII;
                    break;
                default:
                    break;
            }
    codigoAnios= ((anioSelec.value % 100) + Math.trunc((anioSelec.value % 100)/4));
    codigoAnioBisiesto = 0;
    if(((anioSelec.value%4==0) && (anioSelec.value%100!=0)) || ((anioSelec.value%4==0) && (anioSelec.value%100==0) && (anioSelec.value%400==0))) {
        if((mesSelec.value== "Enero") || (mesSelec.value=="Febrero"))  codigoAnioBisiesto =-1 ;
    }
    switch(mesSelec.value){
        case "Enero":
            auxCodigoMeses = codigoMeses.Enero;
            break;
        case "Febrero":
            auxCodigoMeses = codigoMeses.Febrero;
            break;
        case "Marzo":
            auxCodigoMeses = codigoMeses.Marzo;
            break;
        case "Abril":
            auxCodigoMeses = codigoMeses.Abril;
            break;
        case "Mayo":
            auxCodigoMeses = codigoMeses.Mayo;
            break;
        case "Junio":
            auxCodigoMeses = codigoMeses.Junio;
            break;
        case "Julio":
            auxCodigoMeses = codigoMeses.Julio;
            break;
        case "Agosto":
            auxCodigoMeses = codigoMeses.Agosto;
            break;
        case "Septiembre":
            auxCodigoMeses = codigoMeses.Septiembre;
            break;
        case "Octubre":
            auxCodigoMeses = codigoMeses.Octubre;
            break;
        case "Noviembre":
            auxCodigoMeses = codigoMeses.Noviembre;
            break;
        default:
            auxCodigoMeses = codigoMeses.Diciembre;
            break;
    }
    resultado = (parseInt(auxSiglo) + parseInt(codigoAnios) + parseInt(codigoAnioBisiesto) + parseInt(auxCodigoMeses) + parseInt(codigoDia)) % 7;
    window.confirm(auxSiglo + codigoAnios + codigoAnioBisiesto + " " + auxCodigoMeses + " "  +codigoDia + " " + resultado);
}
function crearCalendario(mes) {
    calcularDia1();//calculo que dia de la semana era el uno de enero del año seleccionado
    //Calculo los días que tiene el mes elegido en ese año.
        let dias = 31;
        if (mes === "Febrero") {
          (((anioSelec.value%4==0) && (anioSelec.value%100!=0)) || ((anioSelec.value%4==0) && (anioSelec.value%100==0) && (anioSelec.value%400==0))) ? dias =29 : dias = 28;
        } else if (
          mes === "Abril" ||
          mes === "Junio" ||
          mes === "Septiembre" ||
          mes === "Noviembre"
        ) {
          dias = 30;
        }

        list.textContent = "";
        nombreMesH1.textContent = mes;
        //Le doy estilo a la lista
        list.style.setProperty("display", "flex");
        list.style.setProperty("flex-direction", "row");
        list.style.setProperty("flex-wrap", "wrap");
        list.style.setProperty("width", "100%");
        list.style.setProperty("list-style-type", "none");
    if(resultado==0) resultado=6;
    let diasResul= dias + resultado;
    
        //genero los elementos de la lista que voy a usar como cajas para contener los días del mes
        for (let i = 1; i <= diasResul; i++) {
            const listItem = document.createElement("li");
            if(i>=resultado) {
                listItem.textContent = i;
                listItem.style.setProperty("background-color", "blue");
            }
            else{
                listItem.style.setProperty("background-color", "transparent");
            }
            //Doy estilo a los elementos de la lista
            listItem.style.setProperty("text-align", "center");
            listItem.style.setProperty("border", "2px solid white");
            listItem.style.setProperty("padding", "2%");
            listItem.style.setProperty("width", "10%");
            listItem.style.setProperty("height", "80px");
            
            listItem.style.setProperty("color", "white");
            list.appendChild(listItem);
        }
}
//genero un calendario por defecto
mesSelec.value = "Enero";
crearCalendario("Enero");

//window.confirm(codigoMeses.Junio);
