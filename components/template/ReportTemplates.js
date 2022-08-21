import { Button, Card, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import TemplateSelect from "./TemplateSelect";

const ReportTemplates = ({
  formRef,
  templates,
  fetching,
  saving,
  updating,
  onTemplateChange,
  onTemplateSave,
  onTemplateUpdate,
}) => {
  const [selected, setSelected] = useState();
  const [name, setName] = useState();
  const [action, setAction] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    formRef.current = form;
  }, []);

  const handleFieldsChange = ([field]) => {
    const { value } = field;

    switch (field.name[0]) {
      case "selected":
        setSelected(value);

        if (!value) {
          form.resetFields();

          return;
        }

        const template = templates.find((t) => t._id === value);

        setName(template.name);
        form.setFieldValue("name", template.name);

        onTemplateChange(template);

        break;
      case "name":
        setName(value);

        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    setAction("save");
    form.submit();
  };

  const handleUpdate = () => {
    setAction("update");
    form.submit();
  };

  const handleProcess = ({ selected, name }) => {
    if (!["save", "update"].includes(action)) return;

    if (action === "update") {
      onTemplateUpdate(selected, name);

      return;
    }

    onTemplateSave(name);
  };

  return (
    <Card title="Template" size="small" loading={fetching}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleProcess}
        onFieldsChange={handleFieldsChange}
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
            type={selected ? "outlined" : "primary"}
            loading={saving}
            disabled={!name || saving || updating}
            onClick={handleSave}
          >
            Save {selected && "as New"}
          </Button>
          {selected && (
            <Button
              type="primary"
              loading={updating}
              disabled={saving || updating}
              onClick={handleUpdate}
            >
              Update
            </Button>
          )}
        </Space>
      </Form>
    </Card>
  );
};

export default ReportTemplates;
