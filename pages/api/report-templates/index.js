import dbPromise from "../../../lib/mongodb";

const collection = "reportTemplates";

const handler = async (req, res) => {
  const db = await dbPromise;

  switch (req.method) {
    case "GET":
      const reportTemplates = await db
        .collection(collection)
        .find({ userId: req.query.userId, reportKey: req.query.reportKey })
        .sort({ name: 1 })
        .toArray();

      return res.json(reportTemplates);
    case "POST":
      const { name, reportKey, parameters } = req.body;
      const userId = "PDN";

      const reportTemplateDocument = {
        name,
        reportKey,
        parameters,
        userId,
      };

      try {
        await db.collection(collection).insertOne(reportTemplateDocument);
      } catch (err) {
        return res.status(400).send("Error saving template!");
      }

      const reportTemplate = await db
        .collection(collection)
        .findOne({ name, reportKey, userId });

      return res.status(201).json(reportTemplate);
    default:
      return res.send();
  }
};

export default handler;
