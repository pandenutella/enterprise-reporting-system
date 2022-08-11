import { Button, Result } from "antd";
import Link from "next/link";

const ReportUnderDevelopmentResult = () => (
  <Result
    status="404"
    title="OOPS"
    subTitle="Sorry, this report is still under development."
    extra={
      <Link href="/reports">
        <Button type="primary">Back to Reports</Button>
      </Link>
    }
  />
);

export default ReportUnderDevelopmentResult;
