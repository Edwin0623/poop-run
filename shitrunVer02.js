window.requestAnimationFrame(draw);
var c = document.getElementById("myCanvas");
var	ctx = c.getContext("2d");

var startBtn = document.getElementById("startBtn");

const img_shit = document.getElementById("ddong");
const img_man = document.getElementById("man");
const img_candy = document.getElementById("candy");
//document.addEventListener("click", onMouseClick, false);
document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler, false);

// 키보드
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
// 점수
var score = 0;
// 체력
var health = new Health();
// 사람
var man = new Man(c.width / 2 - 30, c.height - 40, 30, 40);
// 똥
var shits = [];
for (var i = 0; i < 5; i++) {
	var shit = new Shit(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1);
	shits.push(shit);
}
setInterval(function () {
	var shit = new Shit(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1);
	shits.push(shit);
}, 1000)
setInterval(function () {
	var shit = new Shit(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1);
	shits.push(shit);
}, 500)

// 캔디
var candies = [];
for (var i = 0; i < 1; i++) {
	var candy = new Candy(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1, Math.random() * 2 + 1);
	candies.push(candy);
}
setInterval(function () {
	var candy = new Candy(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1, Math.random() * 2 + 1);
	candies.push(candy);
}, 10000)

// 키보드 함수
function keyDownHandler(event) {
	// man.setLocation(event.key);
	switch (event.keyCode) {
		case 37:
		man.moveLeft();
		break;

		case 39:
		man.moveRight();
		break;

		case 40:
		man.moveStop();
		break;
	}

	// if (event.key == "39" || event.key == "ArrowRight") {
	// 	rightPressed = true;
	// } else if (event.key == "37" || event.key == "ArrowLeft") {
	// 	leftPressed = true;
	// } else if (event.key == "40" || event.key == "ArrowDown") {
	// 	downPressed = true;
	// }
}

// function keyUpHandler(event) {
// 	if(event.key == "39" || event.key == "ArrowRight") {
// 		rightPressed = false;
// 	} else if(event.key == "37" || event.key == "ArrowLeft") {
// 		leftPressed = false;
// 	}
// }

// 사람 함수
function Man(x, y, x1, y1) {
	this.x = x;
	this.y = y;
	this.x1 = x1;
	this.y1 = y1;
	this.speed = 0;
	this.maxSpeed = 10;

	// if (rightPressed == true) {
	// 	this.speed = this.maxSpeed;
	// } else if (leftPressed == true) {
	// 	this.speed = -this.maxSpeed;
	// } else if (downPressed == true) {
	// 	this.speed = this.maxSpeed * 0;
	// }

	this.moveLeft = function () {
		this.speed = -this.maxSpeed;
	}

	this.moveRight = function () {
		this.speed = this.maxSpeed;
	}

	this.moveStop = function () {
		this.speed = this.maxSpeed * 0;
	}
	this.setLocation = function() {
		if (rightPressed) {
			this.speed = +this.maxSpeed;
		} else if (leftPressed) {
			this.speed = -this.maxSpeed;
		}
	}
	this.draw = function () {
		ctx.drawImage(img_man, this.x, this.y, this.x1, this.y1);
	}
	this.update = function () {
		this.x = this.x + this.speed;
		if (this.x > c.width) {
			this.x = 0;
		}
		if (this.x < 0) {
			this.x = c.width;
		}
	}
}

// 똥 함수
function Shit(x, y, x1, y1, dy) {
	this.x = x;
	this.y = y;
	this.x1 = x1;
	this.y1 = y1;
	this.dy = dy;

	this.draw = function () {
		ctx.drawImage(img_shit, this.x, this.y, this.x1, this.y1);
	}

	this.update = function () {
		if (this.x + this.x1 > c.width) {
			this.x = this.x - 22;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		this.y = this.y + this.dy;
	}
}

// 캔디 함수
function Candy(x, y, x1, y1, dx, dy) {
	this.x = x;
	this.y = y;
	this.x1 = x1;
	this.y1 = y1;
	this.dx = dx;
	this.dy = dy;

	this.draw = function () {
		ctx.drawImage(img_candy, this.x, this.y, this.x1, this.y1);
	}

	this.update = function () {
		if (this.x > c.width) {
			this.x = c.width;
			this.dx = -this.dx;
		}
		if (this.x < 0) {
			this.x = 0;
			this.dx = -this.dx;
		}
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}
}

// 체력 함수
function Health() {
	this.health = 100;
	
	this.loseHealth = function () {
		this.health = this.health - 1;
	}
	this.getHealth = function () {
		if (this.health > 99) {
			return false;
		}
		return this.health = this.health + 1;
	}
	this.isAlive = function () {
		if (this.health > 0) {
			return true;
		}
		return false;
	}
	this.draw = function () {
		ctx.fillStyle = "#ff6464";
		ctx.fillRect(250, 0, (100 / 100) * this.health, 10);
		ctx.font = "11px Comic Sans MS";
		ctx.fillStyle = "white";
		ctx.fillText(this.health, 250, 10);
		ctx.fillText(this.health, this.x, c.height -40);
	}
}

function checkCollision(man, shits) {
	for (var i = 0; i < shits.length; i++) {
		var dx = man.x - shits[i].x;
		var dy = man.y - shits[i].y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		if (distance < man.y1 - shits[i].y1) {
			return true;
		}
	} 
	return false;
}

function checkTouchCandy(man, candies) {
	for (var i = 0; i < candies.length; i++) {
		var dx = man.x - candies[i].x;
		var dy = man.y - candies[i].y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		if (distance < man.y1 - candies[i].y1) {
			return true;
		}
	} 
	return false;
}

function Score() {
	score++;
	ctx.font = "15px Comic Sans MS";
	ctx.fillStyle = "#45454D";
	ctx.fillText("Score: " + score, 3, 15);
}

function initialize() {

	startBtn.style.display = "none";
	start();

}
function draw() {
	clearCanvas();
	man.draw();
	man.update();
	health.draw();
	Score();
	man.moveLeft();
	man.moveRight();
	man.moveStop();
	
	for (var i = 0; i < shits.length; i++) {
		shits[i].draw();
		shits[i].update();
	}

	if (health.isAlive() == false) {
		alert("Game Over. Your Score is " + score + "!");
		clearCanvas();
		end();
		return;
	}

	for (var i = 0; i < candies.length; i++) {
		candies[i].draw();
		candies[i].update();
	}

	if (checkCollision(man, shits)) {
		health.loseHealth();
	}

	if (checkTouchCandy(man, candies)) {
		health.getHealth();
	}
	window.requestAnimationFrame(draw);
}


function end() {
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "#45454D";
	ctx.fillText("DEAD", 130 , 200);
	ctx.fillText("RESTART?", 100 , 260);

}

function getResetShitAndCandy() {
	shits = [];
	for (var i = 0; i < 5; i++) {
		var shit = new Shit(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1);
		shits.push(shit);
	}
	candies = [];
	for (var i = 0; i < 1; i++) {
		var candy = new Candy(Math.random() * c.width, 0, 15, 15, Math.random() * 2 + 1, Math.random() * 2 + 1);
		candies.push(candy);
	}
}
function start() {
	if (health.isAlive() == true) {
		return;
	} else {
		score = 0;
		getResetShitAndCandy();
		health = new Health();
		window.requestAnimationFrame(draw);
	}
}

function restart() {
	if (health.isAlive() == true) {
		return;
	} else {
		score = 0;
		getResetShitAndCandy();
		health = new Health();
		window.requestAnimationFrame(draw);
	}
}

function clearCanvas() {
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, c.width, c.height);
}


