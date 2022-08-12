import ReportGroup from "./ReportGroup";

const ReportGroups = ({ reportGroups, reports }) => {
  return reportGroups.map((reportGroup) => {
    const reportsUnderGroup = reports.filter(
      (report) => report.groupKey === reportGroup.key
    );

    return (
      <ReportGroup
        key={reportGroup.key}
        reportGroup={reportGroup}
        reports={reportsUnderGroup}
      />
    );
  });
};

export default ReportGroups;
