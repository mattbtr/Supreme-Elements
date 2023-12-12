//<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>;
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
/*
function submitForm(){
  const kontaktform = document.getElementById("kontaktform");
  console.log("form submit called");
  kontaktform.addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(kontaktform);
      console.log(formData.get('vornameInput'));
      console.log(formData.get("nachnameInput"));
      console.log(formData.get("emailInput"));
      console.log(formData.get("nachrichtInput"));
      const data = Object.fromEntries(formData);

      fetch("http://localhost:8000/api/kontaktaufnahme", {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': "application/json"
        },
          body: JSON.stringify(data)
      });
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("response erhalten");
          console.log(data);
          document.getElementById("form-uebergeben").innerHTML =
            "<p>Operation erfolgreich.</p>";
          document.getElementById("form-uebergeben").innerHTML +=
            "<p>Nachricht: " + JSON.stringify(data) + "</p>";
        })
        .catch((error) => {
          console.error("error received");
          console.error(error);
          document.getElementById("form-uebergeben").innerHTML =
            "<p>Es ist ein Fehler aufgetreten</p>";
          document.getElementById("form-uebergeben").innerHTML +=
            "<p>Status: " + error.status + "</p>";
          document.getElementById("form-uebergeben").innerHTML +=
            "<p>Nachricht: " + error.message + "</p>";
        });
    });
  }*/
  
  



function submitForm(){
  $("#kontaktform").submit(function (event) {
    console.log("form submit called");

    // disable default event
    event.preventDefault();

    // convert data of form to object
    var formData = {
      vorname: $("#vornameInput").val(),
      nachname: $("#nachnameInput").val(),
      email: $("#emailInput").val(),
      nachricht: $("#nachrichtInput").val(),
    };

    // Send form data with AJAX
    $.ajax({
      url: "http://localhost:8000/api/kontaktaufnahme",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "json",
    });

    
    /*
      .done(function (response) {
        console.log(formData)
        console.log("response received");
        console.log(response);
        $("#form-uebergeben").html("<p>Operation erfolgreich</p>");
        $("#form-uebergeben").append(
          "<p>Anzahl Form-Elemente: " + response.length + "</p>"
        );
        response.forEach((element) => {
          $("#form-uebergeben").append(
            element.vo
          );
        });
      })
      .fail(function (xhr) {
        console.log("error received");
        console.log(xhr);
        $("#form-uebergeben").html("<p>Es ist ein Fehler aufgetreten</p>");
        $("#form-uebergeben").append("<p>Status: " + xhr.status + "</p>");
        $("#form-uebergeben").append(
          "<p>Nachricht: " + xhr.responseText + "</p>"
        );
      });*/
  });


}



// Der post von ajax funktioniert nicht. Daten von form werden nicht richtig in formData gespeichert. Irwas an post ajax befehl passt nicht
// Lösung WAR: Dao hat nciht gepasst. Wollte Id als Parameter noch empfangen.
// Das rausnehmen!! Dann wird Id autoincrement automatisch zu Daten angelegt!

