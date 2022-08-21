import { Button, Card, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import TemplateSelect from "./TemplateSelect";

const ReportTemplates = ({
  formRef,
  templates,
  fetching,
  saving,
  onTemplateChange,
  onTemplateSave,
}) => {
  const [name, setName] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    formRef.current = form;
  }, []);

  const handleFieldsChange = ([field]) => {
    switch (field.name[0]) {
      case "selected":
        const template = templates.find((t) => t._id === field.value);

        if (template) form.setFieldValue("name", template.name);
        else form.resetFields();

        setName(template?.name);
        onTemplateChange(template);
        break;
      case "name":
        setName(field.value);
        break;
      default:
        break;
    }
  };

  const handleSave = (values) => onTemplateSave(values);

  return (
    <Card title="Template" size="small" loading={fetching}>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={handleFieldsChange}
        onFinish={handleSave}
      >
        <Form.Item name="selected" label="Selected">
          <TemplateSelect templates={templates} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input allowClear />
        </Form.Item>
        <Space style={{ float: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            disabled={saving || !name}
          >
            Save
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default ReportTemplates;
