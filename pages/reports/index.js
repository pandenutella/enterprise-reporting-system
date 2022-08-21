import { Space } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../../axios";
import PageLayout from "../../components/layout/PageLayout";
import ReportFilter from "../../components/report/ReportFilter";
import ReportGroup from "../../components/report/ReportGroup";
import ReportGroups from "../../components/report/ReportGroups";
import ReportSubmissions from "../../components/report/ReportSubmissions";
import NoReportsResult from "../../components/result/NoReportsResult";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import useReportSubmissions from "../../hooks/useReportSubmissions";

const breadcrumbs = [{ label: "Reports" }];

const ReportsPage = ({
  reportGroups,
  reports,
  recentReports,
  submissions: submissionsServerProp,
}) => {
  const [filter, setFilter] = useState("");
  const { submissions, fetching, fetch } = useReportSubmissions(
    submissionsServerProp
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
    <PageLayout
      breadcrumbs={breadcrumbs}
      center={
        <Space direction="vertical" style={{ width: "100%" }}>
          <ReportFilter filter={filter} onFilter={setFilter} />
          {renderRecent()}
          {renderResults()}
        </Space>
      }
      right={
        <ReportSubmissions submissions={submissions} fetching={fetching} />
      }
    />
  );
};

export const getServerSideProps = async () => {
  const userId = "PDN";

  const [
    { data: reportGroups },
    { data: reports },
    { data: recentReportKeys },
    { data: submissions },
  ] = await axios.all([
    api.get("/report-groups"),
    api.get("/reports"),
    api.get("/report-submissions/recent-report-keys", {
      params: { userId, top: 3 },
    }),
    api.get("/report-submissions", { params: { userId } }),
  ]);

  const recentReports = recentReportKeys.map((reportKey) =>
    reports.find((report) => report.key === reportKey)
  );

  return {
    props: {
      reportGroups,
      reports,
      recentReports,
      submissions,
    },
  };
};

export default ReportsPage;
