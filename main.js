canvas = document.querySelector('canvas');
c = canvas.getContext('2d');

// rezise canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//hides scrollbar.
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
}
unloadScrollBars();

// *** STARTS HERE *** \\

var mouse = {
    x : undefined,
    y : undefined
}
//max size the circle will grow when hovered
var maxRadius = 40;

//array of colors
var colorArray = [
    '#2C3E50',
    '#E74C3C',
    "#FFAAD2",
    '#86ABFF',
    '#2980B9',
    '#86E8E0',
];

// creating event listener
window.addEventListener("mousemove", function(event){
    mouse.x = event.x; // position x,y of mouse
    mouse.y = event.y;

});

// allows circles to enter the window, when the window is being streched
window.addEventListener('resize', function(){
    // rezise canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

// holds , creates circles parameters
function Circle(x, y, dx, dy, radius){ 
    this.x = x; // x,y positon
    this.y = y;
    this.dx = dx; // x,y velocity
    this.dy = dy;
    this.radius = radius; // size of circle
    this.minRadius = radius; // min size of circle
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];; //randomly selects a color from colorArray


    this.draw = function(){
        c.beginPath(); // starts 
        c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false); // draws circle
        c.fillStyle = this.color; // gives circle  random color
        c.fill(); // fills the circle with the random color
    }

    this.update = function(){
        //bounces circle when hits x / y postion
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0){
           // x / y velocity
            this.dx = -this.dx;
        }
        if( this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx; // x , y velocity
        this.y += this.dy;

        // interactivity 
        // when mouse x,y poisition is in 50pixel radius
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {// the circles will grow to maxradius
                this.radius += 1; // velocity in which the circle grows
            }
        }else  if (this.radius > this.minRadius){ // returns the size to the circle to orginal size
            this.radius -=1; // velocity in wchi the circle shrinks
        }

        this.draw();
    }
   
}

//holds circles
var circleArray = [];

function init(){

    circleArray= [];//solves problem of superpopulating the canvas with circles when window is being stretched.

    //creates 100 circles, randomly.
    for(var i = 0;  i < 1000; i++){
        // position (circle is half off the screen, to fix this we use the code bellow. )
        // var x = Math.random() * innerWidth;
        // var y = Math.random() * innerHeight;
        var x = Math.random() * (innerWidth - radius * 2) + radius; // fixes issues were circle was half outside the screen.
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        // velocity
        var dx = (Math.random() - 0.5) //* 1; // -0.5 can give negatives results as well.
        var dy = (Math.random() - 0.5) //* 1;
        //sizing the circle. 
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius))//pushes the circles to array.
    }
}

//animates / draws elements
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);// clears the canvas, giving the ilusion of movement.    
    //drawing the array of circles.
    for( var i = 0; i < circleArray.length; i++){
        circleArray[i].update(); // circleArray[i] is calling all 100 circles. update is running the update function.
    }
}

init();
animate();