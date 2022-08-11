import { Button, Result } from "antd";
import Link from "next/link";

const ReportNotFoundResult = () => (
  <Result
    status="404"
    title="NOT FOUND"
    subTitle="The report you are trying to visit does not exist."
    extra={
      <Link href="/reports">
        <Button type="primary">Back to Reports</Button>
      </Link>
    }
  />
);

export default ReportNotFoundResult;
