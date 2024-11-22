"use client";
import { use, useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
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
import JobDetailsPreviewModal from "@/components/common/JobDetailsPreviewModal";
import JobAssignModal from "@/components/common/JobAssignModal";
import { cleanString } from "@/utils/regex";
import { useSelector } from "react-redux";
import { jobPostsTableField } from "../../jobposts/components/components/constant";
import { isNumber } from "lodash";
import DatePickerCustom from "@/components/common/DatePickerCustom";

const tabsName = [
  { id: 1, name: "ACTIVE JOB POST" },
  { id: 2, name: "INACTIVE JOB POST" },
];

const TeamReportTable = () => {
  const [expand, setExpand] = useState(null);
  const [teamReportData, setTeamReportData] = useState([]);
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
  const [innerExp, setInnerExp] = useState(null);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getTeamPerformanceReport();
  }, []);

  const getTeamPerformanceReport = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/team-performance-report/report/${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setTeamReportData(response.data.results || response.data);
      setDataCount(response?.data.count);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      let param = `?start_date=${moment(startDate).format(
        "yyyy-MM-DD"
      )}&end_date=${moment(endDate).format("yyyy-MM-DD")}`;
      getTeamPerformanceReport(param);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (teamReportData.length > 0) {
      const filteredData = teamReportData.filter((item) =>
        item.users.some((submission) => submission.selected === true)
      );
      setIsSelected(filteredData);
      // setJobData(filteredData);
    }
  }, [teamReportData]);

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
      <JobAssignModal jobId={jobId} handleReload={getTeamPerformanceReport} />
      <div>
            <h4>Team Performance Report</h4>
          </div>
      <div className="d-flex justify-content-between my-2">
        <div className="d-flex gap-2 justify-content-between">
          <div className="d-flex align-item-center gap-2  mt-1">
            <div className="" style={{ width: "200px" }}>
              <DatePickerCustom
                date={startDate}
                handleDate={(date) => setStartDate(date)}
              />
            </div>
            <div className="" style={{ width: "200px" }}>
              <DatePickerCustom
                date={endDate}
                handleDate={(date) => setEndDate(date)}
              />
            </div>
            <div className="d-flex gap-2">
            <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ==
                    moment(new Date()).format("DD-MM") &&
                  moment(endDate).format("DD-MM") ==
                    moment(new Date()).format("DD-MM")
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  // setType("schedule");
                  setStartDate(new Date());
                  setEndDate(new Date());
                }}
              >
                Today
              </button>
              <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ===
                    moment(new Date().setDate(new Date().getDate() - 1)).format(
                      "DD-MM"
                    ) &&
                  moment(endDate).format("DD-MM") ===
                    moment(new Date().setDate(new Date().getDate() - 1)).format(
                      "DD-MM"
                    )
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  const today = new Date();
                  const yesterday = new Date();
                  yesterday.setDate(today.getDate() - 1); // Set yesterday's date
                  // setType("schedule");
                  setStartDate(yesterday); // Setting yesterday's date
                  setEndDate(yesterday); // Setting today's date
                }}
              >
                Yesterday
              </button>
              <button
                className="theme-btn btn-style-two small"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  getTeamPerformanceReport();
                }}
              >
                Clear
              </button>
            </div>
          </div>
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
          {/* <div className="position-relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ width: "350px" }}
              className="border border-primary px-4 rounded-1"
              placeholder="Search anything..."
              onKeyDown={(e) => {
                if (e.key == "Enter") {
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
          </div> */}
        </div>
      </div>
      <div className="table_div custom-scroll-sm">
        <table className="default-table ">
          <thead className="">
            <th></th>
            <th>Team</th>
            <th>Requirment</th>
            <th>Submission</th>
            <th>L1</th>
            <th>L2</th>
            <th>L3</th>
            <th>Client Interview</th>
            <th>Confirmation</th>
            <th>Joining</th>
          </thead>
          <tbody>
            {teamReportData.map((item, index) => {
              const {
                team_name,
                total_submissions,
                total_confirmations,
                total_joinings,
                total_l1_interviews,
                total_l2_interviews,
                total_l3_interviews,
                total_requirements,
                total_client_interviews,
              } = item;
              return (
                <>
                  <tr key={index} className="">
                    <td>
                      <div
                        className={`d-flex gap-2 align-items-center ${
                          item.users.length == 0
                            ? "justify-content-start"
                            : "justify-content-start"
                        }`}
                      >
                        {item.users.length > 0 && (
                          <>
                            <div
                              onClick={() => {
                                if (expand == item.id) {
                                  setExpand(null);
                                } else {
                                  setExpand(item.id);
                                  setInnerExp(null);
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
                                  {item.users.length}
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
                      </div>
                    </td>
                    <td>{team_name}</td>
                    <td>{total_requirements}</td>
                    <td>{total_submissions}</td>
                    <td>{total_l1_interviews}</td>
                    <td>{total_l2_interviews}</td>
                    <td>{total_l3_interviews}</td>
                    <td>{total_client_interviews}</td>
                    <td>{total_confirmations}</td>
                    <td>{total_joinings}</td>
                  </tr>
                  {item.id == expand && (
                    <>
                      <tr>
                        <div className="mx-3 my-3 border rounded-1  inner-table shadow">
                          <td colSpan={15}>
                            <table>
                              <thead className="table-inner-thead">
                                {/* <th style={{ width: "60px" }}></th> */}
                                <th>Recruiter</th>
                                <th>Assigned</th>
                                <th>Submission</th>
                                <th>L1</th>
                                <th>L2</th>
                                <th>L3</th>
                                <th>Clinet Interview</th>
                                <th>Confirm</th>
                                {/* <th>Reject</th> */}
                                <th>Join</th>
                                <th>Backout</th>
                              </thead>
                              <tbody>
                                {item.users.map((_item, _index) => {
                                  let {
                                    name,
                                    assigned_jobs_count,
                                    submission_count,
                                    confirmation_count,
                                    joining_count,
                                    backout_count,
                                    l1_interview_count,
                                    l2_interview_count,
                                    l3_interview_count,
                                    client_interview_count,
                                    assigned_jobs,
                                  } = _item;

                                  return (
                                    <tr>
                                      <td>{name}</td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("assign");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {assigned_jobs_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("submission");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {submission_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("l1");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {l1_interview_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("l2");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {l2_interview_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("l3");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {l3_interview_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("client");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {client_interview_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("confirmations");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {confirmation_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("joinings");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {joining_count}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setInnerExp(_index);
                                          setType("backouts");
                                        }}
                                        className="text-primary cursor-pointer"
                                      >
                                        {backout_count}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </td>
                        </div>
                      </tr>
                      {isNumber(innerExp) && type == "assign" && (
                        <tr>
                          <div className="mx-5 my-3 border rounded-1  inner-table shadow">
                            <div className="px-2 py-1 d-flex justify-content-between">
                              <h5>Assigned Jobs</h5>
                              <span>
                                {item?.users[innerExp]?.assigned_jobs?.length}{" "}
                                records
                              </span>
                            </div>
                            <div
                              className="table_div custom-scroll-sm"
                              style={{ height: "200px" }}
                            >
                              <td colSpan={10}>
                                <table>
                                  <thead className="table-inner-thead">
                                    <th>Job Code</th>
                                    <th>Job Title</th>
                                    <th>Client</th>
                                    <th>Client Job Id</th>
                                    <th>End Client</th>
                                    <th>LOB</th>
                                    <th>Contact Manager</th>
                                    <th>Job Type</th>
                                    <th>Job Status</th>
                                  </thead>
                                  <tbody>
                                    {item.users[innerExp].assigned_jobs.map(
                                      (assignJob, _index) => {
                                        let {
                                          job_code,
                                          job_title,
                                          client,
                                          client_job_id,
                                          endclient,
                                          lob,
                                          job_type,
                                          job_status,
                                          contact_manager,
                                        } = assignJob;

                                        return (
                                          <tr key={assignJob.id}>
                                            <td>{job_code}</td>
                                            <td>{job_title || "N/A"}</td>
                                            <td>{client || "N/A"}</td>
                                            <td>{client_job_id || "N/A"}</td>
                                            <td>{endclient || "N/A"}</td>
                                            <td>{lob || "N/A"}</td>
                                            <td>{contact_manager || "N/A"}</td>
                                            <td>{job_type || "N/A"}</td>
                                            <td>{job_status || "N/A"}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </div>
                          </div>
                        </tr>
                      )}
                      {isNumber(innerExp) && type == "submission" && (
                        <tr>
                          <div className="mx-5 my-3 border rounded-1  inner-table shadow">
                            <div className="px-2 d-flex justify-content-between py-1">
                              <h5>Submission</h5>
                              <span>
                                {item?.users[innerExp]?.submissions?.length}{" "}
                                records
                              </span>
                            </div>
                            <div
                              className="table_div custom-scroll-sm"
                              style={{ height: "200px" }}
                            >
                              <td colSpan={10}>
                                <table>
                                  <thead className="table-inner-thead">
                                    <th>Submission Id</th>
                                    <th>Job Code</th>
                                    <th>Job Title</th>
                                    <th>Candidate Name</th>
                                    <th>Submisson Date</th>
                                    <th>Current Status</th>
                                    <th>Current Sub Status</th>
                                  </thead>
                                  <tbody>
                                    {item.users[innerExp].submissions.map(
                                      (submission, _index) => {
                                        let {
                                          job_code,
                                          submission_id,
                                          job_title,
                                          applicant_name,
                                          submission_date,
                                          current_status,
                                          current_substatus,
                                        } = submission;

                                        return (
                                          <tr key={submission_id}>
                                            <td>{submission_id}</td>
                                            <td>{job_code || "N/A"}</td>
                                            <td>{job_title || "N/A"}</td>
                                            <td>{applicant_name || "N/A"}</td>
                                            <td>{submission_date || "N/A"}</td>
                                            <td>{current_status || "N/A"}</td>
                                            <td>
                                              {current_substatus || "N/A"}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </div>
                          </div>
                        </tr>
                      )}
                      {isNumber(innerExp) &&
                        (type == "confirmations" ||
                          type == "joinings" ||
                          type == "backouts") && (
                          <tr>
                            <div className="mx-5 my-3 border rounded-1  inner-table shadow">
                              <div className="px-2 py-1 d-flex justify-content-between">
                                <h5 className="text-capitalize">{type}</h5>
                                <span>
                                  {item?.users[innerExp][`${type}`]?.length}{" "}
                                  records
                                </span>
                              </div>
                              <div
                                className="table_div custom-scroll-sm"
                                style={{ height: "200px" }}
                              >
                                <td colSpan={10}>
                                  <table>
                                    <thead className="table-inner-thead">
                                      <th>Submission Id</th>
                                      <th>Job Code</th>
                                      <th>Job Title</th>
                                      <th>Candidate Name</th>
                                      <th>Submisson Date</th>
                                      <th>Confirmation Date</th>
                                      <th>Current Status</th>
                                      <th>Current Sub Status</th>
                                    </thead>
                                    <tbody>
                                      {item.users[innerExp][`${type}`].map(
                                        (confirmation, _index) => {
                                          let {
                                            job_code,
                                            submission_id,
                                            job_title,
                                            applicant_name,
                                            confirmation_date,
                                            submission_date,
                                            current_status,
                                            current_substatus,
                                          } = confirmation;

                                          return (
                                            <tr key={submission_id}>
                                              <td>{submission_id}</td>
                                              <td>{job_code || "N/A"}</td>
                                              <td>{job_title || "N/A"}</td>
                                              <td>{applicant_name || "N/A"}</td>
                                              <td>
                                                {confirmation_date || "N/A"}
                                              </td>
                                              <td>
                                                {submission_date || "N/A"}
                                              </td>
                                              <td>{current_status || "N/A"}</td>
                                              <td>
                                                {current_substatus || "N/A"}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </div>
                            </div>
                          </tr>
                        )}
                      {isNumber(innerExp) && type == "l1" && (
                        <tr>
                          <div className="mx-5 my-3 border rounded-1  inner-table shadow">
                            <div className="px-2 py-1 d-flex justify-content-between">
                              <h5 className="text-capitalize">
                                {type} Interview
                              </h5>
                              <span>
                                {item?.users[innerExp]?.l1_interviews?.length}{" "}
                                records
                              </span>
                            </div>
                            <div
                              className="table_div custom-scroll-sm"
                              style={{ height: "200px" }}
                            >
                              <td colSpan={10}>
                                <table>
                                  <thead className="table-inner-thead">
                                    <th>Submission Id</th>
                                    <th>Job Code</th>
                                    <th>Job Title</th>
                                    <th>Candidate Name</th>
                                    <th>Interview Date</th>
                                    <th>Round</th>
                                  </thead>
                                  <tbody>
                                    {item.users[innerExp][`l1_interviews`].map(
                                      (interview, _index) => {
                                        let {
                                          job_code,
                                          submission_id,
                                          job_title,
                                          applicant_name,
                                          interview_date,
                                          round,
                                        } = interview;

                                        return (
                                          <tr key={submission_id}>
                                            <td>{submission_id}</td>
                                            <td>{job_code || "N/A"}</td>
                                            <td>{job_title || "N/A"}</td>
                                            <td>{applicant_name || "N/A"}</td>
                                            <td>{interview_date || "N/A"}</td>
                                            <td>{round || "N/A"}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </div>
                          </div>
                        </tr>
                      )}
                      {isNumber(innerExp) && type == "l2" && (
                        <tr>
                          <div className="mx-5 my-3 border rounded-1 custom-scroll-sm  inner-table shadow">
                            <div className="px-2 py-1 d-flex justify-content-between">
                              <h5 className="text-capitalize">
                                {type} Interview
                              </h5>
                              <span>
                                {item?.users[innerExp]?.l2_interviews?.length}{" "}
                                records
                              </span>
                            </div>
                            <div
                              className="table_div custom-scroll-sm"
                              style={{ height: "200px" }}
                            >
                              <td colSpan={10}>
                                <table>
                                  <thead className="table-inner-thead">
                                    <th>Submission Id</th>
                                    <th>Job Code</th>
                                    <th>Job Title</th>
                                    <th>Candidate Name</th>
                                    <th>Interview Date</th>
                                    <th>Round</th>
                                  </thead>
                                  <tbody>
                                    {item.users[innerExp].l2_interviews.map(
                                      (interview, _index) => {
                                        let {
                                          job_code,
                                          submission_id,
                                          job_title,
                                          applicant_name,
                                          interview_date,
                                          round,
                                        } = interview;

                                        return (
                                          <tr key={submission_id}>
                                            <td>{submission_id}</td>
                                            <td>{job_code || "N/A"}</td>
                                            <td>{job_title || "N/A"}</td>
                                            <td>{applicant_name || "N/A"}</td>
                                            <td>{interview_date || "N/A"}</td>
                                            <td>{round || "N/A"}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </div>
                          </div>
                        </tr>
                      )}
                      {isNumber(innerExp) && type == "l3" && (
                        <tr>
                          <div className="mx-5 my-3 border rounded-1  inner-table custom-scroll-sm shadow">
                            <div className="px-2 py-1 d-flex justify-content-between">
                              <h5 className="text-capitalize">
                                {type} Interview
                              </h5>
                              <span>
                                {item?.users[innerExp]?.l3_interviews?.length}{" "}
                                records
                              </span>
                            </div>
                            <div
                              className="table_div custom-scroll-sm"
                              style={{ height: "200px" }}
                            >
                              <td colSpan={10}>
                                <table>
                                  <thead className="table-inner-thead">
                                    <th>Submission Id</th>
                                    <th>Job Code</th>
                                    <th>Job Title</th>
                                    <th>Candidate Name</th>
                                    <th>Interview Date</th>
                                    <th>Round</th>
                                  </thead>
                                  <tbody>
                                    {item.users[innerExp].l3_interviews.map(
                                      (interview, _index) => {
                                        let {
                                          job_code,
                                          submission_id,
                                          job_title,
                                          applicant_name,
                                          interview_date,
                                          round,
                                        } = interview;

                                        return (
                                          <tr key={submission_id}>
                                            <td>{submission_id}</td>
                                            <td>{job_code || "N/A"}</td>
                                            <td>{job_title || "N/A"}</td>
                                            <td>{applicant_name || "N/A"}</td>
                                            <td>{interview_date || "N/A"}</td>
                                            <td>{round || "N/A"}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </div>
                          </div>
                        </tr>
                      )}
                      {isNumber(innerExp) && type == "client" && (
                        <tr>
                          <div className="mx-5 my-3 border rounded-1  inner-table shadow">
                            <div className="px-2 py-1 d-flex justify-content-between">
                              <h5 className="text-capitalize">
                                {type} Interview
                              </h5>
                              <span>
                                {
                                  item?.users[innerExp]?.client_interviews
                                    ?.length
                                }{" "}
                                records
                              </span>
                            </div>
                            <div
                              className="table_div custom-scroll-sm"
                              style={{ height: "200px" }}
                            >
                              <td colSpan={10}>
                                <table>
                                  <thead className="table-inner-thead">
                                    <th>Submission Id</th>
                                    <th>Job Code</th>
                                    <th>Job Title</th>
                                    <th>Candidate Name</th>
                                    <th>Interview Date</th>
                                    <th>Round</th>
                                  </thead>
                                  <tbody>
                                    {item.users[innerExp].client_interviews.map(
                                      (interview, _index) => {
                                        let {
                                          job_code,
                                          submission_id,
                                          job_title,
                                          applicant_name,
                                          interview_date,
                                          round,
                                        } = interview;

                                        return (
                                          <tr key={submission_id}>
                                            <td>{submission_id}</td>
                                            <td>{job_code || "N/A"}</td>
                                            <td>{job_title || "N/A"}</td>
                                            <td>{applicant_name || "N/A"}</td>
                                            <td>{interview_date || "N/A"}</td>
                                            <td>{round || "N/A"}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </div>
                          </div>
                        </tr>
                      )}
                    </>
                  )}
                </>
              );
            })}
            {!isLoading && teamReportData.length == 0 && (
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

export default TeamReportTable;
