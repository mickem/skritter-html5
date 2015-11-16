var Collection = require('base/collection');
var StrokeParams = require('collections/stroke-params');
var KanaStrokes = require('data/kana-strokes');
var ToneStrokes = require('data/tone-strokes');
var Stroke = require('models/stroke');


//TODO: replace stroke shapes with a collection
//var StrokeShapes = require('collections/stroke-shapes');
var ShapeData = require('data/shape-data');

/**
 * @class Strokes
 * @extends {Collection}
 */
module.exports = Collection.extend({
    /**
     * @method initialize
     * @constructor
     */
    initialize: function() {
        this.params = new StrokeParams();
        this.shapes = ShapeData;
        this.add(KanaStrokes.getData());
        this.add(ToneStrokes.getData());
    },
    /**
     * @property model
     * @type {Stroke}
     */
    model: Stroke,
    /**
     * @method getPromptTones
     * @returns {PromptCharacter}
     */
    getPromptTones: function() {
        return this.get('tones').getPromptCharacter();
    }
});
