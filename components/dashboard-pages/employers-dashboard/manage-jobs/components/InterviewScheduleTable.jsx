"use client";

import Loader from "@/components/common/Loader";
import MultiSearch from "@/components/common/MultiSearch";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getReq } from "@/utils/apiHandlers";
import { accessRoles, candidateSearchKey, processOptions } from "@/utils/constant";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import InterviewScheduleModal from "../../jobposts/components/components/InterviewScheduleModal";
import InterviewFeedbackModal from "@/components/common/InterviewFeedbackModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// export const interviewData = [
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

const InterviewScheduleTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [interviewData, setInterviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [fieldName, setFieldName] = useState("search-any");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAct, setOpenAct] = useState(false);
  const [expand, setExpand] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openReschedule, setOpenReschedule] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(null);
  const employee_details = useSelector((state) => state.employer.user)

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
    handleGetInterviewsList(param);
    // }, 700)
  }, [search, startDate, endDate, page]);

  const handleGetInterviewsList = async (param) => {
    setIsLoading(true);
    const response = await getReq(
      "/interviews/"
      //   `/interviews/}`
    );
    // ?page=${page + 1}&size=25${param ? param : ""
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setInterviewData(response.data.results || response.data);
    }
  };

  const handleDeleteInterview = async(id) => {
     const response = await deleteReq(`/interviews/${id}/`)
     if(response.status){
       toast.success('Interview schedule has been successfully deleted');
       handleGetInterviewsList();
     }else if(!response.status){
       toast.error(response.error.detail || "Something went wrong");
     }
  }

  return (
    <div>
      {isLoading && <Loader />}
      <InterviewFeedbackModal selectedItem={selectedItem} />
      <InterviewScheduleModal selectedItem={selectedItem} reschedule={true} />
      <div className="d-flex justify-content-between">
        <div>
          <h4>Scheduled Interview List</h4>
        </div>
        {/* <div className="position-relative">
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
        </div> */}
        {/* <MultiSearch
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
        /> */}
        {/* <Link href="/employers-dashboard/all-applicants/add-applicant">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link> */}
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
                          setInterviewData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        } else {
                          setInterviewData((prev) =>
                            prev.map((item) => {
                              return { ...item, selected: e.target.checked };
                            })
                          );
                        }
                      }}
                    />
                    {interviewData?.find((item) => item.selected == true) && (
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
                <th className="" style={{ width: "150px" }}>
                  Interview On
                </th>
                <th style={{ width: "100px" }}>Start Time</th>
                <th style={{ width: "100px" }}>End Time</th>
                <th style={{ width: "250px" }}>Candidate Name</th>
                <th style={{ width: "300px" }}>Job Title</th>
                <th style={{ width: "200px" }}>Inerview Round</th>
                <th style={{ width: "150px" }}>Interview Mode</th>
                <th style={{ width: "160px" }}>Interview Outcome</th>
                <th style={{ width: "200px" }}>Client</th>
                <th style={{ width: "200px" }}>End Client</th>
                <th style={{ width: "200px" }}>Interviewer</th>
                <th style={{ width: "250px" }}>Scheduled By</th>
                <th style={{ width: "250px" }} className="">
                  Scheduled On
                </th>
                <th style={{ width: "250px" }}>Candidate Mobile</th>
                <th style={{ width: "250px" }}>Candidate Email</th>
                {/* <th style={{ width: "200px" }}>Cancellation Reason</th> */}
                <th style={{ width: "200px" }}>Reschedule Reason</th>
                <th style={{ width: "200px" }}>Recruiter Name</th>
                <th style={{ width: "200px" }}>Ownership</th>
                <th style={{ width: "200px" }}>Job Status</th>
                <th style={{ width: "300px" }}>Scheduled By Email ID</th>
                {/* <th style={{ width: "220px" }}>Scheduled By Employee ID</th> */}
                {/* <th style={{ width: "100px" }}>Gender</th> */}
                <th style={{ width: "200px" }}>Work Authoriztion</th>
                <th style={{ width: "150px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewData?.map((item, index) => {
                let {
                  firstname,
                  middlename,
                  lastname,
                  mobile,
                  email,
                  authorization,
                } = item.applicant_details;
                let { title, client_name } = item.job_details;
                let {
                  starttime,
                  endtime,
                  startdate,
                  endclient,
                  mode,
                  round,
                  reason,
                  interviewer,
                  created_by,
                  created_at,
                  updated_by,
                  job_status,
                  round_details,
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
                              let update = [...interviewData];
                              if (e.target.checked) {
                                update[index]["selected"] = e.target.checked;
                              } else {
                                update[index]["selected"] = e.target.checked;
                              }
                              setInterviewData(update);
                            }}
                          />
                        </div>
                      </td> */}
                      <td className="" style={{ width: "150px" }}>
                        {startdate}
                      </td>
                      <td className="" style={{ width: "100px" }}>
                        {starttime}
                      </td>
                      <td className="" style={{ width: "100px" }}>
                        {endtime}
                      </td>
                      <td
                        className=""
                        style={{ width: "250px" }}
                        onMouseEnter={() => {
                          setOpenReschedule(item.id);
                        }}
                        onMouseLeave={() => {
                          setOpenReschedule(null);
                        }}
                      >
                        <span>
                          {(firstname || "") +
                            " " +
                            (middlename || "") +
                            " " +
                            (lastname || "")}
                        </span>
                        {openReschedule == item.id && (
                          <span
                            className="text-primary px-2 cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                            data-bs-target="#interviewSchedule"
                            data-bs-toggle="offcanvas"
                          >
                            {reactIcons.reschedule}
                          </span>
                        )}
                      </td>
                      <td className="" style={{ width: "300px" }}>
                        {title}
                      </td>
                      <td style={{ width: "200px" }}>{round_details?.name}</td>
                      <td style={{ width: "150px" }}>{mode}</td>
                      <td className="" style={{ width: "160px" }}>
                        {"-"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {client_name || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {endclient || "N/A"}
                      </td>
                      <td className="" style={{ width: "200px" }}>
                        {interviewer.map((item) => {
                          return <span key={item}>{item}</span>;
                        })}
                        {interviewer.length == 0 && "N/A"}
                      </td>
                      <td
                        className="d-flex flex-wrap gap-2"
                        style={{ width: "250px" }}
                      >
                        {created_by
                          ? created_by?.first_name + " " + created_by?.last_name
                          : "N/A"}
                      </td>
                      <td className="" style={{ width: "250px" }}>
                        {moment(created_at).format("DD-MM-YYYY  hh:mm A")}
                      </td>
                      <td style={{ width: "250px" }}>{mobile || "N/A"}</td>
                      <td style={{ width: "250px" }}>{email || "N/A"}</td>
                      {/* <td style={{ width: "200px" }}>
                        {"pending cancel reason" || 'N/A'}
                      </td> */}
                      <td style={{ width: "200px" }}>{reason || "N/A"}</td>
                      <td style={{ width: "200px" }}>
                        {created_by
                          ? created_by?.first_name + " " + created_by?.last_name
                          : "N/A"}
                      </td>
                      <td style={{ width: "200px" }}>{"-"}</td>
                      <td style={{ width: "200px" }}>{job_status || "N/A"}</td>
                      <td style={{ width: "300px" }}>{created_by?.email}</td>
                      {/* <td style={{ width: "220px" }}>
                        'scheduled by emplyoee id'
                      </td> */}
                      {/* <td style={{ width: "100px" }}>
                    N/A    
                      </td> */}
                      <td style={{ width: "200px" }}>
                        {authorization || "N/A"}
                      </td>
                      <td style={{ width: "150px" }}>
                        <div className="d-flex gap-2">
                          <div
                            className="position-relative"
                            onMouseLeave={() => setOpenSchedule(null)}
                            onMouseEnter={() => setOpenSchedule(created_at)}
                          >
                            <span
                              className="text-primary cursor-pointer"
                              onClick={() => setSelectedItem(item)}
                              data-bs-target="#interviewSchedule"
                              data-bs-toggle="offcanvas"
                            >
                              {reactIcons.reschedule}
                            </span>
                            {created_at == openSchedule && (
                              <div
                                className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                                style={{
                                  width: "110px",
                                  minHeight: "30px",
                                  maxHeight: "fit-content",
                                  zIndex: "5",
                                }}
                              >
                                <span className="text-white">
                                Reschedule
                                </span>
                              </div>
                            )}
                          </div>
                          <div
                            className="position-relative"
                            onMouseLeave={() => setOpenFeedback(null)}
                            onMouseEnter={() => setOpenFeedback(created_at)}
                          >
                            <span
                              className="text-primary cursor-pointer"
                              onClick={() => setSelectedItem(item)}
                              data-bs-target="#interviewFeedbackModal"
                              data-bs-toggle="modal"
                            >
                              {reactIcons.feedback}
                            </span>
                            {created_at == openFeedback && (
                              <div
                                className="position-absolute bg-lightestblue px-2 d-flex gap-2 flex-wrap rounded-1"
                                style={{
                                  width: "100px",
                                  minHeight: "30px",
                                  maxHeight: "fit-content",
                                  zIndex: "5",
                                }}
                              >
                                <span className="text-white">
                                Feedback
                                </span>
                              </div>
                            )}
                          </div>
                          {/* {employee_details?.access_role_details?.access_id == accessRoles.ADMIN && */}
                          <div>
                            <span  onClick={() => handleDeleteInterview(item.id)} className="text-danger cursor-pointer">{reactIcons.delete}</span>
                          </div>
                          {/* } */}
                        </div>
                      </td>
                    </tr>
                    {/* {item.id == expand && (
                      <tr>
                        <div className="my-3 px-5 border rounded-1  inner-table ">
                      <InterviewScheduleModal   jobPostList={[]}  interviewData={interviewData} />  
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
                                          let update = [...interviewData];
                                          if (e.target.checked) {
                                            update[index]["jobs_associated"][_index]['selected'] = e.target.checked;
                                          } else {
                                            update[index]["jobs_associated"][_index]['selected'] = e.target.checked;
                                          }
                                          setInterviewData(update);
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
              {interviewData?.length == 0 && (
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

export default InterviewScheduleTable;
