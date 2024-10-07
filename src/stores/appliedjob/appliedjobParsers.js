import _get from "lodash.get";
import { dateTimeHelper } from "@app/helper/dateTime";

const appliedjobParsers = {};

appliedjobParsers.parseAppliedJobsList = (res) => {
  const appliedJobsListCount = _get(res, "totalElements", 0);
  if (res && res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }

  const data = res.map(function (item, index) {
    return {
      id: _get(item, "id", index),
      jobId: _get(item, "jobId", ""),
      jobTitle: _get(item, "jobTitle", ""),
      userNote: _get(item, "userNote", ""),
      jobApplicationStatus: _get(item, "jobApplicationStatus", ""),
      jobApplicationAt: _get(item, "jobApplicationAt", ""),
      updatedAt: _get(item, "updatedAt", ""),
      jobAplicationStatusReason: _get(item, "jobAplicationStatusReason", ""),
      createdAt: dateTimeHelper.format(_get(item, "createdAt", "")),
      jobRefNo: _get(item,"jobRefNo","")
    };
  });

  return {data,appliedJobsListCount};
};

appliedjobParsers.parseAppliedJobsDetails = (res) => {
  if (!res) {
    return {};
  }

  const handleSkills = (data = []) => {
    return data.map((item) => {
      return {
        id: _get(item, "id", null),
        name: _get(item, "name", ""),
        experience: _get(item, "experience", ""),
      };
    });
  };
  const handleClient = (data) => {
    return {
      id: _get(data, "id", "NA"),
      clientId: _get(data, "clientId", "NA"),
      clientName: _get(data, "clientName", "NA"),
    };
  };
  const parsedData = {
    jobApplicant: {
      id: _get(res, "jobApplicant.id", ""),
      jobId: _get(res, "jobApplicant.jobId", ""),
      jobTitle: _get(res, "jobApplicant.jobTitle", ""),
      userNote: _get(res, "jobApplicant.userNote", ""),
      jobCandidateId: _get(res, "jobApplicant.jobCandidateId", ""),
      jobApplicationStatus: _get(res, "jobApplicant.jobApplicationStatus", ""),
      jobApplicationAt: _get(res, "jobApplicant.jobApplicationAt", ""),
      jobAplicationStatusReason: _get(
        res,
        "jobApplicant.jobAplicationStatusReason",
        ""
      ),
      createdAt: _get(res, "jobApplicant.createdAt", ""),
    },
    jobDetail: {
      id: _get(res, "jobDetail.id", ""),
      jobRefNo: _get(res, "jobDetail.jobRefNo", ""),
      client: handleClient(_get(res, "jobDetail.client", {})),
      jobTitle: _get(res, "jobDetail.jobTitle", ""),
      jobShortDescription: _get(res, "jobDetail.jobShortDescription", ""),
      jobDescription: _get(res, "jobDescription", ""),
      jobApplicantStatus: _get(res, "jobDetail.jobApplicantStatus", ""),
      skill: handleSkills(_get(res, "jobDetail.skill", [])),
      highlights: _get(res, "jobDetail.highlights", []),
      deliverables: _get(res, "jobDetail.deliverables", []),
      experienceLevel: _get(res, "jobDetail.experienceLevel", ""),
      jobType: _get(res, "jobDetail.jobType", ""),
      projectType: _get(res, "jobDetail.projectType", ""),
      address: {
        location: _get(res, "jobDetail.address.location", ""),
        city: _get(res, "jobDetail.address.city", ""),
        state: _get(res, "jobDetail.address.state", ""),
        country: _get(res, "jobDetail.address.country", ""),
        pinCode: _get(res, "jobDetail.address.pinCode", ""),
      },
      jobTiming: {
        hourRequired: _get(res, "jobDetail.jobTiming.hourRequired", ""),
        hourRequiredPer: _get(res, "jobDetail.jobTiming.hourRequiredPer", ""),
        durationOfWork: _get(res, "jobDetail.jobTiming.durationOfWork", ""),
        durationOfWorkType: _get(
          res,
          "jobDetail.jobTiming.durationOfWorkType",
          ""
        ),
        jobDays: _get(res, "jobDetail.jobTiming.jobDays", []),
        shiftStartTime: _get(res, "jobDetail.jobTiming.shiftStartTime", ""),
        shiftEndTime: _get(res, "jobDetail.jobTiming.shiftEndTime", ""),
      },
      billing: {
        number: _get(res, "jobDetail.billing.number", ""),
        type: _get(res, "jobDetail.billing.type", ""),
      },
      createdAt: _get(res, "jobDetail.billing.createdAt", ""),
    },
  };

  return parsedData;
};

export { appliedjobParsers };
