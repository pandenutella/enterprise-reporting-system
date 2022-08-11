import { Layout } from "antd";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <small>
        &copy; Copyright {year} Pan de Nutella. All Rights Reserved.
      </small>
    </Layout.Footer>
  );
};

export default Footer;
