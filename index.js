$(document).ready(function(){

  loadSliderProducts();

  window.setTimeout( function() {
    // CODE VERZÖGERT
    $('.slider').slick({ //slider Funktionalität laden
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: true,
    });
   }, 100);

  
});

function loadSliderProducts() {
  $.ajax({
      url: 'http://localhost:8000/api/Produkt/alle',
      method: 'get',
      contentType: 'application/json; charset=utf-8',
      cache: false,
      dataType: 'json'
  }).done(function (response) { //wird ausgeführt, wenn geladen
      console.log(response);
      $(response).each(function(idx, item) {
        console.log(item.bezeichnung)

        var sliderHTML = '<div class="sliderElement"><br /><a href="produktdetails.html"><img class="shopImg" src=' + item.produktbild + '/></a><div class="infoBox"><br /><b>' + item.bezeichnung + '</b><br />Preis:' + item.nettopreis + '<br /><a href="warenkorb.html"><button onclick="Warnung()">In den Warenkorb</button></a></div></div>';
        $('#sliderContainer').append(sliderHTML);

      });            
  }).fail(function (jqXHR, statusText, error) {
      console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
  });
}
