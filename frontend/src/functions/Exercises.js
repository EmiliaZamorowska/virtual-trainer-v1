import {
  calculate_angle,
  points_distance,
  draw_red_landmarks,
  draw_red_lines,
} from "../functions/Calc";

// KEYPOINTS
// [0] - LEFT_SHOULDER
// [1] - RIGHT_SHOULDER
// [2] - LEFT_ELBOW
// [3] - RIGHT_ELBOW
// [4] - LEFT_WRIST
// [5] - RIGHT_WRIST
// [6] - LEFT_HIP
// [7] - RIGHT_HIP
// [8] - LEFT_KNEE
// [9] - RIGHT_KNEE

const CAMERA_WIDTH = 1080;
const CAMERA_HEIGHT = 720;

function shoulderPress(ctx, keypoints, obj) {
  if (
    keypoints.every((element) => element.score > 0.5) &&
    keypoints[4].y < keypoints[2].y &&
    keypoints[5].y < keypoints[3].y
  ) {
    const pointUpDistance = points_distance(keypoints[4], keypoints[5]);
    const pointDownDistance = points_distance(keypoints[2], keypoints[3]);

    let angleL = calculate_angle(keypoints[2], keypoints[0], keypoints[6]);
    if (
      pointUpDistance - pointDownDistance > 0.01 ||
      pointUpDistance - pointDownDistance < -0.05
    ) {
      draw_red_lines(ctx, [
        keypoints[2],
        keypoints[4],
        keypoints[3],
        keypoints[5],
      ]);
      obj.helperVar1[0] += 1;
    }
    if (Math.abs(keypoints[3].y - keypoints[2].y) / CAMERA_HEIGHT > 0.03) {
      draw_red_landmarks(ctx, [keypoints[2], keypoints[3]]);
      obj.helperVar1[0] += 1;
    }
    if (angleL - obj.previousAngle[0] > 5) {
      if (obj.previousStage[0] === "down") obj.helperVar1[0] = 0;
      obj.previousStage[0] = "up";
    } else if (obj.previousAngle[0] - angleL > 5) {
      if (obj.previousStage[0] === "up" && obj.helperVar1[0] < 5) obj.reps += 1;
      obj.previousStage[0] = "down";
    }
    obj.previousAngle[0] = angleL;
  }
  return obj;
}

function curls(ctx, keypoints, obj) {
  if (
    keypoints[0].score > 0.7 &&
    keypoints[2].score > 0.9 &&
    keypoints[4].score > 0.9
  ) {
    let angleL = calculate_angle(keypoints[0], keypoints[2], keypoints[4]);
    let stageL;

    if (angleL - obj.previousAngle[0] > 12) stageL = "down";
    else if (obj.previousAngle[0] - angleL > 12) stageL = "up";
    else stageL = obj.previousStage[0];

    if (stageL === "down" && obj.previousStage[0] === "down") {
      if (obj.incorrectVar[0] === true) draw_red_landmarks(ctx, keypoints[0]);
      if (obj.incorrectVar2[0] === true)
        draw_red_lines(ctx, [keypoints[2], keypoints[4]]);
    } else if (stageL === "down" && obj.previousStage[0] === "up") {
      if (obj.previousAngle[0] > 80) obj.incorrectVar2[0] = true;
      if (
        Math.abs(obj.helperVar1[0] - keypoints[0].x) / CAMERA_WIDTH > 0.02 ||
        Math.abs(obj.helperVar1[1] - keypoints[0].y) / CAMERA_HEIGHT > 0.02
      )
        obj.incorrectVar[0] = true;
      if (
        !obj.incorrectVar[0] &&
        !obj.incorrectVar2[0] &&
        Math.abs(keypoints[2].x - keypoints[0].x) / CAMERA_WIDTH < 0.05
      )
        obj.reps += 1;
    } else if (stageL === "up" && obj.previousStage[0] === "down") {
      obj.helperVar1 = [keypoints[0].x, keypoints[0].y];
      obj.incorrectVar[0] = false;
      obj.incorrectVar2[0] = false;
    }
    obj.previousAngle[0] = angleL;
    obj.previousStage[0] = stageL;
  }
  if (
    keypoints[1].score > 0.7 &&
    keypoints[3].score > 0.9 &&
    keypoints[5].score > 0.7
  ) {
    let angleR = calculate_angle(keypoints[1], keypoints[3], keypoints[5]);
    let stageR;

    if (angleR - obj.previousAngle[1] > 12) stageR = "down";
    else if (obj.previousAngle[1] - angleR > 12) stageR = "up";
    else stageR = obj.previousStage[1];

    if (stageR === "down" && obj.previousStage[1] == "down") {
      if (obj.incorrectVar[1] === true) draw_red_landmarks(ctx, keypoints[1]);
      if (obj.incorrectVar2[1] === true)
        draw_red_lines(ctx, [keypoints[3], keypoints[5]]);
    } else if (stageR === "down" && obj.previousStage[1] === "up") {
      if (obj.previousAngle[1] > 80) obj.incorrectVar2[1] = true;
      if (
        Math.abs(obj.helperVar2[0] - keypoints[1].x) / CAMERA_WIDTH > 0.02 ||
        Math.abs(obj.helperVar2[1] - keypoints[1].y) / CAMERA_HEIGHT > 0.02
      )
        obj.incorrectVar[1] = true;
      if (
        !obj.incorrectVar[1] &&
        !obj.incorrectVar2[1] &&
        Math.abs(keypoints[3].x - keypoints[1].x) / CAMERA_WIDTH < 0.05
      )
        obj.reps += 1;
    } else if (stageR === "up" && obj.previousStage[1] === "down") {
      obj.helperVar2 = [keypoints[1].x, keypoints[1].y];
      obj.incorrectVar[1] = false;
      obj.incorrectVar2[1] = false;
    }
    obj.previousAngle[1] = angleR;
    obj.previousStage[1] = stageR;
  }
  return obj;
}
function lateralRise(ctx, keypoints, obj) {
  if (keypoints.every((element) => element.score > 0.7)) {
    var angleL = calculate_angle(keypoints[2], keypoints[0], keypoints[6]);
    var angleR = calculate_angle(keypoints[3], keypoints[1], keypoints[7]);
    var stageL;
    var stageR;

    if (angleL >= 80 && angleR >= 80) {
      if (Math.abs(keypoints[3].y - keypoints[2].y) / CAMERA_HEIGHT > 0.05) {
        draw_red_landmarks(ctx, [keypoints[2], keypoints[3]]);
        obj.helperVar1[0] += 1;
      }
      if (Math.abs(keypoints[5].y - keypoints[4].y) / CAMERA_HEIGHT > 0.05) {
        draw_red_landmarks(ctx, [keypoints[4], keypoints[5]]);
        obj.helperVar1[0] += 1;
      }
      if ((keypoints[3].y - keypoints[5].y) / CAMERA_HEIGHT > 0.04) {
        draw_red_landmarks(ctx, [keypoints[5], keypoints[3]]);
        obj.helperVar1[0] += 3;
      }
      if ((keypoints[2].y - keypoints[4].y) / CAMERA_HEIGHT > 0.04) {
        draw_red_landmarks(ctx, [keypoints[4], keypoints[2]]);
        obj.helperVar1[0] += 3;
      }
    }

    if (angleR - obj.previousAngle[1] < 3) {
      stageR = "down";
      if (obj.incorrectVar[1] === true)
        draw_red_lines(ctx, [keypoints[1], keypoints[3]]);
      if (angleR < 30) {
        obj.incorrectVar[1] = false;
        obj.helperVar1[0] = 0;
      } else if (
        obj.previousStage[1] === "up" &&
        (obj.previousAngle[1] > 110 ||
          (obj.previousAngle[1] < 80 && obj.previousAngle[1] > 30))
      ) {
        draw_red_lines(ctx, [keypoints[0], keypoints[2]]);
        obj.incorrectVar[1] = true;
      }
    } else if (obj.previousAngle[1] - angleR < 3) stageR = "up";
    else stageR = obj.previousStage[1];

    if (angleL - obj.previousAngle[0] < 3) {
      stageL = "down";
      if (obj.incorrectVar[0] === true)
        draw_red_lines(ctx, [keypoints[0], keypoints[2]]);
      if (angleL < 30) {
        obj.incorrectVar[0] = false;
        obj.helperVar1[0] = 0;
      } else if (obj.previousStage[0] === "up") {
        if (
          obj.previousAngle[0] > 110 ||
          (obj.previousAngle[0] < 80 && obj.previousAngle[0] > 30)
        ) {
          draw_red_lines(ctx, [keypoints[0], keypoints[2]]);
          obj.incorrectVar[0] = true;
        } else if (
          obj.incorrectVar[0] === false &&
          obj.incorrectVar[1] === false &&
          obj.helperVar1[0] < 6
        ) {
          obj.reps += 1;
        }
      }
    } else if (obj.previousAngle[0] - angleL < 3) stageL = "up";
    else stageL = obj.previousStage[0];
    obj.previousAngle = [angleL, angleR];
    obj.previousStage = [stageL, stageR];
  }
  return obj;
}
function tricepKickback(ctx, keypoints, obj) {
  if (
    keypoints[0].score > 0.7 &&
    keypoints[2].score > 0.9 &&
    keypoints[4].score > 0.9
  ) {
    if (calculate_angle(keypoints[0], keypoints[6], keypoints[8]) < 150) {
      let angleL = calculate_angle(keypoints[0], keypoints[2], keypoints[4]);
      let stageL;

      if (angleL - obj.previousAngle[0] < 5) stageL = "down";
      else if (obj.previousAngle[0] - angleL < 5) stageL = "up";
      else stageL = obj.previousStage[0];

      if (stageL === obj.previousStage[0]) {
        if (obj.incorrectVar[0] === true)
          draw_red_lines(ctx, [keypoints[2], keypoints[4]]);
      } else if (stageL === "down" && obj.previousStage[0] === "up") {
        if (angleL >= 165) obj.reps += 1;
        else obj.incorrectVar[0] = true;
      } else obj.incorrectVar[0] = false;

      obj.previousAngle[0] = angleL;
      obj.previousStage[0] = stageL;
    } else draw_red_lines(ctx, [keypoints[0], keypoints[6]]);
  }
  if (
    keypoints[1].score > 0.7 &&
    keypoints[3].score > 0.9 &&
    keypoints[5].score > 0.7
  ) {
    if (calculate_angle(keypoints[1], keypoints[7], keypoints[9]) < 150) {
      let angleR = calculate_angle(keypoints[1], keypoints[3], keypoints[5]);
      let stageR;

      if (angleR - obj.previousAngle[1] < 5) stageR = "down";
      else if (obj.previousAngle[1] - angleR < 5) stageR = "up";
      else stageR = obj.previousStage[1];

      if (stageR === obj.previousStage[1]) {
        if (obj.incorrectVar[1] === true)
          draw_red_lines(ctx, [keypoints[3], keypoints[5]]);
      } else if (stageR === "down" && obj.previousStage[1] === "up") {
        if (angleR >= 165) obj.reps += 1;
        else obj.incorrectVar[1] = true;
      } else obj.incorrectVar[1] = false;

      obj.previousAngle[1] = angleR;
      obj.previousStage[1] = stageR;
    } else draw_red_lines(ctx, [keypoints[1], keypoints[7]]);
  }
  return obj;
}

function dumbbellRow(ctx, keypoints, obj) {
  if (
    keypoints[0].score > 0.7 &&
    keypoints[2].score > 0.9 &&
    keypoints[4].score > 0.9
  ) {
    if (calculate_angle(keypoints[0], keypoints[6], keypoints[8]) < 150) {
      let angleL = calculate_angle(keypoints[0], keypoints[2], keypoints[4]);
      let stageL;

      if (angleL - obj.previousAngle[0] > 3) stageL = "down";
      else if (obj.previousAngle[0] - angleL > 3) stageL = "up";
      else stageL = obj.previousStage[0];
      if (stageL === obj.previousStage[0]) {
        if (obj.incorrectVar[0] === true) draw_red_landmarks(ctx, keypoints[2]);
        if (obj.incorrectVar2[0] === true)
          draw_red_lines(ctx, [keypoints[2], keypoints[4]]);
      } else if (stageL === "down" && obj.previousStage[0] === "up") {
        if ((keypoints[2].y - keypoints[0].y) / CAMERA_HEIGHT < 0.1) {
          if (obj.incorrectVar2[0] === false && obj.incorrectVar[0] === false)
            obj.reps += 1;
        } else obj.incorrectVar[0] = true;
        obj.incorrectVar2[0] = false;
        obj.helperVar1[0] = 0;
      } else if (angleL < 145 && obj.helperVar1[1] === 0) {
        obj.incorrectVar2[0] = true;
        obj.helperVar1[0] = 1;
      } else obj.incorrectVar[0] = false;

      obj.previousAngle[0] = angleL;
      obj.previousStage[0] = stageL;
    } else draw_red_lines(ctx, [keypoints[0], keypoints[6]]);
  }
  if (
    keypoints[1].score > 0.7 &&
    keypoints[3].score > 0.9 &&
    keypoints[5].score > 0.7
  ) {
    if (calculate_angle(keypoints[1], keypoints[7], keypoints[9]) < 150) {
      let angleR = calculate_angle(keypoints[1], keypoints[3], keypoints[5]);
      let stageR;

      if (angleR - obj.previousAngle[1] > 2) stageR = "down";
      else if (obj.previousAngle[1] - angleR > 2) stageR = "up";
      else stageR = obj.previousStage[1];

      if (stageR === obj.previousStage[1]) {
        if (obj.incorrectVar[1] === true) draw_red_landmarks(ctx, keypoints[3]);
        if (obj.incorrectVar2[1] === true)
          draw_red_lines(ctx, [keypoints[3], keypoints[5]]);
      } else if (stageR === "down" && obj.previousStage[1] === "up") {
        if ((keypoints[3].y - keypoints[1].y) / CAMERA_HEIGHT < 0.1) {
          if (obj.incorrectVar2[1] === false && obj.incorrectVar[1] === false)
            obj.reps += 1;
        } else obj.incorrectVar[1] = true;
        obj.incorrectVar2[1] = false;
        obj.helperVar1[1] = 0;
      } else if (angleR < 145 && obj.helperVar1[1] === 0) {
        obj.incorrectVar2[1] = true;
        obj.helperVar1[1] = 1;
      } else obj.incorrectVar[1] = false;

      obj.previousAngle[1] = angleR;
      obj.previousStage[1] = stageR;
    } else draw_red_lines(ctx, [keypoints[1], keypoints[7]]);
  }
  return obj;
}
export { shoulderPress, curls, lateralRise, tricepKickback, dumbbellRow };
