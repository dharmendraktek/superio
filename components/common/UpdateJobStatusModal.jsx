"use client";

import { getReq, patchReq } from "@/utils/apiHandlers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jobStatus } from "../dashboard-pages/employers-dashboard/addjob/components/constant";

const UpdateJobStatusModal = ({jobId, id, handleReload  }) => {
    const [form, setForm] = useState({
      comment:'',
      job_status:''
    })

    const handleUpdateStatus = async() => {
        const response = await patchReq(`/jobs/${jobId}/`, form)
        if(response.status){
            toast.success("Job status has been successfully updated");
            handleReload();
            let closeBtn = document.getElementById('closeBtn');
            closeBtn.click();
        }
    }
 

  return (
    <div
      className="modal fade"
      id={id || "updateJobStatusModal"}
      tabindex="-1"
      aria-labelledby="updateJobStatusModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header border border-bottom-primary">
            <h5 className="modal-title" id="updateJobStatusModalLabel">
              Change Status
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeBtn"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <p>Status</p>
              <select
                className="client-form-input"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, job_status: e.target.value }))
                }
                // value={statusId || form.new_status}
                // disabled={statusId ? true : false}
              >
                <option value={""}>Select</option>
                {jobStatus.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
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

export default UpdateJobStatusModal;
