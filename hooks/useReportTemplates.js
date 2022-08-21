import { useState } from "react";
import api from "../axios";
import { sortObjectsByProperty } from "../utilities/list.utility";

const useReportTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

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

  const update = (_id, templateRequest, onSuccess) => {
    setUpdating(true);

    api
      .patch(`/report-templates/${_id}`, templateRequest)
      .then(({ data: template }) => {
        setTemplates((templates) =>
          templates
            .map((t) => (t._id === template._id ? template : t))
            .sort(sortObjectsByProperty("name"))
        );

        onSuccess(template);
      })
      .finally(() => setUpdating(false));
  };

  return {
    templates,
    fetching,
    saving,
    updating,
    fetch,
    save,
    update,
  };
};

export default useReportTemplates;
