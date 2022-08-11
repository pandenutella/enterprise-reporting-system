import dbPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  const db = await dbPromise;
  const { key } = req.query;

  const report = await db.collection("reports").findOne({ key });

  if (!report)
    return res.status(404).json({ message: `Report ${key} does not exist!` });

  const fields = [];

  return res.json({ report, fields });
};

export default handler;
