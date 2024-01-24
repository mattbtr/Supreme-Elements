document.addEventListener("DOMContentLoaded", () => { // erst wenn seite komplett geladen dann führt funktionen aus

  renderBasket();

  $(document).on("click", "#submit", function (event) {
    console.log("form submit called");

    // disable default event = das aktualsisiern der seite sonst konsolenausgaben alle weg
    event.preventDefault();
    var anredeInput = document.getElementById('anrede').value;
    var vornameInput = document.getElementById('vornameInput').value;
    var nachnameInput = document.getElementById('nachnameInput').value;
    var strasseInput = document.getElementById('strasseInput').value;
    var hausnummerInput = document.getElementById('hausnrInput').value;
    var plzInput = document.getElementById('plzInput').value;
    var ortInput = document.getElementById('ortInput').value;
    var emailInput = document.getElementById('emailInput').value;
    var telnrInput = document.getElementById('telnrInput').value;
    console.log('Anrede:', anredeInput);
    console.log('Vorname:', vornameInput);
    console.log('Nachname:', nachnameInput);
    console.log('Straße:', strasseInput);
    console.log('Hausnummer:', hausnummerInput);
    console.log('PLZ:', plzInput);
    console.log('Ort:', ortInput);
    console.log('Email:', emailInput);
    console.log('Telefonnummer:', telnrInput);

    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Überprüfen, ob die Felder ausgefüllt sind
    if (anredeInput === '' || vornameInput === '' || emailInput === '' || nachnameInput === '' || telnrInput === '' || strasseInput === '' || hausnummerInput === '' || plzInput === '' || ortInput === '') {
      alert('Bitte füllen Sie alle erforderlichen Felder aus.');

    } else if (/\D/.test(telnrInput)) {
      console.log("telnr hat mindestens ein char der nicht eine nummmer ist")
      telnrInput.value = '';
      alert("Das Feld Telefonnummer darf nur Zahlen beinhalten.")

    } else if (/\D/.test(plzInput)) {
      console.log("plz hat mindestens ein char der nicht eine nummmer ist")
      plzInput.value = '';
      alert("Postleitzahl darf nur Zahlen beinhalten.")

    } else if (!emailRegex.test(emailInput)) {
      console.log(' No Valid email address');
      alert("Geben Sie eine gültige E-Mail-Adresse an.")

    } else if (!document.getElementById('check-agb').checked) {
      console.log("chechbox called")
      alert("Bestätigen Sie unsere Allgemeinen Geschäftbedigungen, um den Kauf abzuschließen.")

    } else {
       let formData = {
        anrede: anredeInput,
        vorname: vornameInput,
        nachname: nachnameInput,
        telefonnummer: telnrInput,
        email: emailInput,
        strasse: strasseInput,
        hausnummer: hausnummerInput,
        plz: plzInput,
        ort: ortInput,
      };

      console.log(formData);

      $.ajax({
        url: 'http://localhost:8000/api/person',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(formData),// muss man als string an server schicken damit server es verarbeiten kann
      }).done(function (response) {
          console.log(response);
          console.log(response.id);
          window.id = response.id;
  

        // wenn Formulardaten erfolgreich gespeichert dann post request um bestellung und bestellpostionen zu speichern:
        // bisher shoppingbasket nicht stringifyed --> versuche in post request zu parsen
        let obj = { 'bestellzeitpunkt': undefined, 'besteller': response, 'bestellpositionen': getJSONSessionItem('shoppingBasket')};
        console.log(obj);
        
        $.ajax({
          url: 'http://localhost:8000/api/bestellung',
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          cache: false,
          data: JSON.stringify(obj),
        })
          .done(function (response) {
            console.log("Bestelldaten wurden an Datenbank geschickt.")
            console.log(response)
            alert("Ihre Bestellung wurde erfolgreich übermittelt.");
            //window.location.href = 'kassenbestaetigung.html';
          })
          .fail(function (response) {
            console.log(response)
            console.log("Fehler aufgetreten")
            alert(fehler)
          })
      })              
    }
    
  });

});

function bestaetigung(){
  console.log("das hier ist: "+ id);
  return id;
}

function formatToEuro(val) {
  if (val === null || val === undefined)
    val = 0.0;
  var asString = val.toFixed(2).toString();
  return asString.replace('.', ',') + " €";


}
/*for (var i = 0; i < sessionStorage.length; i++) {
  console.log("Meine Session" + i.id);
}*/



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