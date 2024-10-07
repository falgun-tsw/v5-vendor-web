import _get from "lodash.get";

const raiseDisputeParsers = {};

raiseDisputeParsers.parseDisputeList = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  return res.map((e, idx) => ({
    id: _get(e, "id", ""),
    disputeRefNo: _get(e, "disputeRefNo", ""),
    disputeCategoryId: _get(e, "disputeCategoryId", ""),
    disputeCategoryName: _get(e, "disputeCategoryName", ""),
    disputeTitle: _get(e, "disputeTitle", ""),
    disputeDescription: _get(e, "disputeDescription", ""),
    disputeStatus: _get(e, "disputeStatus", ""),
    closedAt: _get(e, "closedAt", ""),
    createdAt: _get(e, "createdAt", ""),
    jobTitle: _get(e, "jobTitle", ""),
    closedRemark: _get(e, "closedRemark", ""),
    jobCandidateId: _get(e, "jobCandidateId", ""),
  }));
};

raiseDisputeParsers.parseDisputeCategories = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  return res.map((e, idx) => ({
    id: _get(e, "id", ""),
    disputeCategoryName: _get(e, "disputeCategoryName", ""),
  }));
};

export { raiseDisputeParsers };
