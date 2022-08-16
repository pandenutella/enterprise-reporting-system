import { Breadcrumb, Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../axios";
import ReportForm from "../../components/report/ReportForm";
import ReportSubmissions from "../../components/report/ReportSubmissions";
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
  const { reportSubmissions, fetching } = useReportSubmissions(
    reportSubmissionsProp
  );

  return (
    <>
      <Head>
        <title>{getReportDisplayName(key, report)}</title>
      </Head>
      <Row>
        <Col flex="auto"></Col>
        <Col flex="1000px">
          <Breadcrumb style={{ marginBottom: 10 }}>
            <Breadcrumb.Item>
              <Link href="/reports">Reports</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {reportGroup?.name ?? (
                <Typography.Text disabled>Unknown Group</Typography.Text>
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={[20, 20]}>
            <Col flex="650px">
              <ReportForm
                reportKey={key}
                report={report}
                reportGroup={reportGroup}
              />
            </Col>
            <Col flex="350px">
              <ReportSubmissions
                reportSubmissions={reportSubmissions}
                fetching={fetching}
              />
            </Col>
          </Row>
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </>
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
    reportSubmissions = await api.get("/report-submissions", {
      params: { userId: "PDN" },
    });
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
