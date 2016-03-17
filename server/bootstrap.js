Meteor.startup(function () {
 let notes = [
        {
            
            title: 'titl1',
            note: 'test note sir',
            lastUpdatedtime: moment().subtract(2, 'hours').toDate()
        },
        {
            
            title: 'sample note 2',
            note: 'test note 2 sir',
            lastUpdatedtime: moment().subtract(1, 'hours').toDate()
        },
        {
            
            title: 'sample note 23',
            note: 'test note 23 sir',
            lastUpdatedtime: moment().subtract(0, 'hours').toDate()
        },
        {
            
            title: 'sample note 3',
            note: 'test note 2 sir',
            lastUpdatedtime: moment().subtract(23, 'hours').toDate()
        },
        {
            
            title: 'sample note 4',
            note: 'test note 2 sir',
            lastUpdatedtime: moment().subtract(20, 'hours').toDate()
        }
    ];
    
   notes.forEach((m) => {
    Notes.insert(m);
  });
    
});