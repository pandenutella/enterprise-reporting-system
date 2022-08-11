import { Col, Row } from "antd";
import axios from "axios";
import { useState } from "react";
import api from "../../axios";
import ReportFilter from "../../components/report/ReportFilter";
import ReportGroup from "../../components/report/ReportGroup";

const ReportsPage = ({ reportGroups, reports }) => {
  const [filter, setFilter] = useState("");

  return (
    <Row>
      <Col flex="auto" />
      <Col flex="700px">
        <ReportFilter filter={filter} onFilter={setFilter} />
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
