class Player {

    constructor (image, posX, posY, width, height) {
        this.image = image;
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.velocity = 0;
        this.gravity = 0.3;
        this.op = -10;
    }


    show(context) {
        if (change === false) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(imgMain2, this.x-10, this.y, 90, 122);
        }
    }

}