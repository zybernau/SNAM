Meteor.publish('users', function () {
  return Meteor.users.find({}, { fields: { profile: 1, phone: 1 } });
});

Meteor.publish('notes', function () {
  if (! this.userId) {
    return;
  }

  return Notes.find({ userId: this.userId });
});