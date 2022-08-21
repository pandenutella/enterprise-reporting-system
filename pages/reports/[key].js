import { Col, message, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import api from "../../axios";
import PageLayout from "../../components/layout/PageLayout";
import ReportForm from "../../components/report/ReportForm";
import ReportSubmissions from "../../components/report/ReportSubmissions";
import ReportTemplates from "../../components/template/ReportTemplates";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import useReportSubmissions from "../../hooks/useReportSubmissions";
import useReportTemplates from "../../hooks/useReportTemplates";

const getReportDisplayName = (key, report) =>
  report?.name
    ? `${report.key} - ${report.name}`
    : `Enterprise Reporting System - ${key}`;

const ReportPage = ({
  report,
  reportGroup,
  reportSubmissions: reportSubmissionsProp,
}) => {
  const router = useRouter();
  const { key } = router.query;

  const {
    submissions,
    fetching: submissionsFetching,
    submitting,
    fetch: fetchSubmissions,
    submit: submitReport,
  } = useReportSubmissions(reportSubmissionsProp);

  const {
    templates,
    fetching: templatesFetching,
    saving: templateSaving,
    updating: templateUpdating,
    fetch: fetchTemplates,
    save: saveTemplate,
    update: updateTemplate,
  } = useReportTemplates();

  useAutoRefresh(() => fetchSubmissions());
  const reportForm = useRef(null);
  const templateForm = useRef(null);

  useEffect(() => fetchTemplates(report.key), []);

  const handleSubmit = (submissionRequest) => {
    submitReport(submissionRequest, (submission) => {
      message.success(
        `Your ${submissionRequest.reportKey} report has been submitted successfully with key "${submission.key}".`
      );
    });
  };

  const handleTemplateChange = (template) => {
    if (!reportForm.current) return;

    if (!template) {
      reportForm.current.resetFields();

      return;
    }

    reportForm.current.setFieldsValue(template.parameters);
  };

  const handleTemplateSave = async (name) => {
    if (!reportForm.current) return;

    try {
      const values = await reportForm.current.validateFields();

      const templateRequest = {
        name,
        reportKey: key,
        parameters: {
          event: values.event,
          date: values.date,
          remarks: values.remarks ?? null,
          withNegative: values.withNegative,
        },
      };

      saveTemplate(templateRequest, (template) => {
        templateForm.current.setFieldValue("selected", template._id);
        message.success(
          `Template "${template.name}" has been saved successfully.`
        );
      });
    } catch (error) {}
  };

  const handleTemplateUpdate = async (_id, name) => {
    if (!reportForm.current) return;

    try {
      const values = await reportForm.current.validateFields();

      const templateRequest = {
        name,
        parameters: {
          event: values.event,
          date: values.date,
          remarks: values.remarks ?? null,
          withNegative: values.withNegative,
        },
      };

      updateTemplate(_id, templateRequest, (template) => {
        message.success(
          `Template "${template.name}" has been updated successfully.`
        );
      });
    } catch (error) {}
  };

  const breadcrumbs = [{ label: "Reports", href: "/reports" }];
  breadcrumbs.push(
    reportGroup?.name
      ? { label: reportGroup.name }
      : { label: "Unknown Group", disabled: true }
  );

  return (
    <PageLayout
      title={getReportDisplayName(key, report)}
      breadcrumbs={breadcrumbs}
      center={
        <ReportForm
          formRef={reportForm}
          reportKey={key}
          report={report}
          reportGroup={reportGroup}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      }
      right={
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <ReportTemplates
              formRef={templateForm}
              templates={templates}
              fetching={templatesFetching}
              saving={templateSaving}
              updating={templateUpdating}
              onTemplateChange={handleTemplateChange}
              onTemplateSave={handleTemplateSave}
              onTemplateUpdate={handleTemplateUpdate}
            />
          </Col>
          <Col span={24}>
            <ReportSubmissions
              submissions={submissions}
              fetching={submissionsFetching}
            />
          </Col>
        </Row>
      }
    />
  );
};

export const getServerSideProps = async (context) => {
  const { key } = context.query;

  let report = null;
  let reportGroup = null;
  let reportSubmissions = [];

  try {
    report = (
      await api.get(`/reports/${key}`, { params: { includeFields: true } })
    )?.data;
    reportGroup = (await api.get(`/report-groups/${report.groupKey}`))?.data;
    reportSubmissions = (
      await api.get("/report-submissions", {
        params: { userId: "PDN" },
      })
    ).data;
  } catch (error) {}

  return {
    props: {
      report,
      reportGroup,
      reportSubmissions,
    },
  };
};

export default ReportPage;
