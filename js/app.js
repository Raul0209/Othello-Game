document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('fondo');
var lapiz = canvas.getContext('2d');
const DIMENSION = 50;
var x = 400;
var y = 0;
var turno = true;
var contador = 0;
var matriz = new Array(8);
var colorA;
var colorN;

var fondo = {
    url: './Imagenes/Tablero.png',
    imagen: Image,
    cargaOk: false
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

fondo.imagen.addEventListener("load", function() {
    fondo.cargaOk = true;
    dibujar();

});

negra.imagen.addEventListener("load", function() {
    negra.cargaOk = true;
    dibujar();
});

amarilla.imagen.addEventListener("load", function() {
    amarilla.cargaOk = true;
    dibujar();
});

function movimiento(evento) {
    switch (evento.keyCode) {
        case tecla.LEFT:
            if (x > 0) {
                x = x - DIMENSION;
            }
            dibujar();
            break;

        case tecla.UP:
            if (y > 0) {
                y = y - DIMENSION;

            };
            dibujar();
            break;

        case tecla.RIGHT:
            if (x < 350) {
                x = x + DIMENSION;
            };
            dibujar();
            break;

        case tecla.DOWN:
            if (y < 350) {
                y = y + DIMENSION;
                dibujar();
            };
            break;

        case tecla.ENTER:
            cambiandoColores();
            colorPosicion();
            if (contador > 59) {
                alert(colorA && ColorN)
            };
            break;
    };

};

function colorPosicion() {
    if (turno == true) {
        if (matriz[x / DIMENSION][y / DIMENSION] == 'x') {
            matriz[x / DIMENSION][y / DIMENSION] = 'n'
            turno = false
            x = 400;
            y = 0;
            turnos();
            dibujar();
            contador = contador + 1;
        } else {
            alert("Posicion Invalida");
        };

    } else if (turno == false) {
        if (matriz[x / DIMENSION][y / DIMENSION] == 'x') {
            matriz[x / DIMENSION][y / DIMENSION] = 'a'
            turno = true;
            x = 400;
            y = 0;
            turnos();
            dibujar();
            contador = contador + 1;
        } else {
            alert("Posicion Invalida");
        };

    };

};

function dibujar() {

    if (fondo.cargaOk == true) {
        lapiz.drawImage(fondo.imagen, 0, 0);
    };
    if (negra.cargaOk == true && turno == true) {
        lapiz.drawImage(negra.imagen, x, y);
    };
    if (amarilla.cargaOk == true && turno == false) {
        lapiz.drawImage(amarilla.imagen, x, y);
    }
    dibujarFichasPrincipales();

};

function dibujarMatriz() {
    for (var columna = 0; columna < matriz.length; columna++) {
        matriz[columna] = new Array(8);
        for (var fila = 0; fila < matriz.length; fila++) {
            matriz[columna][fila] = 'x';
        };
    };
};

function posicionFichasIniciales() {
    matriz[3][3] = 'n';
    matriz[3][4] = 'a';
    matriz[4][3] = 'a';
    matriz[4][4] = 'n';
};

function dibujarFichasPrincipales() {
    for (var columna = 0; columna < matriz.length; columna++) {
        for (var fila = 0; fila < matriz.length; fila++) {
            if (matriz[columna][fila] == 'n') {
                lapiz.drawImage(negra.imagen, columna * DIMENSION, fila * DIMENSION)
            };
            if (matriz[columna][fila] == 'a') {
                lapiz.drawImage(amarilla.imagen, columna * DIMENSION, fila * DIMENSION)
            };
        };
    };
};

function ganador() {
    for (var columna = 0; columna < matriz.length; columna++) {
        for (var fila = 0; fila < matriz.length; fila++) {
            if (matriz[columna][fila] == 'n') {
                colorN = colorN + 1;
            } else if (matriz[columna][fila] == 'a') {
                colorA = colorA + 1;
            }
        }
    }
}

function turnos() {

    if (turno == true) {
        x = 400;
        y = 0;
        lapiz.drawImage(negra.imagen, x * DIMENSION, y * DIMENSION);

    } else if (turno == false) {
        lapiz.drawImage(amarilla.imagen, x * DIMENSION, y * DIMENSION);
        x = 400;
        y = 0;
    };
};

var tecla = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
};

function cambiandoColores() {
    console.log(x / DIMENSION, y / DIMENSION)
    if (turno == true) {

        if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) + 1][y / DIMENSION] == 'a' && matriz[(x / DIMENSION) + 2][y / DIMENSION] == 'n') {
            matriz[(x / DIMENSION) + 1][y / DIMENSION] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) - 1][y / DIMENSION] == 'a' && matriz[(x / DIMENSION) + 2][y / DIMENSION] == 'x') {
            matriz[(x / DIMENSION) - 1][y / DIMENSION] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[x / DIMENSION][(y / DIMENSION) + 1] == 'a' && matriz[x / DIMENSION][(y / DIMENSION) + 2] == 'n') {
            matriz[x / DIMENSION][(y / DIMENSION) + 1] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[x / DIMENSION][(y / DIMENSION) - 1] == 'a' && matriz[x / DIMENSION][(y / DIMENSION) + 2] == 'x') {
            matriz[x / DIMENSION][(y / DIMENSION) - 1] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) + 1][(y / DIMENSION) + 1] == 'a' && matriz[(x / DIMENSION) + 2][(y / DIMENSION) + 2] == 'n') {
            matriz[(x / DIMENSION) + 1][(y / DIMENSION) + 1] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) - 1][(y / DIMENSION) - 1] == 'a' && matriz[(x / DIMENSION) - 2][(y / DIMENSION) - 2] == 'n') {
            matriz[(x / DIMENSION) - 1][(y / DIMENSION) - 1] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) + 1][(y / DIMENSION) - 1] == 'a' && matriz[(x / DIMENSION) + 2][(y / DIMENSION) - 2] == 'n') {
            matriz[(x / DIMENSION) + 1][(y / DIMENSION) - 1] = 'n'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) - 1][(y / DIMENSION) + 1] == 'a' && matriz[(x / DIMENSION) - 2][(y / DIMENSION) + 2] == 'n') {
            matriz[(x / DIMENSION) - 1][(y / DIMENSION) + 1] = 'n'
        }
        dibujarFichasPrincipales();
    }

    if (turno == false) {
        if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) + 1][y / DIMENSION] == 'n' && matriz[(x / DIMENSION) + 2][y / DIMENSION] == 'a') {
            matriz[(x / DIMENSION) + 1][y / DIMENSION] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) - 1][y / DIMENSION] == 'n' && matriz[(x / DIMENSION) + 2][y / DIMENSION] == 'x') {
            matriz[(x / DIMENSION) - 1][y / DIMENSION] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[x / DIMENSION][(y / DIMENSION) + 1] == 'n' && matriz[x / DIMENSION][(y / DIMENSION) + 2] == 'a') {
            matriz[x / DIMENSION][(y / DIMENSION) + 1] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[x / DIMENSION][(y / DIMENSION) - 1] == 'n' && matriz[x / DIMENSION][(y / DIMENSION) + 2] == 'x') {
            matriz[x / DIMENSION][(y / DIMENSION) - 1] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) + 1][(y / DIMENSION) + 1] == 'n' && matriz[(x / DIMENSION) + 2][(y / DIMENSION) + 2] == 'a') {
            matriz[(x / DIMENSION) + 1][(y / DIMENSION) + 1] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) - 1][(y / DIMENSION) - 1] == 'n' && matriz[(x / DIMENSION) - 2][(y / DIMENSION) - 2] == 'a') {
            matriz[(x / DIMENSION) - 1][(y / DIMENSION) - 1] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) + 1][(y / DIMENSION) - 1] == 'n' && matriz[(x / DIMENSION) + 2][(y / DIMENSION) - 2] == 'a') {
            matriz[(x / DIMENSION) + 1][(y / DIMENSION) - 1] = 'a'
        } else if (matriz[x / DIMENSION][y / DIMENSION] == 'x' && matriz[(x / DIMENSION) - 1][(y / DIMENSION) + 1] == 'n' && matriz[(x / DIMENSION) - 2][(y / DIMENSION) + 2] == 'a') {
            matriz[(x / DIMENSION) - 1][(y / DIMENSION) + 1] = 'a'
        }




        dibujarFichasPrincipales();
    }
}