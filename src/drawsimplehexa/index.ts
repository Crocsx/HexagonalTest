import Vector2 from "../libs/vector2";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
draw_background("black");
draw_hexagone("red", 100);

function pointy_hex_corner(center, size, i) {
  const angle_deg = 60 * i - 30; // 30 is pointy top, 0 is flat top
  const angle_rad = (Math.PI / 180) * angle_deg;
  return new Vector2(
    center.x + size * Math.cos(angle_rad),
    center.y + size * Math.sin(angle_rad)
  );
}

function draw_hexagone(color, size) {
  ctx.strokeStyle = color;
  const center = new Vector2(canvas.width / 2, canvas.height / 2);
  const points = [];
  for (var j = 0; j <= 5; j++) {
    points.push(pointy_hex_corner(center, size, j));
  }
  for (var i = 0; i < points.length; i++) {
    ctx.fillRect(points[i].x, points[i].y, 1, 1);
    ctx.beginPath();
    ctx.moveTo(points[i].x, points[i].y);
    const nextPoint = points[i + 1] !== undefined ? points[i + 1] : points[0];
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
  }
}

function draw_background(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
