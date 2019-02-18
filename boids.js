var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')

//Global variables

var entities = [];



//c.beginPath();
//c.moveTo(300,300);
//c.lineTo(285,250);
//c.lineTo(270,300);
//c.closePath();
//c.fill();
//




var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5 ) *20;
var dy = (Math.random() - 0.5 ) *20;
var radious = 30;

class Bird {
            
    constructor(pos_x, pos_y, dx, dy) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        
        this.dx = dx;
        this.dy = dy;

        this.vertexLeftX = pos_x
        this.vertexLeftY = pos_y
        
        this.vertexTopX = this.vertexLeftX + -20;
        this.vertexTopY = this.vertexLeftY + -60;
        
        this.vertexRightX = this.vertexTopX + -20;
        this.vertexRightY = this.vertexTopY + 60;
        //console.log(this.vertexTopX);
    }
    
    draw() {
        //console.log(this.vertexLeftX);
        c.beginPath();
        c.moveTo(this.vertexLeftX, this.vertexLeftY);
        c.lineTo(this.vertexTopX, this.vertexTopY);
        c.lineTo(this.vertexRightX, this.vertexRightY);
        c.closePath();
        c.fill();
    }
    
    move() {
        console.log("tx" +this.vertexTopX);
        console.log("ty" +this.vertexTopY);
        
        console.log("rx" +this.vertexRightX);
        console.log("ry" +this.vertexRightY);
        
        console.log("lx" +this.vertexLeftX);
        console.log("ly" +this.vertexLeftY);
        console.log(" ");
        this.vertexTopX = this.vertexTopX;
        this.vertexTopY = this.vertexTopY +20;
        
        this.vertexLeftX = this.vertexLeftX;
        this.vertexLeftY = this.vertexLeftY + 20;
        
        this.vertexRightX = this.vertexRightX;
        this.vertexRightY = this.vertexRightY+20;
        this.draw();
        console.log(this.vertexTopX);
        console.log(this.vertexTopY);
        
        console.log(this.vertexRightX);
        console.log(this.vertexRightY);
        
        console.log(this.vertexLeftX);
        console.log(this.vertexLeftY);
    }
    
    update() {

        this.vertexTopX = this.vertexTopX;
        this.vertexTopY = this.vertexTopY + 5;
        
        this.vertexLeftX = this.vertexLeftX ;
        this.vertexLeftY = this.vertexLeftY + 5;
        
        this.vertexRightX = this.vertexRightX;
        this.vertexRightY = this.vertexRightY +5 ;
        
        this.draw();
  
    }
    
    
}
var b1 = new Bird(200,500,1,1);    

var b2 = new Bird(300,100,50,50);  

var c1 = new Circle(200,200, 10, 10)




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
    
    b1.update();
    
}

animate();


entities.push(new Circle(200,200, 10, 10));
entities.push(new Circle(00,200, 10, 10));


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
    
    entities.push(new Circle(event.x,event.y, 10, 10));
    console.log(entities.length);
    
})