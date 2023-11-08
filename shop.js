function Danksagung() {
    alert("Vielen Dank für Ihren Einkauf bei Supreme Elements.")
}

function WeiterleitungDetails() {
    window.location.href = 'produktdetails.html';
}


function WeiterleitungWarenkorb() {
  window.location.href = 'warenkorb.html';
}

function mehrProdukteJS() {    
    document.getElementById("Produktliste2").style.display = "table"; 
    document.getElementById("zeigeMehr").style.display = "none";
    document.getElementById("wenigerZeigen").style.display = "block";
    document.getElementById("blickpunktMehr").scrollIntoView({ behavior: "smooth" });
  }
  
  function wenigerZeigen() {
    document.getElementById("Produktliste2").style.display = "none"; 
    document.getElementById("zeigeMehr").style.display = "block";
    document.getElementById("wenigerZeigen").style.display = "none";
    document.getElementById("blickpunktWeniger").scrollIntoView({ behavior: "smooth" });
  }

  
  
