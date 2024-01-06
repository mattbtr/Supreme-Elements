$(document).ready(function () {
  submitNewsletterUeberUns();
  submitNewsletterIndex();
  loadSliderProducts();

  window.setTimeout(function () {
    // CODE VERZÖGERT
    $('.slider').slick({ //slider Funktionalität laden
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: true,
    });
  }, 500);


  $(document).on('click', '.addToCart', function () {     // funktioniert auch, wenn Elemente nachgeladen werden (slider) -> dynamsich

    var selectedProductid = $(this).data('productid');    // holt html Attribut: data-productid aus slider

    console.log("Produkt in den Warenkorb: " + selectedProductid);
    addToBasket(selectedProductid);
  });
});

function loadSliderProducts() {
  $.ajax({
    url: 'http://localhost:8000/api/produkt/isHighlight',
    method: 'get',
    contentType: 'application/json; charset=utf-8',
    cache: false,
    dataType: 'json'
  }).done(function (response) { //wird ausgeführt, wenn geladen
    console.log(response);
    $(response).each(function (idx, item) {

      var sliderHTML = '<div class="sliderElement"><br /><a href="produktdetails.html"><img class="shopImg" src="' + item.produktbild + '"/></a><div class="infoBox"><br /><b>' + item.bezeichnung + '</b><br />' + item.bruttopreis + ' €<br /><button class="addToCart" data-productid="' + item.id + '" >In den Warenkorb</button></div></div>';
      $('#sliderContainer').append(sliderHTML);

    });
  }).fail(function (jqXHR, statusText, error) {
    console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
  });
};


function submitNewsletterIndex() {
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
      dataType: "json",
    }).done(function (response) {
      console.log(response);
      alert("Sie sind ab sofort bei unserem Newsletter angemeldet.");

    })
      .fail(function () {
        alert('Ein Fehler ist aufgetreten');
      });
  });
}

function submitNewsletterUeberUns() {
  $("#newsletterFormUeberuns").submit(function (event) {
    console.log("form submit called");

    // disable default event
    event.preventDefault();

    // convert data of form to object
    let formData = {
      email: $("#email-newsletter-ue").val(),
    };

    // Send form data with AJAX
    $.ajax({
      url: "http://localhost:8000/api/newsletter",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json",
    }).done(function (response) {
      console.log(response);
      alert("Sie sind ab sofort bei unserem Newsletter angemeldet.");

    })
      .fail(function () {
        console.log(xhr.responseText);  // Zeigt die Serverantwort im Konsolenprotokoll an
        alert('Ein Fehler ist aufgetreten');

      })
  });
};
