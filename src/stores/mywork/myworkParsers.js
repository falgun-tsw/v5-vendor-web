import _get from "lodash.get";
import { dateTimeHelper } from "@app/helper/dateTime";

const myWorkParsers = {};

myWorkParsers.parseMyWorksList = (res) => {
  if (res && res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }
  const workListCount = _get(res,"totalElements",0);
  const data = res.map((data, i) => {
    return {
      id: _get(data, "id", null),
      amountPaid: _get(data, "amountPaid", 0),
      amountStatus: _get(data, "amountStatus", ""),
      createdAt: dateTimeHelper.format(_get(data, "createdAt", "")),
      jobId: _get(data, "jobId", null),
      jobRefNo: _get(data, "jobRefNo", ""),
      jobRating: _get(data, "jobRating", 0),
      jobStatus: _get(data, "jobStatus", ""),
      jobStatusRemark: _get(data, "jobStatusRemark", ""),
      jobTitle: _get(data, "jobTitle", ""),
      totalEarned: _get(data, "totalEarned", 0),
      totalHoursWorked: _get(data, "totalHoursWorked", 0),
    };
  });

  return {data,workListCount};
};

myWorkParsers.parseMyWorkDetails = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return {};
  }

  const handleClient = (data) => {
    return {
      id: _get(data, "id", ""),
      clientId: _get(data, "clientId", ""),
      clientName: _get(data, "clientName", ""),
      clientLogo: _get(data, "clientLogo", ""),
    };
  };

  const handleBilling = (data) => {
    return {
      number: _get(data, "number", ""),
      type: _get(data, "type", ""),
    };
  };
  const handleSkills = (data) => {
    if (data.length) {
      return data.map((skill, i) => {
        return {
          id: _get(skill, "id", null),
          experience: _get(skill, "experience", null),
          name: _get(skill, "name", ""),
        };
      });
    }
    return [];
  };
  const handleJobDetails = (data) => {
    return {
      jobRefNo: _get(data, "jobRefNo", ""),
      jobApplicantStatus: _get(data, "jobApplicantStatus", ""),
      client: handleClient(_get(data, "client", {})),
      jobTitle: _get(data, "jobTitle", ""),
      jobShortDescription: _get(data, "jobShortDescription", ""),
      jobDescription: _get(res, "jobDescription", ""),
      deliverables: _get(data, "deliverables", []),
      modules: _get(data, "modules", []),
      billing: handleBilling(_get(data, "billing", {})),
      skill: handleSkills(_get(res, "skill", [])),
    };
  };
  return {
    id: _get(res, "id", ""),
    jobId: _get(res, "jobId", ""),
    jobTitle: _get(res, "jobTitle", ""),
    jobStatus: _get(res, "jobStatus", ""),
    jobStatusRemark: _get(res, "jobStatusRemark", "NA") || "NA",
    jobApproverRemark: _get(res, "jobApproverRemark", ""),
    jobApproverRemarkAt: _get(res, "jobApproverRemarkAt", ""),
    jobRating: _get(res, "jobRating", ""),
    jobRatingDescription: _get(res, "jobRatingDescription", ""),
    totalHoursWorked: _get(res, "totalHoursWorked", ""),
    totalEarned: _get(res, "totalEarned", ""),
    amountPaid: _get(res, "amountPaid", ""),
    amountStatus: _get(res, "amountStatus", ""),
    payerRemark: _get(res, "payerRemark", "NA") || "NA",
    jobDetails: handleJobDetails(_get(res, "jobDetails", {})),
    jobUserRemark: _get(res, "jobUserRemark", "NA") || "NA",
    notes: _get(res, "notes", "NA") || "NA",
  };
};

myWorkParsers.parseScreenBuilderModules = (response) => {
  if (response.modules) {
    response = response.modules;
  }
  if (!response) {
    return [];
  }
  return response.map((response, i) => {
    return {
      name: _get(response, "name", null),
      id: _get(response, "id", null),
      icon: _get(response, "icon", null),
      status: _get(response, "status", null),
      roles: _get(response, "roles", null),
      workFlowId: _get(response, "workFlowId", null),
      moduleColor: _get(response, "moduleColor", null),
      subModules: _get(response, "subModules", []),
    };
  });
};

export { myWorkParsers };
