define(function() {
    /**
     * @class BaseView
     */
    var View = Backbone.View.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            this.elements = {};
        },
        /**
         * @method render
         * @returns {Backbone.View}
         */
        render: function() {
            this.elements.fontPreloader = this.$('.font-preloader');
            this.elements.avatar = this.$('.user-avatar');
            this.elements.sidebar = this.$('.sidebar');
            this.elements.username = this.$('.user-username');
            this.preloadFont();
            return this;
        },
        /**
         * @method renderElements
         */
        renderElements: function() {
            this.elements.avatar.html(skritter.user.getAvatar('img-circle'));
            this.elements.username.text(skritter.user.settings.get('name'));
        },
        /**
         * @property {Object} events
         */
        events: {
            'vclick .button-back': 'handleBackClicked',
            'vclick .button-home': 'handleHomeClicked',
            'vclick .button-logout': 'handleLogoutClicked',
            'vclick .button-study': 'handleStudyClicked',
            'vclick .content-container': 'handleContentContainerClicked',
            'vclick .navbar-toggle-sidebar': 'handleSidebarToggled'
        },
        /**
         * @method handleBackClicked
         * @param {Object} event
         */
        handleBackClicked: function(event) {
            window.history.back();
            event.preventDefault();
        },
        /**
         * @method handleContentContainerClicked
         * @param {Object} event
         */
        handleContentContainerClicked: function(event) {
            if (this.elements.sidebar.hasClass('expanded')) {
                this.toggleSidebar();
            }
            event.preventDefault();
        },
        /**
         * @method handleHomeClicked
         * @param {Object} event
         */
        handleHomeClicked: function(event) {
            skritter.router.navigate('', {replace: true, trigger: true});
            event.preventDefault();
        },
        /**
         * @method handleLogoutClicked
         * @param {Object} event
         */
        handleLogoutClicked: function(event) {
            skritter.user.logout();
            event.preventDefault();
        },
        /**
         * @method handleSidebarToggled
         * @param {Object} event
         */
        handleSidebarToggled: function(event) {
            this.toggleSidebar();
            event.preventDefault();
        },
        /**
         * @method handleStudyClicked
         * @param {Object} event
         */
        handleStudyClicked: function(event) {
            skritter.router.navigate('study', {replace: true, trigger: true});
            event.preventDefault();
        },
        /**
         * @method preloadFont
         */
        preloadFont: function() {
            if (this.elements.fontPreloader) {
                if (skritter.user.getLanguageCode() === 'zh') {
                    this.elements.fontPreloader.addClass('chinese-text');
                } else {
                    this.elements.fontPreloader.addClass('japanese-text');
                }
            }
        },
        /**
         * @method remove
         */
        remove: function() {
            this.removeElements();
            this.stopListening();
            this.undelegateEvents();
            this.$el.empty();
        },
        /**
         * @method removeElements
         * @returns {Object}
         */
        removeElements: function() {
            for (var i in this.elements) {
                this.elements[i].remove();
                this.elements[i] = undefined;
            }
            return this.elements;
        },
        /**
         * @method toggleSidebar
         */
        toggleSidebar: function() {
            if (this.elements.sidebar.hasClass('expanded')) {
                this.elements.sidebar.removeClass('expanded');
                this.elements.sidebar.hide('slide', {direction: 'left'}, 200);
            } else {
                this.elements.sidebar.addClass('expanded');
                this.elements.sidebar.show('slide', {direction: 'left'}, 200);
            }
        }
    });
    
    return View;
});