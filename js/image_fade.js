$(document).ready(function() {    
  
  // ejecutar la presentación de diapositivas, set 4 segundos (4000) para cada imagen
  slideShow(4000);

});

function slideShow(speed) {

  // añadir un elemento 'li' a la lista 'ul' para mostrar el título
  $('ul.slideshow').append('<li id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><p></p></div></li>');

  // establecer la opacidad de todas las imágenes a 0
  $('ul.slideshow li').css({opacity: 0.0});
  
  //obtener la primera imagen y mostrarla
  $('ul.slideshow li:first').css({opacity: 1.0}).addClass('show');
  
  // obtener el título de la primera imagen desde el atributo 'rel' y mostrarlo
  $('#slideshow-caption p').html($('ul.slideshow li.show').find('img').attr('alt'));
    
  // mostrar el titulo
  $('#slideshow-caption').css({opacity: 0.6, bottom:0});
  
  // llame a la función de galería para ejecutar la presentación de diapositivas
  var timer = setInterval('gallery()',speed);
  
  //hacer una pausa en el pase de diapositivas en el mouse encima
  $('ul.slideshow').hover(
    function () {
      clearInterval(timer); 
    },  
    function () {
      timer = setInterval('gallery()',speed);     
    }
  );  
}

function gallery() {

  //si no hay imágenes tienen la clase de espectáculo, tomar la primera imagen
  var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('#ul.slideshow li:first'));

  // tratando de evitar tema de la velocidad
  if(current.queue('fx').length == 0) {

// Obtener la siguiente imagen, si se llega al final de la presentación, girar de nuevo a la primera imagen
    var next = ((current.next().length) ? ((current.next().attr('id') == 'slideshow-caption')? $('ul.slideshow li:first') :current.next()) : $('ul.slideshow li:first'));
      
    // get the next image caption
    var desc = next.find('img').attr('alt');  
  
    // set the fade in effect for the next image, show class has higher z-index
    next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);
    
// Ocultar el título primero, y luego ajustar y visualizar el título
    $('#slideshow-caption').slideToggle(300, function () { 
      $('#slideshow-caption p').html(desc); 
      $('#slideshow-caption').slideToggle(500); 
    });   
  
    // ocultar la imagen actual
    current.animate({opacity: 0.0}, 1000).removeClass('show');

  }
}