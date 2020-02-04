import Vector2 from "../libs/vector2";

export default class Hexagone {
  ctx;
  center = new Vector2();
  size = 100;
  color = "red";
  pointy = true;

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    size: number,
    color: string,
    pointy = true
  ) {
    this.ctx = ctx;
    this.center = position;
    this.size = size;
    this.color = color;
    this.pointy = pointy;
  }

  // y axis pointing down (angles increase clockwise)
  getPointyCorner(i: number) {
    const angle_deg = 60 * i - 30;
    const angle_rad = (Math.PI / 180) * angle_deg;
    return new Vector2(
      this.center.x + this.size * Math.cos(angle_rad),
      this.center.y + this.size * Math.sin(angle_rad)
    );
  }

  // y axis pointing down (angles increase clockwise)
  getFlatCorner(i: number) {
    const angle_deg = 60 * i;
    const angle_rad = (Math.PI / 180) * angle_deg;
    return new Vector2(
      this.center.x + this.size * Math.cos(angle_rad),
      this.center.y + this.size * Math.sin(angle_rad)
    );
  }

  draw() {
    const points = [];
    for (var j = 0; j <= 5; j++) {
      if (this.pointy) {
        points.push(this.getPointyCorner(j));
      } else {
        points.push(this.getFlatCorner(j));
      }
    }
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    for (var i = 0; i < points.length; i++) {
      this.ctx.fillRect(points[i].x, points[i].y, 1, 1);
      this.ctx.beginPath();
      this.ctx.moveTo(points[i].x, points[i].y);
      const nextPoint = points[i + 1] !== undefined ? points[i + 1] : points[0];
      this.ctx.lineTo(nextPoint.x, nextPoint.y);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
}
