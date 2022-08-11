import { Select } from "antd";
import { useEffect } from "react";

const Dropdown = ({ field, value, onChange }) => {
  const { reportKey, key, parameters, validations } = field;

  const formattedOptions = parameters.options.map((option) => ({
    ...option,
    key: option.value,
  }));

  useEffect(() => {
    const value =
      !parameters.initialValue && validations.required
        ? formattedOptions[0]?.value
        : parameters.initialValue;

    onChange(value);
  }, [reportKey, key]);

  return (
    <Select
      value={value}
      onChange={onChange}
      options={formattedOptions}
      allowClear
    />
  );
};

export default Dropdown;
