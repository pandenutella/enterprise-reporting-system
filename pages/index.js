import { Alert } from "antd";
import Head from "next/head";
import clientPromise from "../lib/mongodb";

const HomePage = ({ connected }) => (
  <>
    <Head>
      <title>Enterprise Reporting System</title>
    </Head>
    {connected && (
      <Alert type="success" banner message="Connected to MongoDB" />
    )}
  </>
);

export const getServerSideProps = async (context) => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { connected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { connected: false },
    };
  }
};

export default HomePage;
