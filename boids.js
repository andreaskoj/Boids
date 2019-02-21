var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')

//Global variables

var entities = [];

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5 ) *20;
var dy = (Math.random() - 0.5 ) *20;
var radious = 30;

class PowerBird {
    
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
        this.deg = 45;
        
        
        this.magnitude = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
        //console.log(this.magnitude);
        
        this.an= (Math.atan(-20));
    
        console.log(this.an);

    }
    
    draw() {
        var radians=this.an
        
        c.translate(this.mx,this.my);
        c.rotate(radians);
       
        c.beginPath();        
        //start the line
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
        
        c.rotate(-radians);
        c.translate(-this.mx ,-this.my); 
    }
    
    update() {
        
//        console.log("tx" +this.vtx);
//        console.log("ty" +this.vty);
//        
//        console.log("rx" +this.vrx);
//        console.log("ry" +this.vry);
//        
//        console.log("lx" +this.vlx);
//        console.log("ly" +this.vry);
//        console.log(" ");
        
        this.mx = this.mx + this.dx ;
        this.my = this.my + this.dy; 
                
        //this.deg = this.deg ;
        this.draw();
        
        // next step implement canvas boundries 
        
    }

}

var pb1 = new PowerBird(200,200,30,2,2);
pb1.update();

function Circle(x,y,dx,dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, 30, 0, Math.PI*2, false);
        c.stroke();  
        c.fill();
    }
    
    this.update =function() {
        if(this.x + radious > innerWidth || this.x - radious < 0){
        this.dx = -this.dx;     
    }
    
    if(this.y + radious > innerHeight || this.y - radious < 0){
        this.dy = -this.dy;     
    }
    
        this.x+=this.dx;
        this.y+=this.dy;
        
        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    c.clearRect(0,0,innerWidth,innerHeight);
    
    pb1.update();
    
}

//animate();


//entities.push(new Circle(200,200, 10, 10));
//entities.push(new Circle(00,200, 10, 10));


//function animate() {
//    requestAnimationFrame(animate);
//    
//    c.clearRect(0,0,innerWidth,innerHeight);
//    
//    //b1.update();
////    
////    entities.forEach(function(element){
////        element.update();    
////    });
////    
//    
//}

//animate();

window.addEventListener('click', function(event) {
    
    //entities.push(new Circle(event.x,event.y, 10, 10));

    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
console.log(x);
console.log(y);
    
})