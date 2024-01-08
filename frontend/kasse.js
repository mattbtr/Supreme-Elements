document.addEventListener("DOMContentLoaded", () => {
  submitCheckout();
  renderBasket();
});



function submitCheckout() {
  const myForm = document.getElementById("kassenform");
  document.querySelector("#submit").addEventListener("click", function (event) {
    
      console.log("form submit called");

      // disable default event
      event.preventDefault();
    //myForm.submit() 
      
          // convert data of form to object
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
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
      });
    });
  };

  function formatToEuro(val) {
    if (val === null || val === undefined) 
        val = 0.0;
    var asString = val.toFixed(2).toString();
    return asString.replace('.', ',') + " €";
}
for(var i = 0; i < sessionStorage.length; i++){
  console.log("Meine Session"+i.id);
}
  function renderBasket() {
    // get basket data from session
    if (existsSessionItem('shoppingBasket')) 
        basket = getJSONSessionItem('shoppingBasket');

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
        summaryHTML += '<tr><td>Artikel im Warenkorb</td><td align="right">'+ formatToEuro(totalSum) +'</td></tr>';
        summaryHTML += '<tr><td>Versand</td><td align="right">'+ formatToEuro(shippingFee) +'</td></tr>';
        summaryHTML += '<tr><th>Gesamtsumme</th><th align="right">'+ formatToEuro(totalSum + shippingFee) +'</th></tr>';
        summaryHTML += '<tr><td>inkl. 19% Mwst.</td><td align="right">'+ formatToEuro(totalTax) +'</td></tr>';
        
        //html leeren
        $('#cartSummery').empty();
        //output node
        $('#cartSummery').html(summaryHTML);    
    }
    
}
function updateProductAvailability() {
  // Abrufen der Warenkorbinhalte
  var basket = getJSONSessionItem('shoppingBasket');
  
  if (basket && basket.length > 0) {
      basket.forEach(function(item) {
          var productId = item.product.id;
          var quantityInCart = item.amount;

          // Hier müssten Sie die aktuelle Verfügbarkeit des Produkts abrufen
          // Zum Beispiel über einen AJAX-Request:
          $.ajax({
              url: 'http://localhost:8000/api/produkt/' + productId,
              method: 'GET',
              success: function(productData) {
                  var newAvailability = productData.verfuegbarkeit - quantityInCart;

                  // Nun senden Sie die neue Verfügbarkeit zurück zur Datenbank
                  $.ajax({
                      url: 'http://localhost:8000/api/produkt/gib/' + productId,
                      method: 'POST',
                      data: JSON.stringify({ verfuegbarkeit: newAvailability }),
                      contentType: 'application/json',
                      success: function(response) {
                          console.log('Produkt aktualisiert', response);
                      }
                  });
              }
          });
      });
  }
}

// Diese Funktion würde am Ende des Checkout-Prozesses aufgerufen
submitCheckout().then(updateProductAvailability);