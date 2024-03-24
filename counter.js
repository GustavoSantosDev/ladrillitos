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

  //variables de sprites

  const $sprite = document.querySelector('#sprite')
  const $bricks = document.querySelector('#bricks')

  //variables de los bricks
  const brickRowCount = 6;
  const brickColumnCount = 13;
  const brickWidth = 32;
  const brickHeigth = 16;
  const brickPadding = 0;
  const brickOffsetTop = 80;
  const brickOffsetLeft = 16;
  const bricks = [];

  const BRICH_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
  }

  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for (let r = 0; r < brickRowCount; r++) {
      //calculo para la posicion de los ladrillos en la pantalla
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
      const brickY = r * (brickHeigth + brickPadding) + brickOffsetTop
      //asignar colores a los ladrillos aleatoriamente
      const random = Math.floor(Math.random() * 8);
      //Se guarda la informacion de cada ladrillo
      bricks[c][r] = {
        x: brickX,
        y: brickY,
        status: BRICH_STATUS.ACTIVE,
        color: random
      }
    }
  }



  function drawBall(params) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle(params) {
    ctx.drawImage(
      $sprite,
      29,
      174,
      paddleWith,
      paddleHeight,
      paddleX,
      paddleY,
      paddleWith,
      paddleHeight
    )
  }
  function drawBricks(params) {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const currentBrick = bricks[c][r]
        if (currentBrick.status === BRICH_STATUS.DESTROYED) continue;

        const clipX = currentBrick.color * 32

        ctx.drawImage(
          $bricks,
          clipX,
          0,
          brickWidth,
          brickHeigth,
          currentBrick.x,
          currentBrick.y,
          brickWidth,
          brickHeigth
        )
      }
    }
  }
  function collisionsDetection(params) {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const currentBrick = bricks[c][r]
        if (currentBrick.status === BRICH_STATUS.DESTROYED) continue;

        const isBallSameXAsBrick =
          x > currentBrick.x &&
          x < currentBrick.x + brickWidth

        const isBallSameYAsBrick =
          y > currentBrick.y &&
          y < currentBrick.y + brickHeigth

        if (isBallSameXAsBrick && isBallSameYAsBrick) {
          dy = -dy
          currentBrick.status = BRICH_STATUS.DESTROYED
        }
      }
    }
  }
  function ballMovent(params) {
    //right wall and Left
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    // Top wall
    if (y + dx < ballRadius) {
      dy = -dy;
    }

    // toca pala o toca suelo

    const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWith;
    const isBallTouchinPaddle = y + dy > paddleY

    if (isBallTouchinPaddle && isBallSameXAsPaddle) {
      dy = -dy
    }
    else if (y + dy <= canvas.height) {
      document.location.reload();
    }
    x += dx;
    y += dy;
  }
  function paddleMovent(params) {
    if (rightPressed && paddleX < canvas.width - paddleWith) {
      paddleX += 7
    } else if (leftPressed && paddleX > 0) {
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
