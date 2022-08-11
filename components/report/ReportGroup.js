import { Col, Divider, Row, Space } from "antd";
import DynamicIcon from "./DynamicIcon";
import ReportCard from "./ReportCard";

const ReportGroup = ({ reportGroup, reports }) => (
  <>
    <Divider orientation="left">
      <Space>
        <DynamicIcon name={reportGroup.icon} color={reportGroup.color} />
        {reportGroup.name}
      </Space>
    </Divider>
    <Row gutter={[5, 5]}>
      {reports.map((report) => (
        <Col key={report.key}>
          <ReportCard report={report} />
        </Col>
      ))}
    </Row>
  </>
);

export default ReportGroup;
