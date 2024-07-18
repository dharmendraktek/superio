"use client";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import ManualCreation from "@/components/dashboard-pages/employers-dashboard/addjob/components/ManualCreation";
import DashboardHeader from "@/components/header/DashboardHeader";
import MobileMenu from "@/components/header/MobileMenu";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Submissions from "./components/Submissions";
import Notes from "./components/Notes";
import Documents from "./components/Documents";
import JobSearchBoard from "./components/JobSearchBoard";
import { getReq } from "@/utils/apiHandlers";
import { currencyJson } from "@/utils/currency";
import Loader from "@/components/common/Loader";
import moment from "moment";

const Index = () => {
  const [open, setOpen] = useState(true);
  const [jobData, setJobData] = useState();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [viewMore, setViewMore] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleSearchString = async () => {
    const response = await getReq(`/job-boolean-string/${jobId}/`);
    if (response.status) {
      setSearchString(response.data.boolean_string);
    }
  };

  const handleGetJobDetails = async () => {
    const response = await getReq(`/jobs/${jobId}/`);
    setJobData(response.data);
    setNoteData(response.data.notes);
  };

  useEffect(() => {
    if (jobId) {
      handleGetJobDetails();
      handleSearchString();
    }
  }, [jobId]);

  console.log("-------------jpb data ", jobData);

  return (
    <>
    {!jobData &&
       <Loader />
    }
    <div className="page-wrapper">
      <span className="header-span"></span>
      {/* <!-- Header Span for height --> */}

      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <DashboardEmployerSidebar /> */}
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="Manage jobs!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row mx-3">
            <div className={`${open ? "col-lg-9" : "col-12"}`}>
              {open ? (
                <>
                  <div className="shadow  my-3 px-4 py-4">
                    <div className="d-flex gap-2 align-items-center">
                      <Link href="/employers-dashboard/job-posts">
                        <span className="fs-2">{reactIcons.backarrow}</span>
                      </Link>
                      <h5>{jobData?.job_code}</h5>
                      <h5>{jobData?.title}</h5>
                    </div>
                    <div>
                      <div className="d-flex">
                        <p className="me-2">
                          {jobData?.client_name ? jobData.client_name : "-"}
                        </p>{" "}
                        |{" "}
                        <p className="mx-2">
                          {" "}
                          {jobData?.address} {jobData?.city} {jobData?.state}{" "}
                          {jobData?.country}
                        </p>
                      </div>
                      <div className="d-flex gap-2">
                        <span> Assigned To - </span>
                        <div className="d-flex gap-1">
                          {jobData?.assign_details.map((item) => {
                            return (
                              <span>
                                {item.first_name} {item.last_name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => setOpen(!open)}
                          className="theme-btn btn-style-four small"
                        >
                          Edit Job
                        </button>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-around">
                      <div>
                        <span>Delivery Manager</span>
                        <br />
                        <strong>{jobData?.delivery_manager_name}</strong>
                      </div>
                      <div>
                        <span>Client Bill Rate/Salery</span>
                        <br />
                        <strong>
                          {
                            currencyJson.find(
                              (item) => item.code == jobData?.currency
                            )?.symbol
                          }{" "}
                          {jobData?.amount ? jobData?.amount : 'N.A' }/{jobData?.payment_frequency ? jobData?.payment_frequency : 'N.A'}/
                          {jobData?.job_type ? jobData?.job_type : 'N.A'}
                        </strong>
                      </div>
                      <div>
                        <span>Pay Rate / Salery</span>
                        <br />
                        <strong>N/A</strong>
                      </div>
                      <div>
                        <span>Created By & On</span>
                        <br />
                        <strong>Name is p</strong>
                        <strong>On {moment(jobData?.created_at).format('DD/MM/YYYY  hh:mm A')}</strong>
                      </div>
                    </div>
                    <div>
                      <h4>Job Description</h4>
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
                  <div className="my-2">
                    <Submissions />
                  </div>
                  <div className="my-2">
                    <Notes
                      jobId={jobId}
                      noteData={noteData}
                      setNoteData={setNoteData}
                    />
                  </div>
                  <div className="my-2">
                    <Documents
                      jobId={jobId}
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
            {open && (
              <div className="col-3 my-3">
                <JobSearchBoard
                  searchString={searchString}
                  setSearchString={setSearchString}
                />
              </div>
            )}
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
    </>
    // End page-wrapper
  );
};

export default Index;
