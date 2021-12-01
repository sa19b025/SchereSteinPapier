if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById("liveVideo").srcObject = stream;
    })
    .catch(error => {
      console.log("Something went wrong! " + error.message);
    });
}
function snapshot () {
  
}