import dbPromise from "../../../../lib/mongodb";

const handler = async (req, res) => {
  const db = await dbPromise;

  const { userId, top } = req.query;

  const reportSubmissions = await db
    .collection("reportSubmissions")
    .find({ userId })
    .sort({ dateSubmitted: -1 })
    .toArray();

  const recentReportKeys = [];
  for (const reportSubmission of reportSubmissions) {
    const { reportKey } = reportSubmission;
    if (recentReportKeys.includes(reportKey)) continue;

    recentReportKeys.push(reportKey);

    if (recentReportKeys.length === top) return;
  }

  res.json(recentReportKeys);
};

export default handler;
