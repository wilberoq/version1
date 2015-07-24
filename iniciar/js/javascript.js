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
// funcion  para vidas y espectacuos del nave

	function showLifeAndScore () {
        bufferctx.fillStyle="rgb(59,59,59)";
        bufferctx.font="bold 16px Arial";
        bufferctx.fillText("Puntos: " + player.score, canvas.width - 100, 20);
        bufferctx.fillText("Vidas: " + player.life, canvas.width - 100,40);
    }

    function getRandomNumber(range) {
        return Math.floor(Math.random() * range);
    }
         ///funcion jugador (vida y puntuacion)
    function Player(life, score) {  //La vida del jugador, la puntuación
        var settings = {
            marginBottom : 10,
            defaultHeight : 66
        };
        player = new Image();
        player.src = 'images/bueno.png'; // imagen del nave bueno
        player.posX = (canvas.width / 2) - (player.width / 2);
        player.posY = canvas.height - (player.height == 0 ? settings.defaultHeight : player.height) - settings.marginBottom;
        player.life = life;
        player.score = score;
        player.dead = false;
        player.speed = playerSpeed;

        var shoot = function () {
            if (nextPlayerShot < now || now == 0) {
                playerShot = new PlayerShot(player.posX + (player.width / 2) - 5 , player.posY);
                playerShot.add();
                now += playerShotDelay; // retraso del jugador  al disparar
                nextPlayerShot = now + playerShotDelay; //siguiente disparo del jugador
            } else {
                now = new Date().getTime();
            }
        };

        player.doAnything = function() {
            if (player.dead)
                return;
            if (keyPressed.left && player.posX > 5)
                player.posX -= player.speed;
            if (keyPressed.right && player.posX < (canvas.width - player.width - 5))
                player.posX += player.speed;
            if (keyPressed.fire)
                shoot();
        };

        player.killPlayer = function() {  // kill= matar
            if (this.life > 0) {
                this.dead = true;
                evilShotsBuffer.splice(0, evilShotsBuffer.length);
                playerShotsBuffer.splice(0, playerShotsBuffer.length);
                this.src = playerKilledImage.src;
                createNewEvil(); // crear nuevo mal
                setTimeout(function () {
                    player = new Player(player.life - 1, player.score);
                }, 500);
                          // caso contrario tu pierdes
            } else {
                saveFinalScore();
                youLoose = true;  
            }
        };

        return player;
    }

	
	
	////////////terminacion de var game fuction
	return {
        init: init
    }
})();