preload();

function loadImage(path) {
    let img = new Image();
    img.src = path;
    return img;
}

function loadSound(path) {
    let audio = new Audio(path);
    return audio;
}

function preload() {
    imgBackground1 = loadImage("assets/images/space.jpg");
    imgBackground2 = loadImage("assets/images/winter.jpg");
    imgMain1 = loadImage("assets/images/astronaut.png");
    imgMain2 = loadImage("assets/images/schneemann.png");
    imgGood1 = loadImage("assets/images/stern.png");
    imgGood2 = loadImage("assets/images/schneeball.png");
    imgBad1 = loadImage("assets/images/meteorit.png");
    imgBad2 = loadImage("assets/images/stein.png");
    imgHeart = loadImage("assets/images/herz.png");
    gameSound = loadSound("assets/audio/gamesound.mp3");
    errorSound = loadSound("assets/audio/error.mp3");
    gameOverSound = loadSound("assets/audio/gameover.mp3");
    successSound = loadSound("assets/audio/success.mp3");
}