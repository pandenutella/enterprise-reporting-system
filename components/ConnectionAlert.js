import { Alert } from "antd";

const ConnectionAlert = ({ connected }) => {
  const type = connected ? "info" : "warning";
  const message = connected
    ? "System is up and running."
    : "System is down. Please try again later.";

  return <Alert type={type} banner message={message} />;
};

export default ConnectionAlert;
