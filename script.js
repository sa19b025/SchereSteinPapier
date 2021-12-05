document.addEventListener("DOMContentLoaded", function (event) {
  console.log("dom ready");
  const constraints = {
    audio: false,
    video: {
      width: 1120,
      height: 630,
    },
  };
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        document.getElementById("video").srcObject = stream;
        console.log("video ready");
      })
      .catch((error) => {
        console.log("Something went wrong! " + error.message);
      });
  }
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 224, 224);
  const snapshotButton = document.getElementById("snapshot");
  console.log("added EventListener");

  snapshotButton.addEventListener("click", function () {
    ctx.drawImage(video, 0, 49, 224, 126);
    console.log("canvas drawn");

    let img = document.getElementById("photo");

    let data = canvas.toDataURL("image/png");
    img.setAttribute("src", data);

    img = document.getElementById("photo");

    console.log(img);

    predict(img);
  });
});

async function predict(img) {
  
    
  
      console.log("Predictions: ");
      console.log(predictions);

}