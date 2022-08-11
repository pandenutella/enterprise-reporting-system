import { Button, Card, Col, Form, Row, Space, Typography } from "antd";
import ReportNotFoundResult from "../result/ReportNotFoundResult";
import ReportUnderDevelopmentResult from "../result/ReportUnderDevelopmentResult";
import DynamicIcon from "./DynamicIcon";
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

const getReportDisplayName = (key, report, reportGroup) => {
  if (!report?.name) return key;

  return (
    <Space>
      <DynamicIcon name={reportGroup.icon} color={reportGroup.color} />
      <Typography.Text>{report.name}</Typography.Text>
    </Space>
  );
};

const ReportForm = ({ reportKey, report, reportGroup }) => {
  if (!report)
    return (
      <Card size="small">
        <ReportNotFoundResult />
      </Card>
    );

  const handleSubmit = (values) => {
    console.log(values);
  };

  const renderContent = () => {
    if (!report.fields.length) return <ReportUnderDevelopmentResult />;

    return <Row gutter={20}>{renderColumns(report.fields)}</Row>;
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Card
        title={getReportDisplayName(reportKey, report, reportGroup)}
        size="small"
        extra={report?.fields?.length ? renderFormButtons() : []}
      >
        {renderContent()}
      </Card>
    </Form>
  );
};

export default ReportForm;
