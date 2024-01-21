class Life {

    constructor(initial) {
        this.initial = initial;
        this.lifes = this.initial;

        this.width = 30;
        this.height = 30;
        this.startX = 16;
        this.startY = 16;
    }

    show(context) {
        for (let i = 0; i < this.lifes; i++) {
            const margin = i * 24;
            const posX = (this.startX * (i+1)) + margin;
            context.drawImage(imgHeart, posX, 16, this.width, this.height);
        }
    }
}