
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = 420

let gameRunning=false
let score=0
let speed=6

const player.jpg={
x:120,
y:300,
w:40,
h:40,
vy:0,
jumping:false
}

let obstacles=[]

function spawnObstacle(){

const types=["book","paper","scissors"]

const type=types[Math.floor(Math.random()*types.length)]

obstacles.push({
x:canvas.width+50,
y:310,
w:40,
h:40,
type:type
})

}

setInterval(()=>{
if(gameRunning) spawnObstacle()
},1400)

function jump(){
if(!player.jumping){
player.vy=-16
player.jumping=true
}
}

document.addEventListener("keydown",(e)=>{
if(e.code==="Space") jump()
})

canvas.addEventListener("touchstart",jump)

function update(){

player.y+=player.vy
player.vy+=0.9

if(player.y>=300){
player.y=300
player.jumping=false
}

obstacles.forEach(o=>{
o.x-=speed
})

obstacles=obstacles.filter(o=>o.x>-50)

obstacles.forEach(o=>{

if(
player.x<o.x+o.w &&
player.x+player.w>o.x &&
player.y<o.y+o.h &&
player.y+player.h>o.y
){
gameOver()
}

})

score++

if(score%500==0){
speed+=0.5
}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#444"
ctx.fillRect(0,350,canvas.width,70)

ctx.fillStyle="#00ffd0"
ctx.fillRect(player.x,player.y,player.w,player.h)

obstacles.forEach(o=>{

if(o.type==="book") ctx.fillStyle="red"
if(o.type==="paper") ctx.fillStyle="white"
if(o.type==="scissors") ctx.fillStyle="yellow"

ctx.fillRect(o.x,o.y,o.w,o.h)

})

ctx.fillStyle="white"
ctx.font="20px Arial"
ctx.fillText("Score: "+score,20,30)

}

function loop(){

if(!gameRunning) return

update()
draw()

requestAnimationFrame(loop)

}

function gameOver(){
gameRunning=false
document.getElementById("gameOver").style.display="block"
document.getElementById("scoreText").innerText="Score : "+score
}

document.getElementById("startBtn").onclick=()=>{
document.getElementById("menu").style.display="none"
gameRunning=true
loop()
}
