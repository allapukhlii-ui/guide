const params = new URLSearchParams(window.location.search);
const ort = params.get("ort");

if (ort === "port") {
  document.getElementById("title").innerText = "Vieux Port";
  document.getElementById("info").innerText =
    "Der alte Hafen ist das Herz von Marseille.";
}

function goBack() {
  window.history.back();
}