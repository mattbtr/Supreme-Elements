$(document).ready(function(){
    // funktioniert auch, wenn Elemente nachgeladen werden (slider) -> dynamsich
    // ändert die Menge im Warenkorb ohne die Seite neu zu laden
    $(document).on('change', '.amountButton', function() {     
    
        // holt html Attribut: Wert aus Menge
        var selectedAmount = $(this).val();    
        var selectedIndex = $(this).data("index");
    
        changeAmount(selectedIndex, selectedAmount);
    });
});

var basket = [];

function renderProducts(cartContent, products) {     // jQuery-Selektor und Produktarray
    console.log('rendering products');

    if (products.length == 0) {
        console.log("no products received");
        $(cartContent).append('<tr><td colspan="6" class="missingData">Keine Produkte vorhanden</td></tr>');
    } else {
        console.log("rendering " + products.length + " products");

        $(products).each(function(idx, item) {
            var node = $('<tr>');

            node.append($('<td>').text(idx + 1));
            node.append($('<td>').text(item.id));
            node.append($('<td>').text(item.kategorie.bezeichnung));
            node.append(
                $('<td>')
                    .append($('<a>')
                        .attr('href', 'shopDetails.html?id=' + item.id)
                        .text(item.bezeichnung)                    
                    )            
            );
            node.append($('<td>').text(formatToEuro(item.bruttopreis)));
            node.append(
                $('<td>')
                    .append($('<button>')
                        .attr('type', 'button')
                        .attr('onClick', 'jumpToDetails(' + item.id + ')')
                        .text('Details')
                    )
                    .append($('<button>')
                        .attr('type', 'button')
                        .attr('onClick', 'addToBasket(' + item.id + ')')
                        .text('Zum Warenkorb hinzufügen')
                    )
            );

            $(cartContent).append(node);
        });
    }
}

function formatToEuro(val) {
    if (val === null || val === undefined) 
        val = 0.0;
    var asString = val.toFixed(2).toString();
    return asString.replace('.', ',') + " €";
}

function jumpToDetails(id) {
    location.href = 'shopDetails.html?id=' + id;
}

function addToBasket(id) {

    // load record from api by id
    $.ajax({
        url: 'http://localhost:8000/api/produkt/gib/' + id,
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        var productToAdd = response;
        console.log('trying to add to basket, product id=' + productToAdd.id);

        // get basket data from session
        if (existsSessionItem('shoppingBasket')) 
        basket = getJSONSessionItem('shoppingBasket');

        // check if product in basket
        var posInBasket = -1;
        for (i = 0; i < basket.length; i++) {
            if (basket[i].product.id == productToAdd.id) {
                posInBasket = i;
                break;
            }
        }

        // if not, add it or otherwise just increase amount
        if (posInBasket == -1) {
            console.log('product not in basket, creating new position');
            basket.push({
                product: productToAdd,
                amount: 1
            });
        } else {
            console.log('product found in basket, increasing amount');
            basket[posInBasket].amount++;
        }

        // remember changes in localStorage
        setJSONSessionItem('shoppingBasket', basket);

        // inform user
        alert('Produkt ' + productToAdd.bezeichnung + ' wurde zum Warenkorb hinzugefügt');
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        alert('Ein Fehler ist aufgetreten');
    });
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

        // Darstellen der Produkte, die in der Session gespeichert sind -> linke Tabelle
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

            // create node
            var node = $('<tr>');
           
            // node.append($('<td>').text(idx + 1)); // Position im Warenkorb
            node.append($('<td>').append('<th id="Linkespalte"><img id="Bestellübersichtsbilder" src="' + item.product.produktbild + '" alt="' + item.product.bezeichnung + '"></th>'));
            node.append($('<td>').append(
                ($('<td id="Mittlerespale">').append(
                    $('<a id="produktbezeichnung">')
                        .attr('href', 'produktdetails.html')
                        //.attr('href', 'produktdetails.html?id=' + item.product.id) //wenn produktdetailseite dynamisiert ist
                        .text(item.product.bezeichnung + ' (ID: ' + item.product.id + ')'),
                    $('<section id="ProduktbeschreibungUndLieferadresse">').text(item.product.beschreibung),
                    $('<section id="Einzelpreis">').text('Einzelpreis: ' + formatToEuro(item.product.bruttopreis)),
                    $('<section id = "Versand">').text("Versand: 1-2 Werktage"),
                    $('<section id = "Menge">').text('Menge: ').append($('<input type="number" data-index="' + idx + '" class="amountButton" size="5" value=' + item.amount + '></input>')),
                    
                ))
            ));
            
            node.append($('<td id="Rechtespalte">').append(
                $('<a href="javascript:removeBasketPosition(' + idx + ')"><img class="symbols" src="Bilder/muelleimer.jpg" align="right"></a>'),
                $('<section id = "Preise">').text('Preis: ' + formatToEuro(item.product.bruttopreis * item.amount))
            ));
            
            // Trenner
            var nodeTrenner = $('<tr>');
            nodeTrenner.append($('<td colspan="6"><hr id="TrennerBestellübersicht"></td>'));
            
            // output node
            $('#cartContent').append(node);
            $('#cartContent').append(nodeTrenner);
            
        });    

        // Darstellen der rechten Spalte im Warenkorb -> Zusammenfassung der Bestellung
        var summaryHTML = '';
        summaryHTML += '<tr><td>Artikel im Warenkorb</td><td align="right">'+ formatToEuro(totalSum) +'</td></tr>';
        summaryHTML += '<tr><td>Versand</td><td align="right">'+ formatToEuro(shippingFee) +'</td></tr>';
        summaryHTML += '<tr><th>Gesamtsumme</th><th align="right">'+ formatToEuro(totalSum + shippingFee) +'</th></tr>';
        summaryHTML += '<tr><td>inkl. 19% Mwst.</td><td align="right">'+ formatToEuro(totalTax) +'</td></tr>';
        summaryHTML += '<tr><td><a href="kasse.html"><button>zur Kasse</button></a></td><td align="right"></td></tr>';
        //html leeren
        $('#cartSummery').empty();
        //output node
        $('#cartSummery').html(summaryHTML);       
    }
}

function removeBasketPosition(idx) {
    console.log('removing basket position at idx=' + idx);
    
    // remove position at idx or empty basket completely
    if (basket.length > 1) {
        // remove position at idx
        basket.splice(idx, 1);         //entfernt von idx an nächstes Element

        // remember changes in localStorage
        setJSONSessionItem('shoppingBasket', basket);
    } else {
        // clear local variable
        basket = [];
        // clear session variable
        removeSessionItem('shoppingBasket');
    }

    //html leeren
    $('#cartSummery').empty();
    
    // redraw basket
    renderBasket('#basket > tbody');   //aktualisierung des tbody Kindelements von basket
}

function emptyBasket() {
    console.log('emptying basket');

    // clear local variable
    basket = [];

    // clear session variable
    removeSessionItem('shoppingBasket');
    
    // redraw basket
    renderBasket('#basket > tbody');
}

function changeAmount(idx, newamount) {
    console.log('basket amount:' + newamount);
    if (newamount == 0) {
        removeBasketPosition(idx);
    } else {
        basket = getJSONSessionItem('shoppingBasket');
        console.log('product found in basket, changing amount to: ' + newamount);
        basket[idx].amount = newamount;
        // remember changes in localStorage
        setJSONSessionItem('shoppingBasket', basket);
    }

    // redraw basket
    renderBasket('#basket > tbody');
}