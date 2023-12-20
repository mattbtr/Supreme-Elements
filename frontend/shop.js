function mehrProdukteJS() {    
  document.getElementById("Produktliste2").style.display = "table"; 
  document.getElementById("zeigeMehr").style.display = "none";
  document.getElementById("wenigerZeigen").style.display = "block";
  document.getElementById("blickpunktMehr").scrollIntoView({ behavior: "smooth" });
}

function wenigerZeigen() {
  document.getElementById("Produktliste2").style.display = "none"; 
  document.getElementById("zeigeMehr").style.display = "block";
  document.getElementById("wenigerZeigen").style.display = "none";
  document.getElementById("blickpunktWeniger").scrollIntoView({ behavior: "smooth" });
}

function WeiterleitungWarenkorb() {
  window.location.href = 'warenkorb.html';
}

//-------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  loadProducts();
  
});

function formatierterPreis(preis) {
  return preis.toFixed(2).replace('.', ',') + ' €';
}

function loadProducts() {
  $.ajax({
      url: 'http://localhost:8000/api/produkt/alle',
      method: 'get',
      contentType: 'application/json; charset=utf-8',
      cache: false,
      dataType: 'json'
  }).done(function (response) {
      console.log(response);
      window.response = response;
      filter();
      zeigeProdukte(response);
       //Produktanzahl oben links
       var amountOfProducts = response.length + ' Produkte'
       $('#Produktanzahl').append(amountOfProducts);
       //mehr Produkte anzeigen
       var showMore = response.length+' Produkten<br><br><button onclick="mehrProdukteJS()">Zeige mehr</button>';
       //weniger anzeigen
       $('#zeigeMehr').append(showMore);
       var showLess = response.length+' von ' + response.length + ' Produkten<br><br><button onclick="wenigerProdukteJS()">Zeige weniger</button>';
       $('#wenigerZeigen').append(showLess);
  }).fail(function (jqXHR, statusText, error) {
      console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
  });
}

//Dropdowns mit Filter
function filter(){
  var filters = '<label class="dropdown" for=Attribute></label><select class="dropdown" id="firstDropdown" name="attribute" onchange="sortiereProdukte()"><option value="" disabled selected hidden>Sortiert nach</option><option value="name">Name</option><option value="preis">Preis</option><option value="verfuegbarkeit">Verfügbarkeit</option></select><label class="dropdown" for=Preis ></label><select class="dropdown" id="secondDropdown" name="preis" onchange="sortiereProdukte()"><option value="aufsteigend">aufsteigend</option><option value="absteigend">absteigend</option></select>'
  $('#filter').append(filters);
}


//Produkte anzeigen
function zeigeProdukte(res){
  var anzahlProduktliste1 = $('#Produktliste th').length;
  $('#Produktliste th, #Produktliste2 th').empty();
  for(var i = 0; i < res.length; i++){
    var sliderHTML = '<div class="sliderElement">' +
    '<br /><a href="produktdetails.html">' +
    '<img onclick="WeiterleitungDetails()" class="shopImg" src="' + response[i].produktbild + '" alt="' + response[i].bezeichnung + '"></a>' +
    '<div class="infoBox">'+
    '<br /><p class="produktTitel">' + response[i].bezeichnung + '</p>' +
    '<p class="verfuegbarkeit">Verfügbarkeit: ' + response[i].verfuegbarkeit + '</p>' +
    //'<p class="inhaltsstoffe">' + response[i].beschreibung + '</p> +'
    '<p class="preis">' + formatierterPreis(response[i].bruttopreis) + ' </p>' +
    '<button class="indenWarenkorb" onclick="WeiterleitungWarenkorb()">In den Warenkorb</button>' +
    '</div></div>';
    if (i < anzahlProduktliste1) {                                     //erste liste wird befüllt anschließend zweite
    $('#Produktliste th').eq(i).append(sliderHTML);
    }
    else{
      $('#Produktliste2 th').eq(i - anzahlProduktliste1).append(sliderHTML);
    }
  }


  //Filter sortierung
}
function sortiereProdukte() {
  var kriterium = document.getElementById("firstDropdown").value;
  var richtung = document.getElementById("secondDropdown").value;
  var vergleichsfunktion;

  if (kriterium === "name" && richtung === "absteigend") {
    response.sort((a, b) => b.bezeichnung.localeCompare(a.bezeichnung));
    
  } else if (kriterium === "name" && richtung === "aufsteigend") {
    response.sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));

  } else if (kriterium === "preis" && richtung === "aufsteigend") {
    response.sort(function(a, b){return a.bruttopreis-b.bruttopreis});
  } else if (kriterium === "preis" && richtung === "absteigend") {
    response.sort(function(a, b){return b.bruttopreis-a.bruttopreis});
  } else if (kriterium === "verfuegbarkeit" && richtung === "aufsteigend") {
    response.sort(function(a, b){return a.verfuegbarkeit-b.verfuegbarkeit});
    }else if (kriterium === "verfuegbarkeit" && richtung === "absteigend") {
      response.sort(function(a, b){return b.verfuegbarkeit-a.verfuegbarkeit});
    }
    zeigeProdukte(response);
  }


