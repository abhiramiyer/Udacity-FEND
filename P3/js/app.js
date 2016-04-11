// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.y = -25 + Math.floor(Math.random() * 3 + 1) * 85;
    this.speed = Math.floor(Math.random() * 200 + 50);
    this.size = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -50;
        //
        // also switch the row
        //
        this.y = -25 + Math.floor(Math.random() * 3 + 1) * 85;
    }else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //
    // size of the player used for collision detection
    //
    this.size = 50;
    this.score = 0;
    this.reset();
    this.x = this.col * 101;
    //
    // adding -30 to y places the player nicely in the canvas
    //
    this.y = -30 + this.row * 85;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
    //
    // Render the score
    //
    ctx.font = 'bold 20pt sans-serif';
    ctx.fillText('SCORE:', 270, 20);
    ctx.textAlign = 'end';
    ctx.fillText(this.score, 320,20);
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.col * 101;
    //
    // adding -30 to y places the player nicely in the canvas
    //
    this.y = -30 + this.row * 85;

    if (!this.resetInProgress) {
        //
        // If player is not alive: decrement score,reset position and respawn the player
        //
        if (!allEnemies.every (this.playerAlive, this)) {
            this.sprite = 'images/Rock.png';
            window.setTimeout(this.reset.bind(this), 500);
            this.resetInProgress = true;
            this.score--;
        }

        //
        // If player has crossed successfully,increment score,reset position and respawn the player
        //
        if (this.row === 0) {
            this.sprite = 'images/Heart.png';
            window.setTimeout(this.reset.bind(this), 500);
            this.resetInProgress = true;
            this.score++;
        }
    }
};

Player.prototype.reset = function () {
    this.sprite = 'images/char-boy.png';
    this.col = 2;
    this.row = 5;
    this.resetInProgress = false;
};


Player.prototype.playerAlive = function (enemy) {
    if (enemy.x < this.x + this.size &&
            enemy.x + enemy.size > this.x &&
            enemy.y < this.y + this.size &&
            enemy.y + enemy.size > this.y) {
                //
                // collision detected, player is not alive
                //
                return false;
            } else {
                return true;
            }
};

Player.prototype.handleInput = function(key) {
    if (!this.resetInProgress) {
        if (key == 'up') {
            this.row === 0? 0 : this.row--;
        } else if (key == 'down') {
            this.row === 5? 0 : this.row++;
        } else if (key == 'left') {
            this.col === 0? 0 : this.col--;
        } else if (key === 'right') {
            this.col === 4? 0 : this.col++;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i=0; i<5; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
