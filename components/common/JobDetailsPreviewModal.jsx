"use client";
import { useEffect, useState } from "react";

const JobDetailsPreviewModal = ({ jobDetails, setJobDetails }) => {
  const [tab, setTab] = useState("details");
  const [num, setNum] = useState(1);
  const [initialNum, setInitialNum] = useState(0);

  const tabsName = [
    { id: 1, name: "Job Details", value: "details" },
    { id: 2, name: "Documents", value: "doc" },
  ];

  console.log("-------------documents de------", jobDetails?.state);

  return (
    <div
      className="modal fade"
      id="jobDetailsPreviewModal"
      tabindex="-1"
      aria-labelledby="jobDetailsPreviewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header border border-bottom-primary">
            <h5 className="modal-title" id="jobDetailsPreviewModalLabel">
              Preview
            </h5>
            {/* <h6>{openResume?.firstname}</h6> */}
            <button
              type="button"
              onClick={() => setJobDetails(null)}
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="d-flex">
                {tabsName.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setTab(item.value)}
                      className={`tabs ${
                        tab == item.value
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-black"
                      } border text-black align-items-center cursor-pointer border-1 py-1  px-3 d-flex gap-3`}
                    >
                      <span className="fs-6">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <hr className="border border-secondary"></hr>
              {tab == "doc" ? (
                <div>
                  {jobDetails?.documents.length == 0 &&
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="theme-btn btn-style-one small"
                      onClick={() => {
                        if(num > 1){
                          setNum((prev) => prev - 1);
                        }
                      }}
                    >
                      {" "}
                      Prev{" "}
                    </button>
                    <butto
                      className="theme-btn btn-style-four small"
                      onClick={() => {
                        if(num <= jobDetails.documents.length)
                        setNum((prev) => prev + 1);
                        // setInitialNum((prev) => prev+1);
                      }}
                    >
                      Next
                    </butto>
                  </div>
                  }
                  {jobDetails?.documents
                    ?.slice(num-1, num)
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="border border-secondary my-2 rounded-1"
                        >
                          <iframe src={item.file} className="w-100" />
                        </div>
                      );
                    })}
                    {jobDetails?.documents.length == 0 &&
                       <div className="text-center">
                           No documents available
                       </div>
                    }
                </div>
              ) : (
                <div className="row">
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">Job Code</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.job_code || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">Job Title</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.title || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">Client</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.client_name || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">
                      Contact Manager Name
                    </p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.contact_manager_name || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">
                      Client Bill/Rate
                    </p>
                    <div
                      type="text"
                      disabled
                      value={jobDetails?.title}
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.currency || "N.A"}
                      {jobDetails?.currency ? "/" : "/"}
                      {jobDetails?.amount || "N.A"}
                      {jobDetails?.amount ? "/" : "/"}
                      {jobDetails?.payment_frequency || "N.A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">City</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {(jobDetails?.city || "N/A")}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">State</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.state || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">Job Status</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.job_status || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">
                      Delivery Manager
                    </p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.delivery_manager_name || "N/A"}{" "}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">
                      Contact Manager
                    </p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.contact_manager_name || "N/A"}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">Assigned To</p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100 d-flex gap-2 flex-wrap"
                    >
                      {jobDetails?.assign_details?.map((item, index) => {
                        return(
                        <div className="border border-primary px-1 rounded-1 bg-white" style={{width:'fit-content'}} key={index} >
                          <span>{item.first_name} {item.last_name}</span>
                        </div>
                        )
                      })}
                      {(jobDetails?.assign_details?.length == 0 && "N/A")}
                    </div>
                  </div>
                  <div className="col-4 my-2">
                    <p className="text-black fw-400 my-1 fs-6">
                      Account Manager
                    </p>
                    <div
                      type="text"
                      className="p-2 bg-secondary text-black fw-600 w-100"
                    >
                      {jobDetails?.head_account_manager_name || "N/A"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleUpdateStatus} >Update</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPreviewModal;
