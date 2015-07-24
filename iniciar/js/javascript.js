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
            left: 37,
            right: 39,
            fire: 32     // tecla espacio
        },
        nextPlayerShot = 0,
        playerShotDelay = 250,
        now = 0;

    function loop() {
        update();
        draw();
    }
	
	
	
	
	////////////terminacion de var game fuction
	return {
        init: init
    }
})();