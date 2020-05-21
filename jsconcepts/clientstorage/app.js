const db= new Dexie('MyDatabase');

db.version(1).stores({
    contacts:'++id, firstName, lastName'
});

db.contacts.put({firstName:"Manny", lastName:"Henri"});
