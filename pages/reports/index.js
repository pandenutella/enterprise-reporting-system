import { Col, Row, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../../axios";
import ReportFilter from "../../components/report/ReportFilter";
import ReportGroup from "../../components/report/ReportGroup";
import ReportGroups from "../../components/report/ReportGroups";
import NoReportsResult from "../../components/result/NoReportsResult";

const ReportsPage = ({ reportGroups, reports, recentReports }) => {
  const [filter, setFilter] = useState("");

  const filteredReports = reports.filter(
    (report) =>
      report.key.toUpperCase().includes(filter.toUpperCase()) ||
      report.name.toUpperCase().includes(filter.toUpperCase())
  );

  const renderRecent = () => {
    if (!recentReports.length) return <></>;

    const reportGroup = {
      key: "_RECENT",
      name: "Recently Submitted",
      icon: null,
      color: null,
    };

    return <ReportGroup reportGroup={reportGroup} reports={recentReports} />;
  };

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
          {renderRecent()}
          {renderResults()}
        </Space>
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

export const getServerSideProps = async () => {
  const [reportGroupsResponse, reportsResponse, recentReportKeysResponse] =
    await axios.all([
      api.get("/report-groups"),
      api.get("/reports"),
      api.get("/report-submissions/recent-report-keys", {
        params: { userId: "PDN", top: 3 },
      }),
    ]);

  const reportGroups = reportGroupsResponse.data;
  const reports = reportsResponse.data;

  const recentReportKeys = recentReportKeysResponse.data;
  const recentReports = recentReportKeys.map((reportKey) =>
    reports.find((report) => report.key === reportKey)
  );

  return {
    props: {
      reportGroups,
      reports,
      recentReports,
    },
  };
};

export default ReportsPage;
