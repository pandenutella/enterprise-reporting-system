import "antd/dist/antd.css";
import AppLayout from "../components/layout/AppLayout";

const App = ({ Component, pageProps }) => (
  <AppLayout>
    <Component {...pageProps} />
  </AppLayout>
);

export default App;
