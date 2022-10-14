const colors = ["#F294C8", "#B1BF49", "#F2BC57", "#F27D16", "#D95407"];
var circleArray = [];
var canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const circleCount = 900;
const minRadius = 2;
const maxRadius = 50;

const mouseAxis = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", (e) => {
  mouseAxis.x = e.x;
  mouseAxis.y = e.y;
});

window.addEventListener("resize", (e) => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

function Circle(x, y, r, color, sx, sy, maxRadius) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.minRadius = r;
  this.maxRadius = maxRadius;
  this.color = color;
  this.speedX = sx;
  this.speedY = sy;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
    if (mouseAxis.x || mouseAxis.y) {
      if (
        this.radius < this.maxRadius &&
        this.x < mouseAxis.x + 50 &&
        this.x > mouseAxis.x - 50 &&
        this.y < mouseAxis.y + 50 &&
        this.y > mouseAxis.y - 50
      ) {
        this.radius += 1;
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
    }
    this.draw();
  };
}

function init() {
  circleArray = [];
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  for (let index = 0; index < circleCount; index++) {
    let r = Math.random() * 5 + minRadius;
    let x = Math.random() * (innerWidth - 2 * r) + r;
    let y = Math.random() * (innerHeight - 2 * r) + r;
    let color = colors[getRandomColor()];
    let sx = (Math.random() - 0.5) * 2;
    let sy = (Math.random() - 0.5) * 2;
    let circle = new Circle(x, y, r, color, sx, sy, maxRadius);
    circleArray.push(circle);
  }
  animation();
}
function getRandomColor() {
  return Math.trunc(Math.random() * (colors.length - 1));
}

function animation() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circleArray.forEach((circle) => {
    circle.update();
  });
  requestAnimationFrame(animation);
}
init();
