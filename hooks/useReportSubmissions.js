import { useEffect, useState } from "react";
import api from "../axios";

const useReportSubmissions = (initialSubmissions) => {
  const [submissions, setSubmissions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetch = () => {
    setFetching(true);

    api
      .get("/report-submissions", { params: { userId: "PDN" } })
      .then(({ data }) => setSubmissions(data))
      .finally(setFetching(false));
  };

  const submit = (submissionRequest, onSuccess) => {
    setSubmitting(true);

    api
      .post("/report-submissions", submissionRequest)
      .then(({ data: submission }) => {
        setSubmissions((submissions) => [submission, ...submissions]);
        onSuccess(submission);
      })
      .finally(() => setSubmitting(false));
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
    submitting,
    fetch,
    submit,
  };
};

export default useReportSubmissions;
