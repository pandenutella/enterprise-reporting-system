import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../axios";
import ReportFilter from "../components/report/ReportFilter";
import ReportGroup from "../components/report/ReportGroup";

const ReportsPage = () => {
  const [filter, setFilter] = useState("");
  const [reportGroups, setReportGroups] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const endpoints = ["/report-groups", "/reports"];

    axios.all(endpoints.map((endpoint) => api.get(endpoint))).then(
      axios.spread((reportGroupsResponse, reportsResponse) => {
        setReportGroups(reportGroupsResponse.data);
        setReports(reportsResponse.data);
      })
    );
  }, []);

  return (
    <Row style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Col flex="auto" />
      <Col flex="700px">
        <Row gutter={[20]}>
          <Col span={24}>
            <ReportFilter filter={filter} onFilter={setFilter} />
          </Col>
          <Col span={24}>
            {reportGroups.map((reportGroup) => {
              const filteredReports = reports
                .filter((report) => report.groupKey === reportGroup.key)
                .filter(
                  (report) =>
                    report.key.toUpperCase().includes(filter.toUpperCase()) ||
                    report.name.toUpperCase().includes(filter.toUpperCase())
                );

              return (
                <ReportGroup
                  key={reportGroup.key}
                  reportGroup={reportGroup}
                  reports={filteredReports}
                />
              );
            })}
          </Col>
        </Row>
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

export default ReportsPage;
