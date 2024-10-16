"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";

import Paper from "@/components/common/Paper";
import Pagination from "@/components/common/Pagination";
import { jobPostsTableField } from "@/components/dashboard-pages/employers-dashboard/jobposts/components/components/constant";
import { removeSpecialChar } from "@/utils/constant";
import Link from "next/link";
import moment from "moment";
import { reactIcons } from "@/utils/icons";
import ApplicantSubmissionDetails from "../../../../../components/common/ApplicantSubmissionDetails";
import { toast } from "react-toastify";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";

const initialState = {
  job: "",
  applicants: "",
  skills: [],
  references: [],
  availability: "",
  pay_rate_currency: "",
  pay_rate_amount: "",
  pay_rate_type: "",
  pay_rate_contract_type: "",
  bill_rate_currency: "",
  bill_rate_amount: "",
  bill_rate_type: "",
  bill_rate_contract_type: "",
  relocation: true,
  video_link: "",
  eforms: "",
  recipients: [],
  additional_notifiers: [],
  interviewer: [],
  other_email: [],
  comment: "",
  current_status: 1,
  applicant_rating: {
    technical: 0,
    communication: 0,
    profesionalism: 0,
    overall: 0,
  },
};

const Index = () => {
  const param = useParams();
  const { id } = param;
  const [loading, setloading] = useState(false);
  const [submitOpt, setSubmitOpt] = useState(false);
  const [settingOpt, setSettingOpt] = useState(false);
  const [applicantData, setApplicantData] = useState();
  const [jobPostList, setJobPostList] = useState([]);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [multiSubmissionForm, setMultiSubmissionForm] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState();

  // const router = useRouter();

  //   const handleGetApplicantDetails = async () => {
  //     setloading(true);
  //     const response = await getReq(`/applicants/${id}/`);
  //     setloading(false);
  //     if (response.status) {
  //       setApplicantData(response.data);
  //     }
  //   };
  //   useEffect(() => {
  //     handleGetApplicantDetails();
  //   }, [id]);

  //   useEffect(() => {
  //     getJobpostsList();
  //   }, []);

  const handleGetApplicantList = async () => {
    setIsLoading(true);
    const response = await getReq(`/applicants/?page=${page + 1}&size=25${search?`${`&search-any=${search}` }` : ''}`);
    setIsLoading(false);
    if (response.status) {
      setDataCount(response.data.count);
      setApplicantData(response.data.results);
    }
  };

  useEffect(() => {
    if (search) {
      setPage(0);
    }
    handleGetApplicantList();
  }, [search, page, active]);

  const handleAddIsSelected = (index, e) => {
    // Create a new array with the updated item
    const updatedItems = applicantData.map((item, i) =>
      i === index ? { ...item, isSelected: e.target.checked } : item
    );

    // Update state with the new array
    setApplicantData(updatedItems);
  };

  const handleGetJobDetails = async () => {
    const response = await getReq(`/jobs/${id}/`);
    setJobData(response.data);
    // setNoteData(response.data.notes);
  };

  useEffect(() => {
    if (id) {
      handleGetJobDetails();
    }
  }, [id]);

  const handleAddMultiForm = (applicantId) => {
    let applicant = [];
    applicant.push(applicantId);
    // initialState["job"] = jobData.id;
    initialState["applicants"] = applicant;
    setMultiSubmissionForm((prev) => [
      ...prev,
      {
        job: jobData.id,
        applicants: applicant,
        skills: [],
        references: [],
        availability: "",
        pay_rate_currency: "",
        pay_rate_amount: "",
        pay_rate_type: "",
        pay_rate_contract_type: "",
        bill_rate_currency: "",
        bill_rate_amount: "",
        bill_rate_type: "",
        bill_rate_contract_type: "",
        relocation: true,
        video_link: "",
        eforms: "",
        recipients: [],
        additional_notifiers: [],
        interviewer: [],
        other_email: [],
        comment: "",
        current_status: 1,
        applicant_rating: {
          technical: 0,
          communication: 0,
          profesionalism: 0,
          overall: 0,
        },
      },
    ]);
  };

  const submitToApplicant = () => {
    let filtredApplicant = applicantData.filter(
      (item) => item.isSelected == true
    );
    filtredApplicant.forEach((item) => {
      handleAddMultiForm(item.id);
    });
    setSelectedJobs(filtredApplicant);
    setOpen(true);
  };

  const handleSubmitApplicant = async () => {
    const response = await postApiReq("/submission/", multiSubmissionForm);
    if (response.status) {
      toast.success("Applicant submitted to job successfully");
      setOpen(false);
      // router.push(`/employers-dashboard/job-posts/${jobData.id}`);
      setMultiSubmissionForm([])
    }
  };


  return (
    <InnerLayout>
      {isLoading && <Loader />}
      <div className="px-4 theme-background">
        <div className="mt-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <Link href={`/employers-dashboard/job-posts/${jobData?.id}`}>
              <span className="fs-1 text-primary">{reactIcons.backarrow}</span>
            </Link>
            {jobData ?
             <h5 fw-medium>{jobData?.job_code} {jobData?.title}</h5>
            :
            <h5>{applicantData?.firstname + " " + applicantData?.lastname}</h5>
            }
          </div>
          {open && (
            <div className="d-flex gap-2">
              <button
                onClick={handleSubmitApplicant}
                className="theme-btn btn-style-one small"
              >
                Submit
              </button>
              <button
                onClick={() => setOpen(false)}
                className="theme-btn btn-style-four small"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="d-flex gap-2">
          <div className="w-75">
            {open ? (
              selectedJobs?.map((item, index) => {
                return (
                  <div className="mb-3">
                    <ApplicantSubmissionDetails
                      applicantData={item}
                      jobData={jobData}
                      item={item}
                      multiSubmissionForm={multiSubmissionForm}
                      index={index}
                      setMultiSubmissionForm={setMultiSubmissionForm}
                    />
                  </div>
                );
              })
            ) : (
              <Paper>
                <div>
                  <div className="d-flex my-2 justify-content-between">
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
                    {applicantData?.find((item) => item.isSelected == true) &&
                    <div>
                      <button
                        className="theme-btn btn-style-one small"
                        onClick={submitToApplicant}
                      >
                        Submit Profile
                      </button>
                    </div>
                    }
                  </div>
                  <div className="table_div custom-scroll-sm">
                    <table className="default-table ">
                      <thead className="position-sticky">
                        <tr>
                          <th style={{ width: "60px" }}>
                            <div className="d-flex gap-2">
                              <input
                                type="checkbox"
                                className="rounded-1"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setApplicantData((prev) =>
                                      prev.map((item) => {
                                        return {
                                          ...item,
                                          selected: e.target.checked,
                                        };
                                      })
                                    );
                                  } else {
                                    setApplicantData((prev) =>
                                      prev.map((item) => {
                                        return {
                                          ...item,
                                          selected: e.target.checked,
                                        };
                                      })
                                    );
                                  }
                                }}
                              />
                              {/* {applicantData?.find((item) => item.selected == true) && (
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
                    )} */}
                            </div>
                          </th>
                          <th className="" style={{ width: "150px" }}>
                            Applicant ID
                          </th>
                          <th style={{ width: "200px" }}>Applicant Name</th>
                          <th style={{ width: "250px" }}>Job Title</th>
                          <th style={{ width: "300px" }}>Email Address</th>
                          <th style={{ width: "300px" }}>Mobile Number</th>
                          <th style={{ width: "250px" }} className="">
                            Work Authorization
                          </th>
                          <th style={{ width: "250px" }}>Created By</th>
                          <th style={{ width: "200px" }}>Created On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicantData?.map((item, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td style={{ width: "60px" }}>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <input
                                      type="checkbox"
                                      checked={item?.isSelected}
                                      onChange={(e) => {
                                        handleAddIsSelected(index, e);
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="" style={{ width: "150px" }}>
                                  <Link
                                    href="/employers-dashboard/all-applicants/[id]"
                                    as={`/employers-dashboard/all-applicants/${item.id}`}
                                  >
                                    {item.applicant_code}
                                  </Link>
                                </td>
                                <td className="" style={{ width: "200px" }}>
                                  <Link
                                    href="/employers-dashboard/all-applicants/[id]"
                                    as={`/employers-dashboard/all-applicants/${item.id}`}
                                  >
                                    {item?.firstname || 'N/A'} {item?.middlename || ''}{" "}
                                    {item?.lastname || ''}
                                  </Link>
                                </td>
                                <td className="" style={{ width: "250px" }}>
                                  {item.job_title || 'N/A'}
                                </td>
                                <td className="" style={{ width: "300px" }}>
                                  {item.email || 'N/A'}
                                </td>
                                <td className="" style={{ width: "300px" }}>
                                  {item.mobile || 'N/A'}
                                </td>
                                <td className="" style={{ width: "250px" }}>
                                  {item.authorization || 'N/A'}
                                </td>
                                <td style={{ width: "250px" }}>
                                  {item.created_by
                                    ? (item?.created_by?.first_name || 'N/A') +
                                      " " +
                                      (item?.created_by?.last_name || '')
                                    : "-"}
                                </td>
                                <td style={{ width: "200px" }}>
                                  {moment(item.created_at).format(
                                    "DD-MM-YYYY  hh:mm A"
                                  )}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        {/* End tr */}
                        {applicantData?.length == 0 && (
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
                    <Pagination
                      page={page}
                      setPage={setPage}
                      dataCount={dataCount}
                      pageSize={25}
                      //  setPageSize={setPageSize}
                    />
                  )}
                </div>
              </Paper>
            )}
          </div>
          <div className="w-25" style={{ height: "400px" }}>
            <Paper>
              <div>
                <h5 className="text-primary">Job Details</h5>
                <div>
                  <div className="my-2">
                    <p>Job Code</p>
                    <span> {jobData?.job_code}</span>
                  </div>
                  <div className="my-2">
                    <p>Job Title</p>
                    <span>{jobData?.title}</span>
                  </div>
                  <div className="my-2">
                    <p>Client</p>
                    <span>{jobData?.client_name}</span>
                  </div>
                  <div className="my-2">
                    <p>Client Job ID</p>
                    <span>{"N/A"}</span>
                  </div>
                  <div className="my-2">
                    <p>City</p>
                    <span>{jobData?.city}</span>
                  </div>
                  <div className="my-2">
                    <p>States</p>
                    <span>{jobData?.state}</span>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default Index;
