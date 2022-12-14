import dbPromise from "../../../lib/mongodb";

const handler = async (_, res) => {
  const db = await dbPromise;

  const reportGroups = await db.collection("reportGroups").find({}).toArray();
  res.json(reportGroups);
};

export default handler;
