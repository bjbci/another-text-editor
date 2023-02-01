import { openDB } from 'idb';

 const dbName='jate' //database name
 const storeName='jateStore'//name of the object store

  //idb being created
const initdb = async () =>
//creat a db and give it a (name, version)
   openDB('jate', 1, {
    //upgrade event creates an object store where we store our text
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //objectStore name=jate
      //{keypath:'id'}--this is the primary key of an object store
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
//////////////////////////////////////////
  // //idb being created
  // const initdb = async () => {
  // //creat a db and give it a (database name, version)
  //   await openDB('dbName', 1, {
  //     //upgrade event creates an object store where we store our text
  //     upgrade(db) {   //upgrade(db)-opens the database
  //        db.createObjectStore('storeName', { //storeName is the name of the object store
  //         keyPath: 'id',
  //          autoIncrement: true 
  //        }) 
  //        }
  //   });
  // }
  //////////////////////////////////////
  // TODO: Add logic to a method that accepts some content and adds it to the database
  //1 open db
  //2 create transactions(name of stores, 'mode')
  //3 access store from tx
  //4 do something with the data-mutate the store
  
  export const putDb = async (content) =>{// console.error('putDb not implemented');
  //open db
  const db=await openDB(dbName,1)
  // create transactions(name of stores,' mode')
  const tx=db.transaction(storeName,'readWrite')
  //access store from tx
  const store=tx.objectStore(storeName)
  //do something with the data-mutate the store
  await store.put({
    dbName:content
  }) //{where does data come from}{jate:content}
  console.log('data saved');
  }


//////////////////////////////////////////////////////////
// TODO: Add logic for a method that gets all the content from the database
 //1 open db
  //2 create transactions(name of stores, 'mode')
  //3 access store from tx
  //4 do something with the data-mutate the store
  export const getDb = async () => {  //console.error('getDb not implemented');
  //open db
  const db=await openDB(dbName,1)
  // create transactions(name of stores,' mode')
  const tx=db.transaction(storeName,'readWrite')
  //access store from tx
  const store=tx.objectStore(storeName)
  //do something with the data-mutate the store
  return await store.getAll()  //{where does data come from}{jate:content}
  
  }





initdb();
