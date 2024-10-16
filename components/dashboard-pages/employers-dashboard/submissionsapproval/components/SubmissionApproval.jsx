"use client";

import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import SubmissionDetailsPreviewModal from "@/components/common/SubmissionDetailsPreviewModal";
import { getReq, patchReq } from "@/utils/apiHandlers";
import { jobDelegationFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import { useEffect, useState } from "react";

const SubmissionApproval = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [submissionApprovalData, setSubmissionApprovalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState("search_any");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterKeys, setFilterKeys] = useState(jobDelegationFilterKey);
  const [allParam, setAllParam] = useState("");
  const [submissionDetail, setSubmissionDetail] = useState();
  const [form, setForm] = useState({
    new_status: 2,
    // new_substatus:''
    comment:'Manger Approved'
  });

  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      setPage(0);
      param += `&assigned_date_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&assigned_date_end=${moment(endDate).format("YYYY-MM-DD")}`;
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
      getJobDelegationReports(param);
    } else if (page) {
      getJobDelegationReports(param);
    } else {
      getJobDelegationReports(param);
    }
  }, [startDate, endDate, page, filterKeys]);

  const getJobDelegationReports = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/pending-approval-submissions/?page=${page + 1}&size=25${
        param ? param : ""
      }`
    );

    console.log("------------------response --------------", response);
    setIsLoading(false);

    if (response.status) {
      setDataCount(response.data.count);
      setSubmissionApprovalData(response.data.results || response.data);
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
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
  };


  const handleUpdateStatus = async (id) => {
    try {
      const response = await patchReq(
        `/submissions/${id}/update-status/`,
        form
      );
      if (response.status) {
        toast.success("Submission  has been approved successfully");
        setForm({
          new_status: "",
          comment:''
        })
        // if(side=="job"){
        //   handleGetJobDetails();
        // }
      }
    } catch (err) {
    }
  };


  //   const handleExportExcel = async () => {
  //     if(allParam){
  //     window.open(
  //       BASE_URL + `/job-assignment-report/report/?${allParam}&export=excel`,
  //       "_blank",
  //       "noopener,noreferrer"
  //     );
  //   }else{
  //     window.open(
  //       BASE_URL + `/job-assignment-report/report/?export=excel`,
  //       "_blank",
  //       "noopener,noreferrer"
  //     );
  //   }
  // };

  return (
    <div>
      {isLoading && <Loader />}
      <SubmissionDetailsPreviewModal />
      <div className="d-flex justify-content-between align-items-center">
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
          {/* <div className="d-flex gap-2 justify-content-end align-items-center">
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
          </div> */}
        </div>
        {/* <div>
          <button
            className="theme-btn btn-style-one small d-flex gap-2"
            onClick={() => handleExportExcel()}
          >
            <span>Excel</span>
            <span>{reactIcons.download}</span>
          </button>
        </div> */}
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
                  Submission On
                </th>
                <th style={{ width: "100px" }}>Job Code</th>
                <th style={{ width: "200px" }}>Job Title</th>
                <th style={{ width: "300px" }}>Job Location</th>
                <th style={{ width: "200px" }}>Client</th>
                <th style={{ width: "250px" }}>Contact Manager Name</th>
                <th style={{ width: "200px" }}>LOB</th>
                <th style={{ width: "200px" }}>Candidate Name</th>
                <th style={{ width: "250px" }}>Candidate Email</th>
                <th style={{ width: "200px" }}>Experience</th>
                <th style={{ width: "200px" }}>Submitted By</th>
                 <th style={{ width: "200px" }}>Action</th>
               {/* <th style={{ width: "150px" }} className="">
                  Position
                </th>
                <th style={{ width: "150px" }} className="">
                  Submission
                </th>
                <th style={{ width: "150px" }}>Tagged</th>
                <th style={{ width: "150px" }}>Created Date</th> */}
              </tr>
            </thead>
            <tbody>
              {submissionApprovalData?.map((item, index) => {
                const {
                  id,
                  submitted_by_name,
                  submission_on,
                  job_details,
                  client_details,
                  applicant_details,
                } = item;

                const {
                  job_code,
                  client_job_id,
                  title,
                  location,
                  lob,
                  contact_manager,
                  number_of_position,
                  priority,
                } = job_details;
                const {name, email, mobile, experience} = applicant_details[0];
                const {client_name} = client_details;
                return (
                  <>
                    <tr key={index}>
                      <td className="" style={{ width: "200px" }}>
                        {moment(submission_on).format("DD-MM-YYYY  hh:mm A")}
                      </td>
                      <td className="" style={{ width: "100px" }}>
                        {job_code}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {title}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "300px" }}
                      >
                        {location || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {client_name || "N/A"}
                      </td>
                      <td
                        style={{ width: "250px" }}
                        className="text-capitalize"
                      >
                        {contact_manager || "N/A"}
                      </td>
                      <td
                        style={{ width: "200px" }}
                        className="text-capitalize"
                      >
                        {lob || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        { name || "N/A"}
                      </td>
                       <td
                        className="text-capitalize"
                        style={{ width: "250px" }}
                      >
                        {email || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {experience || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "200px" }}
                      >
                        {submitted_by_name || "N/A"}
                      </td>
                       <td className="" style={{ width: "200px" }}>
                          <button 
                          // data-bs-target="#submissionPreview" 
                          // data-bs-toggle="modal" 
                          onClick={() => handleUpdateStatus(item.id)} className="theme-btn btn-style-four small">APPROVE</button>
                      </td>
                     {/* <td
                        className="d-flex flex-wrap gap-2"
                        style={{ width: "150px" }}
                      >
                        {submissions_done || "N/A"}
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {tagged_count || "N/A"}
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {job_create_date || "N/A"}
                      </td> */}
                    </tr>
                  </>
                );
              })}
              {/* End tr */}
              {submissionApprovalData?.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={4} className="text-center">
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

export default SubmissionApproval;
