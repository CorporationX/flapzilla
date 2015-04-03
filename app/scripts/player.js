window.Player = (function () {
    'use strict';

    var Controls = window.Controls;

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.
    var UP = -30;
    var DOWN = 130;
    var CHANGE = 0;
    var WIDTH = 5;
    var HEIGHT = 3;
    var INITIAL_POSITION_X = 30;
    var INITIAL_POSITION_Y = 25;
    var GAMEHEIGHT = 57.6;
    var GAMEWIDTH = 102.4;
    var ROTATE = 0;
    var MULTIPLIER = 40;

    var Player = function (el, game) {
        this.el = el;
        this.game = game;
        this.pos = {
            x: 0,
            y: 0
        };

        this.pipe1 = new window.Pipe(GAMEWIDTH + 10, $('.PipeTop1'), $('.PipeBottom1'), this.game);
        this.pipe2 = new window.Pipe(GAMEWIDTH + 50, $('.PipeTop2'), $('.PipeBottom2'), this.game);
        this.pipe3 = new window.Pipe(GAMEWIDTH + 90, $('.PipeTop3'), $('.PipeBottom3'), this.game);

        this.startedPlaying = false;

    };

    /**
     * Resets the state of the player for a new game.
     */
    Player.prototype.reset = function () {
        this.pos.x = INITIAL_POSITION_X;
        this.pos.y = INITIAL_POSITION_Y;
        CHANGE = 0;
    };

    Player.prototype.onFrame = function (delta) {
        // if (Controls.keys.right) {
        // 	this.pos.x += delta * SPEED;
        // }
        // if (Controls.keys.left) {
        // 	this.pos.x -= delta * SPEED;
        // }
        // if (Controls.keys.down) {
        // 	this.pos.y += delta * SPEED;
        // }
        // if (Controls.keys.up) {
        // 	this.pos.y -= delta * SPEED;
        // }


        this.pipe1.onFrame(delta * 20);
        this.pipe2.onFrame(delta * 20);
        this.pipe3.onFrame(delta * 20);


        if (!this.startedPlaying && Controls.didJump()) {
            this.startedPlaying = true;
            $('.Start-text').css('display', 'none');
        }

        if (!this.startedPlaying) {
            this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0)');
            return;
        }


        if (Controls.didJump()) {
            CHANGE = UP;
            ROTATE = Math.max(ROTATE - 15, -20);
        } else {
            ROTATE = Math.min(ROTATE + MULTIPLIER * delta, 10);
            CHANGE += DOWN * delta;
        }

        this.pos.y += delta * CHANGE;

        this.checkCollisionWithBounds();

        // Update UI
        this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0) rotate(' + ROTATE + 'deg)');
    };

    Player.prototype.checkCollisionWithBounds = function () {
        if (this.pos.x < 0 ||
            this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
            this.pos.y < 0 ||
            this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 3) {
            return this.game.gameover();
        }
    };

    return Player;

})();
