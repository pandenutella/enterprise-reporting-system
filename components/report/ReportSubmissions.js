import { LoadingOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import moment from "moment";

const ReportSubmissions = ({ reportSubmissions, fetching }) => {
  const dataSource = reportSubmissions.map((reportSubmission) => ({
    ...reportSubmission,
    key: reportSubmission.key,
  }));

  return (
    <Card title="Report Submissions" size="small">
      <List
        dataSource={dataSource}
        renderItem={(reportSubmission) => (
          <List.Item key={reportSubmission.key}>
            <List.Item.Meta
              avatar={<LoadingOutlined />}
              title={reportSubmission.key}
              description={moment(reportSubmission.dateSubmitted).format(
                "MM/DD/YYYY hh:mm A"
              )}
            />
          </List.Item>
        )}
        loading={fetching}
        locale={{ emptyText: "No submissions yet" }}
      />
    </Card>
  );
};

export default ReportSubmissions;
