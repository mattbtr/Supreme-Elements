<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
    let bestellId = localStorage.getItem('bestellr'); // Abrufen mit demselben Schlüssel
    if (bestellId) {
        console.log("Vielen Dank für Ihre Bestellung.<> Ihre Bestell-ID: " + bestellId);
        document.querySelector('.bestellungAnzeigen').innerHTML = 'Vielen Dank, für Ihren Einkauf bei Supreme Elements!<br><br><b>Ihre Bestell-ID ist: ' + bestellId;
    }
});
=======
console.log(window.id);
>>>>>>> 81673a3b85852c018460dd991907e616b3ba79da
