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
        console.log(this.vertexTopX);
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
    
    update() {
        console.log(this.vertexTopX);
        this.vertexTopX = this.vertexTopX - this.dx;
        this.vertexTopY = this.vertexTopY - this.dy;
        
        this.vertexLeftX = this.vertexLeftX - this.dx;
        this.vertexLeftY = this.vertexLeftY - this.dy;
        
        this.vertexRightX = this.vertexRightX - this.dx;
        this.vertexRightY = this.vertexRightY - this.dy;
        
        this.draw;
    }
    
    
}
var b1 = new Bird(200,200,50,50);    



b1.draw();

b1.update();
b1.update();
b1.update();

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