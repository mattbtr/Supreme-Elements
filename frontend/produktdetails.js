/*function Meldung() {
    alert("Das Produkt wurde dem Warenkorb hinzugefügt!")
}*/

function ZurückProdukte() {
  window.location.href = 'shop.html';
}
$(document).ready(function() {
  console.log('loading specific product');
  var id = -1;
  console.log('Current URL: ' + window.location.href);
  if (existsUrlParameter('id')) {
      id = getUrlParameterValue('id');
  }
  console.log('target product id=' + id);

  if (id == -1) {
      alert('keine id erhalten');
      return;
  }
  console.log('Current URL: ' + window.location.href);

  if (existsUrlParameter('id')) 
      id = getUrlParameterValue('id');

  console.log('target product id=' + id);

  if (id == -1) {
      alert('keine id erhalten');
      return;
  } 

  $(document).on('click', '.addToCart', function () {     
    var selectedProductid = getUrlParameterValue('id');
    if (selectedProductid === null) {
      console.log('Invalid or missing id');
      return;
    }
    console.log("Produkt in den Warenkorb: " + selectedProductid);
    addToBasket(selectedProductid);
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

$('#Bild').attr('src', 'http://127.0.0.1:5500/frontend/' + response.produktbild);
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

function formatToEuro(val) {
  if (val === null || val === undefined) 
      val = 0.0;
  var asString = val.toFixed(2).toString();
  return asString.replace('.', ',') + " €";
}


