const CAMERA_WIDTH = 1080;
const CAMERA_HEIGHT = 720;

function calculate_angle(a, b, c) {
  var radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  var angle = Math.abs((radians * 180) / Math.PI);
  if (angle > 180) angle = 360 - angle;

  return angle;
}
function points_distance(a, b) {
  return Math.sqrt(
    (((a.x - b.x) / CAMERA_WIDTH) * (a.x - b.x)) / CAMERA_WIDTH +
      (((a.y - b.y) / CAMERA_HEIGHT) * (a.y - b.y)) / CAMERA_HEIGHT
  );
}
function draw_red_landmarks(ctx, points) {
  if (points.length > 1) {
    points.forEach((point) => {
      const x = point.x;
      const y = point.y;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });
  } else {
    const x = points.x;
    const y = points.y;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
function draw_red_lines(ctx, landmarks) {
  const length = landmarks.length;
  if (length % 2 === 0) {
    for (let i = 0; i < length; i = i + 2) {
      ctx.beginPath();
      ctx.moveTo(landmarks[i].x, landmarks[i].y);
      ctx.lineTo(landmarks[i + 1].x, landmarks[i + 1].y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
}

function drawAllKeypoints(ctx, keypoints) {
  for (let i = 11; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < 0.5) {
      continue;
    }
    const x = keypoint.x;
    const y = keypoint.y;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#1e2336";
    ctx.fill();
  }
}

export {
  calculate_angle,
  points_distance,
  draw_red_landmarks,
  draw_red_lines,
  drawAllKeypoints,
};
