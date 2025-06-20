// test.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://voterdbuser:Megha%402005db@cluster0.grmlgw1.mongodb.net/voterdbuser?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("voterdbuser");
    const collections = await db.listCollections().toArray();
    console.log("✅ Connected! Collections:", collections.map(c => c.name));
    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

testConnection();
