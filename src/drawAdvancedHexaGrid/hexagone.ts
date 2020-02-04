import Vector2 from "../libs/vector2";

export enum HexagoneType {
  POINTY,
  FLAT
}

export interface HexagoneOptions {
  center?: Vector2;
  size?: number;
  color?: string;
  type?: HexagoneType;
}

export default class Hexagone {
  ctx;
  center: Vector2;
  size: number;
  color: string;
  type: HexagoneType;

  constructor(ctx: CanvasRenderingContext2D, options?: HexagoneOptions) {
    this.ctx = ctx;
    this.center = options.center || new Vector2();
    this.size = options.size || 100;
    this.color = options.color || "red";
    this.type = options.type || HexagoneType.POINTY;
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
      if (this.type === HexagoneType.POINTY) {
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
