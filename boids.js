//init canvas
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')
// c.save();
// c.translate(canvas.width /2 , canvas.height /2);

const fullRadians = 6.28319;
//global objects
birds = [];


class bird {

    constructor(mx,my,size,v) {

        //velocity
        this.v = v;

        // this.counter = 100;
        // this.randomAngle=0;

        // //cordinates of the target
        // this.targetX = 0;
        // this.targetY = 0;

        // defining the shape of the triangle (360 / 45, one step is 8 deg )
        // this.angleOneRad = 144 * Math.PI/180;//18*8
        // this.angleTwoRad = 216 * Math.PI/180;//18*8 + 9*8

        // center point of the triangle
        this.mx = mx;
        this.my = my;

        //size of the triangle
        // this.size = size;

        //init random direction of a new tranglefi
        this.angle = Math.random() * fullRadians;

        this.dx = this.v * Math.cos(this.angle);
        this.dy = this.v * Math.sin(this.angle);
    }

    draw() {
      c.beginPath();
      c.arc(this.mx, this.my, 10, 0, 2 * Math.PI, true);
      c.stroke();
    }


    // draw() {
    //     //drawing bird object on the canvas
    //     //atan2 > computes the angle based on the velocity vector
    //     //params 1st: y-axis, 2nd: x-axis
    //     this.angle = (Math.atan2(this.dy,this.dx));
    //
    //     c.translate(this.mx,this.my);
    //     c.rotate(this.angle);
    //     c.beginPath();
    //
    //     //start point of the object shape
    //     c.moveTo (this.size * Math.cos(0), this.size * Math.sin(0));
    //
    //     //first line of the object shape
    //     c.lineTo(this.size * Math.cos(this.angleOneRad),
    //              this.size * Math.sin(this.angleOneRad));
    //
    //     //second line of the object shape
    //     c.lineTo(this.size * Math.cos(this.angleTwoRad),
    //              this.size * Math.sin(this.angleTwoRad));
    //
    //     c.closePath();
    //     c.stroke();
    //     c.fill();
    //
    //     c.rotate(-this.angle);
    //     c.translate(-this.mx ,-this.my);
    // }

    // TODO: fix chaning position after changing side
    fly() {

        // updating movement
        this.mx = this.mx + this.dx;
        this.my = this.my + this.dy;

        // X axis (hit right wall)
        if(this.mx > innerWidth ){
        // +1 to avoid stucking on the bottom wall (falling into next codition)
            this.mx = - this.size + 1;
        }

        // X axis (hit left wall)
        if(this.mx <= -this.size){
            this.mx = innerWidth;
        }

        // Y axis (hit bottom wall)
        if(this.my  > innerHeight) {

            this.my = -this.size + 1;
            //this.mx = -this.mx;
        }

        // Y axis (hit top wall)
        if(this.my  <= -this.size) {
            this.my = innerHeight;
        }


        //this.calculateDistanceBetweenBirds();

        this.draw();
    }


    //responsible for random trajectory
    randomTrajectory(){

        if(this.counter == 0){
            this.randomAngle = getRandomArbitrary(-0.03,0.03);
            this.counter = 50;
        }

        let tempAngle = (Math.atan2(this.dy,this.dx));

        this.dx =this.v * Math.cos(tempAngle + this.randomAngle);
        this.dy= this.v * Math.sin(tempAngle + this.randomAngle);

        this.counter= this.counter -1;
    }

    //calculating distance between objects
    calculateDistanceBetweenBirds(){

        let distanceToBird;

         //check the distance to other birds
        for (let i=0; i<birds.length; i ++){
            let mx = this.mx;
            let my = this.my;

            distanceToBird = Math.sqrt(Math.pow(birds[i].mx-mx,2) + Math.pow(birds[i].my-my,2));
            distanceToBird=Math.abs(distanceToBird);
            //console.log(distanceToBird);

            //if the distance to another bird is less than 100
            if(distanceToBird > 0 && distanceToBird <= 100) {

//                console.log("Closer than 100px" + distanceToBird)
            }
        }
    }
}

function distanceBetweenBirds(b1, b2){
  let distance = Math.sqrt(Math.pow(b2.mx - b1.mx ,2) + Math.pow(b2.my - b1.my, 2));
  return distance;
}

var pb1 = new bird(300,300,10,1);
birds.push(pb1);

var pb2 = new bird(200,200,15,2);
birds.push(pb2);

 var pb3 = new bird(100,400,15,3);
 birds.push(pb3);


// Rule 1: fly towards the centre of the mass of neighbours
function rule1(thisBird) {

  if(birds.length == 1) return ([0,0])


  let x_center = 0;
  let y_center = 0;

   birds.forEach((bird, i) => {
     if(thisBird.mx != bird.mx || thisBird.my != bird.my || thisBird.v != bird.v) {
       x_center = x_center + bird.mx;
       y_center = y_center + bird.my;
       // console.log(y_center);
     }
   });
  // console.log(x_center);
   x_center = x_center / (birds.length - 1);
   // console.log(x_center);
   y_center = y_center / (birds.length - 1);

  let x_move = (x_center - thisBird.mx) / 100000;
  let y_move = (y_center - thisBird.my) / 100000;

   return ([x_move,y_move]);
}

// Rule 2: keep distance between objects
function rule2(thisBird) {

  let x_move = 0;
  let y_move = 0;

  birds.forEach((bird, i) => {
    if(thisBird.mx != bird.mx || thisBird.my != bird.my || thisBird.v != bird.v) {
      if(distanceBetweenBirds(thisBird, bird) < 100) {
        x_move = x_move - (bird.mx - thisBird.mx);
        y_move = y_move - (bird.my - thisBird.my);

      }
    }
  });
 return ([x_move / 10000, y_move / 10000]);
}

// Rule 3: matching velocity with neighbours
function rule3(thisBird) {

  let x_move = 0;
  let y_move = 0;
  //console.log(birds.length);
  birds.forEach((bird, i) => {
    if(thisBird.mx != bird.mx || thisBird.my != bird.my || thisBird.v != bird.v) {
      x_move = x_move + bird.dx;
      y_move = y_move + bird.dy;
      console.log(y_move);
    }
    else console.log('d');
  });

  x_move = x_move / birds.length - 1;
  y_move = y_move / birds.length - 1;

  return ([(x_move- thisBird.dx)  / 8, (y_move- thisBird.dy)  / 8]);
}

function animate() {
    //requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    //var pb4 = new bird(180,180,10,5,true);

    birds.forEach(function(bird){

        let v1 = rule1(bird);
        let v2 = rule2(bird);
        let v3 = rule3(bird);
        // console.log('x');

        // // // console.log(v1);
        bird.dx = (bird.dx + v1[0] + v2[0] + v3[0]);
        bird.dy = (bird.dy + v1[1] + v2[1] + v3[1]);
        // bird.dx = (bird.dx  + v1[0] + v2[0]);
        // bird.dy = (bird.dy  + v1[1] + v2[1]);
        // bird.dx = (bird.dx  + v1[0]);
        // bird.dy = (bird.dy  + v1[1]);
        // console.log(bird.dx);
        // console.log(bird.dy);

        bird.mx =  bird.mx + bird.dx;
        bird.my =  bird.my + bird.dy;

        bird.draw();
    })
}

animate();

//listeners
window.addEventListener('click', function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    var newBird = new bird(x,y,10,1);
    birds.push(newBird);
})

//helpers functions

//get random number in range
function getRandomArbitrary(min,max) {
    return Math.random() * (max - min) + min;
}
