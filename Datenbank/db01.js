const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Meine_Erste_Datenbenk';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  createCapped(db, function () {
    insertDocuments(db, function () {
      findDocuments(db, function () {
        client.close();
      });
    });
  });
});

function createCapped(db, callback) {
  db.createCollection("Neue_Collection_per_Script", { "capped": false, "size": 100000, "max": 5000 },
    function (err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("Neue_Collection_per_Script");
  // Insert some documents
  collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 }
  ], function (err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('Neue_Collection_per_Script');
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}