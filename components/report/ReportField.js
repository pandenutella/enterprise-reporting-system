import { Form, Typography } from "antd";
import Checkbox from "./field/Checkbox";
import Dropdown from "./field/Dropdown";
import Textbox from "./field/Textbox";

const fieldMapping = {
  Checkbox: Checkbox,
  Dropdown: Dropdown,
  Textbox: Textbox,
};

const ReportField = ({ field }) => {
  const rules = [];
  if (field.validations?.required)
    rules.push({ required: true, message: "This field is required" });

  const Field = fieldMapping[field.type];

  return (
    <Form.Item
      label={field.label}
      name={field.key}
      tooltip={field.tooltip}
      rules={rules}
    >
      {Field ? (
        <Field field={field} />
      ) : (
        <Typography.Text italic>
          (Unsupported field type &quot;{field.type}&quot;)
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export default ReportField;
