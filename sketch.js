var zombieGroup; 
var bulletGroup;
var life=6;
var gun;





function preload(){ 
  carImg1=loadImage("images/car_img_2-removebg-preview.png"); 
  backgroundImg1=loadImage("images/level1 updated img.jpg"); 
  zombie1Img=loadImage("images/obstacle1.png"); 
  zombie2Img=loadImage("images/obstacle2.png"); 
  zombie3Img=loadImage("images/obstacle3.png"); 
  backgroundImg2=loadImage("images/level 2 .png"); 
  backgroundImg3=loadImage("images/level 3 .png"); 
  carImg2=loadImage("images/level 2 car.png");
  carImg3=loadImage("images/level 3 car.png"); 
  playbuttonImg=loadImage("images/play button.png"); 
  gunimg=loadImage("images/gunimage.png"); 
  bulletImg.loadImage("images/bulletimg.png");
}






function setup() {
  createCanvas(1530,700); 
  background1=createSprite(width/2,height/2,1000,700); 
  background1.addImage(backgroundImg1);  
  background1.scale=0.8; 
  background1.velocityX=-4;

 car=createSprite(100,height-90,100,100);  
 car.addImage(carImg1); 
 car.scale=0.6; 
 car.debug=true; 

 
 ground=createSprite(width/2,height-10,width,30);  
ground.shapeColor="black";
 
ground2=createSprite(1300,250,500,30); 
ground2.shapeColor="black";

gun=createSprite(car.x-5,car.y-10,10,10); 
gun.addImage(gunimg); 
gun.scale=0.3;    

zombieGroup=new Group();  
bulletGroup=new Group();



}

function draw() {
  background("white");    
  gun.x=car.x-5;
  if (background1.x < 0){
    background1.x = background1.width/3;
  } 

  //movement of car- 
  if(keyDown("RIGHT")&& car.x<width/2){ 
    car.x=car.x+5
  }
  
  if(keyDown("LEFT")&& car.x>110){ 
    car.x=car.x-5
  }
  
  obstacles();
  //zombie touching bullet
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++) {

      if(zombieGroup[i].isTouching(bulletGroup))
      {
        zombieGroup[i].destroy();
        bulletGroup.destroyEach(); 
      }
    }
  }
//zombie touching the player
        if(zombieGroup.isTouching(car)){ 
          for(var i=0;i<zombieGroup.length;i++){ 
           if(zombieGroup[i].isTouching(car)){
            life=life-1; 
           zombieGroup[i].destroy();  
           }
          }
         }
      
    
  

 
  drawSprites();
} 

function mouseClicked(){ 
  bullet=createSprite(gun.x-5,car.y-10,10,10);     
  bullet.velocityX=5;  
  bullet.shapeColor="yellow";
  bulletGroup.add(bullet);
  //bullet.lifetime=100
}











function obstacles(){ 
  if(frameCount%50===0){  
    zombie1=createSprite(width,height-90,20,20); 
    zombie1.velocityX=-3;  
    zombie1.lifetime=500; 
    
    
    var rand=Math.round(random(1,3)); 
    switch(rand){ 
      case 1:  
      zombie1.addImage(zombie1Img);    
             
      break;
      
      case 2:  
      zombie1.addImage(zombie2Img);   
      zombie1.scale=0.8; 
      zombie1.y=100; 
      zombie1.velocityY=2;     
      zombie1.collide(ground2);
           
      break; 

      case 3:  
      zombie1.addImage(zombie3Img);              
      break; 

      default: 
      break;
    }
    
    zombieGroup.add(zombie1); 
    zombieGroup.collide(ground);
  }
    
        
        
     
 
} 

//each bullet chould kill each zombie. 
//if 3 zombies touches the car the player dies in level 2. 
//if 1 zombie touches the car the player will die in level 3. 
//adjust the colliderradius of the car. 
//find and add bullet img. 
//zombie falling from the bridge
