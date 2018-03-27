const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'Meine_Erste_Datenbenk'

let db
// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to server");

   db = client.db(dbName);

  insertDocuments(db, function () {
    console.log("1 Mill done")  
    client.close();
  });
})

var count = 0

const insertDocuments = function (callback) {

  // Insert document
  db.collection('Neue_Collection_2').insertOne({ a: Math.random() }, function (err, r) {
    count++
    if (count >= 10000000) {
    callback()
    } else {
     insertDocuments(callback)
    }
  });
}