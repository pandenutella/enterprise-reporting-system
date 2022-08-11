import { Card, Typography } from "antd";
import Link from "next/link";

const ReportCard = ({ report }) => (
  <Link href={`/reports/${report.key}`}>
    <Card size="small" hoverable>
      <Typography.Text>{report.name}</Typography.Text>
    </Card>
  </Link>
);

export default ReportCard;
