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

    //TODO: Stop Video from playing
    //TODO: Remove Video Tag

    let img = document.getElementById("photo");

    let data = canvas.toDataURL("image/png");
    img.setAttribute("src", data);

    img = document.getElementById("photo");

    console.log(img);
    


    predict(img);
  });
});

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

async function predict(img) {
  const URL = "https://teachablemachine.withgoogle.com/models/CoWEt_sY5/";

  let model, labelContainer;
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  labelContainer = document.getElementById("label-container");

  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(img);

  console.log(prediction);

  const predictionPercentage0 = prediction[0].probability;
  const predictionClassName0 = prediction[0].className;
  console.log(predictionClassName0 + " " + predictionPercentage0*100 + "%");
  
  const predictionPercentage1 = prediction[1].probability;
  const predictionClassName1 = prediction[1].className;
  console.log(predictionClassName1 + " " + predictionPercentage1*100 + "%");
  
  const predictionPercentage2 = prediction[2].probability;
  const predictionClassName2 = prediction[2].className;
  console.log(predictionClassName2 + " " + predictionPercentage2*100 + "%");

}
