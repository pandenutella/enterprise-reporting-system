import "antd/dist/antd.css";
import PageLayout from "../components/layout/PageLayout";

const App = ({ Component, pageProps }) => (
  <PageLayout>
    <Component {...pageProps} />
  </PageLayout>
);

export default App;
