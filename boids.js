//init canvas
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')

const fullRadians = 6.28319;
//global objects
birds = [];

class bird {
    
    constructor(mx,my,size,v,leader) {
        
        //velocity
        this.v = v;
        
        this.counter = 100;
        this.randomAngle=0;
                
        //cordinates of the target 
        this.targetX = 0;
        this.targetY = 0;
        
        // defining the shape of the triangle (360 / 45, one step is 8 deg )
        this.angleOneRad = 144 * Math.PI/180;//18*8
        this.angleTwoRad = 216 * Math.PI/180;//18*8 + 9*8
        
        // center point of the triangle
        this.mx = mx;
        this.my = my;
        
        //size of the triangle 
        this.size = size;
        
        //init random direction of a new trangle
        this.angle = Math.random() * fullRadians;
        
        //console.log("ANGLE " + randomAngle);
        this.dx = this.v * Math.cos(this.angle);
        this.dy = this.v * Math.sin(this.angle);
    }
    
    
    draw() {
        //drawing bird object on the canvas
        //atan2 > computes the angle based on the velocity vector
        //params 1st: y-axis, 2nd: x-axis 
        this.angle = (Math.atan2(this.dy,this.dx));    
        
        c.translate(this.mx,this.my);
        c.rotate(this.angle);
        c.beginPath(); 
        
        //start point of the object shape 
        c.moveTo (this.size * Math.cos(0), this.size * Math.sin(0));
        
        //first line of the object shape 
        c.lineTo(this.size * Math.cos(this.angleOneRad),
                 this.size * Math.sin(this.angleOneRad));
        
        //second line of the object shape
        c.lineTo(this.size * Math.cos(this.angleTwoRad),
                 this.size * Math.sin(this.angleTwoRad));
        
        c.closePath();
        c.stroke();
        c.fill();
        
        c.rotate(-this.angle);
        c.translate(-this.mx ,-this.my); 
    }
        
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
        
        
        this.calculateDistanceBetweenBirds();
        
        this.draw();       
    }
    
    // idea - when a bird spot another bird init flock and assign 
    initFlock(){
        
    }
    
    flockCohesion() {
        
        
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
               
                console.log("Closer than 100px" + distanceToBird)

            } 
        }   
    }
    
}

var pb1 = new bird(200,200,15,2,true);
birds.push(pb1);

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
    
    var newBird = new bird(x,y,15,2,false);
    birds.push(newBird);    
})

//helpers functions 

//get random number in range
function getRandomArbitrary(min,max) {
    return Math.random() * (max - min) + min;
}