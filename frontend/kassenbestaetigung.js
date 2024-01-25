document.addEventListener("DOMContentLoaded", function() {
    let bestellId = localStorage.getItem('bestellr'); // Abrufen mit demselben Schlüssel
    if (bestellId) {
        console.log("Bestell-ID: " + bestellId);
        document.querySelector('.bestellungAnzeigen').innerHTML = 'Vielen Dank, für Ihren Einkauf bei <i>SUPREME ELEMENTS!<br><br><b>Ihre Bestell-ID ist: ' + bestellId;
        localStorage.removeItem('bestellr'); 
    }

    emptyBasket();
});
