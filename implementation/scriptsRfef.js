let headerMain = document.querySelector(".header-main");
let headerMobileBtn = document.querySelector(".mobile-menu-btn");
let logo = document.querySelector(".logo");
let navBar = document.querySelector(".nav-bar");
let isMenuOpen = false;

headerMobileBtn.onclick = function() {
    if(!isMenuOpen){
        headerMain.classList.toggle("header-main-on-click");
        logo.classList.toggle("logo-on-click");
        navBar.classList.toggle("nav-bar-on-click");

        isMenuOpen = true;
    }else if (isMenuOpen){
        headerMain.classList.toggle("header-main-on-click");
        logo.classList.toggle("logo-on-click");
        navBar.classList.toggle("nav-bar-on-click");

        isMenuOpen = false;
    }
};

function filtrarNumero(input) {
    input.value = input.value.replace(/\D/g, '');
}

/*------------------------------------------------------PARTE DE INTERACCION CON LAS PREDICCIONES------------------------------------------------------*/

// GURADAMOS PARA CADA EQUIPO LOS RIVALES DE CADA PARTIDO DE CADA JORNADA
var partidosDEP = ["BAR", "RSO", "RUN"];
var partidosNAS = ["LOG", "BAR", "MAJ"];
var partidosBAR = ["DEP", "NAS", "CEL"]; 
var partidosPON = ["RUN", "SAB", "TER"];
var partidosCEL = ["MAJ", "ARE", "BAR"];
var partidosCUL = ["TER", "COR", "SES"];
var partidosARE = ["FUE" ,"CEL", "UNI"];
var partidosRSO = ["UNI", "DEP", "OSA"];
var partidosUNI = ["RSO", "MAJ", "ARE"];
var partidosLUG = ["COR", "LOG", "SAB"];
var partidosFUE = ["ARE", "RUN", "COR"];
var partidosRUN = ["PON", "FUE", "DEP"];
var partidosOSA = ["SES", "TER" ,"RSO"];
var partidosCOR = ["LUG", "CUL", "FUE"];
var partidosSAB = ["TAR", "PON", "LUG"];
var partidosTAR = ["SAB", "SES", "LOG"];
var partidosSES = ["OSA", "TAR", "CUL"];
var partidosLOG = ["NAS", "LUG", "TAR"];
var partidosTER = ["CUL", "OSA", "PON"];
var partidosMAJ = ["CEL", "UNI", "NAS"];

class Equipo {

    constructor(nombre, puntos, partidosJugados, numVictorias, numEmpates, numDerrotas, golesFavor, golesContra, posicion) {
        this.nombre = nombre;
        this.puntos = puntos;
        this.partidosJugados = partidosJugados;
        this.numVictorias = numVictorias;
        this.numEmpates = numEmpates;
        this.numDerrotas = numDerrotas;
        this.golesFavor = golesFavor;
        this.golesContra = golesContra;
        this.diferenciaGoles = golesFavor - golesContra;
        this.posicion = posicion;
        this.resultadosJornadas = new Array(38);
    }
}

var deportivo = new Equipo("DEP", 71, 35, 20, 11, 4, 59, 25, 1);
var barcaB = new Equipo("BAR", 67, 35, 20, 7, 8, 56, 38, 2);
var nastic = new Equipo("NAS", 61, 35, 17, 10, 8, 35, 22, 3);
var celtaB = new Equipo("CEL", 61, 35, 18, 7, 10, 63, 35, 4);
var ponfe = new Equipo("PON", 60, 35, 16, 12, 7, 34, 23, 5);
var cultural = new Equipo("CUL", 56, 35, 14, 14, 7, 33, 24, 6);
var unionistas = new Equipo("UNI", 51, 35, 13, 12, 10, 33, 28, 7);
var arenteiro = new Equipo("ARE", 50, 35, 13, 11, 11, 39, 30, 8);
var realSociedadB = new Equipo("RSO", 47, 35, 11, 14, 10, 39, 38, 9);
var lugo = new Equipo("LUG", 46, 35, 12, 10, 10, 29, 39, 10);
var osasunaB = new Equipo("OSA", 42, 35, 10, 12, 13, 41, 46, 11);
var realUnion = new Equipo("RUN", 40, 35, 10, 10, 15, 42, 47, 12);
var tarazona = new Equipo("TAR", 40, 35, 9, 13, 13, 24, 27, 13);
var fuenlabrada = new Equipo("FUE", 40, 35, 9, 13, 13, 29, 37, 14);
var sestao = new Equipo("SES", 38, 35, 9, 11, 15, 35, 45, 15);
var sabadell = new Equipo("SAB", 38, 35, 10, 8, 17, 33, 51, 16);
var teruel = new Equipo("TER", 36, 35, 6, 18, 11, 28, 35, 17);
var cornella = new Equipo("COR", 35, 35, 8, 11, 16, 28, 36, 18);
var logroñes = new Equipo("LOG", 29, 35, 7, 8, 20, 22, 52, 19);
var rayoMajadahonda = new Equipo("MAJ", 26, 35, 5, 14, 16, 26, 47, 20);

// VA A SER UN ARRAY DE ELEMENTOS DEL DOM DE divPronostico
var pronosticosActivos = [];

// OBJETO PRONOSTICO, que tiene el elemento del DOM y una lista de rivales (la lista de rivales son tambien elementos del DOM)
class Pronostico {

    constructor(pronosticoEntero, listaRivales) {
        this.pronosticoEntero = pronosticoEntero;
        this.listaRivales = listaRivales;
    }
}

/* CREAMOS UN ARRAY CON TODOS LOS PUESTOS DE LA TABLA DE CLASIFICACION */
var puestos = document.querySelectorAll(".tabla-clasificacion .puesto");
var equipos = [deportivo, nastic, barcaB, ponfe, celtaB, cultural, arenteiro, realSociedadB, unionistas, lugo, fuenlabrada, realUnion, osasunaB, cornella, sabadell, tarazona, sestao, logroñes, teruel, rayoMajadahonda];
equipos.sort(function(equipo1, equipo2){
    return equipo2.puntos - equipo1.puntos;
});

equipos.forEach(function(equipo, index) {
    equipo.posicion = index + 1;
  });

/* CREAMOS LOS PUESTOS DE LA TABLA*/
for (let i = 0; i < 20; i++) {
    crearElementoTablaClasificacion(equipos[i].posicion, equipos[i].nombre, equipos[i].puntos, equipos[i].partidosJugados, equipos[i].numDerrotas, equipos[i].numEmpates, equipos[i].numVictorias, equipos[i].golesFavor, equipos[i].golesContra, equipos[i].diferenciaGoles);
}

function crearElementoTablaClasificacion(posicion, nomEquipo, puntos, partidosJugados, partidosPerdidos, partidosEmpatados, partidosGanados, golesFavor, golesContra, diferenciaGoles) {
    // Crear el elemento tr
    var puesto = document.createElement("tr");
    puesto.className = "puesto";
    if(posicion == 1){
        puesto.classList.add("ascenso");
    }else{
        if(posicion <= 5){
            puesto.classList.add("playoff");
        }else{
            if(posicion >= 16){
                puesto.classList.add("descenso");
            }
        }
    }

    // Crear y configurar la celda para "posicion"
    var celdaPosicion = document.createElement("td");
    celdaPosicion.className = "posicion";
    celdaPosicion.textContent = posicion;
    puesto.appendChild(celdaPosicion);

    // Crear y configurar la celda para "equipo-completo"
    var celdaEquipoCompleto = document.createElement("td");
    celdaEquipoCompleto.className = "equipo-completo";

    var divEquipo = document.createElement("div");
    divEquipo.className = "equipo";

    var divImgEscudo = document.createElement("div");
    divImgEscudo.className = "img-escudo";

    var imgEscudo = document.createElement("img");
    imgEscudo.src = "images/primeraRfef/" + nomEquipo + ".png";
    imgEscudo.alt = nomEquipo;

    var divWrapperNombre = document.createElement("div");
    divWrapperNombre.className = "wrapper-nombre-equipo";

    var spanNombreEquipo = document.createElement("span");
    spanNombreEquipo.className = "nombre-equipo";
    spanNombreEquipo.textContent = nomEquipo;

    divImgEscudo.appendChild(imgEscudo);
    divWrapperNombre.appendChild(spanNombreEquipo);

    divEquipo.appendChild(divImgEscudo);
    divEquipo.appendChild(divWrapperNombre);

    celdaEquipoCompleto.appendChild(divEquipo);
    puesto.appendChild(celdaEquipoCompleto);

    // Crear y configurar las celdas restantes directamente
    puesto.appendChild(crearCelda("puntos", puntos));
    puesto.appendChild(crearCelda("partidos-jugados", partidosJugados));
    puesto.appendChild(crearCelda("partidos-ganados", partidosGanados));
    puesto.appendChild(crearCelda("partidos-empatados", partidosEmpatados));
    puesto.appendChild(crearCelda("partidos-perdidos", partidosPerdidos));
    puesto.appendChild(crearCelda("goles-favor", golesFavor));
    puesto.appendChild(crearCelda("goles-contra", golesContra));
    puesto.appendChild(crearCelda("diferencia-goles", diferenciaGoles));

    // Agregar la fila a la tabla
    document.querySelector(".cuerpo-tabla").appendChild(puesto);
}

// Función auxiliar para crear y configurar celdas individuales
function crearCelda(clase, contenido) {
    var celda = document.createElement("td");
    celda.className = clase;
    celda.textContent = contenido;
    return celda;
}

var jornadas = document.querySelectorAll(".jornadas .jornada-global");
var spanLocal = 1;
var inputLocal = 2;
var inputVisitante = 4;
var spanVisitante = 5;

/* ARRAY QUE UNA POSICION REPRESENTA UNA JORNADA Y DENTRO TIENE UN ARRAY DE PARTIDOS */
var jornadaPartidos = [];

function comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante) {
    if(equipos[indiceEquipoLocal].resultadosJornadas[i] == "ganado"){
        equipos[indiceEquipoLocal].puntos = equipos[indiceEquipoLocal].puntos - 3;
        equipos[indiceEquipoLocal].numVictorias = equipos[indiceEquipoLocal].numVictorias - 1;
        equipos[indiceEquipoVisitante].numDerrotas = equipos[indiceEquipoVisitante].numDerrotas - 1;
        equipos[indiceEquipoLocal].resultadosJornadas[i] = "";
        equipos[indiceEquipoVisitante].resultadosJornadas[i] = "";
        
        if(indicePronosticoLocal != -1){
            // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
            pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("victoria");
            pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("pronostico-final");
            pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
        }
    
        if(indicePronosticoVisitante != -1){
            // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
            pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("derrota");
            pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("pronostico-final");
            pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
        }
    }else{
        if(equipos[indiceEquipoLocal].resultadosJornadas[i] == "empatado"){
            equipos[indiceEquipoLocal].puntos = equipos[indiceEquipoLocal].puntos - 1;
            equipos[indiceEquipoVisitante].puntos = equipos[indiceEquipoVisitante].puntos - 1;
            equipos[indiceEquipoLocal].numEmpates = equipos[indiceEquipoLocal].numEmpates - 1;
            equipos[indiceEquipoVisitante].numEmpates = equipos[indiceEquipoVisitante].numEmpates - 1;
            equipos[indiceEquipoLocal].resultadosJornadas[i] = "";
            equipos[indiceEquipoVisitante].resultadosJornadas[i] = "";
    
            if(indicePronosticoLocal != -1){
                // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("empate");
                pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("pronostico-final");
                pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
            }
    
            if(indicePronosticoVisitante != -1){
                // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("empate");
                pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("pronostico-final");
                pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
            }
        }else{
            if(equipos[indiceEquipoLocal].resultadosJornadas[i] == "perdido"){
                equipos[indiceEquipoVisitante].puntos = equipos[indiceEquipoVisitante].puntos - 3;
                equipos[indiceEquipoLocal].numDerrotas = equipos[indiceEquipoLocal].numDerrotas - 1;
                equipos[indiceEquipoVisitante].numVictorias = equipos[indiceEquipoVisitante].numVictorias - 1;
                equipos[indiceEquipoLocal].resultadosJornadas[i] = "";
                equipos[indiceEquipoVisitante].resultadosJornadas[i] = "";
    
                if(indicePronosticoLocal != -1){
                    // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("derrota");
                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("pronostico-final");
                    pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                }
    
                if(indicePronosticoVisitante != -1){
                    // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("victoria");
                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("pronostico-final");
                    pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                }
            }
        }
    }
}

for (let i = 0; i < jornadas.length; i++) {
    jornadaPartidos.push(jornadas[i].children[0].children[1].children);

    var partidos = jornadas[i].children[0].children[1].children;

    for (let j = 0; j < partidos.length; j++) {

        /* AÑADIMOS UN ESCUCHADOR AL INPUT DEL EQUIPO LOCAL*/
        partidos[j].children[inputLocal].addEventListener("input", function(){

            var golesLocal = jornadaPartidos[i][j].children[inputLocal].value;
            var golesVisitante = jornadaPartidos[i][j].children[inputVisitante].value;

            var golesLocalInt = parseInt(golesLocal);
            var golesVisitanteInt = parseInt(golesVisitante);
            
            var equipoLocal = jornadaPartidos[i][j].children[spanLocal].children[0].innerHTML;
            var equipoVisitante = jornadaPartidos[i][j].children[spanVisitante].children[0].innerHTML;

            /* BUSCAMOS EN QUE POSICION DEL ARRAY ESTA EL EQUIPO LOCAL DE ESTE PARTIDO*/
            var indiceEquipoLocal = equipos.findIndex(function(equipo) {
                return equipo.nombre == equipoLocal;
            });

            /* BUSCAMOS EN QUE POSICION DEL ARRAY ESTA EL EQUIPO VISITANTE DE ESTE PARTIDO*/
            var indiceEquipoVisitante = equipos.findIndex(function(equipo) {
                return equipo.nombre == equipoVisitante;
            });

            /* BUSCAMOS SI EL EQUIPO LOCAL Y VISITANTE TIENE UN PRONOSTICO VISIBLE */

            var indicePronosticoLocal = pronosticosActivos.findIndex(function(pronostico) {
                return pronostico.pronosticoEntero.children[1].children[0].children[1].children[0].textContent == equipoLocal;
            });

            var indicePronosticoVisitante = pronosticosActivos.findIndex(function(pronostico) {
                return pronostico.pronosticoEntero.children[1].children[0].children[1].children[0].textContent == equipoVisitante;
            });

            // BUSCAMOS LA POSICION DEL LOCAL Y VISITANTE EN EL PRONOSTICO DEL OTRO:
            // Ejemplo: si el local es SEV y el visitante es RMA, se va a buscar en el pronostico del RMA en donde esta el SEV y en el pronostico del SEV donde esta el RMA

            if(indicePronosticoLocal != -1){
                var indiceVisitanteEnPronosticoLocal = pronosticosActivos[indicePronosticoLocal].listaRivales.findIndex(function(rival){
                    return rival.innerText == equipoVisitante;
                });
            }

            if(indicePronosticoVisitante != -1){
                var indiceLocalEnPronosticoVisitante = pronosticosActivos[indicePronosticoVisitante].listaRivales.findIndex(function(rival){
                    return rival.innerText == equipoLocal;
                });
            }

            if(isNaN(golesLocalInt) && isNaN(golesVisitanteInt)){
                comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);
            }else{
                if(isNaN(golesVisitanteInt)){
                    comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);
                }else{
                    if(isNaN(golesLocalInt)){
                        comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);
                    }else{
                        if(golesLocalInt > golesVisitanteInt) {
                            /* VICTORIA LOCAL */

                            comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);

                            equipos[indiceEquipoLocal].resultadosJornadas[i] = "ganado";
                            equipos[indiceEquipoLocal].puntos = equipos[indiceEquipoLocal].puntos + 3;
                            equipos[indiceEquipoLocal].numVictorias = equipos[indiceEquipoLocal].numVictorias + 1;
                            equipos[indiceEquipoVisitante].resultadosJornadas[i] = "perdido";
                            equipos[indiceEquipoVisitante].numDerrotas = equipos[indiceEquipoVisitante].numDerrotas + 1;
                            
                            if(indicePronosticoLocal != -1){
                                // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                                pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("pronostico-final");
                                pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("victoria");
                                pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                            }
                
                            if(indicePronosticoVisitante != -1){
                                // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                                pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("pronostico-final");
                                pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("derrota");
                                pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                            }
                        }else{
                            if(golesLocalInt < golesVisitanteInt){
                                /* VICTORIA VISITANTE */

                                comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);

                                equipos[indiceEquipoLocal].resultadosJornadas[i] = "perdido";
                                equipos[indiceEquipoLocal].numDerrotas = equipos[indiceEquipoLocal].numDerrotas + 1;
                                equipos[indiceEquipoVisitante].resultadosJornadas[i] = "ganado";
                                equipos[indiceEquipoVisitante].puntos = equipos[indiceEquipoVisitante].puntos + 3;
                                equipos[indiceEquipoVisitante].numVictorias = equipos[indiceEquipoVisitante].numVictorias + 1;
                                
                                if(indicePronosticoLocal != -1){
                                    // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("derrota");
                                    pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                                }
                    
                                if(indicePronosticoVisitante != -1){
                                    // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("victoria");
                                    pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                                }
                            }else{
                                /* EMPATE */

                                comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);

                                equipos[indiceEquipoLocal].resultadosJornadas[i] = "empatado";
                                equipos[indiceEquipoLocal].puntos = equipos[indiceEquipoLocal].puntos + 1;
                                equipos[indiceEquipoLocal].numEmpates = equipos[indiceEquipoLocal].numEmpates + 1;
                                equipos[indiceEquipoVisitante].resultadosJornadas[i] = "empatado";
                                equipos[indiceEquipoVisitante].puntos = equipos[indiceEquipoVisitante].puntos + 1;
                                equipos[indiceEquipoVisitante].numEmpates = equipos[indiceEquipoVisitante].numEmpates + 1;
                                
                                if(indicePronosticoLocal != -1){
                                    // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("empate");
                                    pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                                }
                    
                                if(indicePronosticoVisitante != -1){
                                    // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("empate");
                                    pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                                }
                            }
                        }
                    }
                }
            }
            actualizarTabla();
        });

        /* AÑADIMOS UN ESCUCHADOR AL INPUT DEL EQUIPO VISITANTE*/
        partidos[j].children[inputVisitante].addEventListener("input", function(){
            var golesLocal = jornadaPartidos[i][j].children[inputLocal].value;
            var golesVisitante = jornadaPartidos[i][j].children[inputVisitante].value;

            var golesLocalInt = parseInt(golesLocal);
            var golesVisitanteInt = parseInt(golesVisitante);
            
            var equipoLocal = jornadaPartidos[i][j].children[spanLocal].children[0].innerHTML;
            var equipoVisitante = jornadaPartidos[i][j].children[spanVisitante].children[0].innerHTML;

            /* BUSCAMOS EN QUE POSICION DEL ARRAY ESTA EL EQUIPO LOCAL DE ESTE PARTIDO*/
            var indiceEquipoLocal = equipos.findIndex(function(equipo) {
                return equipo.nombre == equipoLocal;
            });

            /* BUSCAMOS EN QUE POSICION DEL ARRAY ESTA EL EQUIPO VISITANTE DE ESTE PARTIDO*/
            var indiceEquipoVisitante = equipos.findIndex(function(equipo) {
                return equipo.nombre == equipoVisitante;
            });

            /* BUSCAMOS SI EL EQUIPO LOCAL Y VISITANTE TIENE UN PRONOSTICO VISIBLE */

            var indicePronosticoLocal = pronosticosActivos.findIndex(function(pronostico) {
                return pronostico.pronosticoEntero.children[1].children[0].children[1].children[0].textContent == equipoLocal;
            });

            var indicePronosticoVisitante = pronosticosActivos.findIndex(function(pronostico) {
                return pronostico.pronosticoEntero.children[1].children[0].children[1].children[0].textContent == equipoVisitante;
            });

            // BUSCAMOS LA POSICION DEL LOCAL Y VISITANTE EN EL PRONOSTICO DEL OTRO:
            // Ejemplo: si el local es SEV y el visitante es RMA, se va a buscar en el pronostico del RMA en donde esta el SEV y en el pronostico del SEV donde esta el RMA

            if(indicePronosticoLocal != -1){
                var indiceVisitanteEnPronosticoLocal = pronosticosActivos[indicePronosticoLocal].listaRivales.findIndex(function(rival){
                    return rival.innerText == equipoVisitante;
                });
            }

            if(indicePronosticoVisitante != -1){
                var indiceLocalEnPronosticoVisitante = pronosticosActivos[indicePronosticoVisitante].listaRivales.findIndex(function(rival){
                    return rival.innerText == equipoLocal;
                });
            }

            if(isNaN(golesLocalInt) && isNaN(golesVisitanteInt)){
                comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);
            }else{
                if(isNaN(golesVisitanteInt)){
                    comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);
                }else{
                    if(isNaN(golesLocalInt)){
                        comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);
                    }else{
                        if(golesLocalInt > golesVisitanteInt) {
                            /* VICTORIA LOCAL */

                            comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);

                            equipos[indiceEquipoLocal].resultadosJornadas[i] = "ganado";
                            equipos[indiceEquipoLocal].puntos = equipos[indiceEquipoLocal].puntos + 3;
                            equipos[indiceEquipoLocal].numVictorias = equipos[indiceEquipoLocal].numVictorias + 1;
                            equipos[indiceEquipoVisitante].resultadosJornadas[i] = "perdido";
                            equipos[indiceEquipoVisitante].numDerrotas = equipos[indiceEquipoVisitante].numDerrotas + 1;

                            if(indicePronosticoLocal != -1){
                                // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                                pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("pronostico-final");
                                pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("victoria");
                                pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                            }
                
                            if(indicePronosticoVisitante != -1){
                                // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                                pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("pronostico-final");
                                pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("derrota");
                                pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                            }
                        }else{
                            if(golesLocalInt < golesVisitanteInt){
                                /* VICTORIA VISITANTE */

                                comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);

                                equipos[indiceEquipoLocal].resultadosJornadas[i] = "perdido";
                                equipos[indiceEquipoLocal].numDerrotas = equipos[indiceEquipoLocal].numDerrotas + 1;
                                equipos[indiceEquipoVisitante].resultadosJornadas[i] = "ganado";
                                equipos[indiceEquipoVisitante].puntos = equipos[indiceEquipoVisitante].puntos + 3;
                                equipos[indiceEquipoVisitante].numVictorias = equipos[indiceEquipoVisitante].numVictorias + 1;
                                
                                if(indicePronosticoLocal != -1){
                                    // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("derrota");
                                    pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                                }
                    
                                if(indicePronosticoVisitante != -1){
                                    // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("victoria");
                                    pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                                }
                            }else{
                                /* EMPATE */

                                comprobaciones(i, indiceEquipoLocal, indiceEquipoVisitante, indicePronosticoLocal, indicePronosticoVisitante, indiceVisitanteEnPronosticoLocal, indiceLocalEnPronosticoVisitante);

                                equipos[indiceEquipoLocal].resultadosJornadas[i] = "empatado";
                                equipos[indiceEquipoLocal].puntos = equipos[indiceEquipoLocal].puntos + 1;
                                equipos[indiceEquipoLocal].numEmpates = equipos[indiceEquipoLocal].numEmpates + 1;
                                equipos[indiceEquipoVisitante].resultadosJornadas[i] = "empatado";
                                equipos[indiceEquipoVisitante].puntos = equipos[indiceEquipoVisitante].puntos + 1;
                                equipos[indiceEquipoVisitante].numEmpates = equipos[indiceEquipoVisitante].numEmpates + 1;
                                
                                if(indicePronosticoLocal != -1){
                                    // Actualizamos el color del pronostico del equipo Local (el color del fondo del partido contra el Visitante)
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoLocal].listaRivales[indiceVisitanteEnPronosticoLocal].classList.add("empate");
                                    pronosticosActivos[indicePronosticoLocal].pronosticoEntero.children[13].innerText = equipos[indiceEquipoLocal].puntos;
                                }
                    
                                if(indicePronosticoVisitante != -1){
                                    // Actualizamos el color del pronostico del equipo Visitante (el color del fondo del partido contra el Local)
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.remove("pronostico-final");
                                    pronosticosActivos[indicePronosticoVisitante].listaRivales[indiceLocalEnPronosticoVisitante].classList.add("empate");
                                    pronosticosActivos[indicePronosticoVisitante].pronosticoEntero.children[13].innerText = equipos[indiceEquipoVisitante].puntos;
                                }
                            }
                        }
                    }
                }
            }
            actualizarTabla();
        });
    }
}

/* FUNCION PARA ACTUALIZAR LA TABLA */
function actualizarTabla() {
    equipos.sort(function(equipo1, equipo2) {
      return equipo2.puntos - equipo1.puntos;
    });

    /* ACTUALIZAMOS LA POSICION DE CADA EQUIPO EN FUNCION DEL INDICE QUE OCUPA AHORA EN EL ARRAY DE EQUIPOS */
    equipos.forEach(function(equipo, index) {
      equipo.posicion = index + 1;
    });

    /*var tabla = document.getElementByClassName("tabla-clasificacion");*/
    var tbody = document.getElementsByClassName("cuerpo-tabla");

    tbody[0].innerHTML = "";

    equipos.forEach(function(equipo) {
      var fila = crearElementoTR(equipo.posicion, "images/primeraRfef/" + equipo.nombre + ".png", equipo.nombre, equipo.puntos, equipo.partidosJugados, equipo.numVictorias, equipo.numEmpates, equipo.numDerrotas, equipo.golesFavor, equipo.golesContra, equipo.diferenciaGoles);
      tbody[0].appendChild(fila);
    });
}

/* FUNCION PARA CREAR UNA FILA DE LA TABLA */
function crearElementoTR(posicion, imagenSrc, nombreEquipo, puntos, partidosJugados, partidosGanados, partidosEmpatados, partidosPerdidos, golesFavor, golesContra, diferenciaGoles) {
    // Crear el elemento tr
    var nuevoTR = document.createElement("tr");

    // Agregar clases al tr
    nuevoTR.classList.add("puesto");

    if(posicion == 1 || posicion == 2 || posicion == 3 || posicion == 4){
        nuevoTR.classList.add("champions");
    }else{
        if(posicion == 5){
            nuevoTR.classList.add("europa-league");
        }else{
            if(posicion == 6){
                nuevoTR.classList.add("conference");
            }else{
                if(posicion == 18 || posicion == 19 || posicion == 20){
                    nuevoTR.classList.add("descenso");
                }
            }
        }
    }

    // Crear y agregar las celdas td con sus clases y contenido
    var tdPosicion = crearCeldaTD("posicion", posicion);
    var tdEquipoCompleto = crearCeldaEquipoCompleto(imagenSrc, nombreEquipo);
    var tdPuntos = crearCeldaTD("puntos", puntos);
    var tdPartidosJugados = crearCeldaTD("partidos-jugados", partidosJugados);
    var tdPartidosGanados = crearCeldaTD("partidos-ganados", partidosGanados);
    var tdPartidosEmpatados = crearCeldaTD("partidos-empatados", partidosEmpatados);
    var tdPartidosPerdidos = crearCeldaTD("partidos-perdidos", partidosPerdidos);
    var tdGolesFavor = crearCeldaTD("goles-favor", golesFavor);
    var tdGolesContra = crearCeldaTD("goles-contra", golesContra);
    var tdDiferenciaGoles = crearCeldaTD("diferencia-goles", diferenciaGoles);

    // Agregar las celdas al tr
    nuevoTR.appendChild(tdPosicion);
    nuevoTR.appendChild(tdEquipoCompleto);
    nuevoTR.appendChild(tdPuntos);
    nuevoTR.appendChild(tdPartidosJugados);
    nuevoTR.appendChild(tdPartidosGanados);
    nuevoTR.appendChild(tdPartidosEmpatados);
    nuevoTR.appendChild(tdPartidosPerdidos);
    nuevoTR.appendChild(tdGolesFavor);
    nuevoTR.appendChild(tdGolesContra);
    nuevoTR.appendChild(tdDiferenciaGoles);

    return nuevoTR;
}

// Función auxiliar para crear celdas td con clases y contenido
function crearCeldaTD(clase, contenido) {
    var td = document.createElement("td");
    td.classList.add(clase);
    td.textContent = contenido;
    return td;
}

// Función auxiliar para crear celda td con clase "equipo-completo"
function crearCeldaEquipoCompleto(imagenSrc, nombreEquipo) {
    var tdEquipoCompleto = document.createElement("td");
    tdEquipoCompleto.classList.add("equipo-completo");

    var divEquipo = document.createElement("div");
    divEquipo.classList.add("equipo");

    var divImgEscudo = document.createElement("div");
    divImgEscudo.classList.add("img-escudo");

    var imgEscudo = document.createElement("img");
    imgEscudo.src = imagenSrc;
    imgEscudo.alt = nombreEquipo;
    divImgEscudo.appendChild(imgEscudo);

    var divWrapperNombreEquipo = document.createElement("div");
    divWrapperNombreEquipo.classList.add("wrapper-nombre-equipo");

    var spanNombreEquipo = document.createElement("span");
    spanNombreEquipo.classList.add("nombre-equipo");
    spanNombreEquipo.textContent = nombreEquipo;

    divWrapperNombreEquipo.appendChild(spanNombreEquipo);

    divEquipo.appendChild(divImgEscudo);
    divEquipo.appendChild(divWrapperNombreEquipo);
    tdEquipoCompleto.appendChild(divEquipo);

    return tdEquipoCompleto;
}

/*------------------------------------------------------PARTE DE INTERACCION CON LOS PRONOSTICOS------------------------------------------------------*/

var botonPronostico = document.querySelector(".pronostico-partido .pronostico-boton");
var inputPronostico = document.querySelector(".pronostico-partido .pronostico-titulo .posibles-equipos");
var posiblesEquipos = Array.from(inputPronostico.children);
var divPronosticos = document.querySelector(".pronosticos");

botonPronostico.addEventListener("click", function(){

    var indiceEquipo = equipos.findIndex(function(equipo){
        return equipo.nombre == inputPronostico.value;
    });

    var indicePosibleEquipos = posiblesEquipos.findIndex(function(posibleEquipo){
        return posibleEquipo.value == inputPronostico.value;
    });

    // HACEMOS QUE LA OPCION DE ESE EQUIPO SE BORRE DEL DOM (PERO SIGUE EN EL ARRAY DE OPCIONES)
    posiblesEquipos[indicePosibleEquipos].remove();

    equipos[indiceEquipo].nombre;
    equipos[indiceEquipo].nombre;
    var partidosEquipo;

    switch (equipos[indiceEquipo].nombre) {
        case 'ARE':
            partidosEquipo = partidosARE;
            break;
        case 'BAR':
            partidosEquipo = partidosBAR;
            break;
        case 'CEL':
            partidosEquipo = partidosCEL;
            break;
        case 'COR':
            partidosEquipo = partidosCOR;
            break;
        case 'CUL':
            partidosEquipo = partidosCUL;
            break;
        case 'DEP':
            partidosEquipo = partidosDEP;
            break;
        case 'FUE':
            partidosEquipo = partidosFUE;
            break;
        case 'LOG':
            partidosEquipo = partidosLOG;
            break;
        case 'LUG':
            partidosEquipo = partidosLUG;
            break;
        case 'MAJ':
            partidosEquipo = partidosMAJ;
            break;
        case 'NAS':
            partidosEquipo = partidosNAS;
            break;
        case 'OSA':
            partidosEquipo = partidosOSA;
            break;
        case 'PON':
            partidosEquipo = partidosPON;
            break;
        case 'RSO':
            partidosEquipo = partidosRSO;
            break;
        case 'RUN':
            partidosEquipo = partidosRUN;
            break;
        case 'SAB':
            partidosEquipo = partidosSAB;
            break;
        case 'SES':
            partidosEquipo = partidosSES;
            break;
        case 'TAR':
            partidosEquipo = partidosTAR;
            break;
        case 'TER':
            partidosEquipo = partidosTER;
            break;
        case 'UNI':
            partidosEquipo = partidosUNI;
            break;
        default:
            // Código a ejecutar si ninguno de los casos coincide
    }
    crearPronostico(equipos[indiceEquipo].nombre, partidosEquipo[0], partidosEquipo[1], partidosEquipo[2], partidosEquipo[3], partidosEquipo[4], partidosEquipo[5], partidosEquipo[6], partidosEquipo[7], partidosEquipo[8], partidosEquipo[9], partidosEquipo[10], equipos[indiceEquipo].puntos, equipos[indiceEquipo].resultadosJornadas, indicePosibleEquipos);
});

function crearPronostico(equipo1, equipo2, equipo3, equipo4, equipo5, equipo6, equipo7, equipo8, equipo9, equipo10, equipo11, equipo12, puntos, resultados, indiceEnPosiblesEquipos) {
    // Crear un elemento div con la clase "pronostico" ----------------------PRONOSTICO----------------------
    var divPronostico = document.createElement("div");
    divPronostico.classList.add("pronostico");

    // Crear un botón con la clase "eliminar-pronostico" ----------------------PRONOSTICO.ELIMINAR-PRONOSTICO-----------------------
    var btnEliminarPronostico = document.createElement("button");
    btnEliminarPronostico.classList.add("eliminar-pronostico");

    btnEliminarPronostico.addEventListener('click', function() {
        var listItem = this.parentNode; // Accede al <div> que es Pronostico padre del botón de eliminar
        listItem.remove(); // Elimina el elemento 
        // CUANDO ELIMINAMOS UN PRONOSTICO, EL EQUIPO VUELVE A LAS OPCIONES EN EL DOM
        inputPronostico.appendChild(posiblesEquipos[indiceEnPosiblesEquipos]);
        pronosticosActivos = pronosticosActivos.filter(function(pronostico){
            return pronostico.pronosticoEntero.children[1].innerText != equipo1;
        });
    });

    // Crear una imagen dentro del botón
    var imgCerrar = document.createElement("img");
    imgCerrar.src = "images/cerrar.png";
    imgCerrar.alt = "eliminar";

    // Agregar la imagen al botón
    btnEliminarPronostico.appendChild(imgCerrar);

    //--- Agregar el botón al div de pronóstico
    divPronostico.appendChild(btnEliminarPronostico);

    // Crear la sección de equipo-pronostico ----------------------PRONOSTICO.EQUIPO-PRONOSTICO-----------------------
    var divEquipoPronostico = document.createElement("div");
    divEquipoPronostico.classList.add("equipo-pronostico");

    // Crear la sección de equipo-completo ----------------------PRONOSTICO.EQUIPO-PRONOSTICO.EQUIPO-COMPLETO-----------------------
    var divEquipoCompleto = document.createElement("div");
    divEquipoCompleto.classList.add("equipo-completo");

    // Crear la sección de img-escudo y agregar la imagen del escudo del equipo1
    var divImgEscudo = document.createElement("div");
    divImgEscudo.classList.add("img-escudo");

    var imgEscudo = document.createElement("img");
    imgEscudo.src = "images/primeraRfef/" + equipo1 + ".png";
    imgEscudo.alt = equipo1;

    divImgEscudo.appendChild(imgEscudo);

    // Agregar la sección de img-escudo al div de equipo-completo
    divEquipoCompleto.appendChild(divImgEscudo);

    // Crear la sección de wrapper-nombre-equipo y agregar el nombre del equipo1
    var divWrapperNombreEquipo = document.createElement("div");
    divWrapperNombreEquipo.classList.add("wrapper-nombre-equipo");

    var spanNombreEquipo = document.createElement("span");
    spanNombreEquipo.classList.add("nombre-equipo");
    spanNombreEquipo.textContent = equipo1;

    divWrapperNombreEquipo.appendChild(spanNombreEquipo);

    // Agregar la sección de wrapper-nombre-equipo al div de equipo-completo
    divEquipoCompleto.appendChild(divWrapperNombreEquipo);

    // Agregar la sección de equipo-completo al div de equipo-pronostico
    divEquipoPronostico.appendChild(divEquipoCompleto);

    // Agregar la sección de equipo-pronostico al div de pronostico
    divPronostico.appendChild(divEquipoPronostico);

    // Crear y agregar las secciones de pronostico-partido-X ----------------------PRONOSTICO.PRONOSTICO-PARTIDO-X-----------------------

    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 0, equipo2));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 1, equipo3));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 2, equipo4));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 3, equipo5));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 4, equipo6));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 5, equipo7));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 6, equipo8));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 7, equipo9));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 8, equipo10));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 9, equipo11));
    divPronostico.appendChild(crearDivPronosticoFinal(resultados, 10, equipo12));

    // Crear y agregar la sección de total
    var divTotal = document.createElement("div");
    divTotal.classList.add("total");
    divTotal.textContent = puntos;

    divPronostico.appendChild(divTotal);

    // Agregar el div de pronóstico al body o a cualquier otro contenedor deseado
    divPronosticos.appendChild(divPronostico);

    // LO METEMOS AL ARRAY DE OBJETOS
    var rivales = [];
    for (let z = 2; z <= 12; z++) {
        rivales.push(divPronostico.children[z]);
    }
    pronosticosActivos.push(new Pronostico(divPronostico, rivales));
}

function crearDivPronosticoFinal(resultados, i, nombre){

    var divPronosticoPartido = document.createElement("div");
    divPronosticoPartido.classList.add("pronostico-final");
    if(resultados[i] == "ganado"){
        divPronosticoPartido.classList.remove("pronostico-final");
        divPronosticoPartido.classList.add("victoria");
    }else{
        if(resultados[i] == "empatado"){
            divPronosticoPartido.classList.remove("pronostico-final");
            divPronosticoPartido.classList.add("empate");
        }else{
            if(resultados[i] == "perdido"){
                divPronosticoPartido.classList.remove("pronostico-final");
                divPronosticoPartido.classList.add("derrota");
            }
        }
    }
    divPronosticoPartido.textContent = nombre;
    return divPronosticoPartido;
}