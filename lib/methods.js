Meteor.methods({

    // update note
    // save note
    newNote(note) {
        // time stamp
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to send message.');
        }
        note.userId = this.userId;
        note.lastUpdatedtime = new Date();
        if (note.picture)
            note.picture = note.picture;
        Notes.insert(note);
    },

    updateNote(noteId, data, callback) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to send message.');
        }
        var conditions = { _id: noteId };
        var data1 = {};
        data1.title = data.title;
        data1.note = data.note;
        if (data.picture)
            data1.picture = data.picture;
        data1.lastUpdatedtime = new Date();
        data1.userId = this.userId;
        Notes.update(conditions, { $set: data1 }, {}, callback);
    },

    deleteNote(noteId, callback) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to send message.');
        }
        var conditions = { _id: noteId };
        Notes.remove(conditions, callback);
    },

    searchbyTitle(title) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to searh.');
        }

        if (title == "")
            return Notes.find({ userId: this.userId });
        else
            return Notes.find({ userId: this.userId, title: new RegExp('^' + title + '$', "i") });
    },
    updateName(name, code) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to update his name.');
        }

        check(name, String);
        if (name.length === 0 || code.length === 0) {
            throw Meteor.Error('Name, Code-required', 'Must provide user name');
        }
        // accounts 

        return Meteor.users.update(this.userId, { $set: { 'profile.name': name, 'profile.code': code } });
    },
    verifyUser(phone, code, callback) {
        var loginRequest = { phone: phone, code: code };

        //send the login request
        Accounts.callLoginMethod({
            methodArguments: [loginRequest],
            userCallback: callback
        });
        //return retval;
    }


});