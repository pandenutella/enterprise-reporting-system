import { Button, Card, Col, Form, Row, Space } from "antd";
import ReportNotFoundResult from "../result/ReportNotFoundResult";
import ReportUnderDevelopmentResult from "../result/ReportUnderDevelopmentResult";
import ReportField from "./ReportField";

const renderColumn = (key, field) => (
  <Col key={key} span={12}>
    {field && <ReportField field={field} />}
  </Col>
);

const renderColumns = (fields) => {
  let currentColumn = 1;
  const columnFields = [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (currentColumn === 1 && !field.block) {
      columnFields.push(renderColumn(field.key, field));
      currentColumn = 2;
    } else if (currentColumn === 1 && field.block) {
      columnFields.push(renderColumn(field.key, field));
      columnFields.push(renderColumn(i));
    } else if (currentColumn === 2 && !field.block) {
      columnFields.push(renderColumn(field.key, field));
      currentColumn = 1;
    } else if (currentColumn === 2 && field.block) {
      columnFields.push(renderColumn(i));
      columnFields.push(renderColumn(field.key, field));
      columnFields.push(renderColumn(i));
      currentColumn = 1;
    }
  }

  return columnFields;
};

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

    if (report.fields.length)
      return <Row gutter={20}>{renderColumns(report.fields)}</Row>;

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
