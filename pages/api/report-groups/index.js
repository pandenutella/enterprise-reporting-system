import dbPromise from "../../../lib/mongodb";

export default async (_, res) => {
  const db = await dbPromise;

  const reportGroups = await db.collection("reportGroups").find({}).toArray();
  res.json(reportGroups);
};
