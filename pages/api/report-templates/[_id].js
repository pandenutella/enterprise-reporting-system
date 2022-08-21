import { ObjectId } from "mongodb";
import dbPromise from "../../../lib/mongodb";

const collection = "reportTemplates";

const handler = async (req, res) => {
  const db = await dbPromise;

  switch (req.method) {
    case "PATCH":
      const { _id: rawId } = req.query;
      const _id = new ObjectId(rawId);
      const { name, parameters } = req.body;

      const reportTemplate = await db.collection(collection).findOne({ _id });

      if (!reportTemplate)
        return res.status(404).send("Template does not exist!");

      try {
        await db
          .collection(collection)
          .updateOne({ _id }, { $set: { name, parameters } });
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Error updating template!", error: err });
      }

      const updatedReportTemplate = await db
        .collection(collection)
        .findOne({ _id });

      return res.status(200).json(updatedReportTemplate);
    default:
      return res.send();
  }
};

export default handler;
