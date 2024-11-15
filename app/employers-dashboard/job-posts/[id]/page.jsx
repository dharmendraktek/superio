"use client";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import ManualCreation from "@/components/dashboard-pages/employers-dashboard/addjob/components/ManualCreation";
import DashboardHeader from "@/components/header/DashboardHeader";
import MobileMenu from "@/components/header/MobileMenu";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Submissions from "./components/Submissions";
import Notes from "./components/Notes";
import Documents from "./components/Documents";
import JobSearchBoard from "./components/JobSearchBoard";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import { currencyJson } from "@/utils/currency";
import Loader from "@/components/common/Loader";
import moment from "moment";
import Paper from "@/components/common/Paper";
import StarRating from "@/components/common/StarRating";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import UsersModal from "@/components/dashboard-pages/employers-dashboard/addjob/components/components/UsersModal";
import JobAssignModal from "@/components/common/JobAssignModal";

const applicantTabList = [
  { id: 1, name: "Snapshot" },
  { id: 2, name: "Personal Details" },
  { id: 3, name: "Profession Details" },
  { id: 4, name: "Employer Details" },
  // {name:'Snapshot'},
  // {name:'Snapshot'},
  // {name:'Snapshot'},
];

const Index = () => {
  const [open, setOpen] = useState(true);
  const [jobData, setJobData] = useState();
  const param = useParams();
  const { id } = param;
  const [viewMore, setViewMore] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [submitOpt, setSubmitOpt] = useState(false);
  const [settingOpt, setSettingOpt] = useState(false);
  const [tab, setTab] = useState();

  const handleSearchString = async () => {
    const response = await getReq(`/job-boolean-string/${id}/`);
    if (response.status) {
      setSearchString(response.data.boolean_string);
    }
  };

  const handleGetJobDetails = async () => {
    const response = await getReq(`/jobs/${id}/`);
    setJobData(response.data);
    setNoteData(response.data.notes);
  };

  useEffect(() => {
    if (id) {
      handleGetJobDetails();
      handleSearchString();
    }
  }, [id]);

  return (
    <InnerLayout>
      {!jobData && <Loader />}
      <section className="user-dashboard theme-background">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="Manage jobs!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}
          {open && (
            <div className="d-flex justify-content-between mt-2 px-4 gap-3">
              <div className="d-flex  gap-3">
                {applicantTabList.map((item) => {
                  return (
                    <div
                      className={`cursor-pointer px-3 rounded-1 bg-secondary ${
                        tab == item.id
                          ? "border-2 text-primary border-bottom border-primary"
                          : ""
                      }`}
                      onClick={() => setTab(item.id)}
                      key={item.id}
                    >
                      <span className="fw-medium">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="">
                <div className="d-flex">
                  {/* <div className="border position-relative rounded-start-1 cursor-pointer border-secondary px-2">
                      <div className="" onClick={() => setSettingOpt(!settingOpt)}>
                        <span>{reactIcons.setting}</span>
                        <span>{reactIcons.downarrow}</span>
                      </div>
                      {settingOpt && (
                        <div
                          className="position-absolute bg-white border border-secondary rounded-1 px-2"
                          style={{
                            width: "200px",
                            height: "80px",
                            top: "30px",
                            zIndex: "1000",
                            right: 0,
                          }}
                        >
                          <p className="cursor-pointer">Tag to job</p>
                          <p className="cursor-pointer">Quick Submit</p>
                        </div>
                      )}
                    </div> */}
                  {/* <div className="border border-secondary px-2 cursor-pointer">
                      <span>{reactIcons.share}</span>
                    </div> */}
                  {/* <div className="border border-secondary px-2 cursor-pointer">
                      <span>{reactIcons.mail}</span>
                    </div> */}
                  <div className="dropdown">
                    <button
                      type="button"
                      className="theme-btn btn-style-one small"
                      data-bs-toggle="dropdown"
                    >
                      Submit
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                      <Link
                      className="dropdown-item"
                            href={`/employers-dashboard/job-posts/submit-applicants/${id}`}
                          >
                        {/* <a class="dropdown-item" href="#"> */}
                        Submit Applicant
                        {/* </a> */}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <div
                      onClick={() => {
                        window.open(
                          BASE_URL + `/applicant-documents/${jobData?.documents?.find((item) => item.is_default == true).id}/download/`
                        );
                      }}
                      className="border border-secondary rounded-end-1 cursor-pointer px-2"
                    >
                      <span>{reactIcons.download}</span>
                    </div> */}
                </div>
              </div>
            </div>
          )}
          <div className="row mx-3">
            <div className={`${open ? "col-lg-12" : "col-12"}`}>
              <JobAssignModal jobId={id} handleReload={handleGetJobDetails} />
              {open ? (
                <>
                  <Paper>
                    <div className="px-2">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link href="/employers-dashboard/job-posts">
                            <span className="fs-2">{reactIcons.backarrow}</span>
                            <span className="text-primary">Back</span>
                          </Link>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="theme-btn btn-style-one small"
                            // onClick={handleAssingJob}
                            data-bs-toggle="modal"
                            data-bs-target="#jobAssignModal"
                          >
                            Assign
                          </button>
                          <button
                            onClick={() => setOpen(!open)}
                            className="theme-btn btn-style-four small"
                          >
                            Edit Job
                          </button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between gap-2">
                        <div>
                          <div className="d-flex mt-2 gap-2">
                            <h5 className="fw-bolder">
                              {jobData?.job_code || "N/A"}{" "}
                              {jobData?.title || ""}
                            </h5>
                          </div>
                          <div className="d-flex">
                            <p className="me-2">
                              {jobData?.client_name
                                ? jobData.client_name
                                : "N/A"}
                            </p>{" "}
                            |{" "}
                            <p className="mx-2">
                              {" "}
                              {jobData?.address} {jobData?.city}{" "}
                              {jobData?.state} {jobData?.country}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex gap-2">
                          <strong> Assigned To - </strong>
                          <div className="d-flex gap-1">
                            {jobData?.assign_details.map((item) => {
                              return (
                                <div className="border border-primary rounded-1 px-1">
                                  <span>
                                    {item.first_name} {item.last_name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <hr className="border"></hr>
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong className="fs-6">Delivery Manager</strong>
                          <br />
                          <p>{jobData?.delivery_manager_name || "N/A"}</p>
                        </div>
                        <div>
                          <strong>Client Bill Rate/Salary</strong>
                          <p>
                            {
                              currencyJson.find(
                                (item) => item.code == jobData?.currency
                              )?.symbol
                            }{" "}
                            {jobData?.amount ? jobData?.amount : "N.A"}/
                            {jobData?.payment_frequency
                              ? jobData?.payment_frequency
                              : "N.A"}
                            /{jobData?.job_type ? jobData?.job_type : "N.A"}
                          </p>
                        </div>
                        <div>
                          <strong>Pay Rate / Salary</strong>
                          <p>N/A</p>
                        </div>
                        <div>
                          <strong>Created By & On</strong>
                          <br />
                          <span>
                            {jobData?.created_by
                              ? jobData?.created_by.first_name +
                                " " +
                                jobData?.created_by.last_name
                              : "N/A"}
                          </span>
                          <span>
                            {" "}
                            On{" "}
                            {moment(jobData?.created_at).format(
                              "DD/MM/YYYY  hh:mm A"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="my-2">
                        <strong>Job Description</strong>
                        <div
                          className="mt-2"
                          dangerouslySetInnerHTML={{
                            __html: viewMore
                              ? jobData?.description?.slice(
                                  0,
                                  jobData?.description?.length
                                )
                              : jobData?.description?.slice(0, 500),
                          }}
                        />
                        {jobData?.description?.length > 500 && (
                          <button
                            onClick={() => setViewMore(!viewMore)}
                            className="theme-btn btn-style-one small mt-2"
                          >
                            {viewMore ? "Less" : "More"}
                          </button>
                        )}
                      </div>
                    </div>
                  </Paper>
                  <div className="my-2">
                    <Submissions
                      jobData={jobData}
                      handleGetJobDetails={handleGetJobDetails}
                    />
                  </div>
                  <div className="my-2">
                    <Notes
                      jobId={id}
                      noteData={noteData}
                      setNoteData={setNoteData}
                    />
                  </div>
                  <div className="my-2">
                    <Documents
                      jobId={id}
                      jobData={jobData}
                      handleGetJobDetails={handleGetJobDetails}
                    />
                  </div>
                </>
              ) : (
                <ManualCreation
                  setOpen={setOpen}
                  jobData={jobData}
                  setJobData={setJobData}
                  name="update"
                  handleGetJobDetails={handleGetJobDetails}
                />
              )}
            </div>
            {/* {open && (
              <div className="col-3">
                <JobSearchBoard
                  searchString={searchString}
                  setSearchString={setSearchString}
                />
              </div>
            )} */}
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
    </InnerLayout>
  );
};

export default Index;
