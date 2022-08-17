import { useEffect, useState } from "react";
import api from "../axios";

const useReportSubmissions = (initialValue) => {
  const [reportSubmissions, setReportSubmissions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetch = () => {
    setFetching(true);

    api
      .get("/report-submissions", { params: { userId: "PDN" } })
      .then((response) => setReportSubmissions(response.data))
      .finally(setFetching(false));
  };

  const add = (reportSubmission) => {
    setReportSubmissions((previousState) => [
      reportSubmission,
      ...previousState,
    ]);
  };

  useEffect(() => {
    if (initialValue) {
      setReportSubmissions(initialValue);

      return;
    }

    fetch();
  }, []);

  return {
    reportSubmissions,
    fetching,
    fetch,
    add,
  };
};

export default useReportSubmissions;
