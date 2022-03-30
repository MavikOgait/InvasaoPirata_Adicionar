const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var BOAT;
var balls=[];
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var boats=[];
var boatAnimation=[]
var boatData,boatSheet
var brokenAnimation=[]
var brokenData,brokenSheet

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  boatData = loadJSON ("./assets/boat/boat.json")   
  boatSheet = loadImage ("./assets/boat/boat.png")  //--- LOAD JSON

  brokenData = loadJSON ("./assets/boat/broken_boat.json")   
  brokenSheet = loadImage ("./assets/boat/broken_boat.png")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);
  
  var boatFrames = boatData.frames  // "boatData.frames"
  for (var i = 0; i < boatFrames.length; i ++ ) {
    var pos = boatFrames [i]. position; 
    var img = boatSheet.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }

  var brokenFrames = brokenData.frames  // "boatData.frames"
  for (var i = 0; i < brokenFrames.length; i ++ ) {
    var pos = brokenFrames [i]. position; 
    var img = brokenSheet.get(pos.x,pos.y,pos.w,pos.h)
    brokenAnimation.push(img)
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  showBoats()

  for(var i=0;i<balls.length;i++)  {
    showCannonBall(balls[i])
    colisionBoat(i)
  }




  cannon.display();



}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}
function keyPressed () {
  if(keyCode==DOWN_ARROW){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall) }
}
function showCannonBall (ball){
  if(ball){
    ball.display();
  }
}

function showBoats (){
  if(boats.length>0){
  if(boats[boats.length-1].body.position.x<width-300||boats[boats.length-1]==undefined){
    var positions = [-40,-60,-70,-20];
    var position = random ( positions)
    BOAT = new boat (width-79,height-60,170,170,position,boatAnimation)
    boats.push (BOAT)
  
  }
 for (var i = 0; i < boats.length; i ++ ){
   if (boats[i]) {
    Matter.Body.setVelocity(BOAT.body,{x:-0.9,y:0})
    boats [i].display();
    boats[i].animate()
   }
 }
  }
else{
  BOAT = new boat (width-79,height-60,170,170,-80,boatAnimation)
  boats.push (BOAT)
}
}


function colisionBoat (index){
  for (var i = 0; i < boats.length; i ++ ){
if (balls[index]!==undefined && boats [i]!==undefined ){
  var collision = Matter.SAT.collides (balls[index].body,boats[i].body)
  
  if (collision.collided){
    boats[i].remove(i)

    Matter.World.remove(world,balls[index].body)
    delete balls [index]
  }
}
  }
}





