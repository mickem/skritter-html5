var BootstrapDialog = require('base/bootstrap-dialog');

/**
 * @class GoalSettingsDialog
 * @extends {BootstrapDialog}
 */
module.exports = BootstrapDialog.extend({
  /**
   * @method initialize
   * @constructor
   */
  initialize: function() {
    BootstrapDialog.prototype.initialize.call(this);
  },
  /**
   * @property template
   * @type {Function}
   */
  template: require('dialogs/goal-settings/template'),
  /**
   * @method render
   * @returns {GoalSettingsDialog}
   */
  render: function() {
    this.renderTemplate();
    this.updateSettings();
    return this;
  },
  /**
   * @property events
   * @type {Object}
   */
  events: {
    'click #button-close': 'handleClickClose',
    'click #button-save': 'handleClickSave'
  },
  /**
   * @method handleClickClose
   * @param {Event} event
   */
  handleClickClose: function(event) {
    event.preventDefault();
    this.close();
  },
  /**
   * @method handleClickSave
   * @param {Event} event
   */
  handleClickSave: function(event) {
    event.preventDefault();
    var type = this.$('input[name="goal-type"]:checked').val();
    var value = this.$('#goal-value').val();
    app.user.setGoal(type, value);
    this.close();
  },
  /**
   * @method updateSettings
   */
  updateSettings: function() {
    var goal = app.user.getGoal();
    this.$('input[value="' + goal.type + '"]').prop('checked', true);
    this.$('#goal-value').val(goal.value);
  }
});
