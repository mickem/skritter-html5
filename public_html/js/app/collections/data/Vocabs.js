/**
 * @module Skritter
 * @submodule Collections
 * @param Vocab
 * @author Joshua McFarland
 */
define([
    'models/data/Vocab'
], function(Vocab) {
    /**
     * @class DataVocabs
     */
    var Vocabs = Backbone.Collection.extend({
        /**
         * @method initialize
         */
        initialize: function() {
        },
        /**
         * @property {Vocab} model
         */
        model: Vocab,
        /**
         * @method loadAll
         * @param {Function} callback
         */
        loadAll: function(callback) {
            var self = this;
            skritter.storage.getAll('vocabs', function(vocabs) {
                self.add(vocabs, {merge: true, silent: true, sort: false});
                callback();
            });
        }
    });

    return Vocabs;
});