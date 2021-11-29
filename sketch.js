var JOGAR = 1;
var ENCERRAR = 0;
var estadodejogo = JOGAR;
var grupodenuvens;
var grupodeobstaculos;
var solo2;
var trex, trex_correndo, edges, trex_colidido;
var solo, imagen_do_solo;
var nuvens, nuvens2;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var score;
var gameover, restart,gameoverpng,restartpng;
var pulo, morte, pontos;

function preload(){
  restartpng = loadImage("restart.png")
  gameoverpng = loadImage("gameOver.png");
  trex_colidido = loadAnimation ("trex_collided.png");
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imagensolo = loadImage("ground2.png");
  nuvens2 = loadImage("cloud.png");
  obstaculo1 =loadImage ("obstacle1.png");
  obstaculo2 =loadImage ("obstacle2.png");
  obstaculo3 =loadImage ("obstacle3.png");
  obstaculo4 =loadImage ("obstacle4.png");
  obstaculo5 =loadImage ("obstacle5.png");
  obstaculo6 =loadImage ("obstacle6.png");
  pulo = loadSound ("jump.mp3");
  morte = loadSound ("die.mp3");
  pontos = loadSound ("checkPoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  grupodenuvens = new Group();
  grupodeobstaculos = new Group();

  trex = createSprite(30,height-70,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("colisão",trex_colidido);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  //trex.debug =  true
  

  solo = createSprite(width/2,height-20,width,20);
 
  solo.addImage("ground",imagensolo);
  solo.x = solo.width/2;
  
  solo2 = createSprite(width/2,height-10,width,10);
  solo2.visible = false;

  var rand = Math.round(random(10,60));

  gameover = createSprite(width/2,height/2);
  gameover.addImage("fim_de_jogo",gameoverpng);
  gameover.scale = 1
  
  restart = createSprite(width/2,height/2+50);
  restart.addImage("recomeçar",restartpng);
  restart.scale = 1



  score = 0;
}

function draw(){
  background(255);
  textSize(20)
  text("SCORE:" +score,width-200,30);
  console.log("isto é"+estadodejogo)

  if (estadodejogo === JOGAR){
    solo.velocityX = -(4+3*score/100)

    gameover.visible = false;
    restart.visible = false;
    score=score+Math.round(getFrameRate()/60);
    if (score>0 && score%500 ===0){
      pontos.play();
    }

    if(touches.length>0 || keyDown("space") && trex.y >height-70){
     trex.velocityY = -12;
      pulo.play();
      touches = [];
    }
     
     if (solo.x<0){
      solo.x = solo.width/2;}
    
     trex.velocityY = trex.velocityY+0.5;

     gerarNuvens(); 

     gerarobstaculos();

     if (grupodeobstaculos.isTouching(trex)){
        estadodejogo = ENCERRAR;
        morte.play();
     }


  }
  else if (estadodejogo === ENCERRAR){
    solo.velocityX = 0;

    gameover.visible = true;
    restart.visible = true;
    trex.velocityY = 0

    trex.changeAnimation("colisão",trex_colidido);
    grupodenuvens.setLifetimeEach(-1);
    grupodeobstaculos.setLifetimeEach(-1);
    grupodenuvens.setVelocityXEach (0);
    grupodeobstaculos.setVelocityXEach (0);

    if (touches.length>0 || mousePressedOver(restart)){
      console.log("reiniciar jogo")
      reset();
      touches = [];
    }
  }

  trex.collide(solo2);
  

  drawSprites();
}

function reset(){
estadodejogo = JOGAR;

grupodeobstaculos.destroyEach();
grupodenuvens.destroyEach();

score = 0

trex.changeAnimation("running",trex_correndo);



}
function gerarNuvens(){
  //código para gerar as nuvens
if (frameCount%60===0){
  nuvens = createSprite(width+20,height-300,10.40);
nuvens.velocityX = -(3+score/1000)
nuvens.addImage(nuvens2);
nuvens.scale =0.75;
nuvens.y = random(10,height/2);
nuvens.depth = trex.depth;
trex.depth = trex.depth +1;
nuvens.lifetime = width+15;
grupodenuvens.add(nuvens);
}
}

function gerarobstaculos(){
if (frameCount%80===0){
obstaculo = createSprite(width,height-40,10,40);
obstaculo.velocityX = -(8+score/100)

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
obstaculo.lifetime = width+15;
grupodeobstaculos.add(obstaculo);
}
}