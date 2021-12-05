function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (!getCookie("PlayerWins") && !getCookie("ComputerWins")) {
  setCookie("PlayerWins", 0, 5);
  setCookie("ComputerWins", 0, 5);
}

let playerWins = getCookie("PlayerWins");
let computerWins = getCookie("ComputerWins");

console.log(playerWins, computerWins);

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("dom ready");
  const constraints = {
    audio: false,
    video: {
      width: 1120,
      height: 630,
    },
  };
  let maxPredictionVal = "";
  let valueNPC = "";
  let result = "";
  let imgfilenamePlayer = "";
  let imgfilenameComputer = "";

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
  const canvas2 = document.getElementById("canvas2");
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");

  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 224, 224);
  ctx2.fillStyle = "grey";
  ctx2.fillRect(0, 0, 848, 477);
  const snapshotButton = document.getElementById("snapshot");
  console.log("added EventListener");

  snapshotButton.addEventListener("click", function () {
 


    ctx.drawImage(video, 0, 49, 224, 126);
    ctx2.drawImage(video, 0, 0, 848, 477);
    console.log("canvas drawn");

    document.getElementById("break1").className = "dontShow";

    stopvideo();

    document.getElementById("video").className = "dontShow";
    document.getElementById("snapshot").className = "dontShow";
    document.getElementById("photo").className = "dontShow";
    document.getElementById("photo2").className = "show";
    document.getElementById("headlinePrediction").className = "show";

    let img = document.getElementById("photo");
    let img2 = document.getElementById("photo2");
    let data = canvas.toDataURL("image/png");
    img.setAttribute("src", data);
    let data2 = canvas2.toDataURL("image/png");
    img2.setAttribute("src", data2);

    img = document.getElementById("photo");

    console.log(img);
    console.log(img2);
    predict(img);

    document.getElementById("continue").className = "show btn btn-primary button";
    document.getElementById("replay").className = "show btn btn-primary button";

    const continueButton = document.getElementById("continue");
    console.log("added Continue Button EventListener");
    continueButton.addEventListener("click", function () {
      npcRand();
    });
  });

  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

  async function predict(img) {
    const URL = "https://teachablemachine.withgoogle.com/models/CoWEt_sY5/";

    let model;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);

    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(img);

    console.log(prediction);

    const predictionList = document.getElementById("predictionList");
    let maxPercentage = 0;

    for (var i = 0; i < 3; i++) {
      const predictionPercentage = prediction[i].probability;
      if (maxPercentage < predictionPercentage) {
        maxPercentage = predictionPercentage;
        maxPredictionVal = prediction[i].className;
      }
      const predictionClassName = prediction[i].className;
      console.log(predictionClassName + " " + predictionPercentage * 100 + "%");
      const li = document.createElement("li");
      li.appendChild(
        document.createTextNode(
          predictionClassName +
            " " +
            Math.round(predictionPercentage * 10000) / 100 +
            "%"
        )
      );
      predictionList.appendChild(li);
      console.log(maxPredictionVal + " " + maxPercentage);
    }
  }
  function stopvideo(e) {
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    video.srcObject = null;
  }

  function npcRand() {
    document.getElementById("continue").className = "dontShow";
    document.getElementById("headlinePrediction").className = "dontShow";
    document.getElementById("predictionList").className = "dontShow";
    document.getElementById("photo2").className = "dontShow";
    document.getElementById("p1").className = "dontShow";
    document.getElementById("p2").className = "show";
    document.getElementById("result").className = "show";
    document.getElementById("score").className = "show";
    document.getElementById("deleteCookies").className = "show button btn btn-danger";
    document.getElementById("npcRnd").className = "show";
    document.getElementById("playerValue").className = "show";
    document.getElementById("result").className = "inlineBlock";

    const deleteCookies = document.getElementById("deleteCookies");
    deleteCookies.addEventListener("click", function () {
      //delete Cookies
      document.cookie =
        "ComputerWins=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "PlayerWins=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.getElementById("deleteCookies").className = "dontShow";
      document.getElementById("score").className = "dontShow";
    });

    const number = Math.floor(Math.random() * 100) % 3;
    switch (number) {
      case 0:
        valueNPC = "Rock";
        break;
      case 1:
        valueNPC = "Paper";
        break;
      case 2:
        valueNPC = "Scissors";
        break;
      default:
        console.log("ERROR: Unknown");
        break;
    }
    console.log(valueNPC + " " + number);
    determineWinner();
  }
  function determineWinner() {
    console.log("NPC: " + valueNPC + " " + "Player: " + maxPredictionVal);
    const valuePlayer = maxPredictionVal;
    if (valueNPC == valuePlayer) {
      result = "It's a draw.";
    } else if (valueNPC == "Rock" && valuePlayer == "Paper") {
      result = "The Player won.";
      playerWins++;
    } else if (valueNPC == "Rock" && valuePlayer == "Scissors") {
      result = "The Computer won.";
      computerWins++;
    } else if (valueNPC == "Paper" && valuePlayer == "Rock") {
      result = "The Computer won.";
      computerWins++;
    } else if (valueNPC == "Paper" && valuePlayer == "Scissors") {
      result = "The Player won.";
      playerWins++;
    } else if (valueNPC == "Scissors" && valuePlayer == "Rock") {
      result = "The Player won.";
      playerWins++;
    } else if (valueNPC == "Scissors" && valuePlayer == "Paper") {
      result = "The Computer won.";
      computerWins++;
    } else {
      result = "undetermined";
    }
    setCookie("PlayerWins", playerWins, 5);
    setCookie("ComputerWins", computerWins, 5);

    imgfilenamePlayer = "/images/" + valuePlayer.toLowerCase() + "_player.png";
    imgfilenameComputer = "/images/" + valueNPC.toLowerCase() + "_computer.png";
    console.log(imgfilenamePlayer + " " + imgfilenameComputer);
    document.getElementById("playerValueImage").src = imgfilenamePlayer;
    document.getElementById("computerValueImage").src = imgfilenameComputer;

    document.getElementById("playerValueImage").className = "show";
    document.getElementById("computerValueImage").className = "show";
    document.getElementById("break4").className = "show";
    document.getElementById("break5").className = "show";
    document.getElementById("p2").className = "dontShow";
    document.getElementById("p3").className = "dontShow";

    const plaValTag = document.getElementById("playerValue");
    plaValTag.innerHTML =
      "You chose <strong>" + maxPredictionVal + "</strong>.<br />";
    setCookie("ComputerWins", computerWins, 5);
    const npcValTag = document.getElementById("npcRnd");
    npcValTag.innerHTML =
      "The Computer chose <strong>" + valueNPC + "</strong>.<br />";
    const resultTag = document.getElementById("result");
    resultTag.innerHTML = result;
    const score = document.getElementById("score");
    score.innerHTML =
      "Player " + playerWins + " : " + computerWins + " Computer";
    console.log(result);
  }
});
