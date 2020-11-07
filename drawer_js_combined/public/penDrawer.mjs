class penDrawer {

    constructor(canvas){
        this.c = canvas;
        this.currentCanvas = canvas.getContext("2d");
        this.currentCanvas.fillStyle = "#FFFFFF"
        this.currentCanvas.lineCap = "round";
        this.currentCanvas.fillRect(0, 0, 800, 600)
        this.x = 0;
        this.y = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.drawing = false;
    }

    setDraw(e){
        var rect = this.c.getBoundingClientRect();
        this.drawing = true;
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    }

    unSetDraw(){
        this.drawing = false;
    }

    setThickness(x){
        this.currentCanvas.strokeWidth = x;
    }

    draw(e){
        if (this.drawing){
            var rect = this.c.getBoundingClientRect();
            this.x2 = e.clientX - rect.left; 
            this.y2 = e.clientY - rect.top;
            this.currentCanvas.beginPath();
            this.currentCanvas.moveTo(this.x, this.y);
            this.currentCanvas.lineTo(this.x2, this.y2);
            this.currentCanvas.stroke(); 
            this.x = this.x2;
            this.y = this.y2;
        }
    }

    receiveFillStyle(f){
        this.currentCanvas.strokeStyle = f;
    }
}