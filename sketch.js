var JOGAR = 1;
var ENCERRAR = 0;
var estadodejogo = JOGAR;
var grupodenuvens;
var grupodeobstaculos;
var solo2;
var trex, trex_correndo, edges;
var solo, imagen_do_solo;
var nuvens, nuvens2;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var score;
function preload(){

  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imagensolo = loadImage("ground2.png");
  nuvens2 = loadImage("cloud.png");
  obstaculo1 =loadImage ("obstacle1.png");
  obstaculo2 =loadImage ("obstacle2.png");
  obstaculo3 =loadImage ("obstacle3.png");
  obstaculo4 =loadImage ("obstacle4.png");
  obstaculo5 =loadImage ("obstacle5.png");
  obstaculo6 =loadImage ("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  
  grupodenuvens = new Group();
  grupodeobstaculos = new Group();

  trex = createSprite(30,160,20,50);
  trex.addAnimation("running", trex_correndo); 
  trex.scale = 0.5;

  solo = createSprite(300,180,600,20);
 
  solo.addImage("ground",imagensolo);
  solo.x = solo.width/2;
  
  solo2 = createSprite(300,190,600,10);
  solo2.visible = false;

  var rand = Math.round(random(10,60));

  score = 0;
}

function draw(){
  background(83);

  text("SCORE:" +score,500,50);


  if (estadodejogo === JOGAR){
    solo.velocityX = -4;

    score=score+Math.round(frameCount/120);

    if(keyDown("space") && trex.y >160){
     trex.velocityY = -12;}
    
     if (solo.x<0){
      solo.x = solo.width/2;}
    
     trex.velocityY = trex.velocityY+0.5;

     gerarNuvens(); 

     gerarobstaculos();

     if (grupodeobstaculos.isTouching(trex)){
       estadodejogo = ENCERRAR;
     }
  }
  else if (estadodejogo === ENCERRAR){
    solo.velocityX = 0;

    grupodenuvens.setVelocityXEach (0);
    grupodeobstaculos.setVelocityXEach (0);
  }

  trex.collide(solo2);

  drawSprites();
}

function gerarNuvens(){
  //código para gerar as nuvens
if (frameCount%60===0){
  nuvens = createSprite(600,100,10.40);
nuvens.velocityX = -3
nuvens.addImage(nuvens2);
nuvens.scale =0.75;
nuvens.y = random(10,60);
nuvens.depth = trex.depth;
trex.depth = trex.depth +1;
nuvens.lifetime = 225;
grupodenuvens.add(nuvens);
}
}

function gerarobstaculos(){
if (frameCount%80===0){
obstaculo = createSprite(600,165,10,40);
obstaculo.velocityX = -8

var sorteio =Math.round(random(1,6));
switch (sorteio){
  case 1: obstaculo.addImage(obstaculo1);
  break;
  case 2: obstaculo.addImage(obstaculo2);
  break;
  case 3: obstaculo.addImage(obstaculo3);
  break;
  case 4: obstaculo.addImage(obstaculo4);
  break;
  case 5: obstaculo.addImage(obstaculo5);
  break;
  case 6: obstaculo.addImage(obstaculo6);
  break;
  default: break;
}
obstaculo.scale = 0.5;
obstaculo.lifetime = 225;
grupodeobstaculos.add(obstaculo);
}
}