import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await MongoClient.connect(
    process.env.MONGO_CONNECTION_STRING!,
  );
  const db = client.db("travelop");

  const latestUser = await db
    .collection("users")
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray();

  await client.close();

  return NextResponse.json(latestUser[0] || {});
}
