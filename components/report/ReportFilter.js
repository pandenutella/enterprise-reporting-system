import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";

const ReportFilter = ({ filter, onFilter }) => {
  const handleChange = (event) => onFilter(event.target.value);

  return (
    <Input
      placeholder="Type anything to filter reports"
      value={filter}
      onChange={handleChange}
      allowClear
      prefix={<FilterOutlined style={{ marginRight: 4 }} />}
    />
  );
};

export default ReportFilter;
