import PointyGrid from "./pointyGrid";
import FlatGrid from "./flatGrid";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
  drawBackground("black");

  function drawBackground(color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  new FlatGrid(ctx).draw();
}
