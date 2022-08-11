import { Form, Typography } from "antd";

const fieldMapping = {};

const ReportField = ({ field }) => {
  const rules = [];
  if (field.validations?.required)
    rules.push({ required: true, message: `${field.label} is required` });

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
          (Unsupported field type "{field.type}")
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export default ReportField;
