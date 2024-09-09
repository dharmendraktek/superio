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
import { processOptions, removeSpecialChar } from "@/utils/constant";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";
import InterviewScheduleModal from "./InterviewScheduleModal";

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

  return (
    <>
      {isLoading && <Loader />}
      <div className="d-flex justify-content-between my-2">
        <div className="d-flex gap-2">
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
        <Link href="/employers-dashboard/job-posts/add-job-posts">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link>
      </div>
      <div className="table_div custom-scroll-sm">
        <table className="default-table ">
          <thead className="">
            <tr>
              {jobPostsTableField.map((item, index) => {
                return (
                  <>
                    {item.title == "input" ? (
                      <th style={{ width: "200px" }}>
                        <input className="cursor-pointer" type="checkbox" />
                      </th>
                    ) : (
                      <th style={{ width: "200px" }} key={index}>
                        {removeSpecialChar(item.title)}
                      </th>
                    )}
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
                      <input type="checkbox" />
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
                      >
                        {/* <Link href={{ pathname: `/employers-dashboard/job-posts/${item.id}`, query: item }}> */}
                        {item.job_code}
                      </Link>
                    </td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td>
                      {item.title}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td className="">{item.client_name}</td>
                    <td>{item.city}</td>
                    <td className="">{item.state}</td>
                    <td className="">{item.job_status}</td>
                    <td className="">
                      {item.currency}
                      {item.currency ? "/" : ""}
                      {item.amount}
                      {item.amount ? "/" : ""}
                      {item.payment_frequency}
                    </td>
                    <td className="">{item.delivery_manager_name}</td>
                    <td className="">{item.contact_manager_name}</td>
                    <td className="">
                      <div className="d-flex flex-wrap">
                        {item.assign_details.map((item) => {
                          return <span>{item.first_name},</span>;
                        })}
                      </div>
                    </td>
                    <td className="">{"-"}</td>
                    <td className="">
                      {moment(item.created_at).format("DD-MM-yyyy hh:mm A")}
                    </td>
                    <td className="">
                      {moment(item.updated_at).format("DD-MM-yyyy hh:mm A")}
                    </td>
                    <td className="">{item.head_account_manager_name}</td>
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
                        <InterviewScheduleModal  jobPostList={jobPostList}  />
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
                                  {/* <span>|</span> */}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <td colSpan={15}>
                          <table>
                            <thead className="table-inner-thead">
                              <th  style={{width:'60px'}}>
                                <input className="mx-1" type="checkbox" />
                              </th>
                              <th>Submission ID</th>
                              <th>Applicant Name</th>
                              <th>Work Authorization</th>
                              <th>Mobile Number</th>
                              <th>Location</th>
                              <th>Country</th>
                              <th>Experience</th>
                              <th>Source</th>
                              <th>Revision Status</th>
                              <th>Application Status</th>
                              {/* <th>Outlook MSG</th> */}
                              <th style={{ width: "250px" }}>Bill Rate</th>
                              <th style={{ width: "250px" }}>Pay Rate</th>
                              <th>Employer Name</th>
                              <th>Availability</th>
                              <th>Submitted By</th>
                              {/* <th>PW Submission Type</th> */}
                              <th>Notice Period</th>
                              <th style={{width:'200px'}}>Current CTC</th>
                              <th style={{width:'200px'}}>Submitted On</th>
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
                                } = _item;
                                let { firstname, middlename, lastname, authorization, mobile, address,country, experience, source , notice_period, current_amount,  current_currency, current_job_type, current_payment_frequency, submission_on} =
                                  _item.applicant_details[0];

                                  let current_ctc = `${(current_currency || 'N.A') + '/' + (current_amount || 'N.A') + '/' + (current_payment_frequency || 'N.A') + '/' + (current_job_type || 'N.A')}`

                                return (
                                  <tr>
                                    <td style={{width:'60px'}}>
                                      <input type="checkbox" 
                                        onChange={(e) => {
                                          let update = [...jobPostList];
                                          if (e.target.checked) {
                                            update[index]["submissions"][_index]['selected'] = e.target.checked;
                                          } else {
                                            update[index]["submissions"][_index]['selected'] = e.target.checked;
                                          }
                                          setJobPostList(update);
                                        }}
                                        checked={_item?.selected}
                                      />
                                    </td>
                                    <td>{_item.id}</td>
                                    <td>
                                      {firstname || '' +
                                        " " +
                                        middlename || '' +
                                        " " +
                                        lastname || ''}
                                    </td>
                                    <td>{authorization}</td>
                                    <td>{mobile}</td>
                                    <td>{address || 'N.A'}</td>
                                    <td>{country}</td>
                                    <td>{experience}</td>
                                    <td>{source}</td>
                                    <td>Revision Status</td>
                                    <td>Application Status</td>
                                    {/* <th>Outlook MSG</th> */}
                                    <td style={{ width: "250px" }}>
                                      {bill_rate_currency}/{bill_rate_amount}/
                                      {bill_rate_type}/{bill_rate_contract_type}
                                    </td>
                                    <td style={{ width: "250px" }}>
                                      {pay_rate_currency}/{pay_rate_amount}/
                                      {pay_rate_type}/{pay_rate_contract_type}
                                    </td>
                                    <td>Employer Name</td>
                                    <td>{availability}</td>
                                    <td>{submitted_by_details?.first_name + ' ' + submitted_by_details?.last_name}</td>
                                    {/* <th>PW Submission Type</th> */}
                                    <td>{notice_period}</td>
                                    <td style={{width:'200px'}}>{current_ctc}</td>
                                    <td style={{width:'200px'}}>{moment(submission_on).format('DD-MM-YYYY hh:mm A')}</td>
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
            {!isLoading && jobPostList.length == 0 &&
              <tr className="">
                <td>No Data Found</td>
              </tr>
            }
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
