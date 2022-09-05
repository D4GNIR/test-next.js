import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  // connexion à mongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://Dagnir:D3vD39ia87VmsF@cluster0.vi3h4rv.mongodb.net/portfolio?retryWrites=true&w=majority"
  );
  return client;
}
