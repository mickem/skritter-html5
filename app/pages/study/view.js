var GelatoPage = require('gelato/modules/page');
var Prompt = require('components/prompt/view');

/**
 * @class Study
 * @extends {GelatoPage}
 */
module.exports = GelatoPage.extend({
    /**
     * @method initialize
     * @constructor
     */
    initialize: function() {
        this.counter = 0;
        this.prompt = new Prompt();
        this.listenTo(this.prompt, 'complete', this.handlePromptComplete);
    },
    /**
     * @property title
     * @type {String}
     */
    title: 'Study - Skritter',
    /**
     * @property template
     * @type {Function}
     */
    template: require('pages/study/template'),
    /**
     * @method render
     * @returns {GelatoPage}
     */
    render: function() {
        this.renderTemplate();
        this.prompt.setElement('#prompt-container').render().hide();
        return this;
    },
    /**
     * @method handlePromptComplete
     * @param {PromptReviews} reviews
     */
    handlePromptComplete: function(reviews) {
        var self = this;
        reviews.updateItems(function() {
            self.counter += reviews.length;
            if (self.counter >= 20) {
                self.counter = 0;
                app.user.data.items.fetchNext();
            }
            self.loadNext();
        }, function(error) {
            console.error('ITEM UPDATE ERROR:', error);
        });
    },
    /**
     * @method load
     * @param {String} [listId]
     * @param {String} [sectionId]
     */
    load: function(listId, sectionId) {
        if (app.user.data.items.getNext()) {
            app.closeDialog();
            this.loadNext();
        } else {
            this.listenToOnce(app.user.data.items, 'fetch:next', $.proxy(this.load, this));
            app.openDialog('loading');
            app.user.data.items.fetchNext();
        }
    },
    /**
     * @method loadNext
     */
    loadNext: function() {
        var item = app.user.data.items.getNext();
        var reviews = item.getPromptReviews();
        this.prompt.set(reviews);
        this.prompt.show();
    }
});