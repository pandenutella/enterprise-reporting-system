import { Button, Card, Form, Row, Space } from "antd";
import ReportNotFoundResult from "../result/ReportNotFoundResult";
import ReportUnderDevelopmentResult from "../result/ReportUnderDevelopmentResult";

const renderFormButtons = () => (
  <Space>
    <Button htmlType="reset">Reset</Button>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Space>
);

const getReportDisplayName = (key, report) => report?.name ?? key;

const ReportForm = ({ key, report }) => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const renderContent = () => {
    if (!report) return <ReportNotFoundResult />;

    if (report.fields.length) return <Row gutter={20}></Row>;

    return <ReportUnderDevelopmentResult />;
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Card
        title={getReportDisplayName(key, report)}
        size="small"
        extra={report?.fields?.length ? renderFormButtons() : []}
      >
        {renderContent()}
      </Card>
    </Form>
  );
};

export default ReportForm;
