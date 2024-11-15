"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";

import Paper from "@/components/common/Paper";
import Pagination from "@/components/common/Pagination";

import Link from "next/link";
import { reactIcons } from "@/utils/icons";
import ApplicantSubmissionDetails from "../../../../../components/common/ApplicantSubmissionDetails";
import { toast } from "react-toastify";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";

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
  const [clearAll, setClearAll] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const handleGetApplicantDetails = async () => {
    setloading(true);
    const response = await getReq(`/applicants/${id}/`);
    setloading(false);
    if (response.status) {
      setApplicantData(response.data);
    }
  };
  useEffect(() => {
    handleGetApplicantDetails();
  }, [id]);

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

  const handleSearch = () => {
    setSearch(searchValue);
  };

  const handleAddIsSelected = (index, e) => {
    // Create a new array where all items have isSelected: false, except the current one
    const updatedItems = jobPostList.map((item, i) =>
      i === index
        ? { ...item, isSelected: e.target.checked }
        : { ...item, isSelected: false }
    );

    // Update state with the new array
    setJobPostList(updatedItems);
  };

  const handleAddMultiForm = (jobId) => {
    let applicant = [];
    applicant.push(id);
    initialState["applicants"] = applicant;
    setMultiSubmissionForm((prev) => [
      ...prev,
      {
        job: jobId,
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

  const submitToJobs = () => {
    let filtredJobs = jobPostList.filter((item) => item.isSelected == true);
    filtredJobs.forEach((item) => {
      handleAddMultiForm(item.id);
    });
    setSelectedJobs(filtredJobs);
    setOpen(true);
  };

  const handleSubmitApplicant = async () => {
    try {
      setSubmissionLoading(true);
      const response = await postApiReq("/submission/", multiSubmissionForm);
      setSubmissionLoading(false);
      if (response.status) {
        // setClearAll(true);
        router.push(`/employers-dashboard/all-applicants/${id}`);
        toast.success("Applicant submitted to job successfully");
        setMultiSubmissionForm([initialState]);
      }
      if (!response.status) {
        toast.error(response.error.message || "Something went wrong");
        router.push(`/employers-dashboard/all-applicants/${id}`);
      }
    } catch (err) {
      toast.error(err.response || "Something went wrong");
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setSearch(searchValue);
    }
  }, [searchValue]);

  return (
    <>
      {isLoading && <Loader />}
      <InnerLayout>
        <div className="px-4 theme-background">
          <div className="mt-2 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <Link href={`/employers-dashboard/all-applicants/${id}`}>
                <span className="fs-1 text-primary">
                  {reactIcons.backarrow}
                </span>
              </Link>
              <h5>
                {applicantData?.firstname +
                  " " +
                  (applicantData?.middlename || "") +
                  " " +
                  applicantData?.lastname}
              </h5>
            </div>
            {open && (
              <div className="d-flex gap-2">
                <button
                  onClick={handleSubmitApplicant}
                  className="theme-btn btn-style-one small"
                  disabled={submissionLoading}
                >
                  {submissionLoading ? <BtnBeatLoader /> : "Submit"}
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
                        applicantData={applicantData}
                        item={item}
                        jobData={item}
                        multiSubmissionForm={multiSubmissionForm}
                        index={index}
                        setMultiSubmissionForm={setMultiSubmissionForm}
                        clearAll={clearAll}
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
                            onClick={() =>{ 
                              setSearchValue("")
                              setSearch('');
                            }}
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
                      </div>
                      {jobPostList.find((item) => item.isSelected == true) && (
                        <div>
                          <button
                            className="theme-btn btn-style-one small"
                            onClick={submitToJobs}
                          >
                            Submit to Jobs
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="table_div custom-scroll-sm">
                      <table className="default-table ">
                        <thead className="">
                          <tr>
                            {/* {jobPostsTableField.map((item, index) => {
                return (
                  <>
                    {item.title == "input" ? (
                      <th style={{ width: "50px" }}>
                        <input className="cursor-pointer" type="checkbox" />
                      </th>
                    ) : (
                      <th style={{ width: "200px" }} key={index}>
                        {removeSpecialChar(item.title)}
                      </th>
                    )}
                  </>
                );
              })} */}
                            <th style={{ width: "60px" }}>
                              {/* <input type="checkbox" /> */}
                            </th>
                            <th style={{ width: "150px" }}>Job Code</th>
                            <th style={{ width: "200px" }}>Job Title</th>
                            <th style={{ width: "100px" }}>Client Job ID</th>
                            <th style={{ width: "150px" }}>Client</th>
                            <th style={{ width: "100px" }}>City</th>
                            <th style={{ width: "100px" }}>Respond By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobPostList.map((item, index) => {
                            return (
                              <>
                                <tr key={index} className="">
                                  {true && (
                                    <td style={{ width: "60px" }}>
                                      <input
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleAddIsSelected(index, e)
                                        }
                                        checked={
                                          item.isSelected
                                            ? item.isSelected
                                            : false
                                        }
                                      />
                                    </td>
                                  )}
                                  <td style={{ width: "150px" }}>
                                    {item.job_code || "N/A"}
                                  </td>
                                  <td style={{ width: "200px" }}>
                                    {item.title || "N/A"}
                                  </td>
                                  <td style={{ width: "100px" }}>N/A</td>
                                  <td className="" style={{ width: "150px" }}>
                                    {item.client_name || "N/A"}
                                  </td>
                                  <td style={{ width: "100px" }}>
                                    {item.city || "N/A"}
                                  </td>
                                  <td className="" style={{ width: "100px" }}>
                                    {"N/A"}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
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
                  </div>
                </Paper>
              )}
            </div>
            <div className="w-25" style={{ height: "400px" }}>
              <Paper>
                <div>
                  <h5 className="text-primary">Profile Details</h5>
                  <div>
                    <div className="my-2">
                      <p>Name</p>
                      <span>
                        {" "}
                        {applicantData?.firstname +
                          " " +
                          applicantData?.lastname}
                      </span>
                    </div>
                    <div className="my-2">
                      <p>Email Address</p>
                      <span>{applicantData?.email || "N/A"}</span>
                    </div>
                    <div className="my-2">
                      <p>Mobile Number</p>
                      <span>{applicantData?.mobile || "N/A"}</span>
                    </div>
                    <div className="my-2">
                      <p>City</p>
                      <span>{applicantData?.city || "N/A"}</span>
                    </div>
                    <div className="my-2">
                      <p>Address</p>
                      <span>{applicantData?.address || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </InnerLayout>
    </>
  );
};

export default Index;
