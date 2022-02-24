import { useRef, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import Webcam from "react-webcam";
import { drawAllKeypoints } from "../functions/Calc";
import "../App.css";
import { useDispatch } from "react-redux";
import { createExercise } from "../actions/exercises";
import {
  shoulderPress,
  curls,
  lateralRise,
  tricepKickback,
  dumbbellRow,
} from "../functions/Exercises";
import TextField from "@material-ui/core/TextField";
import Stack from "@material-ui/core/Stack";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faWarning } from "@fortawesome/free-solid-svg-icons";

function Camera({ exercise }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const CAMERA_WIDTH = 1080;
  const CAMERA_HEIGHT = 720;
  var start = 0;
  var weight = 0;
  var webcamRef = useRef(null);
  var canvasRef = useRef(null);
  var counter = [0, 0, 0, 0];
  var start = false;
  var sets = [];
  const rad = (Math.PI * 2) / 100;
  var obj = {
    reps: 0,
    previousAngle: [180, 180],
    previousStage: ["down", "down"],
    helperVar1: [0, 0],
    helperVar2: [0, 0],
    incorrectVar: [false, false],
    incorrectVar2: [false, false],
  };
  var instuctionsFlag = true;

  var dictTitle = {
    shoulderPress: "Wyciskanie nad głowę",
    curls: "Uginanie ramion",
    lateralRise: "Wznosy bokiem",
    tricepKickback: "Prostowanie przedramienia w opadzie",
    dumbbellRow: "Wiosłowanie w opadzie",
  };
  var dictTags = {
    shoulderPress: ["barki"],
    curls: ["biceps"],
    lateralRise: ["barki"],
    tricepKickback: ["triceps"],
    dumbbellRow: ["plecy"],
  };
  var dictInstructions = {
    shoulderPress:
      "Należy unieść ramiona z równoczesnym wyprostem w stawach łokciowych i podnieść hantle nad głowę. Ciężary mogą lekko schodzić się do środka w momencie, gdy są nad głową. Ćwiczenie może być wykonywane w pozycji stojącej.",
    curls:
      "Postawą wyjściową ćwiczenia jest pozycja stojąca z ramionami ułożonymi wzdłuż ciała oraz hantlami trzymanymi w dłoniach w pozycji neutralnej (kciuki skierowane w przód). Uginanie ma odbywać się z jednoczesną rotacją zewnętrzną, aby finalnie dłoń była skierowana kciukiem na zewnątrz. Ruch ma być kontrolowany, sylwetka stabilna.",
    lateralRise:
      "Lekko uginamy położone równolegle do sylwetki ramiona. Unosimy hantle aż do uzyskania prostopadłości względem tułowia. Ramiona prowadzimy równo, łokieć i nadgarstek ułożone są na podobnej wysokości.",
    tricepKickback:
      "Należy pochylić się jak najbardziej do przodu. Trzymając nieruchomo ramiona, wykonujemy wyprost w stawach łokciowych, unosząc ciężar za siebie.",
    dumbbellRow:
      "Pozycją wyjściową ćwiczenia jest pochylenie sylwetki przy jednoczesnym wyprostowaniu pleców. Trzymając przedramię w pionie należy przyciągnąć ciężar do siebie. W momencie powrotu do pozycji wyjściowej wskazane jest całkowite wyprostowanie ramienia.",
  };

  const runDetector = async () => {
    const net = await poseDetection.createDetector(
      poseDetection.SupportedModels.BlazePose,
      { runtime: "tfjs", modelType: "full" }
    );
    var interval = setInterval(() => {
      if (canvasRef.current === null) clearInterval(interval);
      else detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      const pose = await net.estimatePoses(video);
      if (canvasRef.current !== null)
        drawCanvas(pose, videoWidth, videoHeight, canvasRef);
    }
  };

  function beigeCircle(height, n) {
    const context = canvasRef.current.getContext("2d");
    context.save();
    context.beginPath();
    context.strokeStyle = "#C6AC8F";
    context.lineWidth = 4;
    context.arc(50, height, 12, -Math.PI / 2, -Math.PI / 2 + n * rad, false);
    context.stroke();
    context.restore();
  }

  // Draw a white outer ring
  function whiteCircle(height) {
    const context = canvasRef.current.getContext("2d");
    context.save();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 4;
    context.arc(50, height, 12, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
    context.restore();
  }

  // Animation cycle
  function drawLoadingCicle(counter, height) {
    whiteCircle(height);
    beigeCircle(height, counter * 5);
  }
  function changeBackground(button, color) {
    button.style.background = color;
    window.setTimeout(() => {
      button.style.background = "#42403D";
    }, 1000);
  }
  const startSet = (e) => {
    counter[0] = 0;
    obj.reps = 0;
    start = true;
    changeBackground(e.target ? e.target : e, "#64625F");
  };
  const stopSet = (e) => {
    if (obj.reps > 0) {
      counter[1] = 0;
      sets.push(obj.reps);
      start = false;
      document.getElementById("sets").innerText = sets.length;
      changeBackground(e.target ? e.target : e, "#64625F");
    } else changeBackground(e.target ? e.target : e, "#a81313");
  };
  const sendExercise = (e) => {
    if (sets.length > 0 && user) {
      let repsString = `(`;
      for (let i = 0; i < sets.length; i++) {
        repsString += ` ${sets[i]}`;
      }
      repsString += ` )`;
      let date = new Date();
      let hours = date.getHours();
      if (hours !== 23) date.setUTCHours(hours);
      else date.setHours(hours + 1);
      var exerciseData = {
        title: dictTitle[exercise],
        weight: isNaN(parseInt(weight)) ? 0 : parseInt(weight),
        sets: sets.length,
        reps: repsString,
        notes: "",
        tags: dictTags[exercise],
        createdAt: date.toISOString(),
      };
      dispatch(createExercise({ ...exerciseData, name: user?.result?.name }));
      counter[2] = 0;
      sets = [];
      obj.reps = 0;
      document.getElementById("sets").innerText = sets.length;
      changeBackground(e.target ? e.target : e, "#64625F");
    } else changeBackground(e.target ? e.target : e, "#a81313");
  };
  const showInstructions = () => {
    var elem = document.getElementById("instTable");
    var elem2 = document.getElementById("table");
    var pos1 = -130;
    var pos2 = 1;
    clearInterval(id);
    var id = setInterval(frame, 10);
    function frame() {
      if (pos1 == 1) {
        clearInterval(id);
      } else {
        pos1++;
        pos2--;
        if (instuctionsFlag) {
          elem.style.left = pos2 + "%";
          elem2.style.left = pos1 + "%";
        } else {
          elem.style.left = pos1 + "%";
          elem2.style.left = pos2 + "%";
        }
      }
    }
    instuctionsFlag = !instuctionsFlag;
    counter[3] = 0;
    if (!instuctionsFlag)
      document.getElementById("showInstructionsButton").innerText = "POWRÓT";
    else
      document.getElementById("showInstructionsButton").innerText =
        "INSTRUKCJE";
  };

  const checkButtons = (keypoints) => {
    if (
      Math.abs(parseInt(keypoints[0].y) - 80) < 10 ||
      Math.abs(parseInt(keypoints[1].y) - 80) < 10
    ) {
      counter = [counter[0] + 1, 0, 0, 0];
      drawLoadingCicle(counter[0], 80);
    } else if (
      Math.abs(parseInt(keypoints[0].y) - 180) < 10 ||
      Math.abs(parseInt(keypoints[1].y) - 180) < 10
    ) {
      counter = [0, counter[1] + 1, 0, 0];
      drawLoadingCicle(counter[1], 180);
    } else if (
      Math.abs(parseInt(keypoints[0].y) - 280) < 10 ||
      Math.abs(parseInt(keypoints[1].y) - 280) < 10
    ) {
      counter = [0, 0, counter[2] + 1, 0];
      drawLoadingCicle(counter[2], 280);
    } else if (
      Math.abs(parseInt(keypoints[0].y) - 380) < 10 ||
      Math.abs(parseInt(keypoints[1].y) - 380) < 10
    ) {
      console.log(counter[3]);
      counter = [0, 0, 0, counter[3] + 1];
      drawLoadingCicle(counter[3], 380);
    }

    if (counter[0] > 20) startSet(document.getElementById("startOfSetButton"));
    else if (counter[1] > 20)
      stopSet(document.getElementById("endOfSetButton"));
    else if (counter[2] > 20)
      sendExercise(document.getElementById("saveExerciseButton"));
    else if (counter[3] > 20) showInstructions();
  };
  const drawCanvas = async (pose, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    for (let i = 80; i <= 380; i += 100) {
      ctx.beginPath();
      ctx.arc(50, i, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
    }
    if (pose[0] !== undefined) {
      const keypoints = pose[0]["keypoints"];
      drawAllKeypoints(ctx, keypoints);
      var interval = setInterval(hide, 10);
      var opacity = document.getElementById("message").style.opacity;
      console.log(opacity);
      function hide() {
        if (opacity <= 0) {
          clearInterval(interval);
        } else {
          opacity = opacity - 0.01;
          document.getElementById("message").style.opacity = opacity;
        }
      }

      if (
        Math.abs(keypoints[18].x - 40) < 20 ||
        Math.abs(keypoints[20].x - 40) < 20
      )
        checkButtons([keypoints[18], keypoints[20]]);
      else counter = [0, 0, 0, 0];
      if (start === true) {
        switch (exercise) {
          case "shoulderPress":
            obj = shoulderPress(
              ctx,
              keypoints.slice(11, 17).concat(keypoints[23]),
              obj
            );
            break;
          case "curls":
            obj = curls(ctx, keypoints.slice(11, 17), obj);
            break;
          case "lateralRise":
            obj = lateralRise(
              ctx,
              keypoints.slice(11, 17).concat([keypoints[23], keypoints[24]]),
              obj
            );
            break;
          case "tricepKickback":
            obj = tricepKickback(
              ctx,
              keypoints.slice(11, 17).concat(keypoints.slice(23, 27)),
              obj
            );
            break;
          case "dumbbellRow":
            obj = dumbbellRow(
              ctx,
              keypoints.slice(11, 17).concat(keypoints.slice(23, 27)),
              obj
            );
            break;
          default:
            break;
        }
      }
    }
    document.getElementById("reps").innerText = obj.reps;
  };

  runDetector();
  function changeWeight(e) {
    weight = e.target.value >= 0 ? e.target.value : 0;
    e.target.value = e.target.value >= 0 ? e.target.value : 0;
  }

  return (
    <div className="exercise">
      <div id="message" style={{ opacity: "1" }}>
        <Stack
          id="messageStack"
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={0}
        >
          <p
            style={{
              marginRight: "3%",
              marginLeft: "1%",
              color: "#1e2336",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            <FontAwesomeIcon icon={faExclamation} size="2x" />
          </p>
          <p style={{ marginTop: "12px", marginBottom: "5px" }}>
            Ćwiczenia można rozpocząć, gdy na sylwetce zaznaczone zostaną punkty
            kluczowe.
          </p>
        </Stack>
      </div>
      <Stack
        id="wrapper"
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        spacing={0}
      >
        <div id="cameraForm">
          <div id="instTable" className="cameraFormText">
            <div
              style={{
                background: "#c25b23",
                opacity: "1",
                width: "100%",
                marginLeft: "-20%",
                paddingRight: "30%",
                paddingLeft: "10%",
                paddingTop: "7%",
                paddingBottom: "7%",
                borderRadius: "3px",
              }}
            ></div>

            <div className="banner">
              <p style={{ fontWeight: "600" }}>{dictTitle[exercise]}</p>
              <p
                style={{
                  fontSize: "0.8em",
                  paddingTop: "10%",
                  borderTop: "solid 1px #c25b23",
                }}
              >
                {dictInstructions[exercise]}
              </p>
            </div>
          </div>
          <div id="table" className="cameraFormText">
            <div
              style={{
                background: "#c25b23",
                opacity: "1",
                width: "100%",
                marginLeft: "-20%",
                paddingRight: "30%",
                paddingLeft: "10%",
                paddingTop: "7%",
                paddingBottom: "7%",
                fontSize: "1.4em",
                borderRadius: "3px",
              }}
            ></div>

            <div className="banner">
              <div
                style={{
                  borderBottom: "solid 1px #c25b23",
                  paddingBottom: "5%",
                }}
              >
                CIĘŻAR:{" "}
              </div>
              <TextField
                type="number"
                variant="outlined"
                defaultValue={0}
                onChange={(e) => changeWeight(e)}
                InputLabelProps={{
                  style: { color: "#eae0d5" },
                }}
                InputProps={{
                  style: {
                    color: "#eae0d5",
                    fontSize: "50px",
                    width: "fit-content",
                  },
                }}
                style={{
                  margin: "25px",
                  marginLeft: "5px",
                  marginBottom: "15%",
                  marginTop: "5%",
                }}
              />
              POWTÓRZENIA: <div id="reps">0</div>
              SERIE: <div id="sets">0</div>
            </div>
          </div>
        </div>
        <div id="camera">
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "0",
              marginRight: "auto",
              marginTop: "2%",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: CAMERA_WIDTH,
              height: CAMERA_HEIGHT,
            }}
            className="camera"
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "0",
              marginRight: "auto",
              marginTop: "2%",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: CAMERA_WIDTH,
              height: CAMERA_HEIGHT,
            }}
            className="camera"
          />
          <Stack direction="column">
            <Button
              color="warning"
              variant="contained"
              className="cameraButtons"
              id="startOfSetButton"
              onClick={(e) => startSet(e)}
            >
              Start serii
            </Button>
            <Button
              color="warning"
              variant="contained"
              className="cameraButtons"
              id="endOfSetButton"
              onClick={(e) => stopSet(e)}
            >
              Koniec serii
            </Button>
            <Button
              color="warning"
              variant="contained"
              className="cameraButtons"
              id="saveExerciseButton"
              onClick={(e) => sendExercise(e)}
            >
              ZAPISZ
            </Button>
            <Button
              color="warning"
              variant="contained"
              className="cameraButtons"
              id="showInstructionsButton"
              onClick={(e) => showInstructions()}
            >
              INSTRUKCJE
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export default Camera;
