var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width
let height = canvas.height

c = canvas.getContext('2d')

function random(max) {
    return Math.random() * max
}

function getRandomArbitrary(min,max) {
    return Math.random() * (max - min) + min;
}

function distance(x1,y1, x2, y2){
  let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return distance;
}

class Boid {
  constructor(x,y){
    if (x != null && y != null){
      this.position = new Vector(x,y)
    }
    else{
      this.position = new Vector(random(canvas.width), random(canvas.height))
    }

    this.velocity = new Vector()
    this.velocity.randomizeDirection()
    this.velocity.setMagnitude(getRandomArbitrary(2,5))

    this.acceleration = new Vector()

    this.maxForce = 0.2
    this.maxSpeed = 4

    this.angle = 0;
  }

  align(boids) {
    let perceptionRadius = 50;
    let steering = new Vector();
    let total = 0;

    for (let other of boids) {
      let d = distance(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }

    }
    if (total > 0) {
      steering.divide(total);
      steering.setMagnitude(this.maxSpeed)
      steering.substract(this.velocity)
      steering.limitMagnitude(this.maxForce)
    }
    return steering;

  }

  cohesion(boids) {
      let perceptionRadius = 50
      let steering = new Vector()
      let total = 0;

      for (let other of boids) {
        let d = distance(this.position.x, this.position.y, other.position.x, other.position.y)
        if (other != this && d < perceptionRadius) {
          steering.add(other.position)
          total++;
        }
      }
      if (total > 0) {
        steering.divide(total)
        steering.substract(this.position)
        steering.setMagnitude(this.maxSpeed)
        steering.substract(this.velocity)
        steering.limitMagnitude(this.maxForce)
      }
      return steering;
    }

  separation(boids) {
    let perceptionRadius = 30
    let steering = new Vector()
    let total = 0;
    for (let other of boids) {
      let d = distance(this.position.x, this.position.y, other.position.x, other.position.y)

      if (other != this && d < perceptionRadius) {
        let diff = new Vector(this.position.x - other.position.x,this.position.y - other.position.y);
        diff.divide(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.divide(total);
      steering.setMagnitude(this.maxSpeed);
      steering.substract(this.velocity);
      steering.limitMagnitude(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limitMagnitude(this.maxSpeed);
    this.acceleration.multiply(0);
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
    c.fillStyle = 'black'
    c.fill();
    c.stroke();
  }

  walls() {
    if (this.position.x > width) {
      this.position.x = 0;

    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;

    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  drawTriangle() {
      //atan2 > computes the angle based on the velocity vector
      let angleOneRad = 144 * Math.PI/180;//18*8
      let angleTwoRad = 216 * Math.PI/180;//18*8 + 9*8

      this.angle = Math.atan2(this.velocity.y, this.velocity.x);

      let size = 6

      c.translate(this.position.x, this.position.y);
      c.rotate(this.angle);
      c.beginPath();

      //start point of the object shape
      c.moveTo (size * Math.cos(0), size * Math.sin(0));

      //first line of the object shape
      c.lineTo(size * Math.cos(angleOneRad),
               size * Math.sin(angleOneRad));

      //second line of the object shape
      c.lineTo(size * Math.cos(angleTwoRad),
               size * Math.sin(angleTwoRad));

      c.closePath();
      c.stroke();
      c.fill();

      c.rotate(-this.angle);
      c.translate(-this.position.x, -this.position.y);
  }
}

const flock = [];

for (let i = 0; i < 100; i++) {
  flock.push(new Boid());
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (let boid of flock) {
        boid.walls()
        boid.flock(flock)
        boid.update()
        boid.drawTriangle()
    }
}

animate();

//listeners
window.addEventListener('click', function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    flock.push(new Boid(x,y));
})
