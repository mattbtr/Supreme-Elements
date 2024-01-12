function Meldung() {
    alert("Das Produkt wurde dem Warenkorb hinzugefügt!")
}

function ZurückProdukte() {
  window.location.href = 'shop.html';
}
$(document).ready(function() {
  console.log('loading specific product');

  // get id from url parameter
   var id = -1;

  // Debugging: Print the entire URL
  console.log('Current URL: ' + window.location.href);

  if (existsUrlParameter('id')) {
      id = getUrlParameterValue('id');
  }

  // Debugging: Print the extracted ID
  console.log('Extracted ID: ' + id);

  console.log('target product id=' + id);

  if (id == -1) {
      alert('keine id erhalten');
      return;
  }

  /*if (existsUrlParameter('id')) 
      id = getUrlParameterValue('id');

  console.log('target product id=' + id);

  if (id == -1) {
      alert('keine id erhalten');
      return;
  } */

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
//$('#Bild').html('<img src="http://127.0.0.1:5500/frontend/' + response.produktbild + ' ">');//
$('#produktId').text(response.id); 
$('#verfuegbarkeit').text(response.verfuegbarkeit);
$('#produktBezeichnung').text(response.bezeichnung);
$('#bruttopreis').text(formatToEuro(response.bruttopreis));
$('#produktBeschreibung').text(response.beschreibung);

// Assuming response.details contains the text with '\n' characters
var formattedDetails = response.details.replace(/\/n/g, '<br>');
$('#details').text(response.details);
// Update the HTML element with the formatted details
$('#details').html(formattedDetails);




/*
}

 if (response.bilder != null) {
  if (response.bilder.length > 0) {
      var pic = response.bilder[0];
      $('#productPicture').html('<img src="http://localhost:8000/' + pic.bildpfad + '">');
  }
} */
/* src="http://127.0.0.1:5500/frontend/Bilder/Multivitamin.png" */

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

$(document).on('click', '.addToCart', function () {     
  // holt html Attribut: data-productid aus slider
  var selectedProductid = $(this).data('productid');    

  // Ausgabe in Browser Console
  console.log("Produkt in den Warenkorb: " + selectedProductid);   
  // addToBasket Funktion befindet sich in warenkorb.js 
  addToBasket(selectedProductid);
});
