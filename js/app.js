document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('fondo');
var lapiz = canvas.getContext('2d');
const DIMENSION = 50;
var x = 400;
var y = 0;
var turno = true;
var contador = 0;
var matriz = new Array(8);

var fondo = {
    url: './Imagenes/Tablero.png',
    imagen: Image,
    cargaOk : false
};

var amarilla = {
    url: './Imagenes/Amarilla.png',
    imagen: Image,
    cargaOk: false
};

var negra = {
    url: './Imagenes/Negra.png',
    imagen: Image,
    cargaOk: false
};

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;

amarilla.imagen = new Image();
amarilla.imagen.src = amarilla.url;

negra.imagen = new Image();
negra.imagen.src = negra.url;

dibujarMatriz();
posicionFichasIniciales();
dibujar();
dibujarFichasdeJuego();
    

fondo.imagen.addEventListener("load", function(){
    fondo.cargaOk = true; 
    dibujar();
   
});

negra.imagen.addEventListener("load", function(){
    negra.cargaOk = true;
    dibujar();
});

amarilla.imagen.addEventListener("load",function(){
    amarilla.cargaOk = true;
    dibujar();
});

function movimiento(evento){
    switch(evento.keyCode){
        case tecla.LEFT:        
        if(x > 0){
            x = x - DIMENSION;         
        }
        dibujar();
            break;

         case tecla.UP:
         if(y > 0){
            y = y - DIMENSION; 
            
         };
         dibujar();
            break;

         case tecla.RIGHT:
         if(x < 350){
            x = x + DIMENSION;
         };
            dibujar();
            break; 
           
         case tecla.DOWN:
         if(y < 350){
             y = y + DIMENSION;
             dibujar();
         };
             break;

         case tecla.ENTER:
          colorPosicion();
          cambiandoColores();
          if(contador > 59){
              alert("Empate")
          };
         break;
        };

    };
 

    function colorPosicion(){
        if(turno == true){
            if (matriz[x / DIMENSION][y/DIMENSION] == 'x'){
                matriz[x / DIMENSION] [y / DIMENSION] = 'n'
                turno = false
                dibujar();
                x = 0;
                y = 0;
                dibujarFichasdeJuego();
                dibujar();
                contador = contador + 1;
            }else{
                alert("Posicion Invalida");
            };
            
        }else if(turno == false){
            if (matriz[x/DIMENSION][y/DIMENSION] == 'x'){
                matriz[x / DIMENSION][y / DIMENSION] = 'a'
                turno = true;
                dibujar();
                x = 400;
                y = 0;
                dibujarFichasdeJuego();
                dibujar();
                contador = contador + 1;
            }else{
                alert("Posicion Invalida");
            };
            
        };

    };

function dibujar(){
    
    if(fondo.cargaOk == true) {
        lapiz.drawImage(fondo.imagen, 0, 0);
    };
     if(negra.cargaOk == true && turno == true){
         lapiz.drawImage(negra.imagen,x,y);
     };
     if(amarilla.cargaOk == true && turno == false){
         lapiz.drawImage(amarilla.imagen, x,y);
     }
     dibujarFichasPrincipales();

};



function dibujarMatriz(){
    for  (var columna = 0; columna < matriz.length; columna++){
        matriz[columna] = new Array(8);
        for( var fila = 0; fila < matriz.length; fila++){
            matriz[columna][fila] = 'x';
        };
    };
};

function posicionFichasIniciales(){
    matriz[3][3] = 'n';
    matriz[3][4] = 'a';
    matriz[4][3] = 'a';
    matriz[4][4] = 'n';
};

 function dibujarFichasPrincipales(){
    for (var columna = 0; columna < matriz.length; columna++){
        for (var fila = 0; fila < matriz.length; fila ++){
            if(matriz[columna][fila] == 'n'){
                lapiz.drawImage(negra.imagen, columna * DIMENSION, fila * DIMENSION)
            };
            if(matriz[columna][fila] == 'a'){
                lapiz.drawImage(amarilla.imagen, columna * DIMENSION, fila * DIMENSION)
            };
        };
    };
 };

 function dibujarFichasdeJuego(){
     
     if(turno == true ){
        lapiz.drawImage(negra.imagen, x * DIMENSION, y * DIMENSION);
        x = 400;
        y= 0;
     }
    else if( turno == false ) {
        lapiz.drawImage(amarilla.imagen, x * DIMENSION, y * DIMENSION);
        x = 400;
        y= 0;
    };
 };

    var tecla = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ENTER: 13
    };

function cambiandoColores(){
   if(matriz[3][3] == 'n' && matriz[3][5] == 'n' || matriz[4][4] == 'n' && matriz[2][4] == 'n' ){
    matriz[3][4] = 'n'
   }

   if(matriz[4][4] == 'n' && matriz[4][2] == 'n' || matriz[3][3] == 'n' && matriz[5][3] == 'n'){
    matriz[4][3] = 'n'
   }

   if(matriz[3][4] == 'a' && matriz[3][2] == 'a' || matriz[4][3] == 'a' && matriz[2][3] == 'a'){
       matriz[3][3] = 'a'
   }
   
   if(matriz[4][3] == 'a' && matriz[4][5] == 'a' || matriz[3][4] == 'a' && matriz[5][4] == 'a'){
        matriz[4][4] = 'a'
   }
 
dibujarFichasPrincipales();
 };

