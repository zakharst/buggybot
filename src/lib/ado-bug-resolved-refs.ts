import defaults from "../../config/ado-bug-field-refs.defaults.json";

export function resolvedReportedFromFieldRef(): string {
  return (
    process.env.AZURE_DEVOPS_REPORTED_FROM_FIELD_REF?.trim() ||
    defaults.reportedFrom
  );
}

export function resolvedReproStepsFieldRef(): string {
  return (
    process.env.AZURE_DEVOPS_REPRO_STEPS_FIELD_REF?.trim() ||
    defaults.reproSteps
  );
}

export function resolvedSystemInfoFieldRef(): string {
  return (
    process.env.AZURE_DEVOPS_SYSTEM_INFO_FIELD_REF?.trim() ||
    defaults.systemInfo
  );
}

export function resolvedAcceptanceCriteriaFieldRef(): string {
  return (
    process.env.AZURE_DEVOPS_ACCEPTANCE_CRITERIA_FIELD_REF?.trim() ||
    defaults.acceptanceCriteria
  );
}
