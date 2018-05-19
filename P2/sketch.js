var particles = [];
var mg = -.055
var switchXValues = false
var imgNCBoi;

function setup(){
  createCanvas(windowWidth,windowHeight);
  imgNCBoi = {
    x : (width/6.5) + (img.width*1.7) + (imgNC.width*1.7)/2,
    y : (height/2.77) + (imgNC.height*1.7)/2,
    r : 271
  }
  pixelToParticle();
}

function draw(){
  background(255);
  image(img, width/8.8, height/2.3, img.width*1.7, img.height*1.7);
  image(imgNC,(width/6.5) + (img.width*1.7), height/2.77, imgNC.width*1.7, imgNC.height*1.7)
  randomXValues();
  miscellaneous();
  for(var i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
    particles[i].bounce();
    particles[i].particlesAndImgNC();
  }
}

function miscellaneous(){
  fill(0);
  line(0, height - 20, width, height - 20);
}

function preload() {
  img = loadImage("img/Newman.png");
  imgNC = loadImage("img/Newmancircle.jpg")
}

function pixelToParticle(){
  image(img, 0, 0, img.width*1.7, img.height*1.7);
  img.loadPixels();
  for(var i = 0; i <= img.width*1.7; i+=11) {
    for(var j = 0; j <= img.height*1.7; j+=10)
    if(brightness(get(i,j)) < 50){
      particles.push(new Particle(i,j));
    }
  }
}

function Particle(x,y){
  this.r = 6.5;
  this.velocity = createVector(0,0);
  imgNCBoi.xy = createVector(imgNCBoi.x, imgNCBoi.y);
  this.xy = createVector(x,y);
  this.xy.add(width/8.8, height/2.3);
  this.display = function(){
    strokeWeight(.4);
    fill(81, 192, 27);
    ellipse(this.xy.x,this.xy.y, this.r);
  }
  this.move = function(){
    if(switchXValues == true){
      this.velocity.add(0,mg);
      this.xy.add(this.velocity.x, this.velocity.y);
    }
  }
  this.bounce = function() {
    // y bounce(ceiling)
    if(this.xy.y <= this.r) {
      this.xy.y = this.r;
      this.velocity.y = this.velocity.y * -.8;
    }
    //y bounce(floor)
    if(this.xy.y > height - this.r - 20){
      this.xy.y = height - this.r - 20;
      this.velocity.y = this.velocity.y * -.8;
    }
    // x bounce
    if(this.xy.x <= this.r|| this.xy.x >= width-this.r-20) {
      this.velocity.x = this.velocity.x * -.8;
    }
    //make sure it stays in rectangle(left wall)
    if(this.xy.x < this.r){
      this.xy.x = this.r;
    }
    //(right wall)
    if(this.xy.x > width - this.r - 20) {
      this.xy.x = width - this.r - 20;
    }
  }
  this.particlesAndImgNC = function() {
    //distance formula in relation of location of particle and bigboi
    this.a = this.xy.x - imgNCBoi.x;
    this.b = this.xy.y - imgNCBoi.y;
    this.c = Math.sqrt(this.a*this.a + this.b*this.b);
    // interaction with bigboi and particles
    //credit to Mrs. DeBB
    if(this.c <= imgNCBoi.r/2 + this.r){
      var n = p5.Vector.sub(this.xy, imgNCBoi.xy);
      n.normalize();
      var ndotv = p5.Vector.dot(n, this.velocity);
      var ndotv_n = p5.Vector.mult(n, ndotv);
      var r = p5.Vector.sub(p5.Vector.sub(this.velocity, ndotv_n), ndotv_n);
      this.velocity = r;
    }
  }
}

function hyperlinkref(){
  var x = mouseX - imgNCBoi.x;
  var y = mouseY - imgNCBoi.y;
  var d = Math.sqrt( x*x + y*y );
  if( d <= imgNCBoi.r){
    if (mouseButton === LEFT) {
      document.location.href = "https://www.newmanschool.org/page/academics/upper-school";
    }
  }
}

function antiGravity() {
  if(mouseIsPressed) {
    if(mouseX <= (width/8.8) + (img.width*1.7) && mouseX >= (width/8.8) + (img.width/3) && mouseY <= (height/2.3) + (img.height*1.7) && mouseY >= (height/2.3)) {
      if(mouseButton === LEFT){
        mg = -mg;
        for(var i = 0; i < particles.length; i++){
          particles[i].velocity.y = random(-1,1);
        }
      }
    }
  }
}

function mousePressed() {
  if(antiGravity()) {
    mg = -mg;
  }
  hyperlinkref();
}

function randomXValues(){
  if(switchXValues == false){
    if(mouseIsPressed){
      if(mouseX <= (width/8.8) + (img.width*1.7) && mouseX >= (width/8.8) + (img.width/3) && mouseY <= (height/2.3) + (img.height*1.7) && mouseY >= (height/2.3)){
        if(mouseButton === LEFT){
          switchXValues = true;
          for(var i = 0; i < particles.length; i++){
            particles[i].velocity.x = random(-2,2);
          }
        }
      }
    }
  }
}
