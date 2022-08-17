import { Layout } from "antd";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const AppLayout = ({ children }) => (
  <Layout style={{ minWidth: "1040px" }}>
    <Head>
      <title>Enterprise Reporting System</title>
    </Head>
    <Header />
    <Layout.Content
      style={{
        marginTop: 64,
        minHeight: "calc(100vh - 64px - 70px)",
        padding: 20,
      }}
    >
      {children}
    </Layout.Content>
    <Footer />
  </Layout>
);

export default AppLayout;
