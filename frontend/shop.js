$(document).ready(function(){  //erst ausführung wenn komplettes DOM geladen ist
  loadProducts(); 

   // speichert Produkt in der Session 
  $(document).on('click', '.addToCart', function () {     
    // holt html Attribut: data-productid aus jeweiligem Produkt
    var selectedProductid = $(this).data('productid');    

    // Ausgabe in Browser Console
    console.log("Produkt in den Warenkorb: " + selectedProductid);   
    // addToBasket Funktion befindet sich in warenkorb.js 
    addToBasket(selectedProductid);
  });
});


function loadProducts() {
  $.ajax({
      url: 'http://localhost:8000/api/produkt/alle',
      method: 'get',                                                                         //durch Pfadaufruf wird loadall() funktion der Dao aufgerufen und ausgeführt
      cache: false,
      dataType: 'json'

  }).done(function (response) {                                                                    //-->ist das anonyme funktion ? was muss in done
      console.log(response);
      //window.response = response; //globaler Zugriff
      ProdukteEinfügen(response);
      textButtonAusgabe(response);
      filter(response);
      
  }).fail(function (jqXHR) {
      console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);                          
  });
};


//Produkte anzeigen
function ProdukteEinfügen(response){
  var anzahlProduktliste1 = $('#Produktliste th').length;
  $('#Produktliste th, #Produktliste2 th').empty();         // leeren für Neuordnung durch Filter
  for(var i = 0; i < response.length; i++){
    var produkt = '<div>' +
    '<br /><a href="produktdetails.html">' +
    '<img class="shopImg" src="' + response[i].produktbild + '" alt="' + response[i].bezeichnung + '"></a>' +
    '<div class="infoBox">'+
    '<br /><p class="produktTitel">' + response[i].bezeichnung + '</p>' +
    '<p class="verfuegbarkeit">Verfügbarkeit: ' + response[i].verfuegbarkeit + '</p>' +
    '<p class="preis">' + formatierterPreis(response[i].bruttopreis) + ' </p>' +
   '<button class="addToCart" data-productid="' + response[i].id + '" >In den Warenkorb</button>' + '</p>' +   //data-productid um später einzelnes Produkt in SessionStorage hinzufügen zu können 
    '</div></div>';
    if (i < anzahlProduktliste1) {                                     //erste liste wird befüllt anschließend zweite
    $('#Produktliste th').eq(i).append(produkt);  //hinzufügen zu th mit Index i
    }
    else{
      $('#Produktliste2 th').eq(i - anzahlProduktliste1).append(produkt); //start von vorne in der zweiten Tabelle
    }
  }
};


     



//Dropdowns für Filterauswahl
function filter(response) {
  var dropdown = '<label class="dropdown" for="Attribute"></label>' +
                '<select class="dropdown" id="firstDropdown" name="attribute">' +
                '<option value="" disabled selected hidden>Sortiert nach</option>' +
                '<option value="name">Name</option>' +
                '<option value="preis">Preis</option>' +
                '<option value="verfuegbarkeit">Verfügbarkeit</option>' +
                '</select>' +
                '<label class="dropdown" for="Preis"></label>' +
                '<select class="dropdown" id="secondDropdown" name="preis">' +
                '<option value="aufsteigend">aufsteigend</option>' +
                '<option value="absteigend">absteigend</option>' +
                '</select>';
  $('#filter').append(dropdown);

  // Event-Handler hinzufügen
  $('#firstDropdown').on('change', function() {
    sortiereProdukte(response);
  });
  $('#secondDropdown').on('change', function() {
    sortiereProdukte(response);
  });
}


  //Sortierfunktion der Filter 
  function sortiereProdukte(response) {
    var kriterium = document.getElementById("firstDropdown").value;
    var richtung = document.getElementById("secondDropdown").value;
  
    if (kriterium === "name" && richtung === "absteigend") {               //nach Namen absteigend sortieren 
      response.sort((a, b) => b.bezeichnung.localeCompare(a.bezeichnung));  // localeCompare gibt positiven oder negativen Wert (a vor b) zurück je nachdem wie sortiert werden soll
    } else if (kriterium === "name" && richtung === "aufsteigend") {       //nach Name aufsteigend sortieren 
      response.sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
  
    } else if (kriterium === "preis" && richtung === "aufsteigend") {       //preis aufsteigend 
      response.sort((a, b) => a.bruttopreis-b.bruttopreis);
    } else if (kriterium === "preis" && richtung === "absteigend") {        //preis absteigend
      response.sort((a, b) => b.bruttopreis-a.bruttopreis);
  
    } else if (kriterium === "verfuegbarkeit" && richtung === "aufsteigend") {  //verfügbarkeit aufsteigend 
      response.sort((a, b) => a.verfuegbarkeit-b.verfuegbarkeit);               //response wird überschreiben 
      }else if (kriterium === "verfuegbarkeit" && richtung === "absteigend") {   //verfügbarkeit absteigend 
        response.sort((a, b) =>b.verfuegbarkeit-a.verfuegbarkeit);
      }
      ProdukteEinfügen(response);     
  };



function textButtonAusgabe(response){
  //Gesamtproduktanzahl oben links
  var amountOfProducts = response.length + ' Produkte';
  $('#Produktanzahl').append(amountOfProducts);

  //mehr Produkte anzeigen Button
  var showMore = response.length+' Produkte<br><br><button class="zeigeMehr">Zeige mehr</button>';
  $('#zeigeMehr').append(showMore);

  //weniger anzeigen
  var showLess = response.length+' von ' + response.length + ' Produkten<br><br><button class="zeigeWeniger">Zeige weniger</button>';
  $('#wenigerZeigen').append(showLess);
}


//Klickevent zeige mehr Button
$(document).on('click', '.zeigeMehr', function () {
  $("#Produktliste2").css("display", "table");  // Zeigt die zweite Produktliste an
  $("#zeigeMehr").hide();  // Versteckt den zeige mehr Button
  $("#wenigerZeigen").show();  // Zeigt den zeige weniger Button
  $('html, body').animate({
      scrollTop: $("#blickpunktMehr").offset().top
  },1000);
});

//Klickevent zeige weniger Button 
$(document).on('click', '.zeigeWeniger', function () {
  $("#Produktliste2").hide();  // Versteckt die zweite Produktliste
    $("#zeigeMehr").show();  // Zeigt den zeigeMehr Button
    $("#wenigerZeigen").hide();  // Versteckt den wenigerZeigen Button
    $('html, body').animate({
        scrollTop: $("#blickpunktWeniger").offset().top
    },1000);
});


function formatierterPreis(preis) {
  if (preis === null || preis === undefined) 
      val = 0.0;
  var asString = preis.toFixed(2).toString();
  return asString.replace('.', ',') + " €";
};




