"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { reactIcons } from "@/utils/icons";
import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import Pagination from "@/components/common/Pagination";
import { processOptions, removeSpecialChar } from "@/utils/constant";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import JobDetailsPreviewModal from "@/components/common/JobDetailsPreviewModal";
import { jobPostsTableField } from "../../jobposts/components/components/constant";
import InterviewScheduleModal from "../../jobposts/components/components/InterviewScheduleModal";
import ClientSubmissionModal from "../../jobposts/components/components/ClientSubmissionModal";
import NotesModal from "@/components/common/NotesModal";

const tabsName = [
  { id: 1, name: "ACTIVE JOB POST" },
  { id: 2, name: "INACTIVE JOB POST" },
];

const AssignJobList = () => {
  const [expand, setExpand] = useState(null);
  const [jobPostList, setJobPostList] = useState([]);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [submissionDetails, setSubmissionDetails] = useState();
  const [isSelected, setIsSelected] = useState([]);
  const [jobDetails, setJobDetails] = useState();

  useEffect(() => {
    getJobpostsList();
  }, []);

  const getJobpostsList = async () => {
    setIsLoading(true);
    const response = await getReq(
      `/jobs/?page=${page + 1}&active=${active == 1 ? true : false}${
        search ? `&search=${search}` : ""
      }`
    );
    setIsLoading(false);
    if (response.status) {
      setJobPostList(response.data.results);
      setDataCount(response?.data.count);
    }
  };

  useEffect(() => {
    if (search) {
      setPage(0);
    }
    getJobpostsList(search);
  }, [search, page, active]);

  const handleInactiveJobPost = async (id) => {
    const response = await deleteReq(`/jobs/${id}/`);
    if (response.status) {
      toast.success("Job post Inactivated successfully");
      getJobpostsList();
    }
  };

  const handleActivateJobPost = async (id) => {
    const response = await postApiReq(
      `/jobs/${id}/job-activate/?activate=true`
    );
    if (response.status) {
      toast.success("Job post activated successfully");
      getJobpostsList();
    }
  };

  const handleDeleteJobPost = async (id) => {
    const response = await deleteReq(`/jobs/${id}/?permanent_delete=true`);
    if (response.status) {
      toast.success("Job post has been deleted successfully");
      getJobpostsList();
    }
  };

  useEffect(() => {
    if (jobPostList.length > 0) {
      const filteredData = jobPostList.filter((item) =>
        item.submissions.some((submission) => submission.selected === true)
      );
      setIsSelected(filteredData);
      // setJobData(filteredData);
    }
  }, [jobPostList]);

  return (
    <>
      {isLoading && <Loader />}
      <JobDetailsPreviewModal jobDetails={jobDetails} setJobDetails={setJobDetails} />
      <div className="d-flex justify-content-between my-2">
        <div className="d-flex gap-2">
          {/* <div
            className="d-flex border border-primary rounded-1"
            style={{ width: "300px", height: "30px" }}
          >
            {tabsName.map((item, index) => {
              return (
                <div
                  style={{ width: "150px", borderLeft: "2px" }}
                  className={`text-center cursor-pointer rounded-1 ${
                    active == item.id
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                  key={index}
                >
                  <li
                    onClick={() => {
                      setPage(0);
                      setActive(item.id);
                    }}
                  >
                    {item.name}
                  </li>
                </div>
              );
            })}
          </div> */}
          <div className="position-relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "350px" }}
              className="border border-primary px-4 rounded-1"
              placeholder="Search anything..."
            />
            <span
              className="position-absolute fs-4 text-primary"
              style={{ left: "2px" }}
            >
              {reactIcons.search}
            </span>
            {search && (
              <span
                onClick={() => setSearch("")}
                className="position-absolute cursor-pointer	  text-primary fs-5"
                style={{ right: "8px" }}
              >
                {reactIcons.close}
              </span>
            )}
          </div>
        </div>
        {/* <Link href="/employers-dashboard/job-posts/add-job-posts">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link> */}
      </div>
      <div className="table_div custom-scroll-sm">
        <table className="default-table ">
          <thead className="">
            <tr>
              {jobPostsTableField.map((item, index) => {
                return (
                  <>
                    {/* {item.title == "input" ? (
                      <th style={{ width: "200px" }}>
                        <input className="cursor-pointer" type="checkbox" />
                      </th>
                    ) : ( */}
                    <th style={{ width: "200px" }} key={index}>
                      {removeSpecialChar(item.title)}
                    </th>
                    {/* )} */}
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {jobPostList.map((item, index) => {
              return (
                <>
                  <tr key={index} className="">
                    {/* {true && (
                      <td className="">
                        <div className="d-flex">
                          <input type="checkbox" />
                          {item.submissions.length > 0 && (
                            <div className="d-flex">
                              <div
                                onClick={() => {
                                  if (expand) {
                                    setExpand(null);
                                  } else {
                                    setExpand(item.id);
                                  }
                                }}
                                className="mx-2 px-2 text-primary fw-bold fs-6"
                              >
                                <span className="">
                                  {item.id == expand ? "-" : "+"}
                                </span>
                              </div>
                              <div
                                className="bg-primary text-white mt-1 px-2 ml-2"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  fontSize: "12px",
                                  borderRadius: "3px",
                                }}
                              >
                                {item.submissions.length > 0}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    )} */}
                    <td
                      className="d-flex align-items-center justify-content-between"
                      style={{ width: "130px" }}
                    >
                      {/* <input type="checkbox" /> */}
                      {item.submissions.length > 0 && (
                        <>
                          <div
                            onClick={() => {
                              if (expand == item.id) {
                                setExpand(null);
                                // setClientData((prev) => {
                                //   const update = [...prev];
                                //   update[index]["open"] = false;
                                //   return update;
                                // });
                              } else {
                                setExpand(item.id);
                                // setClientData((prev) => {
                                //   const update = [...prev];
                                //   update[index]["open"] = true;
                                //   return update;
                                // });
                              }
                            }}
                            className="mx-2 px-1 d-flex gap-1 justify-content-center align-items-center text-white  rounded-1 cursor-pointer fw-bold fs-6"
                            style={{ background: "var(--primary-2nd-color)" }}
                          >
                            <div
                              className="text-white "
                              style={{
                                width: "24px",
                                height: "24px",
                                fontSize: "12px",
                                borderRadius: "3px",
                                background: "var(--primary-2nd-color)",
                              }}
                            >
                              <p
                                className="text-white fw-medium"
                                style={{ fontSize: "15px" }}
                              >
                                {item.submissions.length}
                              </p>
                            </div>
                            <span className="cursor-pointer text-white fs-4">
                              {item.id == expand
                                ? reactIcons.arrowfillup
                                : reactIcons.arrowfilldown}
                            </span>
                          </div>
                        </>
                      )}
                    </td>
                    <td>
                      <Link
                        href="/employers-dashboard/job-posts/[id]"
                        as={`/employers-dashboard/job-posts/${item.id}`}
                        target="_blank"
                      >
                        {/* <Link href={{ pathname: `/employers-dashboard/job-posts/${item.id}`, query: item }}> */}
                        {item.job_code}
                      </Link>
                    </td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td>
                      <div className="d-flex align-items-center gap-2">
                      {jobDetails?.id == item.id &&
                      <span
                          data-bs-toggle="modal"
                          data-bs-target="#jobDetailsPreviewModal"
                          className="cursor-pointer text-primary fs-5"
                          id="jobDetailsPreview"
                          onMouseEnter={() => {
                            setJobDetails(item);
                           let previewBtn= document.getElementById('jobDetailsPreview');
                           previewBtn.click();
                          }}
                        >
                          {reactIcons.view}
                        </span>
                      }
                    <Link
                          href="/employers-dashboard/job-posts/[id]"
                          as={`/employers-dashboard/all-applicants/${item.id}`}
                          target="_blank" 
                          onMouseEnter={() => {
                            setJobDetails(item);
                          //  let previewBtn= document.getElementById('jobDetailsPreview');
                          //  previewBtn.click();
                          }}
                        >
                          {item?.title}
                        </Link>
                      </div>
                    </td>
                    <td className="">{item.client_name || "N/A"}</td>
                    <td>{item.city || "N/A"}</td>
                    <td className="">{item.state || "N/A"}</td>
                    <td className="">{item.job_status || "N/A"}</td>
                    <td className="">
                      {item.currency || "N.A"}
                      {item.currency ? "/" : "/"}
                      {item.amount || "N.A"}
                      {item.amount ? "/" : "/"}
                      {item.payment_frequency || "N.A"}
                    </td>
                    <td className="">{item.delivery_manager_name || "N/A"}</td>
                    <td className="">{item.contact_manager_name || "N/A"}</td>
                    <td className="">
                      <div className="d-flex flex-wrap">
                        {item.assign_details.map((item) => {
                          return <span>{item.first_name},</span>;
                        })}
                        {item.assign_details.length == 0 && "N/A"}
                      </div>
                    </td>
                    <td className="">
                      {(item?.created_by?.first_name || "N/A") +
                        " " +
                        (item?.created_by?.last_name || "")}
                    </td>
                    <td className="">
                      {moment(item.created_at).format("DD-MM-yyyy hh:mm A")}
                    </td>
                    <td className="">
                      {moment(item.updated_at).format("DD-MM-yyyy hh:mm A")}
                    </td>
                    <td className="">
                      {item.head_account_manager_name || "N/A"}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link
                              href="/employers-dashboard/job-posts/[id]"
                              as={`/employers-dashboard/job-posts/${item.id}?jobId=${item.id}`}
                            >
                              <button
                                // data-bs-toggle="modal"
                                // data-bs-target="#clientUpdateModal"
                                data-text="Edit User"
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
                            </Link>
                          </li>
                          <li>
                            <button
                              // data-bs-toggle="modal"
                              // data-bs-target="#clientDeleteModal"
                              data-text={`${
                                active == 1
                                  ? "Inactivate Job Post"
                                  : "Activate Job Post"
                              }`}
                              onClick={() => {
                                if (active == 1) {
                                  handleInactiveJobPost(item.id);
                                } else {
                                  handleActivateJobPost(item.id);
                                }
                              }}
                            >
                              <span
                                className={`${
                                  active == 1
                                    ? "la la-window-close"
                                    : "las la-check-square"
                                }`}
                              ></span>
                            </button>
                          </li>
                          <li>
                            <button
                              // data-bs-toggle="modal"
                              // data-bs-target="#clientDeleteModal"
                              data-text="Delete Job Post"
                              onClick={() => {
                                handleDeleteJobPost(item.id);
                              }}
                            >
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  {item.id == expand && (
                    <tr>
                      <div className="mx-5 my-3 border rounded-1  inner-table shadow">
                        <InterviewScheduleModal
                          jobPostList={jobPostList}
                          applicantData={[]}
                        />
                        <ClientSubmissionModal
                          submissionDetails={jobPostList}
                        />
                        <NotesModal submissionDetails={jobPostList} />
                        <div className="mx-3 my-2">
                          {isSelected.length > 0 && (
                            <div className="d-flex gap-2">
                              {processOptions.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="border px-2 rounded-1"
                                    data-bs-toggle={item.dataToggle}
                                    data-bs-target={item.dataTarget}
                                    // data-bs-toggle='modal'
                                    // data-bs-target='#clientSubmissionModal'

                                    // aria-controls={item.ariaControls}
                                  >
                                    <span className="text-primary cursor-pointer">
                                      {item.name}
                                    </span>
                                    {/* <span>|</span> */}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <td colSpan={15}>
                          <table>
                            <thead className="table-inner-thead">
                              <th style={{ width: "60px" }}>
                                {/* <input className="mx-1" type="checkbox" /> */}
                              </th>
                              <th>Submission ID</th>
                              <th>Applicant Name</th>
                              <th>Work Authorization</th>
                              <th>Mobile Number</th>
                              <th>Location</th>
                              <th>Country</th>
                              <th>Experience</th>
                              <th>Source</th>
                              {/* <th>Revision Status</th> */}
                              {/* <th>Application Status</th> */}
                              {/* <th>Outlook MSG</th> */}
                              <th style={{ width: "250px" }}>Bill Rate</th>
                              <th style={{ width: "250px" }}>Pay Rate</th>
                              {/* <th>Employer Name</th> */}
                              <th>Availability</th>
                              <th>Submitted By</th>
                              {/* <th>PW Submission Type</th> */}
                              <th>Notice Period</th>
                              <th style={{ width: "200px" }}>Current CTC</th>
                              <th style={{ width: "200px" }}>Submitted On</th>
                              {/* <th>Additional Details</th> */}
                            </thead>
                            <tbody>
                              {item.submissions.map((_item, _index) => {
                                let {
                                  availability,
                                  pay_rate_currency,
                                  pay_rate_amount,
                                  pay_rate_type,
                                  pay_rate_contract_type,
                                  bill_rate_currency,
                                  bill_rate_amount,
                                  bill_rate_type,
                                  bill_rate_contract_type,
                                  submitted_by_details,
                                  submission_on,
                                } = _item;
                                let {
                                  id,
                                  firstname,
                                  middlename,
                                  lastname,
                                  authorization,
                                  mobile,
                                  address,
                                  country,
                                  experience,
                                  source,
                                  notice_period,
                                  current_amount,
                                  current_currency,
                                  current_job_type,
                                  current_payment_frequency,
                                } = _item.applicant_details[0];
                                let current_ctc = `${
                                  (current_currency || "N.A") +
                                  "/" +
                                  (current_amount || "N.A") +
                                  "/" +
                                  (current_payment_frequency || "N.A") +
                                  "/" +
                                  (current_job_type || "N.A")
                                }`;

                                return (
                                  <tr>
                                    <td style={{ width: "60px" }}>
                                      <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          let update = [...jobPostList];
                                          if (e.target.checked) {
                                            update[index]["submissions"][
                                              _index
                                            ]["selected"] = e.target.checked;
                                          } else {
                                            update[index]["submissions"][
                                              _index
                                            ]["selected"] = e.target.checked;
                                          }
                                          setJobPostList(update);
                                        }}
                                        checked={_item?.selected}
                                      />
                                    </td>
                                    <td>{_item.id}</td>
                                    <td>
                                      <Link
                                        href={`/employers-dashboard/all-applicants/${id}`}
                                        target="_blank"
                                      >
                                        {(firstname ||
                                          "") + " " + (middlename ||
                                          "") + " " + (lastname ||
                                          "")}
                                      </Link>
                                    </td>
                                    <td>{authorization || "N/A"}</td>
                                    <td>{mobile || "N/A"}</td>
                                    <td>{address || "N.A"}</td>
                                    <td>{country || "N/A"}</td>
                                    <td>{experience || "N/A"}</td>
                                    <td>{source || "N/A"}</td>
                                    {/* <td>Revision Status</td> */}
                                    {/* <td>Application Status</td> */}
                                    {/* <th>Outlook MSG</th> */}
                                    <td style={{ width: "250px" }}>
                                      {bill_rate_currency || "N.A"}/
                                      {bill_rate_amount || "N.A"}/
                                      {bill_rate_type || "N.A"}/
                                      {bill_rate_contract_type || "N.A"}
                                    </td>
                                    <td style={{ width: "250px" }}>
                                      {pay_rate_currency || "N.A"}/
                                      {pay_rate_amount || "N.A"}/
                                      {pay_rate_type || "N.A"}/
                                      {pay_rate_contract_type || "N.A"}
                                    </td>
                                    {/* <td>Employer Name</td> */}
                                    <td>{availability || "N/A"}</td>
                                    <td>
                                      {(submitted_by_details?.first_name ||
                                        "N/A") +
                                        " " +
                                        (submitted_by_details?.last_name || "")}
                                    </td>
                                    {/* <th>PW Submission Type</th> */}
                                    <td>{notice_period || "N/A"}</td>
                                    <td style={{ width: "200px" }}>
                                      {current_ctc || "N/A"}
                                    </td>
                                    <td style={{ width: "200px" }}>
                                      {submission_on
                                        ? moment(submission_on).format(
                                            "DD-MM-YYYY hh:mm A"
                                          )
                                        : "N/A"}
                                    </td>
                                    {/* <td>Additional Details</td> */}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </td>
                      </div>
                    </tr>
                  )}
                </>
              );
            })}
            {!isLoading && jobPostList.length == 0 && (
              <tr className="text-center mt-5">
                <td colSpan={5}>No data found</td>
              </tr>
            )}
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
          //  setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default AssignJobList;