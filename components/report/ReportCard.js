import { Badge, Card, Typography } from "antd";
import Link from "next/link";

const ReportCard = ({ report }) => (
  <Badge.Ribbon color="gold" text={report.key}>
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
