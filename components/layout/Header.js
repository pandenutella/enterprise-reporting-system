import { HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";

const items = [
  {
    key: "home",
    label: <Link href="/">Home</Link>,
    icon: <HomeOutlined />,
  },
];

const Header = () => (
  <Layout.Header>
    <Menu theme="dark" mode="horizontal" selectedKeys={[]} items={items} />
  </Layout.Header>
);

export default Header;
