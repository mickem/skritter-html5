/**
 * @module Skritter
 * @param Home
 * @param Login
 * @param Study
 * @param StudySettings
 * @param Test
 * @author Joshua McFarland
 */
define([
    'view/Home',
    'view/Login',
    'view/Study',
    'view/study/Settings',
    'view/Test'
], function(Home, Login, Study, StudySettings, Test) {
    /**
     * @class Router
     */
    var Router = Backbone.Router.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            this.container = $('#skritter-container');
            this.view = null;
            Backbone.history.start();
        },
        /**
         * @property {Object} routes
         */
        routes: {
            '': 'home',
            'login': 'login',
            'study': 'study',
            'study/settings': 'studySettings',
            'test': 'test'
        },
        /**
         * @method removeView
         */
        removeView: function() {
            if (this.view)
                this.view.remove();
            this.view = null;
        },
        /**
         * @method home
         */
        home: function() {
            this.removeView();
            this.view = new Home({el: this.container});
            this.view.render();
        },
        /**
         * @method login
         */
        login: function() {
            this.removeView();
            this.view = new Login({el: this.container});
            this.view.render();
        },
        /**
         * @method study
         */
        study: function() {
            this.removeView();
            this.view = new Study({el: this.container});
            this.view.render();
        },
        /**
         * @method studySettings
         */
        studySettings: function() {
            this.removeView();
            this.view = new StudySettings({el: this.container});
            this.view.render();
        },
        /**
         * @method test
         */
        test: function() {
            this.removeView();
            this.view = new Test({el: this.container});
            this.view.render();
        }
    });

    return Router;
});