"use client";

import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import Pagination from "@/components/common/Pagination";
import { getApiReq, getReq } from "@/utils/apiHandlers";
import { jobReportFilterKey } from "@/utils/constant";
import { reactIcons } from "@/utils/icons";
import { cleanString } from "@/utils/regex";
import FileSaver from "file-saver";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const JobReportTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [jobReportData, setJobReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allParam, setAllParam] = useState("");
  const [filterKeys, setFilterKeys] = useState(jobReportFilterKey);
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  const [openAssign, setOpenAssign] = useState(null);


  useEffect(() => {
    let param = "";

    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate) {
      param += `&job_created_start=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&job_created_end=${moment(endDate).format("YYYY-MM-DD")}`;
    }

    // Include filtered keys
    const filterParams = filterKeys
      .filter((item) => item.selected && item.search_value) // Filter items with selected: true and search_value present
      .map((item) => `&${item.value}=${item.search_value}`) // Create the string in the format &value=search_value
      .join(""); // Join them together to form the final string

    param += filterParams; // Combine date and filter parameters

    if (param !== allParam) {
      setAllParam(param);
      setPage(0); // Set page to 0 if it's falsy
      getJobReportList(param);
    } else if (page) {
      getJobReportList(param);
    } else {
      getJobReportList(param);
    }
  }, [startDate, endDate, page, filterKeys]);

  const handleClear = () => {
    const updatedFilters = filterKeys.map((item) => ({
      ...item,
      selected: false,
      search_value: null,
      rank: null,
    }));
    setFilterKeys(updatedFilters); 
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    setPage(0);
  };
  


  const handleExportExcel = async () => {
    try{
      setIsExcelLoading(true);
      const response = await getApiReq(
        `${
          allParam
            ? `/job-report/report/?${allParam}&export=excel`
            : "/job-report/report/?export=excel"
        }`
      );
      setIsExcelLoading(false);
      if (response.status) {
        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "jobs-report.xlsx");
      }
    }catch(err){
      toast.error(err.response.data.message || "Something went wrong" )
      setIsExcelLoading(false);
    }
  };

  const getJobReportList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/job-report/report/?page=${page + 1}&size=25${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setJobReportData(response.data.results || response.data);
    }
  };
  

  return (
    <div>
      {isLoading && <Loader />}
      <div className="py-1">
        <h4>Jobs Report</h4>
      </div>
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
                  setStartDate(new Date());
                  setEndDate(new Date());
                }}
              >
                Today
              </button>
              <button
                className={` small theme-btn ${
                  moment(startDate).format("DD-MM") ===
                    moment((new Date()).setDate(new Date().getDate() - 1)).format("DD-MM") &&
                  moment(endDate).format("DD-MM") ===
                    moment((new Date()).setDate(new Date().getDate() - 1)).format("DD-MM")
                    ? "btn-style-five"
                    : "btn-style-three"
                }`}
                onClick={() => {
                  const today = new Date();
                  const yesterday = new Date();
                  yesterday.setDate(today.getDate() - 1); // Set yesterday's date

                  setStartDate(yesterday); // Setting yesterday's date
                  setEndDate(yesterday); // Setting today's date
                }}
              >
                Yesterday
              </button>
              <button
                className="theme-btn btn-style-two small"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div>
            <span className="text-primary">{dataCount} records</span>
          </div>
          <button
            className="theme-btn btn-style-one small d-flex align-items-center gap-2"
            onClick={() => handleExportExcel()}
            disabled={isLoading}
          >
            {isExcelLoading ?
             <BtnBeatLoader />
             :
             <>
            <span className="fw-600 fs-6">Excel</span>
            <span>{reactIcons.download}</span>
             </>
            }
          </button>
        </div>
      </div>
      <div className="d-flex me-2 mt-1 mb-2">
        {filterKeys.sort((a, b) => (a.rank || Infinity) - (b.rank || Infinity)).map((item, index) => {
          return (
            <div className="">
              {item.selected && (
                <div
                  key={item.id}
                  className="border d-flex me-2 justify-content-between border-secondary"
                >
                  <div
                    onClick={() => {
                      setFieldName(item.id);
                      let itemIndex = filterKeys.findIndex((i) => i.id == item.id);
                      setFilterKeys((prevKeys) => {
                        const update = [...prevKeys];
                        update[itemIndex] = { ...update[itemIndex], search_value: "" };
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
                        setFieldName(null);
                        setFilterKeys((prevKeys) => {
                          const update = [...prevKeys];
                          let itemIndex = update.findIndex((i) => i.id == item.id);
                          update[itemIndex] = {
                            ...update[itemIndex],
                            selected: false,
                            search_value: "",
                            rank:''
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
                {/* <th style={{ width: "160px" }}>
                  <div className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="rounded-1"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setJobReportData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        } else {
                          setJobReportData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        }
                      }}
                    />
                    {jobReportData?.find((item) => item.selected == true) && (
                      <div className="position-relative">
                        <span onClick={() => setOpenAct(!openAct)}>Action</span>
                        {openAct && (
                          <div className="position-absolute">
                            <div className="bg-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th> */}
                <th className="" style={{ width: "200px" }}>
                  Created On
                </th>
                <th style={{ width: "150px" }}>Job Code</th>
                <th style={{ width: "250px" }}>Job Title</th>
                <th style={{ width: "200px" }}>Client</th>
                <th style={{ width: "250px" }}>Contact Manager</th>
                <th style={{ width: "300px" }}>Job Location</th>
                <th style={{ width: "150px" }}>Job Status</th>
                <th style={{ width: "160px" }}>Priority</th>
                <th style={{ width: "160px" }}>LOB</th>
                <th style={{ width: "200px" }}>Account Manager</th>
                <th style={{ width: "200px" }}>Head Account Manager</th>
                <th style={{ width: "150px" }}>Job Type</th>
                <th style={{ width: "150px" }}>Tagged Count</th>
                <th style={{ width: "200px" }} className="">
                  Submission Count
                </th>
                <th style={{ width: "200px" }} className="">
                 Total Submission Count
                </th>
                <th style={{ width: "250px" }}>Submission Count Done</th>
                <th style={{ width: "250px" }}>Client Interview Count</th>
                <th style={{ width: "300px" }}>Client Interview Count Done</th>
                <th style={{ width: "200px" }}>L1 Interview Count</th>
                <th style={{ width: "250px" }}>L1 Interview Count Done</th>
                <th style={{ width: "200px" }}>L2 Interview Count</th>
                <th style={{ width: "250px" }}>L2 Interview Count Done</th>
                <th style={{ width: "200px" }}>L3 Interview Count</th>
                <th style={{ width: "250px" }}>L3 Interview Count Done</th>
                <th style={{ width: "200px" }}>Confirmation Count</th>
                {/*<th style={{ width: "200px" }}>Work Authoriztion</th>
                <th style={{ width: "150px" }}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {jobReportData.length > 0 &&
                jobReportData?.map((item, index) => {
                  const {
                    job_code,
                    created_at,
                    client,
                    lob,
                    contact_manager,
                    account_manager,
                    head_account_manager,
                    job_title,
                    job_status,
                    job_location,
                    priority,
                    submission_count,
                    l1_interview_count,
                    l2_interview_count,
                    l3_interview_count,
                    job_type,
                    client_interview_count,
                    confirmation_count,
                    submissions_done,
                    tagged_count,
                    l1_interview_done_count,
                    l2_interview_done_count,
                    l3_interview_done_count,
                    client_interview_done_count,
                    today_submission_count,
                  } = item;

                  return (
                    <>
                      <tr key={index}>
                        {/* <td style={{ width: "160px" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <input
                            type="checkbox"
                            checked={item?.selected}
                            onChange={(e) => {
                              let update = [...jobReportData];
                              if (e.target.checked) {
                                update[index]["selected"] = e.target.checked;
                              } else {
                                update[index]["selected"] = e.target.checked;
                              }
                              setJobReportData(update);
                            }}
                          />
                        
                        </div>
                      </td> */}
                        <td className="" style={{ width: "200px" }}>
                          {moment(created_at).format("DD-MM-yyyy hh:mm A")}
                        </td>
                        <td className="" style={{ width: "150px" }}>
                          {job_code}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "250px" }}
                        >
                          {job_title || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "200px" }}
                        >
                          {client || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "250px" }}
                        >
                          {contact_manager || "N/A"}
                        </td>
                        {/* <td
                          className="text-capitalize"
                          style={{ width: "300px" }}
                        >
                          {job_location ? cleanString(job_location) : "N/A"}
                        </td> */}
                    <td
                      onMouseEnter={() => setOpenAssign(item.job_code)}
                      onMouseLeave={() => setOpenAssign(null)}
                      style={{width:"300px"}}
                    >
                      <div className="d-flex gap-1 flex-wrap">
                        {item.job_location &&
                          item.job_location
                            .split("  ")
                            .slice(0, 1)
                            .map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  // className="rounded-1 px-1"
                                  // style={{ background: "rgb(64 69 114 / 81%)" }}
                                >
                                  <span className="text-black">{cleanString(item)}</span>
                                </div>
                              );
                            })}
                        {item.job_location && item.job_location.split("  ").length > 1 && (
                          <span className="text-primary cursor-pointer fs-4">
                            {reactIcons.more}
                          </span>
                        )}
                        {!item.job_location && "N/A"}
                        {openAssign == item.job_code && (
                          <div
                            className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                            style={{
                              width: "250px",
                              minHeight: "30px",
                              maxHeight: "fit-content",
                              zIndex: "5",
                            }}
                          >
                            {item.job_location &&
                              item.job_location.split("  ").map((item) => {
                                return (
                                  <span className="text-white">{cleanString(item)}</span>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "150px" }}
                        >
                          {job_status || "N/A"}
                        </td>
                        <td
                          className="text-capitalize"
                          style={{ width: "160px" }}
                        >
                          {priority || "N/A"}
                        </td>
                        <td className="" style={{ width: "160px" }}>
                          {lob || "N/A"}
                        </td>
                        <td className="" style={{ width: "200px" }}>
                          {account_manager || "N/A"}
                        </td>
                        <td className="" style={{ width: "200px" }}>
                          {head_account_manager || "N/A"}
                        </td>
                        <td
                          className="d-flex flex-wrap gap-2"
                          style={{ width: "150px" }}
                        >
                          {job_type || "N/A"}
                        </td>
                        <td className="" style={{ width: "150px" }}>
                          {tagged_count}
                        </td>
                        <td style={{ width: "200px" }}>{today_submission_count}</td>
                        <td style={{ width: "200px" }}>{submission_count}</td>
                        <td style={{ width: "250px" }}>{submissions_done}</td>
                        <td style={{ width: "250px" }}>
                          {client_interview_count}
                        </td>
                        <td style={{ width: "300px" }}>
                          {client_interview_done_count}
                        </td>
                        <td style={{ width: "200px" }}>{l1_interview_count}</td>
                        <td style={{ width: "250px" }}>
                          {l1_interview_done_count}
                        </td>
                        <td style={{ width: "200px" }}>{l2_interview_count}</td>
                        <td style={{ width: "250px" }}>
                          {l2_interview_done_count}
                        </td>
                        <td style={{ width: "200px" }}>{l3_interview_count}</td>
                        <td style={{ width: "250px" }}>
                          {l3_interview_done_count}
                        </td>
                        <td style={{ width: "200px" }}>{confirmation_count}</td>
                        {/*<td style={{ width: "150px" }}>
                        'Action'    
                      </td> */}
                      </tr>
                    </>
                  );
                })}
              {/* End tr */}
              {jobReportData?.length == 0 && (
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

export default JobReportTable;
