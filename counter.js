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

  //paddle variables
  const paddleHeight = 10;
  const paddleWith = 50;

  let paddleX = (canvas.width - paddleWith) / 2;
  let paddleY = canvas.height - paddleHeight - 10;

  let rightPressed = false
  let leftPressed = false


  function drawBall(params) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle(params) {
    ctx.fillStyle = '#09f'
    ctx.fillRect(
      paddleX,
      paddleY,
      paddleWith,
      paddleHeight
    )

  }
  function drawBricks(params) { }
  function collisionsDetection(params) { }
  function ballMovent(params) {
    //right wall and Left
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    // Top wall
    if (y + dx < ballRadius) {
      dy = -dy;
    }
    // TEMPORAL GAME OVER
    if (y + dy <= canvas.height) {
      document.location.reload();
    }
    x += dx;
    y += dy;
  }
  function paddleMovent(params) {
    if (rightPressed) {
      paddleX += 7
    } else if (leftPressed) {
      paddleX += -7
    }
  }

  function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function initEvents(params) {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    function keyDownHandler(event) {
      const { key } = event
      if (key === 'Right' || key === 'ArrowRight') {
        rightPressed = true
      } else if (key === 'Left' || key === 'ArrowLeft') {
        leftPressed = true
      }
    }

    function keyUpHandler(event) {
      const { key } = event
      if (key === 'Right' || key === 'ArrowRight') {
        rightPressed = false
      } else if (key === 'Left' || key === 'ArrowLeft') {
        leftPressed = false
      }
    }
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

    window.requestAnimationFrame(draw);
  }

  draw();
  initEvents()
}
