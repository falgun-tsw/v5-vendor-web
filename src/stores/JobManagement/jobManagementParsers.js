import _get from "lodash.get";

const jobManagementParsers = {};

jobManagementParsers.parseJobList = (res) => {
  const totalJobCount = _get(res, "totalElements", 0);
  if (res && res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }

  const handleJobTiming = (data) => {
    return {
      durationOfWork: _get(data, "durationOfWork", ""),
      durationOfWorkType: _get(data, "durationOfWorkType", ""),
      hourRequired: _get(data, "hourRequired", ""),
      hourRequiredPer: _get(data, "hourRequiredPer", ""),
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
      return data.map((skill) => {
        return {
          name: _get(skill, "name", "NA"),
        };
      });
    }
    return [];
  };

  const data = res.map(function (response, i) {
    return {
      id: _get(response, "id", null),
      jobRefNo: _get(response, "jobRefNo", null),
      jobType: _get(response, "jobType", ""),
      projectType: _get(response, "projectType", ""),
      jobTitle: _get(response, "jobTitle", ""),
      jobShortDescription: _get(response, "jobShortDescription", ""),
      jobDescription: _get(response, "jobDescription", "NA"),
      jobTiming: handleJobTiming(_get(response, "jobTiming", {})),
      billing: handleBilling(_get(response, "billing", {})),
      skills: handleSkills(_get(response, "skills", [])),
      totalJobCount,
    };
  });

  return { data, totalJobCount };
};

jobManagementParsers.parseSkillsList = (res) => {
  if (res && res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }

  const data = res.map((skill, i) => {
    return {
      id: _get(skill, "id", ""),
      name: _get(skill, "name", ""),
      experience: _get(skill, "experience", null),
    };
  });
  return data;
};

jobManagementParsers.parseSkillsCategoriesList = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return [];
  }

  const data = res.map(function (response, i) {
    return {
      id: _get(response, "id", null),
      name: _get(response, "name", ""),
      parentSkillcategoryId: _get(response, "parentSkillcategoryId", null),
      active: _get(response, "active", false),
    };
  });

  return data;
};

jobManagementParsers.parseJobDetails = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return {};
  }

  const handleAddress = (data) => {
    return {
      location: _get(data, "location", ""),
      city: _get(data, "city", ""),
      state: _get(data, "state", ""),
      country: _get(data, "country", ""),
      pinCode: _get(data, "pinCode", ""),
    };
  };

  const handleJobTiming = (data) => {
    const formatTime12Hour = (time) => {
      const hour = parseInt(time.substr(0, 2));
      const minute = time.substr(3, 2);
      let period = "AM";

      if (hour === 0) {
        period = "AM";
      } else if (hour === 12) {
        period = "PM";
      } else if (hour > 12) {
        period = "PM";
      } else {
        period = "AM";
      }

      const formattedHour = hour === 0 || hour === 12 ? 12 : hour % 12;

      return `${formattedHour}:${minute} ${period}`;
    };
    return {
      hourRequired: _get(data, "hourRequired", null),
      hourRequiredPer: _get(data, "hourRequiredPer", ""),
      durationOfWork: _get(data, "durationOfWork", null),
      durationOfWorkType: _get(data, "durationOfWorkType", ""),
      jobDays: _get(data, "jobDays", []),
      shiftStartTime: formatTime12Hour(_get(data, "shiftStartTime", "")),
      shiftEndTime: formatTime12Hour(_get(data, "shiftEndTime", "")),
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

  const handleJobVisibility = (data) => {
    return {
      visibilityType: _get(data, "visibilityType", "NA"),
      visibilityValue: _get(data, "visibilityValue", "NA"),
    };
  };

  const handleClient = (data) => {
    return {
      id: _get(data, "id", "NA"),
      clientId: _get(data, "clientId", "NA"),
      clientName: _get(data, "clientName", "NA"),
    };
  };

  const data = {
    id: _get(res, "id", null),
    jobApplicantStatus: _get(res, "jobApplicantStatus", ""),
    jobRefNo: _get(res, "jobRefNo", ""),
    jobType: _get(res, "jobType", ""),
    experienceLevel: _get(res, "experienceLevel", ""),
    projectType: _get(res, "projectType", ""),
    jobTitle: _get(res, "jobTitle", ""),
    jobShortDescription: _get(res, "jobShortDescription", ""),
    jobDescription: _get(res, "jobDescription", ""),
    highlights: _get(res, "highlights", []),
    deliverables: _get(res, "deliverables", []),
    skill: handleSkills(_get(res, "skill", [])),
    jobVisibility: handleJobVisibility(_get(res, "jobVisibility", {})),
    jobTiming: handleJobTiming(_get(res, "jobTiming", {})),
    billing: handleBilling(_get(res, "billing", {})),
    address: handleAddress(_get(res, "address", {})),
    client: handleClient(_get(res, "client", {})),
  };
  return data;
};

export { jobManagementParsers };
