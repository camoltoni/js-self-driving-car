const CAR_Y_PERCENT = 0.4
const canvas = document.getElementById("myCanvas")
canvas.width = 200

const ctx = canvas.getContext("2d")
const road = new Road(canvas.width / 2.0, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const traffic = [
  new Car(road.getLaneCenter(1),-100, 30, 50, "DUMMY", 2.0)
]
let req

document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    if (keyName === "Escape") {
      cancelAnimationFrame(req)
    }
  },
  false,
);

animate();

function animate() {
  traffic.forEach(c=>{c.update(road.borders, [])})
  car.update(road.borders, traffic )
  
  canvas.height = window.innerHeight

  ctx.save()
  ctx.translate(0, -car.y + canvas.height * CAR_Y_PERCENT)
  
  road.draw(ctx)

  traffic.forEach(c=>{c.draw(ctx, "red")})
  car.draw(ctx, "blue")
  ctx.restore()
  req = requestAnimationFrame(animate)
}