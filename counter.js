export function setupCounter(element) {
  // TG
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 448;
  canvas.height = 400;

  // ball variables

  const ballRadius = 4;

  // x & y = ball position
  let x = canvas.width / 2;
  let y = canvas.height - 30;

  // ball speed (d = direccion)
  let dx = -2;
  let dy = -2;

  function drawBall(params) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle(params) {}
  function drawBricks(params) {}
  function collisionsDetection(params) {}
  function ballMovent(params) {
    //right wall
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    // bottom wall
    if (y + dx < ballRadius) {
      dy = -dy;
    }
    // TEMPORAL GAME OVER
    if (y + dy > canvas.height - ballRadius) {
      document.location.reload();
    }
    x += dx;
    y += dy;
  }
  function paddleMovent(params) {}

  function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw(params) {
    cleanCanvas();
    // draw element
    drawBall();
    drawPaddle();
    drawBricks();

    //collisions and movements
    collisionsDetection();
    ballMovent();
    paddleMovent();

    console.log("hola");
    window.requestAnimationFrame(draw);
  }

  draw();
}
