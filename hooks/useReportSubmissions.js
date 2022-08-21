import { useEffect, useState } from "react";
import api from "../axios";

const useReportSubmissions = (initialSubmissions) => {
  const [submissions, setSubmissions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetch = () => {
    setFetching(true);

    api
      .get("/report-submissions", { params: { userId: "PDN" } })
      .then(({ data }) => setSubmissions(data))
      .finally(setFetching(false));
  };

  const add = (reportSubmission) => {
    setSubmissions((previousState) => [reportSubmission, ...previousState]);
  };

  useEffect(() => {
    if (initialSubmissions) {
      setSubmissions(initialSubmissions);

      return;
    }

    fetch();
  }, []);

  return {
    submissions,
    fetching,
    fetch,
    add,
  };
};

export default useReportSubmissions;
