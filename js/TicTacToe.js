const vacio        = "";
var   O            = "O"; 
var   X            = "X";
var   inicia       = X;
var   jugadores    = 1;
var   jugandoO     = false;
var   tabla = [vacio, vacio, vacio, vacio, vacio, vacio, vacio, vacio, vacio];
var   bg_gral;


//=================================================
function clicked(i){     
  //Obtenemos el Char para este click
  //Mostramos en pantalla quien jugara despues de este click
  var valor = "?";
  if (jugandoO) {
    valor = O;
    mostrar_texto_sigu_jugd("Juega =>", X);
  }
  else {
    valor = X;
    mostrar_texto_sigu_jugd("Juega =>", O);
  }  

  //actualizamos el valor en la Pag
  document.getElementById(i).innerHTML = valor;
  //actualizamos el valor en la tabla
  tabla[i] = valor;
  
  jugandoO = !jugandoO;
}

//=================================================
function juegaJugadorO(){
  if (!jugandoO  ) return;

  //hay 2 jugadores ==> debe jugar el jugadorO
  if (jugadores>1) return; 

  //obtenemos todos los elementos de la tabla para enviar el evento Click
  items = document.getElementsByClassName("square");
  
  //hacemos click en el primer elemento vacio q encontremos
  for ( i = 0; i < tabla.length; i++) {
    if (tabla[i] == vacio) {
      items[i].click();    
      break;
    }
  } //for
} //juegaJugadorO

//===========================================
function mostrar_texto_sigu_jugd(texto, jugador){
  //mostramos el "texto" en el control 'texto-sigu-jugd'
   document.getElementById('texto-sigu-jugd').innerHTML = texto; 

   //si "jugador == null" hacemos "invisible" el control "jugadorX"
   if ( jugador == null ) {
      document.getElementById("jugadorX").style.visibility = "hidden" ;  
      return;
   }

   //ponemos el parametro "jugador" en el value del control "jugadorX"
   document.getElementById('jugadorX').innerHTML = jugador; 
}

//==========================================================
function juegoNuevo(){
  //limpiamos la tabla
  tabla = [vacio, vacio, vacio, vacio, vacio, vacio, vacio, vacio, vacio];

  //limpiamos los controles
  items = document.getElementsByClassName("square");
  for (i = 0; i < items.length; i++) {
    //vaciamos el contenido del item
    items[i].innerHTML = vacio;
  }

  //visualizamos el Button "jugadorX"  
  document.getElementById("jugadorX").style.visibility   = "visible" ;
  
  if (inicia == X) {
    inicia = O;
    jugandoO = true;
    mostrar_texto_sigu_jugd("Juega =>", O);
    juegaJugadorO();
  } 
  else {
    inicia = X;
    jugandoO = false;
    mostrar_texto_sigu_jugd("Juega =>", X);
  }
}

//==========================================================
//Habilita 1 jugador o 2 jugadores
function radioChequed(radioClicked){
  if (radioClicked == "rad2J") {
    if (jugadores != 2) {
       jugadores = 2;
       juegoNuevo();
    }
  }
  else if (radioClicked == "rad1J") {
    if (jugadores != 1) {
        juegoNuevo();
        jugadores = 1;
    }
  }  
}

//==========================================================
//actualizamos los valores de los jugadores
function inicializar(){
  //leemos el color de fondo gral desde las variables de :root
  // bg_gral sirve para despues de q hay un ganador
  rootVars = getComputedStyle(document.body);
  bg_gral = rootVars.getPropertyValue('--bg-gral'); 
}