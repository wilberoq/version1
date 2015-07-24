// aqui va el codgo para el juego de nave
// estes codigos nos marca los pulsos para el  juego
window.requestAnimFrame = (function () {     //informa al navegador que quieres realizar una animación.
    return  window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame  || // Chrome/Webkit
        window.mozRequestAnimationFrame     ||  //Firefox
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      || 
        function ( /* function */ callback, /* DOMElement */ element) {
window.setTimeout(callback, 1000 / 60); // Llama a una función o ejecuta un fragmento de código después del retraso especificado.
        };
})();


arrayRemove = function (array, from) {
    var rest = array.slice((from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

var game = (function () {

    // Variables globales a la aplicacion con canvas
    var canvas,
        ctx,
        buffer,
        bufferctx,
        player,
        evil,
        playerShot,
        bgMain,
        bgBoss,
        evilSpeed = 1,
        totalEvils = 7,
        playerLife = 3,
        shotSpeed = 5,
        playerSpeed = 5,
        evilCounter = 0,
        youLoose = false,
        congratulations = false,
        minHorizontalOffset = 100,
        maxHorizontalOffset = 400,
        evilShots = 5,   // disparos que tiene el malo al principio
        evilLife = 3,    // vidas que tiene el malo al principio (se van incrementando)
        finalBossShots = 30,
        finalBossLife = 12,
        totalBestScoresToShow = 5, // las mejores puntuaciones que se mostraran
        playerShotsBuffer = [],
        evilShotsBuffer = [],
        evilShotImage,
        playerShotImage,
        playerKilledImage,
        evilImages = {
            animation : [],
            killed : new Image()
        },
		
		
        bossImages = {
            animation : [],
            killed : new Image()
        },
        keyPressed = {},
        keyMap = {
            left: 37,    //tecla izquierdo
            right: 39,   //tecla derecho
            fire: 32     // tecla espacio
        },
        nextPlayerShot = 0,  // siguiente Disparo jugador
        playerShotDelay = 250,  //jugador Disparo Retardo
        now = 0;

    function loop() {
        update();
        draw();
    }
	function preloadImages () {   // funcion para precarga de Imágenes y agregando imagenes para el juego
        for (var i = 1; i <= 8; i++) {
            var evilImage = new Image();
            evilImage.src = 'images/malo' + i + '.png';// 
            evilImages.animation[i-1] = evilImage;
            var bossImage = new Image();
            bossImage.src = 'images/jefe' + i + '.png';
            bossImages.animation[i-1] = bossImage; // jefe imagen animacio = jefe imagen 
        }
        evilImages.killed.src = 'images/malo_muerto.png';
        bossImages.killed.src = 'images/jefe_muerto.png';
        bgMain = new Image();
        bgMain.src = 'images/fondovertical.png';  //imagen vertical
        bgBoss = new Image();
        bgBoss.src = 'images/fondovertical_jefe.png'; //fondo vertical jefe
        playerShotImage = new Image(); // disparo de imageen = nuevo imagen
        playerShotImage.src = 'images/disparo_bueno.png';  /// disparo del imagen =disparo_bueno.png
        evilShotImage = new Image();  ////mal disparo imagen =nuevo imagen
        evilShotImage.src = 'images/disparo_malo.png'; // tma el mal imagen
        playerKilledImage = new Image();    //imagen de jugador asicinado =nuevo jugador
        playerKilledImage.src = 'images/bueno_muerto.png';//jugador asisinado =al imagen bueno_muerto.png

    }
	// funcion inicial

    function init() {

        preloadImages(); // precarga del imagen

        showBestScores();

        canvas = document.getElementById('canvas');  //obtiene elemento byid
        ctx = canvas.getContext("2d");

        buffer = document.createElement('canvas');
        buffer.width = canvas.width;
        buffer.height = canvas.height;
        bufferctx = buffer.getContext('2d');

        player = new Player(playerLife, 0);
        evilCounter = 1;
        createNewEvil();

        showLifeAndScore();

        addListener(document, 'keydown', keyDown);
        addListener(document, 'keyup', keyUp);

        function anim () {
            loop();
            requestAnimFrame(anim);
        }
        anim();
    }


	
	
	
	////////////terminacion de var game fuction
	return {
        init: init
    }
})();