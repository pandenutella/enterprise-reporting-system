import { Breadcrumb, Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../axios";
import ReportForm from "../../components/report/ReportForm";

const getReportDisplayName = (key, report) =>
  report?.name
    ? `${report.key} - ${report.name}`
    : `Enterprise Reporting System - ${key}`;

const ReportPage = ({ report, reportGroup }) => {
  const router = useRouter();
  const { key } = router.query;

  return (
    <>
      <Head>
        <title>{getReportDisplayName(key, report)}</title>
      </Head>
      <Row>
        <Col flex="auto"></Col>
        <Col flex="700px">
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
          <ReportForm
            reportKey={key}
            report={report}
            reportGroup={reportGroup}
          />
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

  try {
    report = (
      await api.get(`/reports/${key}`, { params: { includeFields: true } })
    )?.data;
    reportGroup = (await api.get(`/report-groups/${report.groupKey}`))?.data;
  } catch (error) {}

  return {
    props: {
      report,
      reportGroup,
    },
  };
};

export default ReportPage;
