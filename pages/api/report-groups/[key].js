import dbPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  const db = await dbPromise;
  const { key } = req.query;

  const reportGroup = await db.collection("reportGroups").findOne({ key });

  if (!reportGroup)
    return res
      .status(404)
      .json({ message: `Report Group ${key} does not exist!` });

  return res.status(200).json(reportGroup);
};

export default handler;
