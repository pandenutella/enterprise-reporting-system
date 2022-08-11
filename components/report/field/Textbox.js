import { Input } from "antd";
import { useEffect } from "react";

const Textbox = ({ field, value, onChange }) => {
  const { reportKey, key, parameters } = field;

  useEffect(() => {
    if (parameters.initialValue) onChange(parameters.initialValue);
  }, [reportKey, key]);

  return <Input value={value} onChange={onChange} allowClear />;
};

export default Textbox;
