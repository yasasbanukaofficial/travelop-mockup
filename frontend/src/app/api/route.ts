import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await MongoClient.connect(
    process.env.MONGO_CONNECTION_STRING!,
  );
  const db = client.db("travelop");

  // Sort by _id descending to get newest first, limit 1
  const latestUser = await db
    .collection("users")
    .find({})
    .sort({ _id: -1 }) // descending order by _id (newest first)
    .limit(1)
    .toArray();

  await client.close();

  return NextResponse.json(latestUser[0] || {}); // return the single latest doc or empty obj
}
