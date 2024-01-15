document.addEventListener("DOMContentLoaded", () => { // erst wenn seite komplett geladen dann führt funktionen aus

  $(document).on("click", "#submit", function (event) {
    console.log("form submit called");




    // disable default event = das aktualsisiern der seite sonst konsolenausgaben alle weg
    event.preventDefault();
    // Holen Sie sich die Werte der Eingabefelder
    var vorname = document.getElementById('vornameInput').value;
    var nachname = document.getElementById('nachnameInput').value;
    var strasse = document.getElementById('strasseInput').value;
    var hausnummer = document.getElementById('hausnrInput').value;
    var plz = document.getElementById('plzInput').value;
    var ort = document.getElementById('ortInput').value;
    var email = document.getElementById('emailInput').value;
    var telnr = document.getElementById('telnrInput').value;

    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Überprüfen, ob die Felder ausgefüllt sind
    if (vorname === '' || email === '' || nachname === '' || telnr === '' || strasse === '' || hausnummer === '' || plz === '' || ort === '') {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.');

    } else if (/\D/.test(telnr)) {
      console.log("telnr hat mindestens ein char der nicht eine nummmer ist")
      telnr.value = '';
      alert("Das Feld Telefonnummer darf nur Zahlen beinhalten.")

    } else if (/\D/.test(plz)) {
      console.log("plz hat mindestens ein char der nicht eine nummmer ist")
      plz.value = '';
      alert("Postleitzahl darf nur Zahlen beinhalten.")

    } else if (!emailRegex.test(email)) {
      console.log(' No Valid email address');
      alert("Geben Sie eine gültige E-Mail-Adresse an.")

    } else if (!document.getElementById('check-agb').checked) {
      console.log("chechbox called")
      alert("Bestätigen Sie unsere Allgemeinen Geschäftbedigungen, um den Kauf abzuschließen.")

    } else {
      submitCheckout();
    }
  })



  renderBasket();
});



function submitCheckout() {

    // disable default event damit seite nicht neu aktualisiert nachedem jetzt kaufen button geklickt wird
    event.preventDefault();
    //myForm.submit() 

    // convert data of form to json object
    let formData = {
      anrede: $("#anrede").val(),
      vorname: $("#vornameInput").val(),
      nachname: $("#nachnameInput").val(),
      telefonnummer: $("#telnrInput").val(),
      email: $("#emailInput").val(),
      strasse: $("#strasseInput").val(),
      hausnummer: $("#hausnrInput").val(),
      plz: $("#plzInput").val(),
      ort: $("#ortInput").val(),


    };

    console.log(formData);

    // Send form data with AJAX

    $.ajax({
      url: "http://localhost:8000/api/person",
      type: "POST",
      data: JSON.stringify(formData),// muss man als string an server schicken damit server es verarbeiten kann
      contentType: "application/json",
      dataType: "text",
      cache: false,
    })
      .done(function (response) {
        // Erfolgreiche Serverantwort
        alert('Formulardaten erfolgreich abgeschickt!');
        console.log(response);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Fehler beim AJAX-Request
        alert('Geben Sie eine gültige E-Mail Adresse an!');
        console.error('Fehler beim POST-Request:', textStatus, errorThrown);
        console.log('Serverantwort:', jqXHR.responseText);
        $("#emailInput").val("");
      })
      ;
  };


function formatToEuro(val) {
  if (val === null || val === undefined)
    val = 0.0;
  var asString = val.toFixed(2).toString();
  return asString.replace('.', ',') + " €";


}
for (var i = 0; i < sessionStorage.length; i++) {
  console.log("Meine Session" + i.id);
}
function renderBasket() {
  // get basket data from session
  if (existsSessionItem('shoppingBasket'))
    basket = getJSONSessionItem('shoppingBasket');              //greifft auf sessionItem zu 

  // empty cartContent
  $('#cartContent').empty();

  // show message if no basket positions
  if (basket.length == 0) {
    console.log("no positions in basket");
    $('#cartContent').append('<tr><td colspan="6" class="missingData">Der Warenkorb ist leer</td></tr>');
  } else {
    var sum = 0.0;
    var tax = 0.0;
    var totalTax = 0.0;
    var totalSum = 0.0;

    $(basket).each(function (idx, item) {
      // calc position sum
      sum = item.product.bruttopreis * item.amount;

      // containing tax
      tax = item.product.mehrwertsteueranteil * item.amount;

      // Versand
      shippingFee = 5.99;

      // add up totals
      totalTax += tax;
      totalSum += sum;
    });

    // create node
    var summaryHTML = '';
    summaryHTML += '<tr><td>Artikel im Warenkorb</td><td align="right">' + formatToEuro(totalSum) + '</td></tr>';
    summaryHTML += '<tr><td>Versand</td><td align="right">' + formatToEuro(shippingFee) + '</td></tr>';
    summaryHTML += '<tr><th>Gesamtsumme</th><th align="right">' + formatToEuro(totalSum + shippingFee) + '</th></tr>';
    summaryHTML += '<tr><td>inkl. 19% Mwst.</td><td align="right">' + formatToEuro(totalTax) + '</td></tr>';

    //html leeren
    $('#cartSummery').empty();
    //output node
    $('#cartSummery').html(summaryHTML);
  }

};