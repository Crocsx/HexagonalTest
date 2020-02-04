import Hexagone from "./hexagone";
import Vector2 from "../libs/vector2";

enum GridType {
  POINTY,
  FLAT
}
// https://www.redblobgames.com/grids/hexagons/#basics
export default class Grid {
  ctx: CanvasRenderingContext2D;
  private type = GridType.POINTY;
  // size of the grid in hexagone count, and drawing offset
  private width = 10;
  private height = 10;
  private offset = 50;

  // size of the hexagone from center to corner point
  private hexagoneSize = 15;

  //  width and height of hexagone cell
  private hexagoneWidth = 2 * this.hexagoneSize;
  private hexagoneHeight = Math.sqrt(3) * this.hexagoneSize;

  //  height beetween 2 hexagone center in a grid
  private hexagoneOffset = this.hexagoneWidth * 0.75;

  constructor(
    ctx: CanvasRenderingContext2D,
    width = 10,
    height = 10,
    offset = 50,
    type = GridType.POINTY
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.setType(type);
  }

  setType(type: GridType) {
    if (type === GridType.FLAT) {
      this.hexagoneWidth = 2 * this.hexagoneSize;
      this.hexagoneHeight = Math.sqrt(3) * this.hexagoneSize;
      this.hexagoneOffset = this.hexagoneWidth * 0.75;
    } else {
      this.hexagoneWidth = Math.sqrt(3) * this.hexagoneSize;
      this.hexagoneHeight = 2 * this.hexagoneSize;
      this.hexagoneOffset = this.hexagoneHeight * 0.75;
    }
  }

  private drawPointyGrid() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        const hex = new Hexagone(
          this.ctx,
          new Vector2(
            this.offset +
              this.hexagoneWidth * i +
              (j % 2) * (this.hexagoneWidth * 0.5),
            this.offset + this.hexagoneOffset * j
          ),
          this.hexagoneSize,
          "red"
        );
        hex.draw();
      }
    }
  }

  private drawFlatGrid() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        const hex = new Hexagone(
          this.ctx,
          new Vector2(
            this.offset + this.hexagoneWidth * i,
            this.offset +
              this.hexagoneHeight * j +
              (i % 2) * (this.hexagoneHeight * 0.5)
          ),
          this.hexagoneSize,
          "red",
          false
        );
        hex.draw();
      }
    }
  }

  draw() {
    if (this.type === GridType.POINTY) {
      this.drawPointyGrid();
    }
    if (this.type === GridType.FLAT) {
      this.drawFlatGrid();
    }
  }
}
