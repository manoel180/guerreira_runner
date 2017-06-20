"use strict"; 

var GameState = function(game) {};

GameState.prototype.preload = function() {

    this.game.load.baseURL = 'http://examples.phaser.io/assets/';
    this.game.load.crossOrigin = 'anonymous';

    this.game.load.image('ship', 'sprites/thrust_ship2.png');
    this.game.load.image('bullet', 'misc/bullet0.png');

}
var player;
var bullets;

var cursors;
var fireButton;

var bulletTime = 0;
var bullet;

GameState.prototype.create = function() {

    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player = game.add.sprite(400, 550, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

GameState.prototype.update = function () {

    player.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
    }

    if (fireButton.isDown)
    {
        GameState.prototype.fireBullet();
    }

}

GameState.prototype.fireBullet = function () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 6, player.y - 12);
            bullet.body.velocity.y = -600;
            bulletTime = game.time.time + 100;
        }
    }

}
