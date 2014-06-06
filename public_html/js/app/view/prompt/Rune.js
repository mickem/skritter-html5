define([
    'require.text!template/prompt-rune.html',
    'view/prompt/Canvas',
    'view/prompt/Prompt'
], function(template, Canvas, Prompt) {
    /**
     * @class PromptRune
     */
    var View = Prompt.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            Prompt.prototype.initialize.call(this);
            this.canvas = new Canvas();
            this.maxStrokeAttempts = 3;
            this.strokeAttempts = 0;
        },
        /**
         * @method render
         * @returns {Backbone.View}
         */
        render: function() {
            this.$el.html(_.template(template, skritter.strings));
            Prompt.prototype.render.call(this);
            this.canvas.setElement('.canvas-container').render();
            this.listenTo(this.canvas, 'canvas:click', this.handleClick);
            this.listenTo(this.canvas, 'canvas:clickhold', this.handleClickHold);
            this.listenTo(this.canvas, 'canvas:doubleclick', this.handleDoubleClick);
            this.listenTo(this.canvas, 'canvas:swipeup', this.handleSwipeUp);
            this.listenTo(this.canvas, 'input:down', this.handleStrokeDown);
            this.listenTo(this.canvas, 'input:up', this.handleStrokeReceived);
            this.resize();
            this.show();
            return this;
        },
        /**
         * @method handleClick
         * @param {Object} event
         */
        handleClick: function(event) {
            event.preventDefault();
        },
        /**
         * @method handleClickHold
         * @param {Object} event
         */
        handleClickHold: function(event) {
            event.preventDefault();
        },
        /**
         * @method handleDoubleClick
         * @param {Object} event
         */
        handleDoubleClick: function(event) {
            this.review.setReview('score', 1);
            this.canvas.drawShape('hint', this.review.getCharacter().targets[0].getShape(null, '#999999'));
            event.preventDefault();
        },
        /**
         * @method handleStrokeReceived
         * @param {Array} points
         * @param {CreateJS.Shape} shape
         */
        handleStrokeReceived: function(points, shape) {
            if (points && points.length > 2) {
                var result = this.review.getCharacterAt().recognize(points, shape);
                if (result) {
                    this.strokeAttempts = 0;
                    this.canvas.lastMouseDownEvent = null;
                    window.setTimeout(_.bind(function() {
                        this.canvas.tweenShape('stroke', result.getUserShape(), result.inflateShape());
                        this.canvas.fadeLayer('hint');
                    }, this), 0);
                    if (this.review.getCharacter().isFinished()) {
                        this.showAnswer();
                    }
                } else {
                    this.strokeAttempts++;
                    if (this.strokeAttempts > this.maxStrokeAttempts) {
                        this.review.setReview('score', 1);
                        window.setTimeout(_.bind(function() {
                            this.canvas.fadeShape('hint', this.review.getCharacter().getExpectedStroke().inflateShape(skritter.settings.get('hintColor')), 3000);
                        }, this), 0);
                    }
                    window.setTimeout(_.bind(function() {
                        this.canvas.fadeShape('background', shape);
                    }, this), 0);
                }
            } else {
                window.setTimeout(_.bind(function() {
                    this.canvas.fadeShape('background', shape);
                }, this), 0);
            }
        },
        /**
         * @method handleSwipeUp
         * @param {Object} event
         */
        handleSwipeUp: function(event) {
            this.reset();
            event.preventDefault();
        },
        /**
         * @method remove
         */
        remove: function() {
            this.canvas.remove();
            Prompt.prototype.remove.call(this);
        },
        /**
         * @method reset
         * @returns {Backbone.View}
         */
        reset: function() {
            this.canvas.clear().enableInput();
            this.review.getCharacter().reset();
            return this;
        },
        /**
         * @method resize
         */
        resize: function() {
            Prompt.prototype.resize.call(this);
            var canvasSize = skritter.settings.getCanvasSize();
            var contentHeight = skritter.settings.getContentHeight();
            var contentWidth = skritter.settings.getContentWidth();
            var infoSection, inputSection;
            this.canvas.resize();
            if (skritter.settings.isPortrait()) {
                inputSection = this.$('.input-section').css({
                    height: canvasSize,
                    float: 'none',
                    width: contentWidth
                });
                infoSection = this.$('.info-section').css({
                    height: contentHeight - canvasSize,
                    float: 'none',
                    width: contentWidth
                });
            } else {
                inputSection = this.$('.input-section').css({
                    height: canvasSize,
                    float: 'left',
                    width: canvasSize
                });
                infoSection = this.$('.info-section').css({
                    height: contentHeight,
                    float: 'left',
                    width: contentWidth - canvasSize
                });
            }
        },
        /**
         * @method show
         * @returns {Backbone.View}
         */
        show: function() {
            this.canvas.enableInput();
            this.element.definition.html(this.vocab.getDefinition());
            this.element.reading.html(this.vocab.getReading());
            this.element.sentence.html(this.vocab.getSentence().writing);
            this.element.writing.html(this.vocab.getWriting(this.review.getPosition()));
            return this;
        },
        /**
         * @method showAnswer
         * @returns {Backbone.View}
         */
        showAnswer: function() {
            this.canvas.disableInput();
            this.element.writing.html(this.vocab.getWriting(this.review.getPosition() + 1));
            return this;
        }
    });

    return View;
});