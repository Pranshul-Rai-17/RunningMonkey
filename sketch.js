var monkey , monkey_running , monkey_colliding;
var ground , invisibleGround , groundImage ; 
var banana , bananaImage ;
var obstacle , obstacleImage ;
var obstacleGroup , FoodGroup;
var bg;
var time = 0 ;
var score = 0 ;
var PLAY=1;
var END=0;
var gameState;

function preload(){
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png" ,"sprite_4.png" , "sprite_5.png" , "sprite_6.png","sprite_7.png","sprite_8.png");
  
monkey_colliding  = loadAnimation("sprite_8.png");
  
bananaImage = loadImage("banana.png");
  
obstacleImage = loadImage("obstacle.png");
  
groundImage = loadAnimation("groundimage.jpg");

}

function setup() {
  createCanvas(600,300)
  bg = createSprite(50,240,600,100); 
  bg.addAnimation("ground", groundImage);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  gameState = PLAY;
  
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkey_colliding);
  
  ground = createSprite(50,290,600,10);
  ground.scale =3;
  ground.velocityX = -3;
  
  ground.visible = false; 
}

function draw() {
  
  background("skyBlue");
  fill("black");
  text("Survival Time :"+time , 470 , 20);
  text("Score : "+score,300,20);
  
  monkey.velocityY  = monkey.velocityY+0.8
    
   if(ground.x<0){
      ground.x = ground.width/2;
    }
     
  if(gameState === PLAY){
    obstacles();
    bananas();
    time = time+Math.round(getFrameRate()/60);
    
    ground.velocityX  = -4
    
    if(keyDown("Space")){
      monkey.velocityY = -13; 
    }
    if(monkey.isTouching(FoodGroup)){
      score++;
     FoodGroup.destroyEach();
    }
        
   if(ground.x<0){
      ground.x = ground.width/2;
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
      
  }

  
  if(gameState===END){
   ground.velocityX = 0;
    
    monkey.y = 235;
   monkey.scale = 0.12;
   monkey.changeAnimation("collide" ,monkey_colliding );
    
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityEach(-1);
    
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      time = 0;
      score = 0;
      gameState = PLAY; 
    }
  }
    
  

  
  
  
  
  
  
  
  monkey.collide(ground); 
    drawSprites()

  
} 
  



function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120,50,50);
    banana.addAnimation("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4+time*1.5/100);
    banana.lifetime = 200;
    FoodGroup.add(banana);
    
  }
}


function obstacles(){
  if(frameCount%200===0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addImage("rock" , obstacleImage);
    obstacle.setCollider("Circle",0,0,180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4+time*1.5/100);
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    
    
  }
}
