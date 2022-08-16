import moment from "moment";
import dbPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  const db = await dbPromise;

  switch (req.method) {
    case "POST":
      const userId = "PDN";
      const { reportKey, parameters } = req.body;
      const dateSubmitted = moment();
      const key = `${userId}_${reportKey}_${dateSubmitted.format(
        "YYYYMMDDmmssSSS"
      )}`;

      const reportSubmission = {
        key,
        userId,
        reportKey,
        parameters,
        dateSubmitted: dateSubmitted.toISOString(),
        status: "Submitted",
      };

      db.collection("reportSubmissions").insertOne(reportSubmission, (err) => {
        if (err) return res.status(400).send("Error submitting report!");

        return res.status(201).json(reportSubmission);
      });
    default:
      break;
  }
};

export default handler;
