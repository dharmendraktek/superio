"use client";

import DatePickerCustom from "@/components/common/DatePickerCustom";
import Loader from "@/components/common/Loader";
import MultiFilterSearch from "@/components/common/MultiFilterSearch";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { getReq } from "@/utils/apiHandlers";
import {  interviewReportFilterKey } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import { useEffect, useState } from "react";

const InterviewReportsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [InterviewReportData, setInterviewReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState("search_any");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [filter, setFilter] = useState({
     client:'',
     contact_manager:'',
     job_title:'',
     job_type:''
  });

  const [filterKeys, setFilterKeys] = useState(interviewReportFilterKey);

  useEffect(() => {
    let param;
    if (startDate && endDate) {
      setPage(0);
      param = `&interview_schedule_start=${moment(startDate).format(
        "yyyy-MM-DD"
      )}&interview_schedule_end=${moment(endDate).format("yyyy-MM-DD")}`;
    }

   
   param = filterKeys
  .filter(item => item.selected && item.search_value)  // Filter items with selected: true and search_value present
  .map(item => `&${item.value}=${item.search_value}`)  // Create the string in the format &value=search_value
  .join('');  // Join them together to form the final string

console.log("-----query paran string ------",param);


    if (fieldName && search) {
      setPage(0);
      param = param ? param + `&${fieldName}=${search}` : `&${fieldName}=${search}`;
    }
    if (fieldName == "assigned_today") {
      setPage(0);
      param = `&${fieldName}=""`;
    }
    getInterviewReportList(param);
  }, [search, startDate, endDate, page, fieldName]);

 

  const handleClear = () => {
    setFieldName('');
    setStartDate(null);
    setEndDate(null);
    setSearch('');
  }

  const handleExportExcel = async() => {
    window.open(BASE_URL + '/interview-report/report/?export=excel', '_blank', 'noopener,noreferrer');

    // try{
    //   const response = await getReq('/job-assignment-report/report/?export=excel');
    //   if(response.status){
    //   }
    // }catch(err){
    //   toast.error(err.response || "Something went wrong")
    // }
  }
 

  const getInterviewReportList = async (param) => {
    setIsLoading(true);
    const response = await getReq(`/interview-report/report/?page=${page + 1}&size=25${param ? param : ""}`
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
          keys={filterKeys}
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
          <div className="" style={{width:"200px"}}>
            <DatePickerCustom
              date={startDate}
              handleDate={(date) => setStartDate(date)}
              placeholder="From Date"
            />
          </div>
          <div className=""  style={{width:"200px"}}>
            <DatePickerCustom
              date={endDate}
              handleDate={(date) => setEndDate(date)}
              placeholder="To Date"
            />
          </div>
        </div>
        <div>
            <button className="theme-btn btn-style-two small" onClick={handleClear}>Clear</button>
        </div>
        </div>
        </div>
        <div>
          <button className="theme-btn btn-style-one small d-flex align-items-center gap-2" onClick={() => handleExportExcel()}><span className="fw-600 fs-6">Excel</span><span>{reactIcons.download}</span></button>
        </div>
      </div>
      <div className="d-flex my-2 gap-2 ">
      {filterKeys
        .filter((item) => item.selected) // Only render the items with selected: true
        .map((item, index) => (
          <div key={item.value} className="border d-flex justify-content-between rounded-1 border-primary px-2">
            <label htmlFor={item.value} >
              {item.name} {item.search_value || ''}
            </label>
            <span onClick={() => {
              console.log("---------cancel is clicking")
              let update = [...filterKeys]
              update[index]['selected'] = false;
              setFilterKeys(update);
            }}>{reactIcons.close}</span>
          </div>
        ))}
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
                          setInterviewReportData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        } else {
                          setInterviewReportData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        }
                      }}
                    />
                    {InterviewReportData?.find((item) => item.selected == true) && (
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
                  Interview Schedule
                </th>
                <th style={{ width: "150px" }}>Happen Date</th>
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
              {InterviewReportData?.map((item, index) => {
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
                scheduled_by
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
                              let update = [...InterviewReportData];
                              if (e.target.checked) {
                                update[index]["selected"] = e.target.checked;
                              } else {
                                update[index]["selected"] = e.target.checked;
                              }
                              setInterviewReportData(update);
                            }}
                          />
                        
                        </div>
                      </td> */}
                      <td className="" style={{ width: "200px" }}>
                        
                      {interview_schedule_date || "N/A"}
                        
                      </td>
                      <td className="" style={{ width: "150px" }}>
                      {interview_happen_date||"N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "150px" }}>{starttime||"N/A"}</td>
                      <td className="text-capitalize" style={{ width: "150px" }}>
                        {endtime || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "300px" }}>
                        {timezone || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "300px" }}>
                      {applicant_name || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "250px" }}>
                        {applicant_email||"N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "160px" }}>
                        {applicant_mobile|| "N/A"}
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
                      <td style={{ width: "200px" }}>
                         {job_title || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                         {interview_round || "N/A"}
                      </td>
                      <td style={{ width: "250px" }}>
                        {mode || "N/A"}
                      </td>
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
                      <td style={{ width: "250px" }}>
                      {reschedule || "N/A"}
                      </td>
                    </tr>
                    {/* {item.id == expand && (
                      <tr>
                        <div className="my-3 px-5 border rounded-1  inner-table ">
                      <InterviewScheduleModal   jobPostList={[]}  InterviewReportData={InterviewReportData} />  
                        <div className="mx-3 my-2">
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
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <td colSpan={15}>
                          <div className="mx-2 border rounded-1  inner-table shadow">
                           
                            <table className="custom-scroll-2nd">
                              <thead className="table-inner-thead">
                                <th style={{width:'60px'}}>
                                  <input type="checkbox" className="mx-1" />
                                </th>
                                <th>Job Code</th>
                                <th>Job Title</th>
                                <th>Submission Record</th>
                                <th>Delivery Manager</th>
                                <th>Resume</th>
                                <th>Profile Status</th>
                                <th>Submission Rating</th>
                                <th>Client</th>
                                <th>Source</th>
                                <th>Client Bill Rate/Salary</th>
                                <th style={{ width: "250px" }}>Bill Rate</th>
                                <th style={{ width: "250px" }}>Pay Rate</th>
                                <th>Employer Name</th>
                                <th>Submitted By</th>
                                <th>Submitted On</th>
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
                                    submission_on    
                                  } = _item;

                                  let { job_code, title, client_name, delivery_manager, amount, currency, payment_frequency } =
                                    job_detail;
                                  let {first_name, last_name} = delivery_manager;
                                  let deliverManagerName = (first_name || '') + (last_name || '')
                                  let clientRate = (currency || 'N.A') + '/' + (amount || 'N.A') + '/' + (payment_frequency || 'N.A')
                                  let {source} = applicant_details[0];

                                  let applicantResume = item.documents.find((doc) => doc.is_default == true);
                                  let {communication, overall, profesionalism, technical} = applicant_rating;
                                  

                                  let overallRating = (communication + overall + profesionalism + technical)/4

 
                                  
                                  return (
                                    <tr>
                                      <td style={{width:'60px'}}>
                                        <input type="checkbox"
                                         onChange={(e) => {
                                          let update = [...InterviewReportData];
                                          if (e.target.checked) {
                                            update[index]["jobs_associated"][_index]['selected'] = e.target.checked;
                                          } else {
                                            update[index]["jobs_associated"][_index]['selected'] = e.target.checked;
                                          }
                                          setInterviewReportData(update);
                                        }}
                                        checked={_item?.selected}

                                        />
                                      </td>
                                      <td>{job_code ? job_code : "N/A"}</td>
                                      <td>{title ? title : "N/A"}</td>
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
                                      <td>{deliverManagerName}</td>
                                      <td>
                                        <span  onClick={() => {
                                              window.open(BASE_URL + `/applicant-documents/${applicantResume?.id}/download/`);
                                        }} className="fs-5 text-primary cursor-pointer">{reactIcons.document}</span>
                                      </td>
                                      <td>{current_status_details?.display_name}</td>
                                      <td>{overallRating}</td>
                                      <td>{client_name || "N/A"}</td>
                                      <td>{source}</td>
                                      <td>{clientRate}</td>
                                      <td style={{ width: "250px" }}>
                                        {bill_rate_currency}/{bill_rate_amount}/
                                        {bill_rate_type}/
                                        {bill_rate_contract_type}
                                      </td>
                                      <td style={{ width: "250px" }}>
                                        {pay_rate_currency}/{pay_rate_amount}/
                                        {pay_rate_type}/{pay_rate_contract_type}
                                      </td>
                                      <td>Employer Name</td>
                                      <td>{submitted_by_details?.first_name + ' ' + submitted_by_details?.last_name}</td>
                                      <td>{moment(submission_on).format('DD-MM-YYYY hh:mm A')}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </div>
                      </tr>
                    )} */}
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
