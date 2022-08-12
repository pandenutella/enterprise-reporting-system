import { Col, Row, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../../axios";
import ReportFilter from "../../components/report/ReportFilter";
import ReportGroups from "../../components/report/ReportGroups";
import NoReportsResult from "../../components/result/NoReportsResult";

const ReportsPage = ({ reportGroups, reports }) => {
  const [filter, setFilter] = useState("");

  const filteredReports = reports.filter(
    (report) =>
      report.key.toUpperCase().includes(filter.toUpperCase()) ||
      report.name.toUpperCase().includes(filter.toUpperCase())
  );

  const renderResults = () => {
    if (!filteredReports.length) return <NoReportsResult />;

    const filteredReportGroupKeys = [
      ...new Set(filteredReports.map((report) => report.groupKey).sort()),
    ];
    const filteredReportGroups = reportGroups.filter((reportGroup) =>
      filteredReportGroupKeys.includes(reportGroup.key)
    );

    return (
      <ReportGroups
        reportGroups={filteredReportGroups}
        reports={filteredReports}
      />
    );
  };

  return (
    <Row>
      <Col flex="auto" />
      <Col flex="700px">
        <Space direction="vertical" style={{ width: "100%" }}>
          <ReportFilter filter={filter} onFilter={setFilter} />
          {renderResults()}
        </Space>
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

export const getServerSideProps = async () => {
  const [reportGroupsResponse, reportsResponse] = await axios.all([
    api.get("/report-groups"),
    api.get("/reports"),
  ]);

  const reportGroups = reportGroupsResponse.data;
  const reports = reportsResponse.data;

  return {
    props: {
      reportGroups,
      reports,
    },
  };
};

export default ReportsPage;
