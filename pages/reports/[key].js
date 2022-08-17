import { useRouter } from "next/router";
import api from "../../axios";
import PageLayout from "../../components/layout/PageLayout";
import ReportForm from "../../components/report/ReportForm";
import ReportSubmissions from "../../components/report/ReportSubmissions";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import useReportSubmissions from "../../hooks/useReportSubmissions";

const getReportDisplayName = (key, report) =>
  report?.name
    ? `${report.key} - ${report.name}`
    : `Enterprise Reporting System - ${key}`;

const ReportPage = ({
  report,
  reportGroup,
  reportSubmissions: reportSubmissionsProp,
}) => {
  const router = useRouter();
  const { key } = router.query;
  const { reportSubmissions, fetching, fetch, add } = useReportSubmissions(
    reportSubmissionsProp
  );
  useAutoRefresh(() => fetch());

  const handleSubmit = (reportSubmission) => add(reportSubmission);

  const breadcrumbs = [{ label: "Reports", href: "/reports" }];
  breadcrumbs.push(
    reportGroup?.name
      ? { label: reportGroup.name }
      : { label: "Unknown Group", disabled: true }
  );

  return (
    <PageLayout
      title={getReportDisplayName(key, report)}
      breadcrumbs={breadcrumbs}
      center={
        <ReportForm
          reportKey={key}
          report={report}
          reportGroup={reportGroup}
          onSubmit={handleSubmit}
        />
      }
      right={
        <ReportSubmissions
          reportSubmissions={reportSubmissions}
          fetching={fetching}
        />
      }
    />
  );
};

export const getServerSideProps = async (context) => {
  const { key } = context.query;

  let report = null;
  let reportGroup = null;
  let reportSubmissions = [];

  try {
    report = (
      await api.get(`/reports/${key}`, { params: { includeFields: true } })
    )?.data;
    reportGroup = (await api.get(`/report-groups/${report.groupKey}`))?.data;
    reportSubmissions = (
      await api.get("/report-submissions", {
        params: { userId: "PDN" },
      })
    ).data;
  } catch (error) {}

  return {
    props: {
      report,
      reportGroup,
      reportSubmissions,
    },
  };
};

export default ReportPage;
