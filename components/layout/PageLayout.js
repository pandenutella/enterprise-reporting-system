import { Layout } from "antd";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const PageLayout = ({ children }) => (
  <Layout style={{ height: "100vh" }}>
    <Head>
      <title>Enterprise Reporting System</title>
    </Head>
    <Header />
    <Layout.Content>{children}</Layout.Content>
    <Footer />
  </Layout>
);

export default PageLayout;
