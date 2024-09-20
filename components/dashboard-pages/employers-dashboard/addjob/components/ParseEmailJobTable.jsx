"use client";

import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import moment from "moment";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ManualCreation from "./ManualCreation";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";

const ParseEmailJobTable = () => {
  const [jobData, setJobData] = useState([]);
  const [open, setOpen] = useState(true);
  const [jobItem, setJobItem] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetParseJobByEmail = async () => {
    const response = await getReq(`/temp-jobs/?page=${page + 1}`);
    setJobData(response.data.results);
    setDataCount(response.data.count);
  };

  const handleGetJobsByEmail = async () => {
    let data = {
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    setIsLoading(true);
    const response = await postApiReq(`/process-emails/`, data);
    setIsLoading(false);
    if (response) {
      handleGetParseJobByEmail();
    }
  };

  useEffect(() => {
    handleGetJobsByEmail();
    if (page) {
      handleGetParseJobByEmail();
    }
  }, [page]);

  const handleApproveJob = async (id) => {
    const response = await postApiReq("/approve-job/", { job_id: id });
    if (response.status) {
      toast.success("Job detials approved successfully");
      handleGetParseJobByEmail();
    }
  };

  useEffect(() => {
    handleGetParseJobByEmail();
  }, []);

  const handleInactiveJobPost = async (id) => {
    const response = await deleteReq(`/temp-jobs/${id}/`);
    if (response.status) {
      handleGetParseJobByEmail();
      toast.success("Job post Inactivated successfully");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="py-1">
        {open ? (
          <>
            <h4 className="my-3">Parse Job Post By Email</h4>
            <div className="table_div custom-scroll-sm">
              <table className="default-table">
                <thead className="">
                  <tr>
                    <th style={{ width: "300px" }}>Job Title</th>
                    <th style={{ width: "150px" }}>Job Type</th>
                    <th style={{ width: "150px" }}>Client</th>
                    <th style={{ width: "200px" }}>Location</th>
                    <th style={{ width: "300px" }}>Primary Skills</th>
                    <th style={{ width: "300px" }}>Secondary Skills</th>
                    <th style={{ width: "100px" }}>Experience</th>
                    <th style={{ width: "200px" }}>Created At</th>
                    <th style={{ width: "200px" }}>Updated At</th>
                    <th style={{ width: "150px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobData.map((item, index) => {
                    return (
                      <>
                        <tr key={index} className="">
                          <td
                            style={{ width: "300px" }}
                            onClick={() => {
                              setJobItem(item);
                              setOpen(false);
                            }}
                            className="text-primary text-decoration-underline cursor-pointer"
                          >
                            {item.title || "N/A"}
                          </td>
                          <td style={{ width: "150px" }}>
                            {item.job_type ? item.job_type : "N/A"}
                          </td>
                          {/* <td className="trans-id">{item.empcode}</td>   */}
                          <td style={{ width: "150px" }}>
                            {item.client ? item.client : "N/A"}
                            {/* <a href="#">Super CV Pack</a> */}
                          </td>
                          <td className="" style={{ width: "200px" }}>
                            {item.address ? item.address : "N/A"}
                          </td>
                          <td style={{ width: "300px" }}>
                            <button
                              type="button"
                              class=""
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={item.primary_skills
                                .slice(1, item.primary_skills.length)
                                .map((item) => {
                                  return item.name;
                                })}
                            >
                              <div className="d-flex flex-wrap">
                                {item.primary_skills.slice(0, 1).map((item) => {
                                  return <span>{item.name}...</span>;
                                })}
                              </div>
                              {item.primary_skills.length == 0 &&
                                'N/A'
                              }
                            </button>
                          </td>
                          <td className="" style={{ width: "300px" }}>
                            <div className="d-flex flex-wrap">
                              {item.secondary_skills.slice(0, 1).map((item) => {
                                return <span>{item.name}...</span>;
                              })}
                              {item.secondary_skills.length == 0 &&
                               'N/A'
                              }
                            </div>
                          </td>
                          <td className="" style={{ width: "100px" }}>
                            {item.experience || "N/A"}
                          </td>
                          <td className="" style={{ width: "200px" }}>
                            {moment(item.created_at).format(
                              "DD-MM-yyyy hh:mm A"
                            )}
                          </td>
                          <td className="" style={{ width: "200px" }}>
                            {moment(item.updated_at).format(
                              "DD-MM-yyyy hh:mm A"
                            )}
                          </td>
                          <td>
                            <div className="option-box">
                              <ul className="option-list">
                                <li>
                                  <button
                                    onClick={() => {
                                      setJobItem(item);
                                      setOpen(false);
                                    }}
                                    data-text="Edit Job Details"
                                  >
                                    {/* <a
                            href="#"
                            className="theme-btn btn-style-three call-modal"
                            data-bs-toggle="modal"
                            data-bs-target="#userUpdateModal"
                          > */}
                                    <span className="las la-edit"></span>
                                    {/* </a> */}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleApproveJob(item.id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#clientUpdateModal"
                                    data-text="Approve"
                                  >
                                    {/* <a
                            href="#"
                            className="theme-btn btn-style-three call-modal"
                            data-bs-toggle="modal"
                            data-bs-target="#userUpdateModal"
                          > */}
                                    <span className="las la-check-square"></span>
                                    {/* </a> */}
                                  </button>
                                </li>
                                <li>
                                  <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#clientDeleteModal"
                                    data-text="Declined"
                                    onClick={() =>
                                      handleInactiveJobPost(item.id)
                                    }
                                  >
                                    <span className="la la-trash"></span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  {/* End tr */}
                </tbody>
              </table>
            </div>
            {dataCount > 25 && (
              <Pagination
                page={page}
                setPage={setPage}
                dataCount={dataCount}
                pageSize={25}
                //  setPageSize={25}
              />
            )}
          </>
        ) : (
          <ManualCreation
            setOpen={setOpen}
            jobData={jobItem}
            jobType="Email"
            name="update"
            handleGetJobDetails={handleGetParseJobByEmail}
          />
        )}
      </div>
    </>
  );
};

export default ParseEmailJobTable;
