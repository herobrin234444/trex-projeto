
var solo2;
var trex, trex_correndo, edges;
var solo, imagen_do_solo;
var nuvens, nuvens2;
function preload(){

  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imagensolo = loadImage("ground2.png");
  nuvens2 = loadImage("cloud.png");
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(30,160,20,50);
  trex.addAnimation("running", trex_correndo); 
  trex.scale = 0.5;

  solo = createSprite(300,180,600,20);
  solo.velocityX = -4
  solo.addImage("ground",imagensolo);
  solo.x = solo.width/2;
  
  solo2 = createSprite(300,190,600,10);
  solo2.visible = false;

  var rand = Math.round(random(10,60));

}

function draw(){
  background(180);

  

  if(keyDown("space") && trex.y >160){
    trex.velocityY = -12;
  }
  if (solo.x<0){
    solo.x = solo.width/2;
  }

  trex.velocityY = trex.velocityY+0.5;

  trex.collide(solo2);

  gerarNuvens();

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
console.log (trex.depth);
console.log (nuvens.depth);
}
}
