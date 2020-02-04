import Grid from "./grid";
import { HexagoneType } from "./hexagone";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
  drawBackground("black");

  function drawBackground(color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  new Grid(ctx, { type: HexagoneType.POINTY }).draw();
}
