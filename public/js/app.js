document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('fondo');
var lapiz = canvas.getContext('2d');
var btnGuardarG = document.getElementById('guardar');
var btnLogout = document.getElementById('btnLogout')
const DIMENSION = 50;
var x = 400;
var y = 0;
var turno = true;
var contador = 0;
var matriz = new Array(8);
var lblNegro = document.getElementById('punteoNegras');
var lblAmarillo = document.getElementById('punteoBlancas');
//Realiza la conexion a la base de firebase
var refDB = firebase.database().ref('usuarios');
var usuario = {}
var conteoNegras = 0
var conteoAmarillas = 0
var refImage = firebase.storage().ref();
var imagenRaul = document.getElementById('imagenRaul');
var imagenFondo = document.getElementById('imagenFondo')
var btnGuardarF = document.getElementById('btnGuardarF')

var fondo = {
    url: 'https://firebasestorage.googleapis.com/v0/b/test-juego-othello.appspot.com/o/Tablero.png?alt=media&token=cb17db3f-36ba-4658-aa17-a53c26f4a7dd',
    imagen: Image,
    cargaOk: false
};

var amarilla = {
    url: 'https://firebasestorage.googleapis.com/v0/b/test-juego-othello.appspot.com/o/Amarilla.png?alt=media&token=993a77e4-d7ae-4244-a2ab-6c0623bb466e',
    imagen: Image,
    cargaOk: false
};

var negra = {
    url: 'https://firebasestorage.googleapis.com/v0/b/test-juego-othello.appspot.com/o/Negra.png?alt=media&token=ab01f9de-5114-467f-9f94-8ff8f61e911e',
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
            if (contador == 60) {
                alert('Fin del Juego');
            };
            if (contador == 60 && fBlancas > fNegras) {
                alert('Ganan las Blancas');
            } else if (contador == 60 && fblancas < fNegras) {
                alert('Ganan las negras');
            } else if (contador == 60 && fblancas == fNegras) {
                alert('Empatados')
            }
            break;
    };

};

function colorPosicion() {
    if (turno == true) {
        if (matriz[x / DIMENSION][y / DIMENSION] == 'x' || matriz[(x / DIMENSION) + 1][y / DIMENSION] == 'a' || matriz[(x / DIMENSION) - 1][y / DIMENSION] == 'a' || matriz[x / DIMENSION][(y / DIMENSION) + 1] == 'a' || matriz[x / DIMENSION][(y / DIMENSION) - 1] == 'a') {
            // if (matriz[(x / DIMENSION) + 1][y / DIMENSION] == 'a' || matriz[(x / DIMENSION) - 1][y / DIMENSION] == 'a' || matriz[x / DIMENSION][(y / DIMENSION) + 1] == 'a' || matriz[x / DIMENSION][(y / DIMENSION) - 1] == 'a') {
            matriz[x / DIMENSION][y / DIMENSION] = 'n'
            turno = false
            x = 400;
            y = 0;
            turnos();
            dibujar();
            ganador();
            contador = contador + 1;
        } else {
            alert("Posicion Invalida");
        }

    } else if (turno == false) {
        if (matriz[x / DIMENSION][y / DIMENSION] == 'x') {
            matriz[x / DIMENSION][y / DIMENSION] = 'a'
            turno = true;
            x = 400;
            y = 0;
            turnos();
            dibujar();
            ganador();
            contador = contador + 1;
        }
    } else {
        alert("Posicion Invalida");
    };
}; //llave principal

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
    var fBlancas = 0;
    var fNegras = 0;

    for (var columna = 0; columna < matriz.length; columna++) {
        for (var fila = 0; fila < matriz.length; fila++) {
            if (matriz[columna][fila] == 'n') {
                fNegras++;
            } else if (matriz[columna][fila] == 'a') {
                fBlancas++;
            };
        };
    };
    conteoAmarillas = fBlancas;
    conteoNegras = fNegras;
    lblAmarillo.value = fBlancas;
    lblNegro.value = fNegras;
};

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
    console.log(x, y)
        //Negras
    if (turno == true && matriz[x / DIMENSION][y / DIMENSION] == 'x') {
        if (y / DIMENSION < 6) {
            //Validacion abajo
            if (matriz[x / DIMENSION][(y / DIMENSION) + 1] == 'a') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[x / DIMENSION][(y / DIMENSION) + i] == 'n') {
                        break;
                    } else if (matriz[x / DIMENSION][(y / DIMENSION) + i] == 'a') {
                        matriz[x / DIMENSION][(y / DIMENSION) + i] = 'n'
                    } else {
                        break;
                    };
                };
            };
        };

        if (y / DIMENSION > 1) {
            //Validacion arriba
            if (matriz[x / DIMENSION][(y / DIMENSION) - 1] == 'a') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[x / DIMENSION][(y / DIMENSION) - i] == 'n') {
                        break;
                    } else if (matriz[x / DIMENSION][(y / DIMENSION) - i] == 'a') {
                        matriz[x / DIMENSION][(y / DIMENSION) - i] = 'n'
                    } else {
                        break;
                    };
                };
            };
        };

        if (x / DIMENSION < 6) {
            //Validacion derecha
            if (matriz[(x / DIMENSION) + 1][y / DIMENSION] == 'a') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[(x / DIMENSION) + i][y / DIMENSION] == 'n') {
                        break;
                    } else if (matriz[(x / DIMENSION) + i][(y / DIMENSION)] == 'a') {
                        matriz[(x / DIMENSION) + i][y / DIMENSION] = 'n'
                    } else {
                        break;
                    };
                };
            };
        };

        if (x / DIMENSION > 1) {
            //validacion izquierda
            if (matriz[(x / DIMENSION) - 1][y / DIMENSION] == 'a') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[(x / DIMENSION) - i][y / DIMENSION] == 'n') {
                        break;
                    } else if (matriz[(x / DIMENSION) - i][y / DIMENSION] == 'a') {
                        matriz[(x / DIMENSION) - i][y / DIMENSION] = 'n'
                    } else {
                        break;
                    };
                };
            };
        };
    };

    //Amarillas
    if (turno == false && matriz[x / DIMENSION][y / DIMENSION] == 'x') {
        if (y / DIMENSION < 6) {
            //Validacion abajo
            if (matriz[x / DIMENSION][(y / DIMENSION) + 1] == 'n') {
                for (let j = 1; j < matriz.length; j++) {
                    if (matriz[x / DIMENSION][(y / DIMENSION) + j] == 'a') {
                        break;
                    } else if (matriz[x / DIMENSION][(y / DIMENSION) + j] == 'n') {
                        matriz[x / DIMENSION][(y / DIMENSION) + j] = 'a'
                    } else {
                        break;
                    };
                };
            };
        };

        if (y / DIMENSION > 1) {
            //Validacion arriba
            if (matriz[x / DIMENSION][(y / DIMENSION) - 1] == 'n') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[x / DIMENSION][(y / DIMENSION) - i] == 'a') {
                        break;
                    } else if (matriz[x / DIMENSION][(y / DIMENSION) - i] == 'n') {
                        matriz[x / DIMENSION][(y / DIMENSION) - i] = 'a'
                    } else {
                        break;
                    };
                };
            };
        };

        if (x / DIMENSION < 6) {
            //Validacion derecha
            if (matriz[(x / DIMENSION) + 1][y / DIMENSION] == 'n') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[(x / DIMENSION) + i][y / DIMENSION] == 'a') {
                        break;
                    } else if (matriz[(x / DIMENSION) + i][(y / DIMENSION)] == 'n') {
                        matriz[(x / DIMENSION) + i][y / DIMENSION] = 'a'
                    } else {
                        break;
                    }
                };
            };
        };
        if (x / DIMENSION > 1) {
            //validacion izquierda
            if (matriz[(x / DIMENSION) - 1][y / DIMENSION] == 'n') {
                for (let i = 1; i < matriz.length; i++) {
                    if (matriz[(x / DIMENSION) - i][y / DIMENSION] == 'a') {
                        break;
                    } else if (matriz[(x / DIMENSION) - i][y / DIMENSION] == 'n') {
                        matriz[(x / DIMENSION) - i][y / DIMENSION] = 'a'
                    } else {
                        break;
                    }

                };
            };
        };
    };
    dibujarFichasPrincipales();
};

//Inicio de sesion con google
btnGuardarG.addEventListener('click', function() {
    event.preventDefault(); //evita que la pagina se refresque
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(datos) {
        var usuario = {
            displayName: datos.user.displayName,
            email: datos.user.email,
            uid: datos.user.uid,
            punteo: conteoNegras
        };
        agregar(usuario.uid, usuario, usuario.fNegras);
    });
});

//Cierre de Sesion con google
btnLogout.addEventListener('click', function() {
    console.log('funciona')
        //Evita que la pagina se recargue
    event.preventDefault();
    //Cierra la sesion;
    firebase.auth().signOut();
    window.location.reload(true);
});

//Comprueba si hay sesion de google
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        console.log('Existe Usuario');
        console.log(user);
    } else {
        console.log('No extiste usuario');
    };

});

//Inicio de sesion con Facebook
btnGuardarF.addEventListener('click', function() {
    event.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile')
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result)
    });
})

//Forma para aniadir datos
//firebase.database().ref("usuarios").child("rldpMVE4QxbnWuRK1U6f0Ks8nws1").child("2018-12-02(200)").update({punteo: "100", fecha:"2018-12-01", tiempo: "00:00:30"})
//Lee los datos y los muestra pero si se actualiza el registro no cambia en tiempo real debido al once, si usamos one si se reflejan los cambios
//firebase.database().ref("usuarios").child('rldpMVE4QxbnWuRK1U6f0Ks8nws1').once('value', function(data){console.log(data.val())})

//Para leer
//firebase.database().ref("usuarios").child("uid").once("value",function(data){console.log(data.val())})

//on metodo que esta fuera de linea, la modificacion que se haga en tiempo real no se ve reflejada
//Al setear eliminamos la informacion y sobreescribimos, borra el nodo anterior y guarda el nuevo
//Al pushear acumulamos la informacion, insertamos un nodo
//El Update actualiza un nodo existente y si no existe lo inserta
function agregar(uid, usuario) {
    var d = new Date();
    var mes = parseInt(d.getMonth()) + 1;
    var n = d.getFullYear() + '-' + mes + '-' + d.getDate();

    // refDB.child(uid).update(usuario);
    refDB.child(uid).child(n + '(' + conteoNegras + ')').update({ score: { punteo: conteoNegras, fecha: n } });
}


refImage.child('gomez.png').getDownloadURL().then(function(url) {
    alert(url);
    imagenRaul.src = url;
});

refImage.child('blanco.png').getDownloadURL().then(function(url) {
    alert(url);
    imagenFondo.src = url;
});