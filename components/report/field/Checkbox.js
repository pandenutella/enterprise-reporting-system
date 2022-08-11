import { Switch } from "antd";
import { useEffect } from "react";

const Checkbox = ({ field, value, onChange }) => {
  const { reportKey, key, parameters } = field;

  useEffect(() => {
    onChange(parameters.initialValue);
  }, [reportKey, key]);

  return <Switch checked={value} onChange={onChange} />;
};

export default Checkbox;
