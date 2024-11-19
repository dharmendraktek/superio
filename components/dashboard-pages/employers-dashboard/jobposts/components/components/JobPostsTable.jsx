"use client";
// import UserUpdateModal from "./UserUpdateModal";
// import UserDeleteModal from "./components/UserDeleteModal";

import { useEffect, useState } from "react";

import { clientData, jobPostsTableField } from "./constant";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import Pagination from "@/components/common/Pagination";
import {
  accessRoles,
  processOptions,
  removeSpecialChar,
} from "@/utils/constant";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import InterviewScheduleModal from "./InterviewScheduleModal";
import ClientSubmissionModal from "./ClientSubmissionModal";
import { useCallback } from "react";
import NotesModal from "@/components/common/NotesModal";
import JobDetailsPreviewModal from "@/components/common/JobDetailsPreviewModal";
import JobAssignModal from "@/components/common/JobAssignModal";
import { cleanString } from "@/utils/regex";
import { useSelector } from "react-redux";
import UpdateJobStatusModal from "@/components/common/UpdateJobStatusModal";

const tabsName = [
  { id: 1, name: "ACTIVE JOB POST" },
  { id: 2, name: "INACTIVE JOB POST" },
];

const JobPostsTable = () => {
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
  const [jobId, setJobId] = useState("");
  const [open, setOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(null);
  const [openAssign, setOpenAssign] = useState(null);
  const [firstSearch, setFirstSearch] = useState(true);
  const employeeDetails = useSelector((state) => state.employer.user);
  const [searchValue, setSearchValue] = useState("");
  const [openStatus, setOpenStatus] = useState(null);

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
    if (search !== firstSearch) {
      setFirstSearch(search);
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

  useEffect(() => {
    if (!searchValue) {
      setSearch(searchValue);
    }
  }, [searchValue]);

  const handleSearch = () => {
    setSearch(searchValue);
  };

  return (
    <>
      {isLoading && <Loader />}
      <JobDetailsPreviewModal
        jobDetails={jobDetails}
        setJobDetails={setJobDetails}
      />
      <JobAssignModal jobId={jobId} handleReload={getJobpostsList} />
      <UpdateJobStatusModal jobId={jobId} handleReload={getJobpostsList} />
      <div className="d-flex justify-content-between my-2">
        <div className="d-flex gap-2">
          {employeeDetails?.access_role_details?.access_id == accessRoles.ADMIN &&
          <div
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
          </div>
          }
          <div className="position-relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ width: "350px" }}
              className="border border-primary px-4 rounded-1"
              placeholder="Search anything..."
              onKeyDown={(e) => {
                if(e.key == "Enter"){
                  handleSearch();
                }
              }}
            />
            <span
              className="position-absolute fs-4 text-primary"
              style={{ left: "2px" }}
            >
              {reactIcons.search}
            </span>
            {search && (
              <span
                onClick={() => setSearchValue("")}
                className="position-absolute cursor-pointer	  text-primary fs-5"
                style={{ right: "85px" }}
              >
                {reactIcons.close}
              </span>
            )}
            {searchValue && (
              <button
                className="theme-btn btn-style-one small position-absolute"
                onClick={handleSearch}
                style={{ right: "0px", borderRadius: "4px" }}
              >
                Search
              </button>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            <span className="text-primary">{dataCount} records</span>
          </div>
          {!(
            employeeDetails?.access_role_details?.access_id ==
            accessRoles.RECRUITER
          ) && (
            <Link href="/employers-dashboard/job-posts/add-job-posts">
              <button className="bg-primary px-3 text-white rounded-1 py-1">
                + New
              </button>
            </Link>
          )}
        </div>
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
                    <th style={{ width: `250px` }} key={index}>
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
                    // style={{ width: "130px" }}
                    >
                      {/* <input type="checkbox" /> */}
                      <div
                        className={`d-flex gap-2 align-items-center ${
                          item.submissions.length == 0
                            ? "justify-content-start"
                            : "justify-content-start"
                        }`}
                      >
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
                        {item.submissions.length == 0 && (
                          <div
                            className="text-white "
                            style={{
                              width: "73px",
                              height: "24px",
                              fontSize: "12px",
                              borderRadius: "3px",
                            }}
                          ></div>
                        )}
                        <div className="position-relative">
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#jobAssignModal"
                            onClick={() => setJobId(item.id)}
                            className="cursor-pointer"
                            onMouseEnter={() => setOpen(item.id)}
                            onMouseLeave={() => setOpen(null)}
                          >
                            {reactIcons.settings}
                          </span>
                          {item.id == open && (
                            <div
                              className="position-absolute  px-2 py-1 rounded-1"
                              style={{
                                width: "90px",
                                height: "35px",
                                zIndex: "3",
                                background: "rgb(77 82 129 / 54%)",
                              }}
                            >
                              <span className="text-white">Assign Job</span>
                            </div>
                          )}
                        </div>
                        <div className="position-relative">
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#updateJobStatusModal"
                            onClick={() => setJobId(item.id)}
                            className="cursor-pointer text-primary"
                            onMouseEnter={() => setOpenStatus(item.id)}
                            onMouseLeave={() => setOpenStatus(null)}
                          >
                            {reactIcons.edit}
                          </span>
                          {item.id == openStatus && (
                            <div
                              className="position-absolute  px-2 py-1 rounded-1"
                              style={{
                                width: "150px",
                                height: "35px",
                                zIndex: "3",
                                background: "rgb(77 82 129 / 54%)",
                              }}
                            >
                              <span className="text-white">Chagne Job Status</span>
                            </div>
                          )}
                        </div>
                        {/* <div className="position-relative">
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#jobAssignModal"
                            onClick={() => setJobId(item.id)}
                            className="cursor-pointer"
                            onMouseEnter={() => setOpen(item.id)}
                            onMouseLeave={() => setOpen(null)}
                          >
                            {reactIcons.settings}
                          </span>
                          {item.id == open && (
                            <div
                              className="position-absolute  px-2 py-1 rounded-1"
                              style={{
                                width: "90px",
                                height: "35px",
                                zIndex: "3",
                                background: "rgb(77 82 129 / 54%)",
                              }}
                            >
                              <span className="text-white">Assign Job</span>
                            </div>
                          )}
                        </div> */}
                      </div>
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
                        {jobDetails?.id == item.id && (
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#jobDetailsPreviewModal"
                            className="cursor-pointer text-primary fs-5"
                            id="jobDetailsPreview"
                            onMouseEnter={() => {
                              setJobDetails(item);
                              let previewBtn =
                                document.getElementById("jobDetailsPreview");
                              previewBtn.click();
                            }}
                          >
                            {reactIcons.view}
                          </span>
                        )}
                        <Link
                          href="/employers-dashboard/job-posts/[id]"
                          as={`/employers-dashboard/job-posts/${item.id}`}
                          target="_blank"
                          onMouseEnter={() => {
                            setJobDetails(item);
                            //  let previewBtn= document.getElementById('jobDetailsPreview');
                            //  previewBtn.click();
                          }}
                          className="text-capitalize"
                        >
                          {item?.title}
                        </Link>
                      </div>
                    </td>
                    <td className="">{item.client_name || "N/A"}</td>
                    <td className="">{item.client_job_id || "N/A"}</td>
                    <td
                      onMouseEnter={() => setOpenAssign(item.id)}
                      onMouseLeave={() => setOpenAssign(null)}
                    >
                      <div className="d-flex gap-1 flex-wrap">
                        {item.city &&
                          item.city
                            .split("  ")
                            .slice(0, 1)
                            .map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  // className="rounded-1 px-1"
                                  // style={{ background: "rgb(64 69 114 / 81%)" }}
                                >
                                  <span className="text-black">{item}</span>
                                </div>
                              );
                            })}
                        {item.city && item.city.split("  ").length > 1 && (
                          <span className="text-primary cursor-pointer fs-4">
                            {reactIcons.more}
                          </span>
                        )}
                        {!item.city && "N/A"}
                        {openAssign == item.id && (
                          <div
                            className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                            style={{
                              width: "250px",
                              minHeight: "30px",
                              maxHeight: "fit-content",
                              zIndex: "5",
                            }}
                          >
                            {item.city &&
                              item.city.split("  ").map((item) => {
                                return (
                                  <span className="text-white">{item}</span>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="">{item.state || "N/A"}</td>
                    <td className="">{item.job_status || "N/A"}</td>
                    <td className="">
                      {item.currency || "N.A"}
                      {item.currency ? "/" : "/"}
                      {item.amount || "N.A"}
                      {item.amount ? "/" : "/"}
                      {item.payment_frequency || "N.A"}
                      {item.client_taxterm ? "/" : "/"}
                      {item.client_taxterm || "N.A"}
                    </td>
                    <td className="text-capitalize">
                      {item.delivery_manager_name || "N/A"}
                    </td>
                    <td className="text-capitalize">
                      {item.contact_manager_name || "N/A"}
                    </td>
                    <td
                      className=""
                      onMouseEnter={() => setOpenAssign(item.id)}
                      onMouseLeave={() => setOpenAssign(null)}
                    >
                      <div className="d-flex px-5 position-relative">
                        {/* {item.assign_details?.slice(0, 2).map((item) => {
                          return (
                            <div className="rounded-1 border border-primary px-1">
                              <span>
                                {item.first_name} {item.last_name}
                              </span>
                            </div>
                          );
                        })} */}
                        {/* {item.assign_details.length == 0 && "N/A"} */}
                        <span className="cursor-pointer text-primary fs-5">
                          {reactIcons.peoplegroup}
                        </span>
                        {openAssign == item.id && (
                          <div
                            className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                            style={{
                              width: "250px",
                              minHeight: "30px",
                              maxHeight: "fit-content",
                              zIndex: "5",
                            }}
                          >
                            {item.assign_details.map((item) => {
                              return (
                                <span className="text-white">
                                  {item.first_name} {item.last_name}
                                </span>
                              );
                            })}
                            <span className="text-white">
                              {item.assign_details.length == 0 &&
                                "Not available"}
                            </span>
                          </div>
                        )}
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
                    <td className="">
                      {item.account_manager_name || "N/A"}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link
                              href="/employers-dashboard/job-posts/[id]"
                              as={`/employers-dashboard/job-posts/${item.id}`}
                            >
                              <button
                                // data-bs-toggle="modal"
                                // data-bs-target="#clientUpdateModal"
                                data-text="Edit Job"
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
                                  ? "Delete Job Post"
                                  : "Delete Job Post"
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
                                    ? "la la la-trash"
                                    : "la la-trash"
                                }`}
                              ></span>
                            </button>
                          </li>
                          {employeeDetails?.access_role_details?.access_id == accessRoles.ADMIN &&
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
                          }
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
                          handleGetJobDetails={getJobpostsList}
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
                                      {/* <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          let update = [...jobPostList];

                                          update.map((applicant) => {
                                            // Check if the applicant has a 'jobs_associated' array
                                            if (
                                              Array.isArray(
                                                applicant.submissions
                                              )
                                            ) {
                                              // Iterate over each job and set the 'selected' field to false
                                              applicant.submissions =
                                                applicant.submissions.map(
                                                  (job) => {
                                                    return {
                                                      ...job,
                                                      selected: false, // Set selected to false
                                                    };
                                                  }
                                                );
                                            }
                                            return applicant;
                                          });

                                          // If the new checkbox is checked
                                          if (e.target.checked) {
                                            // Loop through all submissions and set 'selected' to false
                                            update[index]["submissions"] =
                                              update[index]["submissions"].map(
                                                (
                                                  submission,
                                                  submissionIndex
                                                ) => {
                                                  // Set selected to false for all except the newly selected one
                                                  return {
                                                    ...submission,
                                                    selected:
                                                      submissionIndex === _index
                                                        ? true
                                                        : false,
                                                  };
                                                }
                                              );
                                          } else {
                                            // If the checkbox is unchecked, just uncheck it
                                            update[index]["submissions"][
                                              _index
                                            ]["selected"] = false;
                                          }

                                          setJobPostList(update);
                                        }}
                                        checked={_item?.selected}
                                      /> */}
                                      <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          // Clone the jobPostList state to update it immutably
                                          const updatedJobPostList =
                                            jobPostList.map(
                                              (applicant, applicantIndex) => {
                                                // Reset 'selected' field for all submissions for each applicant
                                                if (
                                                  Array.isArray(
                                                    applicant.submissions
                                                  )
                                                ) {
                                                  applicant.submissions =
                                                    applicant.submissions.map(
                                                      (submission) => ({
                                                        ...submission,
                                                        selected: false,
                                                      })
                                                    );
                                                }

                                                // Check if this is the applicant we want to update based on the index
                                                if (applicantIndex === index) {
                                                  applicant.submissions =
                                                    applicant.submissions.map(
                                                      (
                                                        submission,
                                                        submissionIndex
                                                      ) => ({
                                                        ...submission,
                                                        selected:
                                                          e.target.checked &&
                                                          submissionIndex ===
                                                            _index,
                                                      })
                                                    );
                                                }

                                                return applicant;
                                              }
                                            );

                                          setJobPostList(updatedJobPostList);
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
                                        {(firstname || "") +
                                          " " +
                                          (middlename || "") +
                                          " " +
                                          (lastname || "")}
                                      </Link>
                                    </td>
                                    <td>{authorization || "N/A"}</td>
                                    <td>{mobile || "N/A"}</td>
                                    <td>
                                      {address ? cleanString(address) : "N.A"}
                                    </td>
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

export default JobPostsTable;
