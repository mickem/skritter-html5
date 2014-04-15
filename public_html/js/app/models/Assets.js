/**
 * @module Skritter
 * @submodule Models
 * @author Joshua McFarland
 */
define(function() {
    /**
     * @class Assets
     */
    var Assets = Backbone.Model.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            Assets.audio = new Audio();
        },
        /**
         * @method playAudio
         * @param {String} filename
         */
        playAudio: function(filename) {
            if (window.cordova) {
                navigator.expansion.media.play(decodeURIComponent(filename));
            } else {
                if (Assets.audio.paused) {
                    Assets.audio.src = skritter.api.audioBase() + 'sounds?file=' + filename;
                    Assets.audio.play();
                }
            }
        },
        /**
         * @method stroke
         * @param {Number} bitmapId
         * @param {String} color
         * @returns {CreateJS.Shape}
         */
        stroke: function(bitmapId, color) {
            color = (color) ? color : '#000000';
            return skritter.fn.strokes[bitmapId](color);
        }
    });
    
    return Assets;
});