import { Breadcrumb, Col, Row, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../../axios";
import ReportFilter from "../../components/report/ReportFilter";
import ReportGroup from "../../components/report/ReportGroup";
import ReportGroups from "../../components/report/ReportGroups";
import ReportSubmissions from "../../components/report/ReportSubmissions";
import NoReportsResult from "../../components/result/NoReportsResult";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import useReportSubmissions from "../../hooks/useReportSubmissions";

const ReportsPage = ({
  reportGroups,
  reports,
  recentReports,
  reportSubmissions: reportSubmissionsProp,
}) => {
  const [filter, setFilter] = useState("");
  const { reportSubmissions, fetching, fetch } = useReportSubmissions(
    reportSubmissionsProp
  );
  useAutoRefresh(() => fetch());

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
      <Col flex="1000px">
        <Breadcrumb style={{ marginBottom: 10 }}>
          <Breadcrumb.Item>Reports</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[20, 20]}>
          <Col flex="650px">
            <Space direction="vertical" style={{ width: "100%" }}>
              <ReportFilter filter={filter} onFilter={setFilter} />
              {renderRecent()}
              {renderResults()}
            </Space>
          </Col>
          <Col flex="350px">
            <ReportSubmissions
              reportSubmissions={reportSubmissions}
              fetching={fetching}
            />
          </Col>
        </Row>
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

export const getServerSideProps = async () => {
  const userId = "PDN";

  const [
    reportGroupsResponse,
    reportsResponse,
    recentReportKeysResponse,
    reportSubmissionsResponse,
  ] = await axios.all([
    api.get("/report-groups"),
    api.get("/reports"),
    api.get("/report-submissions/recent-report-keys", {
      params: { userId, top: 3 },
    }),
    api.get("/report-submissions", { params: { userId } }),
  ]);

  const reportGroups = reportGroupsResponse.data;
  const reports = reportsResponse.data;

  const recentReportKeys = recentReportKeysResponse.data;
  const recentReports = recentReportKeys.map((reportKey) =>
    reports.find((report) => report.key === reportKey)
  );

  const reportSubmissions = reportSubmissionsResponse.data;

  return {
    props: {
      reportGroups,
      reports,
      recentReports,
      reportSubmissions,
    },
  };
};

export default ReportsPage;
