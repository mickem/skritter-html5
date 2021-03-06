const GelatoPage = require('gelato/page');
const AccountSidebar = require('components/account/AccountSidebarComponent');
const ChangePasswordDialog = require('dialogs1/change-password/view');
const ResetAllDataDialog = require('dialogs1/reset-all-data/view');

/**
 * @class AccountSettingsGeneralPage
 * @extends {GelatoPage}
 */
const AccountSettingsGeneralPage = GelatoPage.extend({

  /**
   * @property events
   * @type {Object}
   */
  events: {
    'change #avatar-upload-input': 'handleChangeAvatarUploadInput',
    'change #field-country': 'handleSelectCountry',
    'click #button-save': 'handleClickButtonSave',
    'click #field-change-password': 'handleClickChangePassword',
    'click #change-avatar': 'handleClickChangeAvatar',
    'click #reset-all-data': 'handleClickResetAllData'
  },

  /**
   * @property title
   * @type {String}
   */
  title: app.locale('pages.accountGeneral.title'),

  /**
   * @property template
   * @type {Function}
   */
  template: require('./AccountSettingsGeneral'),

  /**
   * @method initialize
   * @constructor
   */
  initialize: function() {
    this.countries = require('data/country-codes');
    this.dialog = null;
    this.timezones = require('data/country-timezones');
    this.sidebar = new AccountSidebar();
    this.listenTo(app.user, 'state', this.render);

    app.user.fetch();
  },

  /**
   * @method render
   * @returns {AccountSettingsGeneralPage}
   */
  render: function() {
    if (app.isMobile()) {
      this.template = require('./MobileAccountSettingsGeneral.jade');
    }

    this.renderTemplate();
    this.sidebar.setElement('#sidebar-container').render();

    return this;
  },

  /**
   * Displays an error message to the user.
   * @param {String} msg the message to display to the user
   */
  displayErrorMessage: function(msg) {
    this.$('#error-alert').text(msg).removeClass('hidden');
  },

  /**
   * @method getSelectedCountryCode
   * @returns {String}
   */
  getSelectedCountryCode: function() {
    return this.$('#field-country :selected').val() || app.user.get('country');
  },

  /**
   * @method handleChangeAvatarUploadInput
   * @param {Event} event
   */
  handleChangeAvatarUploadInput: function(event) {
    var file = event.target.files[0];
    var data = new FormData().append('image', file);
    var reader = new FileReader();
    reader.onload = function(event) {
      $('#field-avatar').attr('src', event.target.result);
    };
    reader.readAsDataURL(file);
  },

  /**
   * Handles click on the save button
   * @method handleClickButtonSave
   * @param {Event} event
   */
  handleClickButtonSave: function(event) {
    let self = this;
    event.preventDefault();
    let formData = this._getFormData();

    if (!this._validateAccountData(formData)) {
      return;
    }
    this.$('#error-alert').addClass('hidden');

    app.user.save(formData, {
      error: function(req, error) {
        let msg = error.responseJSON.message;

        if (msg.indexOf('Another user goes by that name.') > -1) {
          msg = app.locale('pages.accountGeneral.errorDuplicateDisplayName');
        }

        self.displayErrorMessage(msg);
      }
    });
  },

  /**
   * @method handleClickChangeAvatar
   * @param {Event} event
   */
  handleClickChangeAvatar: function(event) {
    event.preventDefault();
    this.$('#avatar-upload-input').trigger('click');
  },

  /**
   * @method handleClickChangePassword
   * @param {Event} event
   */
  handleClickChangePassword: function(event) {
    event.preventDefault();
    this.dialog = new ChangePasswordDialog();
    this.dialog.render();
    this.dialog.open();
  },

  /**
   * @method handleClickResetAllData
   * @param {Event} event
   */
  handleClickResetAllData: function(event) {
    event.preventDefault();
    this.dialog = new ResetAllDataDialog();
    this.dialog.render();
    this.dialog.open();
  },

  /**
   * @method handleSelectCountry
   * @param event
   */
  handleSelectCountry: function(event) {
    event.preventDefault();
    this.render();
  },

  /**
   * @method remove
   * @returns {AccountSettingsGeneralPage}
   */
  remove: function() {
    this.sidebar.remove();
    return GelatoPage.prototype.remove.call(this);
  },

  /**
   * Gets form data from HTML input fields
   * @returns {object} the form data
   * @method _getFormData
   * @private
   */
  _getFormData: function() {
    let avatar = this.$('#field-avatar').get(0).src;
    avatar = avatar.replace('data:image/gif;base64,', '');
    avatar = avatar.replace('data:image/jpeg;base64,', '');
    avatar = avatar.replace('data:image/png;base64,', '');
    return {
      avatar: avatar,
      aboutMe: this.$('#field-about').val().trim(),
      country: this.$('#field-country').find(':selected').val(),
      email: this.$('#field-email').val().trim(),
      eccentric: this.$('#field-eccentric').is(':checked'),
      name: this.$('#field-name').val().trim(),
      private: this.$('#field-private').is(':checked'),
      timezone: this.$('#field-timezone :selected').val()
    };
  },

  /**
   * Validates that account data is valid for submission to the server.
   * @param {object} formData the data to validate
   * @method _validateAccountData
   * @private
   */
  _validateAccountData: function(formData) {
    if (formData.email !== app.user.get('email')) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (_.isEmpty(formData.email) || !formData.email.match(emailRegex)) {
        this.displayErrorMessage(app.locale('pages.signup.errorInvalidEmail'));
        return false;
      }
    }

    if (_.isEmpty(formData.name)) {
      this.displayErrorMessage(app.locale('pages.accountGeneral.errorNoDisplayName'));
      return false;
    }

    return true;
  }

});

module.exports = AccountSettingsGeneralPage;
