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