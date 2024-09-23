"use client";

import MyCKEditor from "@/components/common/MyCkEditor";
import { getReq, patchReq } from "@/utils/apiHandlers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClientSubmissionModal = ({ submissionDetails, side }) => {
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({
    new_status: "",
    // new_substatus:''
    comment:''
  });
  const [submissionId, setSubmissionId] = useState();

  useEffect(() => {
    if (submissionDetails.length > 0 && side == "applicant") {
      const filteredData = submissionDetails
        .map((item) => {
          const selectedSubmissions = item.jobs_associated.filter(
            (submission) => submission.selected === true
          );
          return { ...item, submissions: selectedSubmissions };
        })
        .filter((item) => item.submissions.length > 0);

      setSubmissionId(filteredData[0]?.jobs_associated[0]?.id);
    } else if (submissionDetails.length > 0) {
      const filteredData = submissionDetails
        .map((item) => {
          const selectedSubmissions = item.submissions.filter(
            (submission) => submission.selected === true
          );

          return { ...item, submissions: selectedSubmissions };
        })
        .filter((item) => item.submissions.length > 0);

      setSubmissionId(filteredData[0]?.submissions[0]?.id);
    }
  }, [submissionDetails]);

  useEffect(() => {
    if (submissionDetails?.length > 0) {
      handleGetStatus();
      // setSubmissionId(submissionDetails[0].id)
    }
  }, [submissionDetails]);

  const handleGetStatus = async () => {
    const response = await getReq(`/status-choices/`);

    if (response.status) {
      // let nextStatus = currentStatus;
      // let subStatusData = response.data.find((item) => item.id == nextStatus);
      setStatusList(response.data);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await patchReq(
        `/submissions/${submissionId}/update-status/`,
        form
      );
      if (response.status) {
        toast.success("Status has been changed successfully");
      }
    } catch (err) {
    }
  };

  return (
    <div
      className="modal fade"
      id="clientSubmissionModal"
      tabindex="-1"
      aria-labelledby="clientSubmissionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header border border-bottom-primary">
            <h5 className="modal-title" id="clientSubmissionModalLabel">
              Change Status
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <p>Status</p>
              <select
                className="client-form-input"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, new_status: e.target.value }))
                }
              >
                <option>Select</option>
                {statusList.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.display_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="my-2">
              <p>Comment</p>
              <textarea className="border border-secondary px-2 py-1 w-100 rounded-1" onChange={(e) => setForm((prev) => ({...prev, comment:e.target.value}) )} />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="theme-btn btn-style-one small"
              data-bs-dismiss="modal"
              onClick={handleUpdateStatus}
            >
              Update
            </button>
            <button
              type="button"
              className="theme-btn btn-style-four small"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSubmissionModal;
