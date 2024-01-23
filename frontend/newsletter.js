document.addEventListener("DOMContentLoaded", () => {

    $(".newsletterForm").submit(function (event) {
        console.log("form submit called");

        // disable default event
        event.preventDefault();

        // convert data of form to object
        let formData = {
            email: $(".email-newsletter").val()
        };

        // Send form data with AJAX
        $.ajax({
            url: "http://localhost:8000/api/newsletter",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json",
            dataType: "text",   // muss auf text sein, da server hier mit text antwortet und nicht mit einem json-objekt. Aber warum?? Vllt weil server nur ein einzelenes attribut quasi im response zurückschickt und dann das json objekt als string gilt???
        }).done(function (response) {
            console.log(response);
            alert("Sie sind ab sofort bei unserem Newsletter angemeldet.");

        })
            .fail(function (jqXHR, statusText, error) {
                console.log('AJAX-Fehler:', error);
                console.log('Response Code:', jqXHR.status);
                console.log('Fehlermeldung:', jqXHR.responseText);
                alert("Sie haben keine gültige E-Mail-Adresse eingegeben.");
                $(".email-newsletter").val("");
            });
    });

});