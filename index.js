var express = require("express");
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var app = express();

app.use(express.json());
const port = process.env.PORT || 5000;
app.use(cors());

const uri =
  "mongodb+srv://checkout:I9iIsymtsFx1zN6s@cluster0.zbjsrap.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    /**MongoDb all collection code**/
    const collectionBilling = client.db("checkout").collection("billing");
    const collectionShopping = client.db("checkout").collection("Shipping");

    /**all  services get find api code start**/
    app.post("/billing", async (req, res) => {
      const billing = req.body;
      const result = await collectionBilling.insertOne(billing);
      res.send(result);
    });
    app.get("/billing", async (req, res) => {
      const result = await collectionBilling.find({}).toArray();
      res.send(result);
    });
    app.delete("/checkout/:id", async (req, res) => {
      const { id } = req.params;

      const query = { _id: ObjectId(id) };
      const result = await collectionBilling.deleteOne(query);
      res.send(result);
    });

    app.put("/billing/:id", async (req, res) => {
      const id = req.params.id;
      const address = req.body;
      const filter = { _id: ObjectId(id) };

      const updateDoc = {
        $set: address,
      };
      const result = await collectionBilling.updateOne(filter, updateDoc);

      res.send(result);
    });

    app.post("/shopping", async (req, res) => {
      const Shipping = req.body;
      const result = await collectionShopping.insertOne(Shipping);
      res.send(result);
    });
    app.get("/shopping", async (req, res) => {
      const result = await collectionShopping.find({}).toArray();
      res.send(result);
    });
    app.get("/shopping", async (req, res) => {
      const result = await collectionShopping.find({}).toArray();
      res.send(result);
    });
    app.delete("/shopping/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = await collectionShopping.deleteOne(query);
      res.send(result);
    });
    app.put("/shopping/:id", async (req, res) => {
      console.log("helllo");
      const id = req.params.id;
      const address = req.body;
      const filter = { _id: ObjectId(id) };

      const updateDoc = {
        $set: address,
      };
      const result = await collectionShopping.updateOne(filter, updateDoc);

      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
