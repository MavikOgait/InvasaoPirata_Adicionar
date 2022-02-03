// Renomeando módulos da biblioteca
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground;
var cannon, cannonBall;
var boat; 

var bolas = [];
var Boats = [];

//Carregando imagens e animações
function preload() {
  backgroundImg = loadImage("./imagem/background.gif");
  towerImage = loadImage("./imagem/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);

  //Criando um motor e adicionando a um mundo
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES); //conversão para graus
  angle = 20;
  
  //Mantendo o objeto parado
  var options = {
    isStatic: true
  }

  //Criando corpo e adicionando ao mundo
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  // propriedades do canhão
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);


}

function draw() {
  image(backgroundImg,0,0,1200,600)
  //Atualizando as realidades físicas 
  Engine.update(engine);

  //Desenhando na tela
  rect(ground.position.x, ground.position.y, width * 2, 1);
  
  //Dsenhando torre na tela
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  //Loop para mostrar as bolas na tela
  for(var i = 0; i < bolas.length; i++){
    mostrarCannonBalls(bolas[i],i);
  }

   // mostrando canhão na tela
   cannon.display();
   mostrarBarco();
}

// Se apertar o botão, a bola será criada;
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    bolas.push(cannonBall);
  }
}

// Função display
function mostrarCannonBalls(bola,index){
    if(bola){
      bola.display();
    }
}

//Se apertar o botão, a bola dentro da matriz será atirada
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    bolas[bolas.length - 1].atirar();
  }
}

function mostrarBarco(){
  if(Boats.length > 0){
    if(Boats[Boats.length - 1].body.position.x < width - 300 || Boats[Boats.length - 1] == undefined){
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      boat = new Boat(width - 80, height - 60, 170, 170, position);
      Boats.push(boat);
    }

    for(var i = 0; i < Boats.length; i++){
      if(Boats[i]){
        	Matter.Body.setVelocity(Boats[i].body,{x:-0.9,y:0});
          Boats[i].display();
      }
    }

  } else{
    boat = new Boat(width, height - 60, 170, 170, -60);
    Boats.push(boat);
  }
}

