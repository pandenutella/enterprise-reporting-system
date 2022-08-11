import { Breadcrumb, Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ReportForm from "../../components/report/ReportForm";

const getReportDisplayName = (key, report) =>
  report?.name ?? "Enterprise Reporting System - " + key;

const ReportPage = ({ report, reportGroup }) => {
  const router = useRouter();
  const { key } = router.query;

  return (
    <>
      <Head>
        <title>{getReportDisplayName(key, report)}</title>
      </Head>
      <div style={{ padding: 20 }}>
        <Row gutter={20}>
          <Col flex="auto"></Col>
          <Col flex="600px">
            <Row gutter={20}>
              <Col span={24}>
                <Breadcrumb style={{ marginBottom: 10 }}>
                  <Breadcrumb.Item>
                    <Link href="/reports">Reports</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {reportGroup?.name ?? (
                      <Typography.Text disabled>Unknown Group</Typography.Text>
                    )}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{key}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={24}>
                <ReportForm report={report} />
              </Col>
            </Row>
          </Col>
          <Col flex="auto"></Col>
        </Row>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      report: null,
      reportGroup: null,
    },
  };
};

export default ReportPage;
