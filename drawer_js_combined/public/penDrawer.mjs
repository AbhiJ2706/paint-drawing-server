class penDrawer {

    constructor(canvas){
        this.c = canvas;
        this.currentCanvas = canvas.getContext("2d");
        this.currentCanvas.strokeStyle = "#000000"
        this.currentCanvas.fillStyle = "#FFFFFF"
        this.currentCanvas.lineCap = "round";
        this.currentCanvas.fillRect(0, 0, 800, 600)
        this.currentFillStyle = "#000000"
        this.currentCanvas.lineWidth = 36;
        this.x = 0;
        this.y = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.drawing = false;
        this.eraser = false;
        this.drawingMode = true;
        this.erasingMode = false;
        this.filling = false;
    }

    setDraw(e){
        if (this.drawingMode){
            var rect = this.c.getBoundingClientRect();
            this.drawing = true;
            this.eraser = false;
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        } else {
            this.drawing = false;
            this.eraser = true;
            var rect = this.c.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        }
    }

    setToDrawMode(){
        this.drawingMode = true;
        this.erasingMode = false;
        this.filling = false;
    }

    setToEraserMode(){
        this.drawingMode = false;
        this.erasingMode = true;
        this.filling = false;
    }

    setToFillingMode(){
        this.drawingMode = false;
        this.erasingMode = false;
        this.filling = true;
    }

    unSetDraw(){
        this.drawing = false;
        this.eraser = false;
    }

    setThickness(x){
        this.currentCanvas.lineWidth = x;
    }

    draw(e){
        var rect = this.c.getBoundingClientRect();
        this.x2 = e.clientX - rect.left; 
        this.y2 = e.clientY - rect.top;
        this.currentCanvas.strokeStyle = this.currentFillStyle;
        this.currentCanvas.beginPath();
        this.currentCanvas.moveTo(this.x, this.y);
        this.currentCanvas.lineTo(this.x2, this.y2);
        this.currentCanvas.stroke(); 
        this.x = this.x2;
        this.y = this.y2;
    }

    erase(e){
        var rect = this.c.getBoundingClientRect();
        this.x2 = e.clientX - rect.left; 
        this.y2 = e.clientY - rect.top;
        this.currentCanvas.strokeStyle = "#FFFFFF";
        this.currentCanvas.beginPath();
        this.currentCanvas.moveTo(this.x, this.y);
        this.currentCanvas.lineTo(this.x2, this.y2);
        this.currentCanvas.stroke(); 
        this.x = this.x2;
        this.y = this.y2;
    }

    receiveFillStyle(f){
        this.currentFillStyle = f;
    }
}