document.addEventListener("DOMContentLoaded", () => {
  faq();
  submitForm();
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

function submitForm(){
  $(document).on("click", "#submitBtn", function (event) {
    console.log("form submit called");

    // disable default event = das aktualsisiern der seite sonst konsolenausgaben alle weg
    event.preventDefault();

    // convert data of form to object
    let formData = {
      vorname: $("#vornameInput").val(),
      nachname: $("#nachnameInput").val(),
      email: $("#emailInput").val(),
      nachricht: $("#nachrichtInput").val(),
    };

    // Send form data with AJAX
    $.ajax({
      url: "http://localhost:8000/api/kontaktaufnahme",
      type: "POST",
      // wichtig hier als string übergeben, sodass server bzw kontaktaufnahme.js die daten mit request.body.vorname z.b zugreifen kann !! WICHTIG!
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json",
    })/*
      .done(function (response) {
        // Erfolgreiche Serverantwort
        alert('Formulardaten erfolgreich abgeschickt!');
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Fehler beim AJAX-Request
       // alert('Etwas ist schiefgelaufen!');
        console.error('Fehler beim POST-Request:', textStatus, errorThrown);
        console.log('Serverantwort:', jqXHR.responseText);
      })
      .always(function () {
        // Hinzufügen von 'return false;' am Ende der Funktion
        return false;
      });*/

    
  });
}