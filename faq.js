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
  const formKontakt = document.querySelector('#kontaktform')

  formKontakt.addEventListener('submit', event =>{
    event.preventDefault();

    const formData = new FormData(formKontakt);
    const data = Object.fromEntries(formData);
  
    fetch('http://localhost:8000/api/kontaktaufnahme', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  })
}

/*
$('#kontaktform').submit(function (e) { 
  e.preventDefault();

  let formData = new FormData(this);

  $.ajax({
    type: "POST",
    url: "http://localhost:8000/api/kontaktaufnahme",
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    dataType: "json",
  });
  .done(function(response){
    console.log('response erhalten')
    console.log(response)
    $(#form-uebergeben).html('<p>Operation erfolgereich.</p>')
    $(#form-uebergeben).append('<p>Nachricht: ' + JSON.stringify(response) + '</p>')
  })
  .fail(function(xhr) {
    console.log('error received');
    console.log(xhr);
    $('#output').html('<p>Es ist ein Fehler aufgetreten</p>');
    $('#output').append('<p>Status: ' + xhr.status + '</p>');
    $('#output').append('<p>Nachricht: ' + xhr.responseText + '</p>');
})
  
});*/
