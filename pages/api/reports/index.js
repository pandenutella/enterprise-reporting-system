import dbPromise from "../../../lib/mongodb";

const handler = async (_, res) => {
  const db = await dbPromise;

  const reports = await db.collection("reports").find({}).toArray();
  res.json(reports);
};

export default handler;
