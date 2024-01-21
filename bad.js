class Bad {

    constructor (image, posX, posY, width, height) {
        this.image = image;
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
    }


    show(context) {
        if (change === false) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(imgBad2, this.x, this.y, this.width, this.height);
        }
    }

}