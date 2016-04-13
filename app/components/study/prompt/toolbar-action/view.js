var GelatoComponent = require('gelato/component');

/**
 * @class StudyPromptToolbarAction
 * @extends {GelatoComponent}
 */
module.exports = GelatoComponent.extend({
	/**
	 * @method initialize
	 * @param {Object} options
	 * @constructor
	 */
	initialize: function(options) {
		this.prompt = options.prompt;
	},
	/**
	 * @property buttonCorrect
	 * @type {Boolean}
	 */
	buttonCorrect: true,
	/**
	 * @property buttonErase
	 * @type {Boolean}
	 */
	buttonErase: true,
	/**
	 * @property buttonShow
	 * @type {Boolean}
	 */
	buttonShow: true,
	/**
	 * @property buttonTeach
	 * @type {Boolean}
	 */
	buttonTeach: true,
	/**
	 * @property events
	 * @type Object
	 */
	events: {
		'click #toolbar-correct': 'handleClickToolbarCorrect',
		'click #toolbar-erase': 'handleClickToolbarErase',
		'click #toolbar-show': 'handleClickToolbarShow',
		'click #toolbar-stroke-order': 'handleClickToolbarStrokeOrder'
	},
	/**
	 * @property template
	 * @type {Function}
	 */
	template: require('./template'),
	/**
	 * @method render
	 * @returns {StudyPromptToolbarAction}
	 */
	render: function() {
		this.renderTemplate();
		return this;
	},
	/**
	 * @method handleClickToolbarCorrect
	 * @param {Event} event
	 */
	handleClickToolbarCorrect: function(event) {
		event.preventDefault();
		this.trigger('click:correct');
	},
	/**
	 * @method handleClickToolbarErase
	 * @param {Event} event
	 */
	handleClickToolbarErase: function(event) {
		event.preventDefault();
		this.trigger('click:erase');
	},
	/**
	 * @method handleClickToolbarShow
	 * @param {Event} event
	 */
	handleClickToolbarShow: function(event) {
		event.preventDefault();
		this.trigger('click:show');
	},
	/**
	 * @method handleClickToolbarStrokeOrder
	 * @param {Event} event
	 */
	handleClickToolbarStrokeOrder: function(event) {
		event.preventDefault();
		this.trigger('click:teach');
	}
});
