"use client";

import StatusModal from "@/app/employers-dashboard/job-posts/[id]/components/StatusModal";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { getReq } from "@/utils/apiHandlers";
import { submissionReportFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import { useEffect, useState } from "react";

const ClientSubmissionReport = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [clientSubmissionData, setClientSubmissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState("search_any");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [filterKeys, setFilterKeys] = useState(submissionReportFilterKey);
  const [allParam, setAllParam] = useState("");
  const [openEditOpt, setOpenEditOpt] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState({});

  // useEffect(() => {
  //   let param;
  //   if (startDate && endDate) {
  //     setPage(0);
  //     param = `&submission_start=${moment(startDate).format(
  //       "yyyy-MM-DD"
  //     )}&submission_end=${moment(endDate).format("yyyy-MM-DD")}`;
  //   }

  //   if (fieldName && search) {
  //     setPage(0);
  //     param = param ? param + `&${fieldName}=${search}` : `&${fieldName}=${search}`;
  //   }
  //   if (fieldName == "assigned_today") {
  //     setPage(0);
  //     param = `&${fieldName}=""`;
  //   }
  //   getClientSubmissionList(param);
  // }, [search, startDate, endDate, page, fieldName]);

  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      setPage(0);
      param += `&interview_schedule_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&interview_schedule_end=${moment(endDate).format("YYYY-MM-DD")}`;
    }

    // Include filtered keys
    const filterParams = filterKeys
      .filter((item) => item.selected && item.search_value) // Filter items with selected: true and search_value present
      .map((item) => `&${item.value}=${item.search_value}`) // Create the string in the format &value=search_value
      .join(""); // Join them together to form the final string

    param += filterParams; // Combine date and filter parameters

    if (param) {
      setAllParam(param);
      setPage(page || 0); // Set page to 0 if it's falsy
      getClientSubmissionList(param);
    } else if (page) {
      getClientSubmissionList(param);
    } else {
      getClientSubmissionList(param);
    }
  }, [startDate, endDate, page, filterKeys]);

  const getClientSubmissionList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/submission-report/report/?page=${page + 1}&size=25${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setClientSubmissionData(response.data.results || response.data);
    }
  };

  const handleClear = () => {
    let update = [...filterKeys];
    update.map((item) => {
      delete item["selected"];
      delete item["search_value"];
      return item;
    });
    setFilterKeys(update);
    setStartDate(null);
    setEndDate(null);
    setSearch("");
  };

  const handleExportExcel = async () => {
    if (allParam) {
      window.open(
        BASE_URL + `/submission-report/report/?${allParam}&export=excel`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.open(
        BASE_URL + `/submission-report/report/?export=excel`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="theme-background">
      {isLoading && <Loader />}
      <StatusModal
        submissionId={submissionDetails?.submission_id}
        currentStatus={submissionDetails?.current_status}
        subStatus={submissionDetails?.current_substatus}
        submissionDetails={submissionDetails}
        handleGetJobDetails={getClientSubmissionList}
        submissionTable={true}
      />
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <MultiFilterSearch
            openFields={openFields}
            setOpenFields={setOpenFields}
            filterKeys={filterKeys}
            setFilterKeys={setFilterKeys}
            search={search}
            fieldName={fieldName}
            setFieldName={setFieldName}
            setSearch={setSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <div className="d-flex gap-2 justify-content-end align-items-center">
            <div className="d-flex gap-2 mt-1">
              <div className="" style={{ width: "200px" }}>
                <DatePickerCustom
                  date={startDate}
                  handleDate={(date) => setStartDate(date)}
                  placeholder="From Date"
                />
              </div>
              <div className="" style={{ width: "200px" }}>
                <DatePickerCustom
                  date={endDate}
                  handleDate={(date) => setEndDate(date)}
                  placeholder="To Date"
                />
              </div>
            </div>
            <div>
              <button
                className="theme-btn btn-style-two small"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            className="theme-btn btn-style-one small d-flex align-items-center gap-2"
            onClick={() => handleExportExcel()}
          >
            <span className="fw-600 fs-6">Excel</span>
            <span>{reactIcons.download}</span>
          </button>
        </div>
      </div>
      <div className="d-flex me-2 my-2">
        {filterKeys.map((item, index) => {
          return (
            <div className="">
              {item.selected && (
                <div
                  key={item.value}
                  className="border d-flex me-2 justify-content-between border-secondary"
                >
                  <div
                    onClick={() => {
                      setFieldName(index);
                      setFilterKeys((prevKeys) => {
                        const update = [...prevKeys];
                        update[index] = { ...update[index], search_value: "" };
                        return update;
                      });
                    }}
                    className="bg-gray text-white px-2 cursor-pointer"
                    htmlFor={item.value}
                  >
                    {item.name}
                  </div>
                  {item.search_value && (
                    <div className="px-2 bg-secondary fw-600">
                      {item.search_value || ""}
                      {/* <input type="text" placeholder="Search..." /> */}
                    </div>
                  )}
                  <div className="px-1 bg-secondary cursor-pointer">
                    <span
                      onClick={() => {
                        setFieldName(0);
                        setFilterKeys((prevKeys) => {
                          const update = [...prevKeys];
                          update[index] = {
                            ...update[index],
                            selected: false,
                            search_value: "",
                          };
                          return update;
                        });
                      }}
                    >
                      {reactIcons.normalclose}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th className="" style={{ width: "200px" }}>
                  Submission Date
                </th>
                {/* <th style={{ width: "200px" }}>Submission Time</th> */}
                <th style={{ width: "250px" }}>Client Submission Date</th>
                <th style={{ width: "150px" }}>Current Status</th>
                <th style={{ width: "250px" }}>Current Sub Status</th>
                <th style={{ width: "200px" }}>Submission ID</th>
                <th style={{ width: "200px" }}>Job Code</th>
                <th style={{ width: "250px" }}>Job Title</th>
                <th style={{ width: "200px" }}>Client</th>
                <th style={{ width: "200px" }}>End Client</th>
                <th style={{ width: "300px" }}>Job Location</th>
                <th style={{ width: "250px" }}>Candidate Code</th>
                <th style={{ width: "250px" }} className="">
                  Candidate Name
                </th>
                <th style={{ width: "250px" }}>Candidate Email</th>
                {/* <th style={{ width: "250px" }}>Work Authorization</th> */}
                {/* <th style={{ width: "250px" }}>Work Authorization Expiry</th> */}
                <th style={{ width: "200px" }}>Candiate Mobile</th>
                <th style={{ width: "250px" }}>Pay Rate</th>
                <th style={{ width: "200px" }}>Experience</th>
                <th style={{ width: "200px" }}>Source</th>
                <th style={{ width: "200px" }}>Candidate Location</th>
                <th style={{ width: "220px" }}>Job Type</th>
                <th style={{ width: "200px" }}>LOB</th>
                <th style={{ width: "200px" }}>Contact Manager</th>
                <th style={{ width: "150px" }}>Account Manager</th>
                <th style={{ width: "150px" }}>Delivery Manager</th>
                <th style={{ width: "200px" }}>Job Created</th>
                <th style={{ width: "160px" }}>Job Status</th>
                <th style={{ width: "150px" }}>Submitted By</th>
                {/* <th style={{ width: "200px" }}>Submission Type</th> */}
              </tr>
            </thead>
            <tbody>
              {clientSubmissionData?.map((item, index) => {
                const {
                  submission_date,
                  submission_time,
                  client_submission_date,
                  submission_id,
                  job_code,
                  job_title,
                  job_id,
                  job_created_date,
                  job_status,
                  client,
                  endclient,
                  job_location,
                  applicant_id,
                  applicant_code,
                  applicant_name,
                  applicant_email,
                  work_authorization,
                  work_authorization_expiry,
                  applicant_mobile,
                  job_pay_rate,
                  applicant_experience,
                  applicant_source,
                  applicant_location,
                  job_type,
                  lob,
                  contact_manager,
                  account_manager,
                  head_account_manager,
                  delivery_manager,
                  submitted_by,
                  current_status,
                  current_substatus,
                  submission_type,
                } = item;

                return (
                  <>
                    <tr key={index}>
                      <td className="" style={{ width: "200px" }}>
                        {submission_date || "N/A"}
                      </td>
                      {/* <td className="" style={{ width: "200px" }}>
                      {submission_time ||"N/A"}
                      </td> */}
                      <td className="" style={{ width: "250px" }}>
                        {client_submission_date || "N/A"}
                      </td>
                      <td style={{ width: "150px" }}>
                        {current_status || "N/A"}
                      </td>
                      <td
                        style={{ width: "250px" }}
                        onMouseEnter={() => setOpenEditOpt(submission_id)}
                        onMouseLeave={() => setOpenEditOpt(null)}
                      >
                        <div className="d-flex gap-2">
                          <span>{current_substatus || "N/A"}</span>
                          {openEditOpt == submission_id && (
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#statusModal"
                              className="text-primary cursor-pointer"
                              onClick={() => setSubmissionDetails(item)}
                            >
                              {reactIcons.edit}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {submission_id || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {job_code || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>{job_title || "N/A"}</td>
                      <td className="" style={{ width: "200px" }}>
                        {client || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {endclient || "N/A"}
                      </td>
                      <td className="" style={{ width: "300px" }}>
                        {job_location || "N/A"}
                      </td>
                      <td
                        className="d-flex flex-wrap gap-2"
                        style={{ width: "250px" }}
                      >
                        {applicant_code || "N/A"}
                      </td>
                      <td className="" style={{ width: "250px" }}>
                        {applicant_name || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {applicant_email || "N/A"}
                      </td>
                      {/* <td style={{ width: "250px" }}>
                        {work_authorization || "N/A"}
                        </td> */}
                      {/* <td style={{ width: "250px" }}>
                        {work_authorization_expiry
                        ? moment(work_authorization_expiry).format(
                          "DD-MM-yyyy"
                          )
                          : "N/A"}
                          </td> */}
                      <td style={{ width: "200px" }}>
                        {applicant_mobile || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {job_pay_rate || "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>
                        {applicant_experience || "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>
                        {applicant_source || "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>
                        {applicant_location || "N/A"}
                      </td>
                      <td style={{ width: "220px" }}>{job_type || "N/A"}</td>
                      <td style={{ width: "200px" }}>{lob || "N/A"}</td>
                      <td style={{ width: "200px" }}>
                        {contact_manager || "N/A"}
                      </td>
                      <td style={{ width: "150px" }}>
                        {account_manager || "N/A"}
                      </td>
                      <td style={{ width: "150px" }}>
                        {delivery_manager || "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>
                        {job_created_date || "N/A"}
                      </td>
                      <td className="" style={{ width: "160px" }}>
                        {job_status || "N/A"}
                      </td>
                      <td style={{ width: "150px" }}>
                        {submitted_by || "N/A"}
                      </td>
                      {/* <td style={{ width: "200px" }}>
                        {submission_type || "N/A"}
                      </td> */}
                    </tr>
                  </>
                );
              })}
              {/* End tr */}
              {clientSubmissionData?.length == 0 && (
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

export default ClientSubmissionReport;
