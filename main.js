// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); //canvas 2d API

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//constructor function
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
} 

Ball.prototype.draw = function() {
  ctx.beginPath(); //canvas.getContext('2d').beginPath() starts a new path by emptying all sub paths. Call this method when you want to create a new path.
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // arc method of canvas.getContext('2d') with parameters (x, y, radius, startAngle, endAngle [, anticlockwise]);
  													  /* x coordinate of arc center. y coordinate of arc center. arc radius. startAngle: The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians. endAngle: the angle at which the arc ends. */
  ctx.fill();
}

var testBall = new Ball(50, 100, 4, 4, 'blue', 10);

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //color of the fillrect
  ctx.fillRect(0, 0, width, height); //erase the tray left behind by the ball as it animates

  while (balls.length < 5) {
    var size = random(10,20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size), //starting location x coordinate
      random(0 + size,height - size), //starting location y coordinate
      random(-10,10), //velocity x
      random(-10,10), //velocity y
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')', //random color
      size //random size
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) { 
    balls[i].draw(); //draw all balls from ball array
    balls[i].update(); //update their position
    balls[i].collisionDetect(); //detects collision function
  }

  requestAnimationFrame(loop); //animates all balls
}

loop(); //run loop