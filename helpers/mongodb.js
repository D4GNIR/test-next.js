import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  // connexion à mongoDB
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.vi3h4rv.mongodb.net/${process.env.mongodb_dbname}?retryWrites=true&w=majority`
  );
  return client;
}
