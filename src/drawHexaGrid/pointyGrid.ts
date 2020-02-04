import Hexagone from "./hexagone";
import Vector2 from "../libs/vector2";

// https://www.redblobgames.com/grids/hexagons/#basics
export default class PointyGrid {
  ctx: CanvasRenderingContext2D;
  // size of the grid in hexagone count, and drawing offset
  GRID_WIDTH = 10;
  GRID_HEIGHT = 10;
  GRID_OFFSET = 50;
  // size of the hexagone from center to corner point
  HEXAGONE_RADIUS = 15;

  //  width and height of hexagone cell
  HEXAGONE_WIDTH = Math.sqrt(3) * this.HEXAGONE_RADIUS;
  HEXAGONE_HEIGHT = 2 * this.HEXAGONE_RADIUS;

  //  height beetween 2 hexagone center in a grid
  HEXAGONE_HEIGHT_DISTANCE = this.HEXAGONE_HEIGHT * 0.75;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  draw() {
    for (var i = 0; i < this.GRID_WIDTH; i++) {
      for (var j = 0; j < this.GRID_HEIGHT; j++) {
        const hex = new Hexagone(
          this.ctx,
          new Vector2(
            this.GRID_OFFSET +
              this.HEXAGONE_WIDTH * i +
              (j % 2) * (this.HEXAGONE_WIDTH * 0.5),
            this.GRID_OFFSET + this.HEXAGONE_HEIGHT_DISTANCE * j
          ),
          this.HEXAGONE_RADIUS,
          "red"
        );
        hex.draw();
      }
    }
  }
}
