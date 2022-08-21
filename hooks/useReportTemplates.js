import { useState } from "react";
import api from "../axios";
import { sortObjectsByProperty } from "../utilities/list.utility";

const useReportTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetch = (reportKey) => {
    setFetching(true);

    api
      .get("/report-templates", { params: { userId: "PDN", reportKey } })
      .then(({ data }) => setTemplates(data))
      .finally(() => setFetching(false));
  };

  const save = (templateRequest, onSuccess) => {
    setSaving(true);

    api
      .post("/report-templates", templateRequest)
      .then(({ data: template }) => {
        setTemplates((templates) => {
          const updatedTemplates = [...templates, template];

          return updatedTemplates.sort(sortObjectsByProperty("name"));
        });

        onSuccess(template);
      })
      .finally(() => setSaving(false));
  };

  return {
    templates,
    fetching,
    saving,
    fetch,
    save,
  };
};

export default useReportTemplates;
