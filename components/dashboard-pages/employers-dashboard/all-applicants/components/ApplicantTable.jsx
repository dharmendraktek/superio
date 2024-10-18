"use client";

import Loader from "@/components/common/Loader";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { getReq } from "@/utils/apiHandlers";
import { candidateSearchKey, processOptions } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import InterviewScheduleModal from "../../jobposts/components/components/InterviewScheduleModal";
import ClientSubmissionModal from "../../jobposts/components/components/ClientSubmissionModal";
import NotesModal from "@/components/common/NotesModal";
import ResumePreviewModal from "@/components/common/ResumePreviewModal";

// export const applicantData = [
//   {
//     id: 672652,
//     name: "Anil Patel",
//     email: "anilpatel365@gmail.com",
//     mobile: "9610465261",
//     city: "Indore",
//     source: "Dice",
//     state: "Madhyapradesh",
//     status: "New Lead",
//     title: "Full stack developer",
//     ownership: "-",
//     authorization: "-",
//   },
// ];

const ApplicantTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [applicantData, setApplicantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState("search-any");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [isSelected, setIsSelected] = useState([]);
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [openPrimarySkill, setOpenPrimarySkill] = useState(null);
  const [openSecondarySkill, setOpenSecondarySkill] = useState(null);

  useEffect(() => {
    let param;
    if (fieldName == "created" && startDate && endDate) {
      setPage(0);
      param = `&created_start_date=${moment(startDate)
        .startOf("day")
        .toISOString()}&created_end_date=${moment(endDate)
        .endOf("day")
        .toISOString()}`;
    } else if (fieldName == "updated" && startDate && endDate) {
      setPage(0);
      param = `&updated_start_date=${moment(startDate)
        .startOf("day")
        .toISOString()}&updated_end_date=${moment(endDate)
        .endOf("day")
        .toISOString()}`;
    } else if (fieldName && search) {
      setPage(0);
      param = `&${fieldName}=${search}`;
    }
    // setTimeout(() => {
    handleGetApplicantList(param);
    // }, 700)
  }, [search, startDate, endDate, page]);

  const handleGetApplicantList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/applicants/?page=${page + 1}&size=25${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setApplicantData(response.data.results);
    }
  };

  useEffect(() => {
    if (applicantData.length > 0) {
      const filteredData = applicantData.filter((item) =>
        item.jobs_associated.some((submission) => submission.selected === true)
      );
      setIsSelected(filteredData);
      // setJobData(filteredData);
    }
  }, [applicantData]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="d-flex justify-content-between">
        <MultiSearch
          openFields={openFields}
          setOpenFields={setOpenFields}
          keys={candidateSearchKey}
          search={search}
          fieldName={fieldName}
          setFieldName={setFieldName}
          setSearch={setSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <Link href="/employers-dashboard/all-applicants/add-applicant">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link>
      </div>
      <div className="mt-2">
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th style={{ width: "160px" }}>
                  {/* <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="rounded-1"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setApplicantData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        } else {
                          setApplicantData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        }
                      }}
                    />
                    {applicantData.find((item) => item.selected == true) && (
                      <div className="position-relative">
                        <span onClick={() => setOpenAct(!openAct)}>Action</span>
                        {openAct && (
                          <div className="position-absolute">
                            <div className="bg-white" style={{width:'300px'}}>
                              <p>Delete</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div> */}
                </th>
                <th className="" style={{ width: "150px" }}>
                  Candidate ID
                </th>
                <th style={{ width: "200px" }}>Candidate Name</th>
                <th style={{ width: "250px" }}>Job Title</th>
                <th style={{ width: "300px" }}>Email Address</th>
                <th style={{ width: "300px" }}>Mobile Number</th>
                <th style={{ width: "300px" }}>Primary Skills</th>
                <th style={{ width: "300px" }}>Secondary Skills</th>
                <th style={{ width: "150px" }}>City</th>
                <th style={{ width: "200px" }}>Source</th>
                <th style={{ width: "200px" }}>State</th>
                <th style={{ width: "200px" }}>Applicant Status</th>
                <th style={{ width: "250px" }}>Ownership</th>
                <th style={{ width: "250px" }} className="">
                  Work Authorization
                </th>
                <th style={{ width: "250px" }}>Created By</th>
                <th style={{ width: "250px" }}>Updated By</th>
                <th style={{ width: "200px" }}>Created On</th>
                <th style={{ width: "200px" }}>Updated On</th>
              </tr>
            </thead>
            <tbody>
              <ResumePreviewModal
                applicantDetails={applicantDetails}
                setApplicantDetails={setApplicantDetails}
              />
              {applicantData.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td style={{ width: "160px" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          {/* <input
                            type="checkbox"
                            checked={item?.selected}
                            onChange={(e) => {
                              let update = [...applicantData];
                              if (e.target.checked) {
                                update[index]["selected"] = e.target.checked;
                              } else {
                                update[index]["selected"] = e.target.checked;
                              }
                              setApplicantData(update);
                            }}
                          /> */}
                          {item.jobs_associated.length > 0 && (
                            <>
                              <div
                                onClick={() => {
                                  if (expand == item.id) {
                                    setExpand(null);
                                  } else {
                                    setExpand(item.id);
                                  }
                                }}
                                className="mx-2 px-1 d-flex gap-1 justify-content-center align-items-center text-white  rounded-1 cursor-pointer fw-bold fs-6"
                                style={{
                                  background: "var(--primary-2nd-color)",
                                  width: "100% !important",
                                }}
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
                                    {item.jobs_associated.length}
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
                      <td className="" style={{ width: "150px" }}>
                        <Link
                          href="/employers-dashboard/all-applicants/[id]"
                          as={`/employers-dashboard/all-applicants/${item.id}`}
                          target="_blank"
                        >
                          {item.applicant_code}
                        </Link>
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        <div className="d-flex gap-2 align-items-center">
                          {applicantDetails?.id == item.id && (
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#resumePreviewModal"
                              className="text-primary fs-5 cursor-pointer"
                              id="resumepreview"
                              onMouseEnter={() => {
                                let previewBtn =
                                  document.getElementById("resumepreview");
                                previewBtn.click();
                              }}
                            >
                              {reactIcons.view}
                            </span>
                          )}
                          <Link
                            href="/employers-dashboard/all-applicants/[id]"
                            as={`/employers-dashboard/all-applicants/${item.id}`}
                            target="_blank"
                            onMouseEnter={() => {
                              setApplicantDetails(item);
                            }}
                          >
                            {item?.firstname || "N/A"} {item?.middlename || ""}{" "}
                            {item?.lastname || ""}
                          </Link>
                        </div>
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "250px" }}
                      >
                        {item.job_title == "undefined" || item.job_title
                          ? "N/A"
                          : item.job_title}
                      </td>
                      <td className="" style={{ width: "300px" }}>
                        {item.email || "N/A"}
                      </td>
                      <td className="" style={{ width: "300px" }}>
                        {item.mobile || "N/A"}
                      </td>
                      <td style={{ width: "300px" }}>
                        <div
                          className="d-flex flex-wrap gap-1 position-relative"
                          onMouseLeave={() => setOpenPrimarySkill(null)}
                          onMouseEnter={() => setOpenPrimarySkill(item.id)}
                        >
                          {item.primary_skills
                            ?.slice(0, 2)
                            .map((_item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="border rounded-1 bg-white border-primary px-2"
                                >
                                  <span
                                    className="fw-medium text-capitalize"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {_item.name}
                                    {item.primary_skills.length - 1 > index
                                      ? ""
                                      : ""}
                                  </span>
                                </div>
                              );
                            })}
                          {item.primary_skills.length == 0 && "N/A"}
                          {openPrimarySkill == item.id && (
                            <div
                              className="position-absolute bg-lightestblue text-white rounded-1 px-2 d-flex flex-wrap gap-1"
                              style={{
                                width: "300px",
                                minHeight: "30px",
                                maxHeight: "fit-content",
                                zIndex: "5",
                              }}
                            >
                              {item.primary_skills?.map((_item, index) => {
                                return (
                                  <span
                                    className="fw-medium text-capitalize text-white"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {_item.name}
                                    {item.primary_skills.length - 1 > index
                                      ? ""
                                      : ""}
                                    ,
                                  </span>
                                );
                              })}
                              {item.primary_skills.length == 0 &&
                                "Not Available"}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ width: "300px" }}>
                      <div
                          className="d-flex flex-wrap gap-1 position-relative"
                          onMouseLeave={() => setOpenSecondarySkill(null)}
                          onMouseEnter={() => setOpenSecondarySkill(item.id)}
                        >
                          {item.secondary_skills
                            ?.slice(0, 2)
                            .map((_item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="border rounded-1 bg-white border-primary px-2"
                                >
                                  <span
                                    className="fw-medium text-capitalize"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {_item.name}
                                    {item.secondary_skills.length - 1 > index
                                      ? ""
                                      : ""}
                                  </span>
                                </div>
                              );
                            })}
                          {item.secondary_skills.length == 0 && "N/A"}
                          {openSecondarySkill == item.id && (
                            <div
                              className="position-absolute bg-lightestblue text-white rounded-1 px-2 d-flex flex-wrap gap-1"
                              style={{
                                width: "300px",
                                minHeight: "30px",
                                maxHeight: "fit-content",
                                zIndex: "5",
                              }}
                            >
                              {item.secondary_skills?.map((_item, index) => {
                                return (
                                  <span
                                    className="fw-medium text-capitalize text-white"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {_item.name}
                                    {item.secondary_skills.length - 1 > index
                                      ? ""
                                      : ""}
                                    ,
                                  </span>
                                );
                              })}
                              {item.secondary_skills.length == 0 &&
                                "Not Available"}
                            </div>
                          )}
                        </div>
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "150px" }}
                      >
                        {item.city || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {item.source || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {item.state || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {item.status || "N/A"}
                      </td>
                      <td
                        className="d-flex flex-wrap gap-2"
                        style={{ width: "250px" }}
                      >
                        {item.ownership_details.map((item) => {
                          return (
                            <span key={item.id} className="text-capitalize">
                              {item.first_name || "N/A"} {item.last_name || ""}
                            </span>
                          );
                        })}
                        {item.ownership_details.length == 0 && "N/A"}
                      </td>
                      <td className="" style={{ width: "250px" }}>
                        {item.authorization || "N/A"}
                        {/* <div className="option-box text-center">
                    <ul className="option-list">
                      <li>
                        <button
                          onClick={() => setItem(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#userUpdateModal"
                          data-text="Edit User"
                        >
                          
                          <span className="las la-edit"></span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={
                            () => {
                              if (active == 1) {
                                handleDeleteUser(item.id);
                              } else {
                                handleActiveUser(item.id);
                              }
                            }
                            // setUserId(item.id)
                          }
                          // data-bs-toggle="modal"
                          //     data-bs-target="#userDeleteModal"

                          data-text={`${
                            active == 1 ? "Inactive User" : "Active User"
                          }`}
                        >
                          <span
                            className={`${
                              active == 1
                                ? "las la-times-circle"
                                : "las la-check-square"
                            }`}
                          ></span>
                        </button>
                      </li>
                    </ul>
                  </div> */}
                      </td>
                      <td style={{ width: "250px" }}>
                        {item.created_by
                          ? item?.created_by?.first_name +
                            " " +
                            item?.created_by?.last_name
                          : "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {item.updated_by
                          ? item?.updated_by?.first_name +
                            " " +
                            item?.updated_by?.last_name
                          : "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>
                        {moment(item.created_at).format("DD-MM-YYYY  hh:mm A")}
                      </td>
                      <td style={{ width: "200px" }}>
                        {moment(item.updated_at).format("DD-MM-YYYY  hh:mm A")}
                      </td>
                    </tr>
                    {item.id == expand && (
                      <tr colSpan={12}>
                        <div className="my-3 px-5 border rounded-1  inner-table ">
                          <InterviewScheduleModal
                            jobPostList={[]}
                            applicantData={applicantData}
                          />
                          <ClientSubmissionModal
                            submissionDetails={applicantData}
                            side="applicant"
                          />
                          <NotesModal
                            submissionDetails={applicantData}
                            side="applicant"
                          />
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
                                      aria-controls={item.ariaControls}
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
                          <td>
                            <div className="mx-2 border rounded-1  inner-table shadow">
                              {/* <div className="mx-3 my-1">
                            this the filter table and search bard
                          </div> */}
                              <table className="custom-scroll-2nd">
                                <thead className="table-inner-thead">
                                  <th style={{ width: "60px" }}>
                                    {/* <input type="checkbox" className="mx-1" /> */}
                                  </th>
                                  <th>Job Code</th>
                                  <th>Job Title</th>
                                  <th>Submission Record</th>
                                  <th>Delivery Manager</th>
                                  <th>Resume</th>
                                  <th>Profile Status</th>
                                  {/* <th>Outlook MSG</th> */}
                                  <th>Submission Rating</th>
                                  <th>Client</th>
                                  <th>Source</th>
                                  <th>Client Bill Rate/Salary</th>
                                  <th style={{ width: "250px" }}>Bill Rate</th>
                                  <th style={{ width: "250px" }}>Pay Rate</th>
                                  {/* <th>Employer Name</th> */}
                                  <th>Submitted By</th>
                                  <th>Submitted On</th>
                                  {/* <th>Additional Details</th> */}
                                </thead>
                                <tbody>
                                  {item.jobs_associated.map((_item, _index) => {
                                    let {
                                      pay_rate_currency,
                                      pay_rate_amount,
                                      pay_rate_type,
                                      pay_rate_contract_type,
                                      bill_rate_currency,
                                      bill_rate_amount,
                                      bill_rate_type,
                                      bill_rate_contract_type,
                                      current_status_details,
                                      applicant_rating,
                                      applicant_details,
                                      job_detail,
                                      submitted_by_details,
                                      submission_on,
                                    } = _item || {};

                                    let {
                                      id,
                                      job_code,
                                      title,
                                      client_name,
                                      delivery_manager,
                                      amount,
                                      currency,
                                      payment_frequency,
                                    } = job_detail;
                                    let { first_name, last_name } =
                                      delivery_manager || {};
                                    let deliverManagerName =
                                      (first_name || "N/A") +
                                      " " +
                                      (last_name || "");
                                    let clientRate =
                                      (currency || "N.A") +
                                      "/" +
                                      (amount || "N.A") +
                                      "/" +
                                      (payment_frequency || "N.A");
                                    let { source } = applicant_details[0];

                                    let applicantResume = item.documents.find(
                                      (doc) => doc.is_default == true
                                    );
                                    let {
                                      communication,
                                      overall,
                                      profesionalism,
                                      technical,
                                    } = applicant_rating;
                                    let overallRating =
                                      (communication +
                                        overall +
                                        profesionalism +
                                        technical) /
                                      4;

                                    console.log("--------------submitteb by details ", submitted_by_details?.last_name);
                                    return (
                                      <tr
                                        style={{
                                          background: "white !important",
                                        }}
                                      >
                                        <td style={{ width: "60px" }}>
                                          <input
                                            type="checkbox"
                                            onChange={(e) => {
                                              let update = [...applicantData];

                                              update.map((applicant) => {
                                                // Check if the applicant has a 'jobs_associated' array
                                                if (
                                                  Array.isArray(
                                                    applicant.jobs_associated
                                                  )
                                                ) {
                                                  // Iterate over each job and set the 'selected' field to false
                                                  applicant.jobs_associated =
                                                    applicant.jobs_associated.map(
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
                                                update[index][
                                                  "jobs_associated"
                                                ] = update[index][
                                                  "jobs_associated"
                                                ].map(
                                                  (
                                                    submission,
                                                    submissionIndex
                                                  ) => {
                                                    // Set selected to false for all except the newly selected one
                                                    return {
                                                      ...submission,
                                                      selected:
                                                        submissionIndex ===
                                                        _index
                                                          ? true
                                                          : false,
                                                    };
                                                  }
                                                );
                                              } else {
                                                // If the checkbox is unchecked, just uncheck it
                                                update[index][
                                                  "jobs_associated"
                                                ][_index]["selected"] = false;
                                              }

                                              setApplicantData(update);
                                            }}
                                            checked={_item?.selected}
                                          />
                                        </td>
                                        <td>{job_code ? job_code : "N/A"}</td>
                                        <td>
                                          <Link
                                            href={`/employers-dashboard/job-posts/${id}`}
                                          >
                                            {title || "N/A"}
                                          </Link>
                                        </td>
                                        <td className="cursor-pointer">
                                          <Link
                                            href="/employers-dashboard/all-applicants/[id]"
                                            as={`/employers-dashboard/all-applicants/${item.id}`}
                                          >
                                            <span className="text-primary">
                                              Click Here
                                            </span>
                                          </Link>
                                        </td>
                                        <td>{deliverManagerName || "N/A"}</td>
                                        <td>
                                          <span
                                            onClick={() => {
                                              window.open(
                                                BASE_URL +
                                                  `/applicant-documents/${applicantResume?.id}/download/`
                                              );
                                            }}
                                            className="fs-5 text-primary cursor-pointer"
                                          >
                                            {reactIcons.document}
                                          </span>
                                        </td>
                                        <td>
                                          {current_status_details?.display_name || "N/A"}
                                        </td>
                                        {/* <th>Outlook MSG</th> */}
                                        <td>{overallRating}</td>
                                        <td>{client_name || "N/A"}</td>
                                        <td>{source}</td>
                                        <td>{clientRate || "N/A"}</td>
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
                                        <td>
                                          {submitted_by_details?.first_name || "N.A"}  {submitted_by_details?.last_name || ""}
                                        </td>
                                        <td>
                                          {moment(submission_on).format(
                                            "DD-MM-YYYY hh:mm A"
                                          )}
                                        </td>
                                        {/* <td>Additional Details</td> */}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </div>
                      </tr>
                    )}
                  </>
                );
              })}
              {/* End tr */}
              {applicantData.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={6} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataCount > 25 && (
          <Pagination dataCount={dataCount} page={page} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default ApplicantTable;
