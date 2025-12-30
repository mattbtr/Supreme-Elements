document.addEventListener("DOMContentLoaded", () => {
  faq();
  validateForm();
});

function faq() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

function submitForm() {
  

    // convert data of form to object
    let formData = {
      vorname: $("#vornameInput").val(),
      nachname: $("#nachnameInput").val(),
      email: $("#emailInput").val(),
      nachricht: $("#nachrichtInput").val(),
    };

    // Send form data with AJAX
    $.ajax({
      url: "http://localhost:3000/api/kontaktaufnahme",
      type: "POST",
      // wichtig hier als string übergeben, sodass server bzw kontaktaufnahme.js die daten mit request.body.vorname z.b zugreifen kann !! WICHTIG!
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "text",
    }) 
      .done(function (response) {
        // Erfolgreiche Serverantwort
        alert('Formulardaten erfolgreich abgeschickt!');
        //Eingabefelder im Formular leeren
        $('#vornameInput').val('');
        $('#nachnameInput').val('');
        $('#emailInput').val('');
        $('#nachrichtInput').val('');
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


function validateForm() {
  $(document).on("click", "#submitBtn", function (event) {
    console.log("form submit called");
  
    // disable default event = das aktualsisiern der seite sonst konsolenausgaben alle weg
    event.preventDefault();
    // Holen Sie sich die Werte der Eingabefelder
    var vorname = document.getElementById('vornameInput').value;
    var nachname = document.getElementById('nachnameInput').value;
    var email = document.getElementById('emailInput').value;
    var nachricht = document.getElementById('nachrichtInput').value;

  // Überprüfen, ob die Felder ausgefüllt sind
    if (vorname === '' || email === '' || nachname === '' || nachricht === '') {
    alert('Bitte füllen Sie alle erforderlichen Felder aus.');
  } else{

    submitForm();
    
  }
})}

