import { DatePicker as AntDDatePicker } from "antd";
import moment from "moment";
import { useEffect } from "react";

const unitFullNameMap = {
  D: "days",
  W: "weeks",
  M: "months",
  Y: "years",
};

const getInitialValueParts = (initialValue) => {
  if (!initialValue) return { unit: "days", offset: 0 };

  const unit = unitFullNameMap[initialValue.substring(initialValue.length - 1)];
  const offset = initialValue.substring(0, initialValue.length - 1);

  return { unit, offset };
};

const DatePicker = ({ field, value, onChange }) => {
  const { reportKey, key, parameters } = field;
  const displayFormat = parameters.displayFormat ?? "YYYYMMDD";
  const valueFormat = parameters.valueFormat ?? "YYYYMMDD";

  const momentValue = value ? moment(value, valueFormat) : moment();

  useEffect(() => {
    const { unit, offset } = getInitialValueParts(parameters.initialValue);

    const value =
      parameters.initialValue && offset
        ? moment().add(offset, unit).format(valueFormat)
        : moment().format(valueFormat);

    onChange(value);
  }, [reportKey, key]);

  const handleChange = (value) => onChange(value.format(valueFormat));

  return (
    <AntDDatePicker
      value={momentValue}
      onChange={handleChange}
      format={displayFormat}
      style={{ width: "100%" }}
    />
  );
};

export default DatePicker;
