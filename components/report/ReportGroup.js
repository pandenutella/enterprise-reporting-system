import { Col, Divider, Row, Space } from "antd";
import ReportCard from "./ReportCard";

const ReportGroup = ({ reportGroup, reports }) => (
  <>
    <Divider orientation="left">
      <Space>{reportGroup.name}</Space>
    </Divider>
    <Row gutter={20}>
      {reports.map((report) => (
        <Col key={report.key}>
          <ReportCard report={report} />
        </Col>
      ))}
    </Row>
  </>
);

export default ReportGroup;
