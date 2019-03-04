//init canvas
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')

const fullRadians = 6.28319;
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

class line{
    //type defines if the line is parallel to x or y axis
    constructor(a,b,c,name) {
        this.name = name;
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

//namin functions - temporary solution
var w = new line(1, 0, 0, "x");
var n = new line(0, 1, 0, "y");
var e = new line(innerWidth,0,0,"x");

obstacles.push(w);
obstacles.push(n);
obstacles.push(e);

class bird {
    
    constructor(mx,my,size,v,leader) {
        
        //velocity
        this.v = v;
        
        this.counter = 50;
        
        this.isLeader = leader;
        
        //cordinates of the target 
        this.targetX = 0;
        this.targetY = 0;
        
        
        //current angle
        this.angle;
        
        // defining the shape of the triangle (360 / 45, one step is 8 deg )
        this.angleOneRad = 144 * Math.PI/180;//18*8
        this.angleTwoRad = 216 * Math.PI/180;//18*8 + 9*8
        
        // center point of the triangle
        this.mx = mx;
        this.my = my;
        
        //size of the triangle 
        this.size = size;
        
        //init random direction of a new trangle
        let randomAngle = Math.random() * fullRadians;
        
        this.dx = this.v * Math.cos(randomAngle);
        this.dy = this.v * Math.sin(randomAngle);
        
    }
    
    assignLeadership() {
        
    }
    
    draw() {
        
        //atan2 > computes the angle based on the velocity vector
        //params 1st: y-axis, 2nd: x-axis 
        //console.log(this.angle);
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
  
 // if the distance is smaller than 150 then follow 
    
    changeDirection() {
        
    }
    
    lookAround(){        
        //let distance;
        let distanceToBird;
        
         //check the distance to other birds
        for (let i=0; i<birds.length; i ++){
            let mx = this.mx;
            let my = this.my;
            
            distanceToBird = Math.sqrt(Math.pow(birds[i].mx-mx,2) + Math.pow(birds[i].my-my,2));
            distanceToBird=Math.abs(distanceToBird);
            //console.log(distanceToBird);
            
            //console.log(this.targetX);
            if(distanceToBird > 0 && distanceToBird <= 150 && this.targetX == 0 && this.targetY == 0 && birds[i].isLeader == true  ) {
               console.log("printed"); 
               this.targetX = birds[i].mx;
               this.targetY = birds[i].my;    
                
            }
                
        }
        
//        for(let i=0; i<obstacles.length; i++){
//            
//            //compute distance to every obstacle if it's close do next
//            distance = (this.mx * obstacles[i].a + this.my*obstacles[i].b +
//                        obstacles[i].c)/(Math.sqrt(Math.pow(obstacles[i].a,2)+
//                        Math.pow(obstacles[i].b,2)));
//            console.log("Distance: " +distance+ "  name: " +obstacles[i].name );
//          
//        }

    }
    
    fly() {
        
        
        if(this.targetX > 0 && this.targetY > 0 ){
            //start following change direction 
            let newX;
            let newY;
            newX = (this.targetX - this.mx)%1;
            newY = (this.targetY - this.my)%1;
            
            //this.dx = this.v * Math.cos(newX);
            //this.dy = this.v * Math.sin(newY);
            console.log(newX + "  " + newY);
            
        }
        
        
        //change randomly direction after (counter) steps
        this.counter = this.counter - 1;
        //console.log(this.counter);
        if(this.counter == 0) {
            //console.log(this.counter);
            let randomAngle = Math.random() - 1;
            
            //this.dx = (this.dx + randomAngle)%1;
            //this.dy = (this.dy + randomAngle)%1;
           // console.log(this.dx + "   "+ this.dy);
            this.counter = 100;    
        }
        
        // acceleration 
        this.mx = this.mx + this.dx;
        this.my = this.my + this.dy; 
        
        // change direction if the wall is approched 
        if(this.mx + this.size > innerWidth || this.mx - this.size < 0) {
        this.dx = -this.dx;
        }
        //y 
        if(this.my + this.size > innerWidth || this.my - this.size < 0){
        this.dy = -this.dy;    
        }
        
        this.lookAround();
        this.draw();       
    }

}

//create default obstacles - boundries of the canvas 
//var wallN = new obstacle(0,innerWidth,0,0);
//var wallE = new obstacle(innerWidth,innerWidth,0,innerHeight);
//var wallS = new obstacle(0,innerWidth,innerHeight,innerHeight);
//var wallW = new obstacle(0,0,0,innerHeight);
//obstacles.push(wallN,wallE,wallS,wallW);

var pb1 = new bird(200,200,15,1,true);
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
    
    var newBird = new bird(x,y,15,1,false);
    birds.push(newBird);
    //console.log(obstacles);
    
})