import Tool from "./Tool";

export default class Circle extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "circle",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx.fillStyle,
        },
      })
    );
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let curretnX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = curretnX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x, y, w, h) {
    let rad = Math.sqrt(w * w + h * h);
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, rad, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx, x, y, w, h, color) {
    ctx.beginPath();
    let rad = Math.sqrt(w * w + h * h);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
