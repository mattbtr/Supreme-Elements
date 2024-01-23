// Funktion wird erst ausgeführt, wenn HTML Dokument geladen wurde
$(document).ready(function () {     
  
  loadSliderProducts();

  // verzögert das Ausführen des Codes für den Slider
  window.setTimeout(function () {   
    // Slider Funktionalität laden
    $('.slider').slick({            
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: true,
    });
  }, 500);

  // speichert Produkt in der Session 
  // funktioniert auch, wenn Elemente nachgeladen werden (slider) -> dynamsich
  $(document).on('click', '.addToCart', function () {     
    // holt html Attribut: data-productid aus slider
    var selectedProductid = $(this).data('productid');    

    // Ausgabe in Browser Console
    console.log("Produkt in den Warenkorb: " + selectedProductid);   
    // addToBasket Funktion befindet sich in warenkorb.js 
    addToBasket(selectedProductid);
  });

  $("#newsletterFormIndex").submit(function (event) {
    console.log("form submit called");

    // disable default event
    event.preventDefault();

    // convert data of form to object
    let formData = {
      email: $("#newsletter-email-i").val()
    };

    // Send form data with AJAX
    $.ajax({
      url: "http://localhost:8000/api/newsletter",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "text",   // muss auf text sein, da server hier mit text antwortet und nicht mit einem json-objekt. Aber warum?? Vllt weil server nur ein einzelenes attribut quasi im response zurückschickt und dann das json objekt als string gilt???
    }).done(function (response) {
      console.log(response);
      alert("Sie sind ab sofort bei unserem Newsletter angemeldet.");

    })
      .fail(function (jqXHR, statusText, error) {
        console.log('AJAX-Fehler:', error);
        console.log('Response Code:', jqXHR.status);
        console.log('Fehlermeldung:', jqXHR.responseText);
        alert("Sie haben keine gültige E-Mail-Adresse eingegeben.");
        $("#newsletter-email-i").val("");
      });
  });

  $("#newsletterFormUeberuns").submit(function (event) {
    console.log("form submit called");

    // disable default event
    event.preventDefault();

    // convert data of form to object
    let formData = {
      email: $("#email-newsletter-ue").val()
    };

    // Send form data with AJAX
    $.ajax({
      url: "http://localhost:8000/api/newsletter",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "text",   // muss auf text sein, da server hier mit text antwortet und nicht mit einem json-objekt. Aber warum?? Vllt weil server nur ein einzelenes attribut quasi im response zurückschickt und dann das json objekt als string gilt???
    }).done(function (response) {
      console.log(response);
      alert("Sie sind ab sofort bei unserem Newsletter angemeldet.");

    })
      .fail(function (jqXHR, statusText, error) {
        console.log('AJAX-Fehler:', error);
        console.log('Response Code:', jqXHR.status);
        console.log('Fehlermeldung:', jqXHR.responseText);
        alert("Sie haben keine gültige E-Mail-Adresse eingegeben.");
        $("#email-newsletter-ue").val("");
      });
  });


});

// Produkte in Slider laden
function loadSliderProducts() {     
  $.ajax({
    // Funktion aus produktDao.js wird geladen
    url: 'http://localhost:8000/api/produkt/isHighlight',   
    method: 'get',
    contentType: 'application/json; charset=utf-8',
    cache: false,
    dataType: 'json'
    // wird ausgeführt, wenn geladen
  }).done(function (response) {     
    console.log(response);
    // Schleife, um ausgewählte Produkte  im Slider darzustellen
    $(response).each(function (idx, item) {     

      // speichern eines Produktes in einer Variablen
      var sliderHTML = '<div class="sliderElement"><br /><a href="produktdetails.html?id=' + item.id + '"><img class="shopImg" src="' + item.produktbild + '"/></a><div class="infoBox"><br /><b>' + item.bezeichnung + '</b><br />' + formatToEuro(item.bruttopreis) + '<br /><button class="addToCart" data-productid="' + item.id + '" >In den Warenkorb</button></div></div>';
      // einzelnes Element wird an das div: sliderCointainer angehängt
      $('#sliderContainer').append(sliderHTML);   

    });
  }).fail(function (jqXHR, statusText, error) {
    // Zeigt die Serverantwort im Konsolenprotokoll an
    console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);  
  });
};

