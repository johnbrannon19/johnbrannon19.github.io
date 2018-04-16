var bigboi;
var particles = [];
//constant gravity
var mg = .06;
//radius of particles
var radius = 5;
var isFrozen = false;
var isContinue = true;
var bigBoiClick = true;
var isBackwards = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bigboi = {
    color : 225,
    posx : width/2,
    posy : height/2,
    r : radius * 15,
  }
}

function draw() {
  boxAndTitle();
  bigBoiDetails(bigboi.posx, bigboi.posy, bigboi.r, bigboi.color);
  button(width/200,1);
  spawnParticles(mouseX, mouseY);
  randomXValues();
  //particle builder
  for(var i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
    particles[i].bounce();
    particles[i].bigBoiAndParticles();
  }
}
//particle details
function Particle(locx, locy, direction) {
  //declaring where each bigboi and particle are located
  this.loc = createVector(locx, locy);
  bigboi.loc = createVector(bigboi.posx, bigboi.posy);
  this.direction = direction;
  this.velocity = createVector(0,0);
  this.a = 0;
  this.b = 0;
  this.c = 0;
  this.display = function(){
    fill(0);
    stroke(0);
    ellipse(this.loc.x, this.loc.y, radius);
  }
  this.move = function() {
    //y acceleration
    //if its not frozen
    if(isFrozen === false) {
      this.velocity.add(0,mg);
      //if it does not continue
      if(isContinue === false) {
        this.loc.add(0,this.velocity.y);
        //if bigBoi is on the screen
        if(bigBoiClick === true){
          if(this.c <= bigboi.r/2 + radius*1.3 ){
            this.loc.add(this.velocity.x, this.velocity.y);
          }
        }
      }
      else {
        //if it does continue
        this.loc.add(this.velocity.x, this.velocity.y);
      }
    }
  }
  this.bounce = function() {
    // y bounce(ceiling)
    if(this.loc.y <= height/10 + radius) {
      this.loc.y = height/10 + radius;
      this.velocity.y = this.velocity.y * direction;
    }
    //y bounce(floor)
    if(this.loc.y > 9*height/10 - radius){
      this.loc.y = 9*height/10 - radius;
      this.velocity.y = this.velocity.y * direction;
    }
    // x bounce
    if(this.loc.x <= width/12+radius || this.loc.x >= 11*width/12-radius) {
      this.velocity.x = this.velocity.x * direction;
    }
    //make sure it stays in rectangle(left wall)
    if(this.loc.x < width/12 + radius){
      this.loc.x = width/12 + radius;
    }
    //(right wall)
    if(this.loc.x > 11*width/12 - radius) {
      this.loc.x = 11*width/12 - radius;
    }
    //(top-middle of bigboi)
    if(this.loc.y >= bigboi.posy - bigboi.r/2 - radius  && this.loc.y <= bigboi.posy && this.loc.x === bigboi.posx) {
      if(bigBoiClick === true){
        this.loc.y = height/2 - bigboi.r/2 - radius;
      }
    }
  }
  this.goBackwards = function() {
    //the ball's velocities go opposite direction
    this.velcoity = this.velocity.mult(this.direction, this.direction);
  }
  this.bigBoiAndParticles = function() {
    //distance formula in relation of location of particle and bigboi
    this.a = this.loc.x - bigboi.posx;
    this.b = this.loc.y - bigboi.posy;
    this.c = Math.sqrt(this.a*this.a + this.b*this.b);
    // interaction with bigboi and particles
    if(bigBoiClick === true){
      if(this.c <= bigboi.r/2 + radius){
        var n = p5.Vector.sub(this.loc, bigboi.loc);
        n.normalize();
        var ndotv = p5.Vector.dot(n, this.velocity);
        var ndotv_n = p5.Vector.mult(n, ndotv);
        var r = p5.Vector.sub(p5.Vector.sub(this.velocity, ndotv_n), ndotv_n);
        this.velocity = r;
      }
    }
  }
}

function spawnParticles(x,y) {
  //distance formula in relation of spawn and bigboi
  a = mouseX - bigboi.posx;
  b = mouseY - bigboi.posy;
  c = Math.sqrt(a*a + b*b);
  if(mouseIsPressed){
    if(mouseX >= width/12 + radius && mouseY >= height/10 + radius && mouseY <= 9*height/10 - radius && mouseX <= 11*width/12 ){
      //if bigboi is on screen, then you cannot place balls in it
      if(bigBoiClick === true){
        if(c > radius + bigboi.r/2){
          if (mouseButton === LEFT) {
            particles.push(new Particle(mouseX, mouseY,-1));
          }
        }
      }
      //if bigboi is not on screen, you can place balls in it
      if(bigBoiClick === false){
        if(mouseButton === LEFT) {
          particles.push(new Particle(mouseX, mouseY,-1));
        }
      }
    }
  }
}
//bigboi details
function bigBoiDetails(x,y,r,c) {
  if(bigBoiClick === true){
    fill(c);
    ellipse(x,y,r);
    fill(0);
    textSize(15);
    stroke(170);
    text("Big Boi", width/2 - 24 , height/2 + 3.5);
  }
}
//background stuff
function boxAndTitle() {
  //background
  background(240);
  stroke(0);
  fill(240);
  rect(width/12, height/10, 5*width/6 , 4*height/5);
  fill(0);
  textSize(50);
  //credit to Claire Morrison
  text("Smoll Kangaroos", width/2 - 200, height/12);
  textSize(20*width/1250);
  fill(50);
  text("Use These Buttons To Change How The Particles Act!", width/200, height/25, width/4, height/15 - 1);
}

function button (x,y) {
  for(var y = 0; y < 6; y++){
    stroke(0);
    fill(245);
    rect(x,y * 100 + 75,50,50);
  }
  //Credit to Claire Morrison
  //button labeling
  noStroke();
  fill(200, 45, 0);
  textSize(10);
  text("SHATTER", width/200 + 1.5, 105);
  fill (0, 0, 200);
  textSize(10);
  text("VERTICAL", width/200 + 1.5, 204);
  fill(45, 255, 240);
  textSize(12);
  text("FREEZE", width/200 + 1.5, 306);
  fill(110);
  strokeWeight(stroke(1.5));
  stroke(150);
  textSize(15);
  text("INVISI-", width/200 + 1.5, 398);
  text("BOI", width/200 + 12, 418);
  fill(240, 45, 160);
  text("RE-", width/200 + 13, 495 );
  text("WIND", width/200 + 5, 515);
  fill(100,180,60);
  text("UP-", width/200 + 1.5, 592);
  text("SIDE-", width/200 + 1.5, 605);
  text("DOWN", width/200 + 1.5, 619);
}
//buttons
function mousePressed() {
  if(clickedFrozen()) {
    isFrozen = !isFrozen;
  }
  if(clickedVertical()) {
    isContinue = !isContinue;
  }
  if(bigBoiActivate()) {
    bigBoiClick = !bigBoiClick;
  }
  if(particlesBackwards()){
    isBackwards = !isBackwards
    for (var i = 0; i < particles.length; i++) {
      particles[i].goBackwards();
    }
  }
  if(antiGravity()) {
    mg = -mg;
  }
}

function randomXValues() {
  if(mouseIsPressed){
    if(mouseX <= width/200 + 50 && mouseX >= width/200 && mouseY <= 125 && mouseY >= 75){
      if(mouseButton === LEFT) {
        //So vertical does not mess with shatter
        if(isContinue === false) {
          isContinue = !isContinue;
          for(var i = 0; i < particles.length; i++) {
            if(particles[i].c > bigboi.r/2 + radius*2) {
              particles[i].velocity.x = random(-2,2);
            }
          }
        }
        //can shatter while not vertical
        else{
          for(var i = 0; i < particles.length; i++) {
            if(particles[i].c > bigboi.r/2 + radius*2) {
              particles[i].velocity.x = random(-2,2);
            }
          }
        }
      }
    }
  }
}

function clickedVertical(){
  if(mouseIsPressed){
    if(mouseX <= width/200 + 50 && mouseX >= width/200 && mouseY <= 225  && mouseY >= 175){
      if(mouseButton === LEFT){
        isContinue = !isContinue;
      }
    }
  }
}

function clickedFrozen(){
  if(mouseIsPressed) {
    if(mouseX <= width/200 + 50 && mouseX >= width/200 && mouseY <= 325 && mouseY >= 275){
      if(mouseButton === LEFT){
        return true;
      }
      else{
        return false;
      }
    }
  }
}

function bigBoiActivate(){
  if(mouseIsPressed) {
    if(mouseX <= width/200 + 50 && mouseX >= width/200 && mouseY <= 425 && mouseY >= 375){
      if(mouseButton === LEFT){
        bigBoiClick = !bigBoiClick;
      }
    }
  }
}

function particlesBackwards(){
  if(mouseIsPressed){
    if(mouseX <= width/200 + 50 && mouseX >= width/200 && mouseY <= 525 && mouseY >= 475){
      if(mouseButton === LEFT){
        return true;
      }
    }
    return false;
  }
}

function antiGravity() {
  if(mouseIsPressed) {
    if(mouseX <= width/200 + 50 && mouseX >= width/200 && mouseY <= 625 && mouseY >= 575) {
      if(mouseButton === LEFT){
        mg = -mg;

      }
    }
  }
}
