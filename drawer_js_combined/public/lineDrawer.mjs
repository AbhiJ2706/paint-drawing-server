class lineDrawer {

    constructor(utilityCanvas, finalCanvas, lSlider, uSlider){
        this.currentCanvas = utilityCanvas.getContext("2d");
        this.finalCanvas = finalCanvas.getContext("2d");

        this.uCanvas = utilityCanvas.getContext("2d");
        this.fCanvas = finalCanvas.getContext("2d");

        this.finalCanvas.fillStyle = "#FFFFFF"
        this.finalCanvas.fillRect(0, 0, 800, 600)

        this.leftToRightSlider = lSlider;
        this.upAndDownSlider = uSlider;
        this.lineMode = false;
        this.currentLine = "";
        this.lineMetrics = [];

        this.parallelTo = false;
        this.perpendicularTo = false;
    }

    changeToLine(){
        this.currentCanvas = this.uCanvas;
        this.lineMode = true;
        console.log("damn boi he thicc", typeof this.currentCanvas);
    }

    setParallel(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.varReset();
            this.parallelTo = true;
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.calculateParallelY();
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setPerpendicular(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.varReset();
            this.perpendicularTo = true;
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.calculatePerpendicularY();
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameStart_StartX(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.x = this.lineMetrics[this.lineMetrics.length - 1][0];
            this.setSliders(this.currentLine.x, this.currentLine.y);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameStart_StartY(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.y = this.lineMetrics[this.lineMetrics.length - 1][1];
            this.setSliders(this.currentLine.x, this.currentLine.y);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameStart_EndX(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.x = this.lineMetrics[this.lineMetrics.length - 1][2];
            this.setSliders(this.currentLine.x, this.currentLine.y);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameStart_EndY(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.y = this.lineMetrics[this.lineMetrics.length - 1][3];
            this.setSliders(this.currentLine.x, this.currentLine.y);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameEnd_StartX(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.x2 = this.lineMetrics[this.lineMetrics.length - 1][0];
            this.setSliders(this.currentLine.x2, this.currentLine.y2);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameEnd_StartY(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.y2 = this.lineMetrics[this.lineMetrics.length - 1][1];
            this.setSliders(this.currentLine.x2, this.currentLine.y2);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameEnd_EndX(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.x2 = this.lineMetrics[this.lineMetrics.length - 1][2];
            this.setSliders(this.currentLine.x2, this.currentLine.y2);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setSameEnd_EndY(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.y2 = this.lineMetrics[this.lineMetrics.length - 1][3];
            this.setSliders(this.currentLine.x2, this.currentLine.y2);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setStart_Midpoint(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.x = this.lineMetrics[this.lineMetrics.length - 1][5];
            this.currentLine.y = this.lineMetrics[this.lineMetrics.length - 1][6];
            this.setSliders(this.currentLine.x, this.currentLine.y);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    setEnd_Midpoint(){
        if (this.currentLine != "" && this.lineMetrics.length > 0){
            this.currentLine.x2 = this.lineMetrics[this.lineMetrics.length - 1][5];
            this.currentLine.y2 = this.lineMetrics[this.lineMetrics.length - 1][6];
            this.setSliders(this.currentLine.x2, this.currentLine.y2);
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.draw(this.currentCanvas);
        }
    }

    chooseLineInitialPoint(e){
        console.log("clicky do?");
        var rect = utility.getBoundingClientRect();
        console.log(this.lineMode);
        if (this.lineMode && this.currentLine == ""){
            this.currentLine = new line(e.clientX - rect.left, e.clientY - rect.top);
            this.lineMode = false;
            this.setSliders(e.clientX - rect.left, e.clientY - rect.top);
            console.log(e.clientX - rect.left, e.clientY - rect.top, this.leftToRightSlider.value, this.upAndDownSlider.value)
            
        }
    }

    setSliders(newX, newY){
        this.upAndDownSlider.value = 600 - newY;
        this.leftToRightSlider.value = newX;
    }

    updateUpAndDownSlider(){
        if (!this.parallelTo && !this.perpendicularTo) {
            this.currentCanvas.clearRect(0, 0, 800, 600);
            this.currentLine.y2 = 600 - this.upAndDownSlider.value;
            this.currentLine.draw(this.currentCanvas);
        }
    }

    updateLeftAndRightSlider(){ 
        this.currentCanvas.clearRect(0, 0, 800, 600);
        this.currentLine.x2 = this.leftToRightSlider.value;
        if (this.parallelTo){
            this.calculateParallelY();
        } else if (this.perpendicularTo){
            this.calculatePerpendicularY();
        }
        this.currentLine.draw(this.currentCanvas);
    }

    finish(){
        this.currentCanvas.clearRect(0, 0, 800, 600);
        this.currentCanvas = this.fCanvas;
        this.currentLine.draw(this.currentCanvas);
        this.lineMetrics.push(this.currentLine.getMetrics());
        console.log(this.lineMetrics);
        this.currentLine = "";
    }

    varReset(){
        this.lineMode = false;
        this.parallelTo = false;
        this.perpendicularTo = false;
    }

    getCurrentMetrics(){
        return this.currentLine.getMetrics();
    }

    receiveFillStyle(style){
        this.finalCanvas.strokeStyle = style
    }

    calculateParallelY(){
        this.currentLine.y2 = this.lineMetrics[this.lineMetrics.length - 1][4]*(this.currentLine.x2-this.currentLine.x) + this.currentLine.y
    }

    calculatePerpendicularY(){
        this.currentLine.y2 = (-1/this.lineMetrics[this.lineMetrics.length - 1][4])*(this.currentLine.x2-this.currentLine.x) + this.currentLine.y
    }

    setThickness(x){
        this.currentCanvas.strokeWidth = x;
        this.finalCanvas.strokeWidth = x;
    }

    getAllPoints(){
        var arr = []
        for (var i = 0; i < this.lineMetrics.length; i++){
            arr.push([this.lineMetrics[i][0],this.lineMetrics[i][1]])
        }
        return arr
    }

    displayAllPoints(){
        var a = this.getAllPoints();
        for (var i = 0; i < a.length; i++){
            this.currentCanvas.beginPath();
            this.currentCanvas.arc(a[i][0], a[i][1], 25, 0, 2 * Math.PI);
            this.currentCanvas.stroke(); 
        }
    }

}

class line {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.x2 = x;
        this.y2 = y;
    }

    draw(c){
        //c.strokeStyle = "#000000";
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x2, this.y2);
        c.stroke(); 
        console.log(this.x, this.y, this.x2, this.y2)
    }

    getMetrics(){
        return [this.x, this.y, this.x2, this.y2, (this.y2 - this.y)/(this.x2 - this.x), (parseInt(this.x2) + this.x)/2, (this.y2 + this.y)/2, Math.atan(Math.abs(this.y2 - this.y) / Math.abs(parseInt(this.x2) - this.x))];
    }
}