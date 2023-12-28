document.addEventListener("DOMContentLoaded", () => {
  submitCheckout();
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
