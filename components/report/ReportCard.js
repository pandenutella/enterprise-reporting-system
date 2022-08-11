import { Badge, Card, Typography } from "antd";
import Link from "next/link";

const ReportCard = ({ report, reportGroup }) => (
  <Badge.Ribbon color={reportGroup.color} text={report.key}>
    <Link href={`/reports/${report.key}`}>
      <Card size="small" hoverable>
        <Typography.Text style={{ paddingRight: 50 }}>
          {report.name}
        </Typography.Text>
      </Card>
    </Link>
  </Badge.Ribbon>
);

export default ReportCard;
