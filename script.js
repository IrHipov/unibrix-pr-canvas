const CHELICKS_COLORS = ["#ffd812","#ff2727","#76ff45","#ffffff",]

window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const TIME_SPEED = 1;
  let moveDirection = 1;

  const cloud1Pos = {
    x: 10,
    y: 10,
    width: 260, height: 155
  };
  const cloud2Pos = {
    x: cloud1Pos.x + canvas.width,
    y: 30,
    width: 260, height: 155
  };
  const chel1Pos = {
    x: 200,
    y: 300,
  };

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chelDX =  3;
    initChel(ctx, chel1Pos.x, chel1Pos.y);
    initChel(ctx, chel1Pos.x + 2 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x + 6 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x + 13 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x - 10 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x - 5 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x - 4 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x + 19 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x + 16 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x + 23 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x - 19 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x - 24 * chelDX, chel1Pos.y);
    initChel(ctx, chel1Pos.x - 20 * chelDX, chel1Pos.y);


    initCloud(ctx,
      cloud1Pos.x += TIME_SPEED,
      cloud1Pos.y += TIME_SPEED * moveDirection);
    initCloud(ctx,
      cloud2Pos.x += TIME_SPEED,
      cloud2Pos.y += TIME_SPEED * moveDirection);

    initGround(ctx, canvas.width, canvas.height);

    if (cloud2Pos.x + cloud2Pos.width > canvas.width && cloud1Pos.x > canvas.width) {
      cloud1Pos.x = -cloud1Pos.width - 10;
    }
    if (cloud1Pos.x + cloud1Pos.width > canvas.width && cloud2Pos.x > canvas.width) {
      cloud2Pos.x = -cloud2Pos.width - 10;
    }
    if (cloud1Pos.y > 20 || cloud1Pos.y < 7) {
      moveDirection *= -1;
    }
  }, 100);

  let moveChelDirection = -1;
  setInterval(() => {

    chel1Pos.y += 20 * moveChelDirection;
    moveChelDirection *= -1;
  }, 200);
}

const initGround = (ctx, width, height) => {
  const gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
  gradient.addColorStop(0, "#7f1300");
  gradient.addColorStop(1, "#637f00");

  ctx.beginPath();  // Ground
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 360, width, height);
  ctx.fill();

}

const initCloud = (ctx, x, y) => {
  initRain(ctx, x + 30, y + 80, x % 2 === 0);

  ctx.beginPath();  // Center big cycle
  ctx.fillStyle = "#492A82";
  ctx.arc(x + 135, y + 55, 60, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();  // Left cycle
  ctx.fillStyle = "#4811AE";
  ctx.arc(x + 75, y + 75, 50, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();  // Right cycle
  ctx.fillStyle = "#4811AE";
  ctx.arc(x + 205, y + 85, 55, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();  // Bottom
  ctx.fillStyle = "#7945D6";
  ctx.arc(x + 120, y + 100, 55, 0, 2 * Math.PI);
  ctx.fill();
}

const initChel = (ctx, x, y) => {
  ctx.beginPath();
  ctx.strokeStyle = CHELICKS_COLORS[Math.floor(Math.random() * CHELICKS_COLORS.length)];
  // Внешняя окружность
  ctx.arc(x + 5, y + 5, 10, 0, Math.PI * 2, true);
  const mouthPos = {x: x + 5, y: y + 5}; // рот (по часовой стрелке)
  ctx.moveTo(mouthPos.x + 5, mouthPos.y);
  ctx.arc(mouthPos.x, mouthPos.y, 5, 0, Math.PI, false);

  const eye1Pos = {x: x + 2, y: y + 2}; // Левый глаз
  ctx.moveTo(eye1Pos.x, eye1Pos.y);
  ctx.arc(eye1Pos.x, eye1Pos.y, 1, 0, Math.PI * 2, true);
  const eye2Pos = {x: x + 8, y: y + 2}; // Правый глаз
  ctx.moveTo(eye2Pos.x, eye2Pos.y);
  ctx.arc(eye2Pos.x, eye2Pos.y, 1, 0, Math.PI * 2, true);

  // Body
  ctx.moveTo(x + 5, y + 14);
  ctx.lineTo(x + 5, y + 50);

  // Left leg
  ctx.moveTo(x + 5, y + 50);
  ctx.lineTo(x, y + 60);

  // Right leg
  ctx.moveTo(x + 5, y + 50);
  ctx.lineTo(x + 10, y + 60);

  // Left hand
  ctx.moveTo(x + 5, y + 14);
  ctx.lineTo(x, y + 40);

  // Right hand
  ctx.moveTo(x + 5, y + 14);
  ctx.lineTo(x + 10, y + 40);
  ctx.stroke();
}

const initRain = (ctx, x, y, isDropDown) => {
  const rainHeight = 10;

  for (let i = 0; i < 23; i++) { // Lines
    for (let j = 0; j < 40; j++) { // Drops
      if (j % 2 === (
        i % 2 === 0
          ? (isDropDown ? 0 : 1)
          : (isDropDown ? 1 : 0)
      )) {
        ctx.beginPath();
        ctx.strokeStyle = "#0037d7";
        ctx.moveTo(x + i * 10 - j, y + j * 10);
        ctx.lineTo(x + i * 10 - j - 2, y + j * 10 + rainHeight);
        ctx.stroke();
      }
    }
  }
}
