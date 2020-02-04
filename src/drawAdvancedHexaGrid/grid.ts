import Vector2 from "../libs/vector2";
import Hexagone, { HexagoneType } from "./hexagone";

export interface GridOptions {
  width?: number;
  height?: number;
  offset?: number;
  hexagoneSize?: number;
  type?: HexagoneType;
}

// https://www.redblobgames.com/grids/hexagons/#basics
export default class Grid {
  ctx: CanvasRenderingContext2D;
  private type: HexagoneType;
  private width: number;
  private height: number;
  private offset: number;
  private hexagoneSize: number;
  private hexagoneWidth: number;
  private hexagoneHeight: number;
  private hexagoneOffset: number;

  constructor(ctx: CanvasRenderingContext2D, options?: GridOptions) {
    this.ctx = ctx;
    this.width = options.width || 10;
    this.height = options.height || 10;
    this.offset = options.offset || 50;
    this.type = options.type || HexagoneType.POINTY;
    this.hexagoneSize = this.hexagoneSize || 15;
    this.setType(this.type);
  }

  setType(type: HexagoneType) {
    if (type === HexagoneType.FLAT) {
      //  width and height of hexagone cell
      this.hexagoneWidth = 2 * this.hexagoneSize;
      this.hexagoneHeight = Math.sqrt(3) * this.hexagoneSize;
      //  distance beetween 2 hexagon center when drawing
      this.hexagoneOffset = this.hexagoneWidth * 0.75;
    } else {
      //  width and height of hexagone cell
      this.hexagoneWidth = Math.sqrt(3) * this.hexagoneSize;
      this.hexagoneHeight = 2 * this.hexagoneSize;
      //  distance beetween 2 hexagon center when drawing
      this.hexagoneOffset = this.hexagoneHeight * 0.75;
    }
  }

  private drawPointyGrid() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        const hex = new Hexagone(this.ctx, {
          center: new Vector2(
            this.offset +
              this.hexagoneWidth * i +
              (j % 2) * (this.hexagoneWidth * 0.5),
            this.offset + this.hexagoneOffset * j
          ),
          size: this.hexagoneSize,
          color: "red"
        });
        hex.draw();
      }
    }
  }

  private drawFlatGrid() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        const hex = new Hexagone(this.ctx, {
          center: new Vector2(
            this.offset + this.hexagoneOffset * i,
            this.offset +
              this.hexagoneHeight * j +
              (i % 2) * (this.hexagoneHeight * 0.5)
          ),
          size: this.hexagoneSize,
          color: "red",
          type: HexagoneType.FLAT
        });
        hex.draw();
      }
    }
  }

  draw() {
    if (this.type === HexagoneType.POINTY) {
      this.drawPointyGrid();
    }
    if (this.type === HexagoneType.FLAT) {
      this.drawFlatGrid();
    }
  }
}
