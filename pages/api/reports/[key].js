import dbPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  const db = await dbPromise;
  const { key, includeFields } = req.query;

  const report = await db.collection("reports").findOne({ key });

  if (!report)
    return res.status(404).json({ message: `Report ${key} does not exist!` });

  if (!includeFields) return res.json(report);

  const fields = await db
    .collection("reportFields")
    .find({ reportKey: key })
    .sort({ sequence: 1 })
    .toArray();

  return res.json({ ...report, fields });
};

export default handler;
