"use client";

import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { getApiReq, getReq } from "@/utils/apiHandlers";
import { interviewReportFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import FileSaver from "file-saver";
import moment from "moment";
import { useEffect, useState } from "react";

const InterviewReportsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [InterviewReportData, setInterviewReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [filter, setFilter] = useState({
    client: "",
    contact_manager: "",
    job_title: "",
    job_type: "",
  });

  const [filterKeys, setFilterKeys] = useState(interviewReportFilterKey);
  const [allParam, setAllParam] = useState('');
  const [type, setType] = useState('');

  // useEffect(() => {
  //   let param;
  //   if (startDate && endDate) {
  //     setPage(0);
  //     param = `&interview_schedule_start=${moment(startDate).format(
  //       "yyyy-MM-DD"
  //     )}&interview_schedule_end=${moment(endDate).format("yyyy-MM-DD")}`;
  //   }
  
  //   param = filterKeys
  //   .filter((item) => item.selected && item.search_value) // Filter items with selected: true and search_value present
  //   .map((item) => `&${item.value}=${item.search_value}`) // Create the string in the format &value=search_value
  //   .join(""); // Join them together to form the final string
  //   console.log("----------parma value ", param);

  //   if(param){
  //     setAllParam(param);
  //     setPage(page ? page : 0);
  //     getInterviewReportList(param);
  //   }else if(page){
  //     getInterviewReportList(param);
  //   }
  //   getInterviewReportList(param);

  // }, [startDate, endDate, page,filterKeys]);

  useEffect(() => {
    let param = '';
  
    // Include date parameters if both startDate and endDate are present
    if (startDate && endDate && type == "schedule") {
      param += `&interview_schedule_start=${moment(startDate).format("YYYY-MM-DD")}&interview_schedule_end=${moment(endDate).format("YYYY-MM-DD")}`;
    }else if(startDate && endDate && type == "happen"){
      param += `&interview_happen_start=${moment(startDate).format("YYYY-MM-DD")}&interview_happen_end=${moment(endDate).format("YYYY-MM-DD")}`;
    }
  
    // Include filtered keys
    const filterParams = filterKeys
      .filter((item) => item.selected && item.search_value) // Filter items with selected: true and search_value present
      .map((item) => `&${item.value}=${item.search_value}`) // Create the string in the format &value=search_value
      .join(""); // Join them together to form the final string
  
    param += filterParams; // Combine date and filter parameters
  
    if(param !== allParam) {
      setAllParam(param);
      setPage(0); // Set page to 0 if it's falsy
      getInterviewReportList(param);
    } else if (page) {
      getInterviewReportList(param);
    }else {
      getInterviewReportList(param);
    }
  }, [startDate, endDate, page, filterKeys, type]);
  
  const handleClear = () => {
    let update = [...filterKeys]
    update.map((item) => {
      delete item['selected'];
      delete item['search_value'];
      return item;
    })
    setFilterKeys(update);
    setFieldName("");
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    setType("");
    setPage(0);
  };

  

  const handleExportExcel = async () => {
    const response = await getApiReq(`${allParam ? `/interview-report/report/?${allParam}&export=excel`:'/interview-report/report/?export=excel'}`);
    if(response.status){
     var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
     FileSaver.saveAs(blob, 'interview-report.xlsx');   
    }
  };

  const getInterviewReportList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      `/interview-report/report/?page=${page + 1}&size=25${param ? param : ""}`
    );
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setInterviewReportData(response.data.results || response.data);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
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
            checkbox={true}
          />
          <div className="d-flex gap-2 justify-content-end align-items-center">
            <div className="d-flex gap-2 mt-1">
            <div className="d-flex gap-2 align-items-center">
                  <label className="fw-700">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="cursor-pointer border p-1 border-black">
                    <option>Select</option>
                    <option value={"schedule"}>Schedule</option>
                    <option value="happen">Scheduled Done</option>
                  </select>
              </div>
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
                  setType("schedule")
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
                  setType("schedule")
                  setStartDate(yesterday);  // Setting yesterday's date
                  setEndDate(yesterday);        // Setting today's date
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
                <th className="" style={{ width: "200px" }}>
                  Interview Schedule
                </th>
                <th style={{ width: "150px" }}>Scheduled Done</th>
                <th style={{ width: "150px" }}>Start Time </th>
                <th style={{ width: "150px" }}>End Time</th>
                <th style={{ width: "300px" }}>Time zone</th>
                <th style={{ width: "300px" }}>Candidate Name</th>
                <th style={{ width: "250px" }}>Candidate Email</th>
                <th style={{ width: "160px" }}>Candidate Mobile</th>
                <th style={{ width: "160px" }}>Client</th>
                <th style={{ width: "200px" }}>LOB</th>
                <th style={{ width: "200px" }}>Contact Manager</th>
                <th style={{ width: "150px" }}>End Client </th>
                <th style={{ width: "200px" }}>Job ID</th>
                <th style={{ width: "200px" }} className="">
                  Job Title
                </th>
                <th style={{ width: "250px" }}>Interview Round</th>
                <th style={{ width: "250px" }}>Interview Mode</th>
                <th style={{ width: "300px" }}>Interview Feedback</th>
                <th style={{ width: "250px" }}>Submission ID</th>
                <th style={{ width: "250px" }}>Submission Status</th>
                <th style={{ width: "250px" }}>Submission Sub Status</th>
                <th style={{ width: "250px" }}>Scheduled By</th>
                <th style={{ width: "250px" }}>Reschdule</th>
              </tr>
            </thead>
            <tbody>
              { InterviewReportData.length > 0 && InterviewReportData?.map((item, index) => {
                const {
                  interview_schedule_date,
                  interview_happen_date,
                  timezone,
                  starttime,
                  endtime,
                  contact_manager,
                  interview_round,
                  interview_feedback_outcome,
                  reschedule,
                  mode,
                  submission_id,
                  submission_current_status,
                  submission_current_substatus,
                  client,
                  lob,
                  endclient,
                  applicant_id,
                  interview_id,
                  job_id,
                  job_title,
                  applicant_name,
                  applicant_email,
                  applicant_mobile,
                  scheduled_by,
                } = item;

                return (
                  <>
                    <tr key={index}>
                      <td className="" style={{ width: "200px" }}>
                        {interview_schedule_date || "N/A"}
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {interview_happen_date || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "150px" }}
                      >
                        {starttime || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "150px" }}
                      >
                        {endtime || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "300px" }}
                      >
                        {timezone || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "300px" }}
                      >
                        {applicant_name || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "250px" }}
                      >
                        {applicant_email || "N/A"}
                      </td>
                      <td
                        className="text-capitalize"
                        style={{ width: "160px" }}
                      >
                        {applicant_mobile || "N/A"}
                      </td>
                      <td className="" style={{ width: "160px" }}>
                        {client || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {lob || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {contact_manager || "N/A"}
                      </td>
                      <td
                        className="d-flex flex-wrap gap-2"
                        style={{ width: "150px" }}
                      >
                        {endclient || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {job_id || "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>{job_title || "N/A"}</td>
                      <td style={{ width: "250px" }}>
                        {interview_round || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>{mode || "N/A"}</td>
                      <td style={{ width: "300px" }}>
                        {interview_feedback_outcome || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {submission_id || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {submission_current_status || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {submission_current_substatus || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {scheduled_by || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>{reschedule || "N/A"}</td>
                    </tr>
                  </>
                );
              })}
              {/* End tr */}
              {InterviewReportData?.length == 0 && (
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

export default InterviewReportsTable;
