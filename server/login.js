Accounts.registerLoginHandler(function(loginRequest) {
    //there are multiple login handlers in meteor. 
    //a login request go through all these handlers to find it's login hander
    //so in our login handler, we only consider login requests which has admin field

    if (!loginRequest.phone)
        return undefined;

    if (loginRequest.phone.length === 0) {
        throw Meteor.Error('Phone Number required', 'Must provide phone number');
    }
    user = {};
    userId = "";
    
        if (loginRequest.code || loginRequest.code.length > 0) {
            user = Meteor.users.findOne(
                { $or: [ { 'phone.number': loginRequest.phone },    
                         { 'profile.name': loginRequest.phone }
                        ] , 'phone.verified': true, 
                            'profile.code': loginRequest.code}
                );
            if (!user || !user._id) {
                return {
                    error: "Authentication Failed, Please try again later."
                };
            }

        }
        else {
             return {
                    error: "Authentication Failed, Please try again later."
                };
        }
    
    userId = user._id;
    //send loggedin user's user id
    //creating the token and adding to the user
    var stampedToken = Accounts._generateStampedLoginToken();
    //hashing is something added with Meteor 0.7.x, 
    //you don't need to do hashing in previous versions
    var hashStampedToken = Accounts._hashStampedToken(stampedToken);

    Meteor.users.update(userId,
        { $push: { 'services.resume.loginTokens': hashStampedToken } }
    );

    //sending token along with the userId
    return {
        userId: userId,
        token: stampedToken.token
    };

});