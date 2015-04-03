window.Game = (function () {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function (el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.score = 0;
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

		this.backgroundMusic = new buzz.sound('/app/sounds/background_music.mp3', {
			loop: true,
			autoplay: true
		});
		this.crashSound = new buzz.sound('/app/sounds/crash.mp3');
		this.wingFlapSound = new buzz.sound('/app/sounds/flap.wav');
		$('.Score-text').text(this.score);

	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function () {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function () {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function () {
		this.player.reset();
		this.score = 0;
		$('.Start-text').css('display', 'block');
		$('.Score-top').css('display', 'block');
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function () {
		this.isPlaying = false;
		this.player.startedPlaying = false;

		this.crashSound.play();

		// Should be refactored into a Scoreboard class.
		var that = this;

		$('.Score-top').css('display', 'none');
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
			.one('click', function () {
				scoreboardEl.removeClass('is-visible');
				that.start();
			});
	};

	Game.prototype.updateScore = function () {
		this.score++;
		$('.Score-text').text(this.score);
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();