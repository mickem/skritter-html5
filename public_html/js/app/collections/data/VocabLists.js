/**
 * @module Skritter
 * @submodule Collections
 * @param VocabList
 * @author Joshua McFarland
 */
define([
    'models/data/VocabList'
], function(VocabList) {
    /**
     * class DataVocabLists
     */
    var VocabLists = Backbone.Collection.extend({
        /**
         * @method initialize
         */
        initialize: function() {
            this.on('change', function(vocablist) {
                vocablist.cache();
            });
        },
        /**
         * @property {Backbone.Model} model
         */
        model: VocabList,
        /**
         * @method loadAll
         * @param {Function} callback
         */
        loadAll: function(callback) {
            var self = this;
            skritter.storage.getAll('vocablists', function(vocablists) {
                self.add(vocablists, {merge: true, silent: true});
                callback();
            });
        }
    });
    
    return VocabLists;
});