const MongoClient = require("mongodb");
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Connected correctly to server");
  console.log(client);

  const db = client.db(dbName);
  const collection = db.collection("dishes");
  collection.insertOne(
    { name: "uthapizza", description: "test" },
    (errr, result) => {
      assert.equal(err, null);

      console.log("After Insert:\n");
      console.log(result.ops);
      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        console.log("Found:\n");
        console.log(docs);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);

          client.close();
        });
      });
    }
  );
});
