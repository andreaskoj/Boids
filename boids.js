/*jslint browser: true */
/*global window */
/*global console */


var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext('2d')

//c.fillStyle = '#439f20'
//c.fillRect(100, 100,100, 100)
//
//// Line
//c.beginPath();
//c.moveTo(50,300);
//c.lineTo(300,100);
//c.lineTo(400,200);
//c.strokeStyle = "red";
//c.stroke();
//
////Arc
//c.beginPath();
//c.arc(Math.random() *window.innerWidth,400,30,0, Math.PI*2, false);
//c.stroke();

window.addEventListener('click', function() {
    console.log("ok");
    
})

c.beginPath();
c.arc(200,400,30,0, Math.PI*2, false);
c.stroke();

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5 ) *20;
var dy = (Math.random() - 0.5 ) *20;
var radious = 30;

function Bird() {
    
        
}

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

var circle = new Circle(200,200, 10, 10);



function animate() {
    requestAnimationFrame(animate);
    //clears the canvas
    c.clearRect(0,0,innerWidth,innerHeight);
    
    circle.update();
    
}

animate();