import { Select } from "antd";

const TemplateSelect = ({ templates, value, onChange }) => {
  const options = templates.map((template) => ({
    label: template.name,
    value: template._id,
  }));

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      allowClear
      notFoundContent="No template for this report yet"
    />
  );
};

export default TemplateSelect;
