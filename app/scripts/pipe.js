window.Pipe = (function () {
    'use strict';

    var GAMEHEIGHT = 57.6;
    var GAMEWIDTH = 102.4;
    var WIDTH = 3.2;


    var Pipe = function (xPosition, pipeTop, pipeBottom, game, name) {
        this.name = name;

        this.pipeTop = {
            el: pipeTop,
            bottom: 0
        };

        this.pipeBottom = {
            el: pipeBottom,
            top: 0
        };

        this.setGap();

        this.game = game;

        this.currentX = xPosition;
        this.originX = xPosition;

        this.movePipe();

        this.WIDTH = 3.2;
    };

    Pipe.prototype.setGap = function () {

        this.pipeTop.bottom = Math.floor(Math.random() * 30) + 5;
        this.pipeBottom.top = this.pipeTop.bottom + 10;

    };

    Pipe.prototype.loop = function () {
        this.currentX = GAMEWIDTH + 10;
        this.setGap();

    };

    Pipe.prototype.reset = function () {

        this.currentX = this.originX;
        this.setGap();

        this.movePipe();

    };

    Pipe.prototype.onFrame = function (xDist) {

        if (this.currentX <= WIDTH - 10) {
            this.loop();
        }

        this.currentX -= xDist;

        this.movePipe();

    };

    Pipe.prototype.movePipe = function () {

        this.pipeTop.el.css('transform', 'translate3d(' + this.currentX + 'em,' + (-(GAMEHEIGHT - this.pipeTop.bottom)) + 'em, 0)');
        this.pipeBottom.el.css('transform', 'translate3d(' + this.currentX + 'em,' + this.pipeBottom.top + 'em, 0)');

        this.pipeTop.el.css('-webkit-transform', 'translate3d(' + this.currentX + 'em,' + (-(GAMEHEIGHT - this.pipeTop.bottom)) + 'em, 0)');
        this.pipeBottom.el.css('-webkit-transform', 'translate3d(' + this.currentX + 'em,' + this.pipeBottom.top + 'em, 0)');

        this.pipeTop.el.css('-moz-transform', 'translate3d(' + this.currentX + 'em,' + (-(GAMEHEIGHT - this.pipeTop.bottom)) + 'em, 0)');
        this.pipeBottom.el.css('-moz-transform', 'translate3d(' + this.currentX + 'em,' + this.pipeBottom.top + 'em, 0)');

    };

    return Pipe;

})();
