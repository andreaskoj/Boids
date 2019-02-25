//init canvas
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')

//global objects
birds = [];
obstacles = [];

class obstacle {
    
    constructor(x1,x2,y1,y2){
        this.x1 = x1;
        this.x2 = x2;
        
        this.y1 = y1;
        this.y2 = y2;
    }

}

class bird {
    
    constructor(mx,my,size,dx,dy) {
        
        // defining the shape on the triangle (360 / 45, one step is 8 deg )
        this.angleOneRad = 144 * Math.PI/180;//18*8
        this.angleTwoRad = 216 * Math.PI/180;//18*8 + 9*8
        
        // center point of the triangle
        this.mx = mx;
        this.my = my;
        
        //size of the triangle 
        this.size = size;
        
        //velocity of the triangle
        this.dx = dx;
        this.dy = dy;
    
        //angle  of the triangle 
        //this.deg = 45;
        
        //this.magnitude = Math.sqrt(Math.pow(this.dx,2) + //Math.pow(this.dy,2));

    }
    
    draw() {
        
        //atan2 > computes the angle based on the velocity vector
        //params 1st: y-axis, 2nd: x-axis 
        this.angle = (Math.atan2(this.dy,this.dx));        
        c.translate(this.mx,this.my);
        c.rotate(this.angle);
        c.beginPath(); 
        
        //start point
        c.moveTo (this.size * Math.cos(0), this.size * Math.sin(0));
        
        //first line
        c.lineTo(this.size * Math.cos(this.angleOneRad),
                 this.size * Math.sin(this.angleOneRad));
        
        //second line
        c.lineTo(this.size * Math.cos(this.angleTwoRad),
                 this.size * Math.sin(this.angleTwoRad));
        
        c.closePath();
        c.stroke();
        c.fill();
        
        c.rotate(-this.angle);
        c.translate(-this.mx ,-this.my); 
    }
  
    lookAround(){
        //check obstacles 
        obstacles.forEach(function(obstacle){
            if(this.mx);
        })
        
    }
    
    fly() {
        
        //updting postion
        this.mx = this.mx + this.dx ;
        this.my = this.my + this.dy; 
        // x
        if(this.mx + this.size > innerWidth || this.mx - this.size < 0) {
        this.dx = -this.dx;
        }
        //y 
        if(this.my + this.size > innerWidth || this.my - this.size < 0){
        this.dy = -this.dy;    
        }
        this.draw();       
    }

}


//create default obstacles - boundries of the canvas 
var wallN = new obstacle(0,innerWidth,0,0);
var wallE = new obstacle(innerWidth,innerWidth,0,innerHeight);
var wallS = new obstacle(0,innerWidth,innerHeight,innerHeight);
var wallW = new obstacle(0,0,0,innerHeight);
obstacles.push(wallN,wallE,wallS,wallW);

var pb1 = new bird(200,200,15,-1,1);
birds.push(pb1);
//var pb2 = new bird(222,230,20,1,1);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    
    birds.forEach(function(bird){
        bird.fly();
    })
    
}

animate();


//listeners
window.addEventListener('click', function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    //console.log(x);
    //console.log(y);
    
    var newBird = new bird(x,y,15,-1,1);
    birds.push(newBird);
    console.log(obstacles);
    
})