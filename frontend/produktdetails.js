function ZurueckProdukte() {
  window.location.href = 'shop.html';
}

// globale var
var id = -1;

$(document).ready(function() {
  console.log('loading specific product');
  
  if (existsUrlParameter('id')) {
      id = getUrlParameterValue('id');
      console.log('target product id=' + id);
  } else {
    alert('keine id erhalten');
    return;
  }
  


  $('input#addCartButton').on('click', function () {     
    console.log("Produkt in den Warenkorb: " + id);
    addToBasket(id);
  });

$.ajax({
  url: 'http://localhost:8000/api/produkt/gib/' + id,
  method: 'get',
  contentType: 'application/json; charset=utf-8',
  cache: false,
  dataType: 'json'
}).done(function (response) {
  console.log(response);

/* hier können Sie das Produkt nach eigenen Wünschen rendern und ausgeben. Ich mache es mir einfach und gebe nur einen Teil aus */

$('#Bild').attr('src', response.produktbild);
//$('#Bild').html('<img src="http://127.0.0.1:5500/frontend/' + response.produktbild + '?v=' + new Date().getTime() + '">');//
$('.produktId').text('ID: '+ response.id);  
$('.verfuegbarkeit').text('Verfügbarkeit: ' + response.verfuegbarkeit);
$('.produktBezeichnung').text(response.bezeichnung);
$('.bruttopreis').text(formatToEuro(response.bruttopreis));
$('.produktBeschreibung').text(response.beschreibung);
var formattedDetails = response.details.replace(/\/n/g, '<br>');
$('#details').html(formattedDetails);

}).fail(function (jqXHR, statusText, error) {
  console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
  alert('Ein Fehler ist aufgetreten');
}); 

});