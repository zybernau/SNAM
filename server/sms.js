// Add in order to use with a real twilio account
SMS.twilio = {
  ACCOUNT_SID: "ACdf169b02dc05bdcdf768fff2fc16615f",
  AUTH_TOKEN: "7e2d7bbe28517ec16e18c3c9a1f4ef18"
};
 SMS.phoneTemplates = {
    from: "+13367777252",
    text: function (user, code) {
        return 'the code is: ' + code;
    }
  };
  
if (Meteor.isServer) {
  if (Meteor.settings && Meteor.settings.ACCOUNTS_PHONE) {
    Accounts._options.adminPhoneNumbers = ["123456789", "987654321", "1111111111", "1111122222"];
    Accounts._options.phoneVerificationMasterCode = "1234";
  }
}