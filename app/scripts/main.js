var SOUND_PLAYING = true;
/**
 * Bootstrap and start the game.
 */
$(function () {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    game.start();


    $('.Mute-button .Mute-icon').click(function () {

        SOUND_PLAYING = !SOUND_PLAYING;

        var iconSoundON = 'fa fa-volume-up fa-4x';
        var iconSoundOFF = 'fa fa-volume-off fa-4x';

        if (SOUND_PLAYING) {
            unMuteSound();
            $(this).find('i').removeClass(iconSoundOFF);
            $(this).find('i').addClass(iconSoundON);

        } else {
            muteSound();
            $(this).find('i').removeClass(iconSoundON);
            $(this).find('i').addClass(iconSoundOFF);
        }

    });

    function muteSound() {
        game.backgroundMusic.mute();
        game.wingFlapSound.mute();
        game.crashSound.mute();
    }

    function unMuteSound() {
        game.backgroundMusic.unmute();
        game.wingFlapSound.unmute();
        game.crashSound.unmute();
    }


});
