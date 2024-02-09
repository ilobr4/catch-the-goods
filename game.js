setup();
setInterval(draw, 16.67); // Assuming a frame rate of approximately 60 frames per second (1000ms / 60fps)

function setup() {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = width;
    canvas.height = height;
    createObjects();
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}

function draw() {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");

  if (screen == 0) {
    startscreen(context);
    canvas.addEventListener('click', mousePressed);

  } else if (screen == 1) {
  	checkBackground(context);
    button.style.display = 'block';
    button.addEventListener("click", changeVal);
    player.show(context);
    for (let i = 0; i < good.length; i++) {
        good[i].show(context);
        bad[i].show(context);
    }
    life.show(context);
    showScore(context);
    showTime(context);
    move();
    jump();
    checkStatus();
    checkCollisions();
    speedUp();
    
  } else if (screen == 2) {
    endscreen(context);
    canvas.addEventListener('click', mousePressed);
  }	
}

function mousePressed() {
	if  (screen == 0){
  	    screen = 1;
        myInterval = setInterval(count, 1000);
        gameSound.loop = true;
        gameSound.play();
    } else if (screen == 2) {
  	    screen = 0;
    }
}

function startscreen(context) {
    button.style.display = 'none';
    context.fillStyle = "rgb(170, 232, 240)";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "rgb(13, 2, 41)";
    context.textAlign = "center";
    context.font = "25px Arial";
    context.fillText('WELCOME TO "CATCH THE GOODS"', width / 2, height / 2);
    context.font = "15px Arial";
    context.fillText('Click to start', width / 2, height / 2 + 35);
    context.font = "10px Arial";
    context.fillText('By Ilona Breidt', width / 2, height - 10);
    end();
}

function endscreen(context) {
    clearInterval(myInterval);
    button.style.display = 'none';
    context.fillStyle = "rgb(13, 2, 41)";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "rgb(170, 232, 240)";
    context.textAlign = "center";
    context.font = "25px Arial";
    context.fillText('GAME OVER', width / 2, height / 2 - 40);
    context.font = "20px Arial";
    context.fillText("SCORE = " + score, width / 2, height / 2);
    context.fillText("TIME = " + minutes + ":" + seconds, width / 2, height / 2 + 30);
    context.font = "15px Arial";
    context.fillText('Click to play again', width / 2, height / 2 + 70);
}

function count() {
    time++;
    seconds = Math.round(time % 60);
    minutes = Math.floor(time/60);
}

function checkBackground(context) {
    if (change === true) {
        context.drawImage(imgBackground2, 0, 0, width, height);
    } else {
        context.drawImage(imgBackground1, 0, 0, width, height);
    }
}

function createObjects() {
    const body = document.body;

    // Create a button element
    button = document.createElement('button');
    button.textContent = 'CHANGE';

    // Set button position using CSS styles
    button.style.position = 'absolute';
    button.style.left = '360px';
    button.style.top = '25px';

    // Style the button
    button.style.fontSize = '20px';
    button.style.backgroundColor = 'rgb(170, 232, 240)';

    // Append the button to the body
    body.appendChild(button);
 
    life = new Life(lifes);
    player = new Player(imgMain1, 367, 378, 65, 122);
    good = [
        new Good(imgGood1, 450, -50, 50, 50),
        new Good(imgGood1, 150, -100, 50, 50),
        new Good(imgGood1, 300, -150, 50, 50),
        new Good(imgGood1, 600, -200, 50, 50),
        new Good(imgGood1, 80, -250, 50, 50)
    ];
    bad = [
        new Bad(imgBad1, 730, -55, 57, 55),
        new Bad(imgBad1, 480, -110, 57, 55),
        new Bad(imgBad1, 250, -165, 57, 55),
        new Bad(imgBad1, 650, -220, 57, 55),
        new Bad(imgBad1, 100, -275, 57, 55)
    ];
}

function changeVal() {
    change = !change;
}

function showScore(context) {
    context.font = "15px Arial";
    context.fillStyle = "rgb(255, 13, 0)";
    context.fillText("Score = " + score, 740, 25);
}

function showTime(context) {
    context.font = "15px Arial";
    context.fillStyle = "rgb(255, 13, 0)";
    context.fillText("Time = " + minutes + ":" + seconds, 740, 50);
}

function move() {
    if (rightKeyPressed) {
        if (player.x + player.width + 5 <= width) {
            player.x += 5;
        }
    }
    if (leftKeyPressed) {
        if (player.x - 5 >= 0) {
            player.x -= 5;
        }
    }
}

function handleKeyDown(event) {
    if (event.code === 'ArrowRight') {
        rightKeyPressed = true;
    } else if (event.code === 'ArrowLeft') {
        leftKeyPressed = true;
    } else if (event.code === 'ArrowUp') {
        upKeyPressed = true;
    } else if (event.code === 'Space') {
        spacebarPressed = true;
    }
}

function handleKeyUp(event) {
    if (event.code === 'ArrowRight') {
        rightKeyPressed = false;
    } else if (event.code === 'ArrowLeft') {
        leftKeyPressed = false;
    } else if (event.code === 'ArrowUp') {
        upKeyPressed = false;
    } else if (event.code === 'Space') {
        spacebarPressed = false;
        changeVal();
    }
}

function jump() {
    player.velocity += player.gravity;
    player.y += player.velocity;
    
    if (player.y > 378) {
        player.velocity = 0;
        player.y = 378;
        if (upKeyPressed) {
            player.velocity += player.op;
        }
    }
}

function checkStatus() {
    if (life.lifes === 0) {
        gameSound.pause();
        gameSound.currentTime = 0;
        gameOverSound.play();
        screen = 2;
        draw();
    }
}

function speedUp() {
    for (let i = 0; i < good.length; i++) {
        good[i].y += speed;
        bad[i].y += speed;
    }
}

function checkCollisions() {
    for (let i = 0; i < good.length; i++) {
        if (good[i].y > height) {
            good[i].y = -50 + i*(-50);
            pickRandomGoodX(i);
        }
        if (bad[i].y > height) {
            bad[i].y = -55 + i*(-55);
            pickRandomBadX(i);
        }
    }

    for (let i = 0; i < good.length; i++) {
        if (good[i].y > player.y && good[i].y < player.y + player.height-30 && good[i].x + good[i].width/2 > player.x && good[i].x + good[i].width/2 < player.x + player.width) {
            good[i].y = -50 + i*(-50);
            pickRandomGoodX(i);
            score += 1;
            speed += 0.1;
            successSound.currentTime = 0;
            successSound.play();
        }
        if (bad[i].y > player.y && bad[i].y < player.y + player.height-30 && bad[i].x + bad[i].width/2 > player.x && bad[i].x + bad[i].width/2 < player.x + player.width) {
            bad[i].y = -55 + i*(-55);
            pickRandomBadX(i);
            life.lifes -= 1;
            errorSound.currentTime = 0;
            errorSound.play();
        }
    }
}
   

function pickRandomGoodX(i) {
    good[i].x = Math.floor(Math.random() * (width-good[i].width + 1));
}

function pickRandomBadX(i) {
    bad[i].x = Math.floor(Math.random() * (width-bad[i].width + 1));
}

function end() {
    score = 0;
    time = 0;
    seconds = 0;
    minutes = 0;
    speed = 2;
    life.lifes = 3;
    player.x = 367;
    player.y = 378;
    player.velocity = 0;
    player.gravity = 0.3;
    player.op = -10;
    for (let i = 0; i < good.length; i++) {
        good[i].y = -50 + i*(-50);
        bad[i].y = -55 + i*(-55);
    }
    change = false;
}
