// Add in order to use with a real twilio account
SMS.twilio = {
  ACCOUNT_SID: Meteor.settings.TWILIO.SID,
  AUTH_TOKEN: Meteor.settings.TWILIO.TOKEN
};
 SMS.phoneTemplates = {
    from: Meteor.settings.ACCOUNTS_PHONE.PHONE_FROM,
    text: function (user, code) {
        return 'the code is: ' + code;
    }
  };
  
if (Meteor.isServer) {
  if (Meteor.settings && Meteor.settings.ACCOUNTS_PHONE) {
    Accounts._options.adminPhoneNumbers = Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
    Accounts._options.phoneVerificationMasterCode = Meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;
  }
}