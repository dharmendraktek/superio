"use client";

import HeaderNavContent from "@/components/header/HeaderNavContent";
import ApplicantDetails from "./components/ApplicantDetails";
import ApplicantNotes from "./components/ApplicantNotes";
import Documents from "./components/Documents";
import EForms from "./components/EForms";
import Profile from "./components/Profile";
import Submissions from "./components/Submissions";
import SubmissionsEforms from "./components/SubmissionsEforms";
import TaskManager from "./components/TaskManager";
import CallLogs from "./components/CallLogs";
import MeetingSchedules from "./components/MeetingSchedules";
import EInterviews from "./components/EInterviews";

import { useParams } from "next/navigation";
import CandidateCreation from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/CandidateCreation";
import { useEffect, useState } from "react";
import { getReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import EducationDetails from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/EducationDetails";
import Certificate from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/Certificate";
import Experience from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/Experience";
import Languages from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/Languages";
import { reactIcons } from "@/utils/icons";
import Link from "next/link";
import { BASE_URL } from "@/utils/endpoints";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";

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
  const [tab, setTab] = useState(1);
  const [applicantData, setApplicantData] = useState([]);
  const param = useParams();
  const { id } = param;
  const [isLoading, setIsLoading] = useState(false);
  const [submitOpt, setSubmitOpt] = useState(false);
  const [settingOpt, setSettingOpt] = useState(false);

  const handleGetApplicantDetails = async () => {
    setIsLoading(true);
    const response = await getReq(`/applicants/${id}/`);
    setIsLoading(false);
    if (response.status) {
      setApplicantData(response.data);
    }
  };
  useEffect(() => {
    handleGetApplicantDetails();
  }, [id]);

  return (
    <InnerLayout>
      {isLoading && <Loader />}
      <div className="px-3 theme-background">
        <div className="d-flex justify-content-between pt-5 pb-1 mt-2 gap-3">
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
            <div className="d-flex ">
              <div className="border border-secondary rounded-start-1 position-relative px-2">
                <div className="d-flex gap-1">
                  <span className="fs-5">{reactIcons.setting}</span>
                  <span className="fs-6">{reactIcons.downarrow}</span>
                </div>
                {settingOpt && (
                  <div
                    className="position-absolute bg-secondary border border-secondary rounded-1 px-2"
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
              </div>
              <div className="border border-secondary px-2 cursor-pointer">
                <span>{reactIcons.share}</span>
              </div>
              <div className="border border-secondary px-2 cursor-pointer">
                <span>{reactIcons.mail}</span>
              </div>
              <div className="border border-secondary position-relative px-2">
                <div
                  className="cursor-pointer d-flex gap-1"
                  onClick={() => setSubmitOpt(!submitOpt)}
                >
                  <strong>Submit</strong>
                  <span>{reactIcons.downarrow}</span>
                </div>
                {submitOpt && (
                  <div
                    className="position-absolute bg-secondary border border-secondary rounded-1 px-2"
                    style={{
                      width: "200px",
                      height: "80px",
                      top: "30px",
                      zIndex: "1000",
                      right: 0,
                    }}
                  >
                    <Link
                      href={`/employers-dashboard/all-applicants/submit_jobs/${id}`}
                    >
                      <p className="cursor-pointer">Submit to job</p>
                    </Link>
                    <p className="cursor-pointer">Tag to job</p>
                    <p className="cursor-pointer">Quick Submit</p>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  window.open(
                    BASE_URL + `/applicant-documents/${id}/download/`
                  );
                }}
                className="border border-secondary rounded-end-1 cursor-pointer px-2"
              >
                <span>{reactIcons.download}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="mb-3">
              <Profile
                setTab={setTab}
                applicantData={applicantData}
                setApplicantData={setApplicantData}
              />
            </div>
            {tab == 2 && (
              <CandidateCreation
                setTab={setTab}
                applicantData={applicantData}
              />
            )}
            {tab == 3 && (
              <>
                <Experience
                  applicantDetails={applicantData}
                  handleGetApplicantDetails={handleGetApplicantDetails}
                />
                <EducationDetails
                  applicantDetails={applicantData}
                  handleGetApplicantDetails={handleGetApplicantDetails}
                />
                <Certificate
                  applicantDetails={applicantData}
                  handleGetApplicantDetails={handleGetApplicantDetails}
                />
                <Languages
                  applicantDetails={applicantData}
                  handleGetApplicantDetails={handleGetApplicantDetails}
                />
              </>
            )}
            {tab == 1 && (
              <div>
                <div className="my-3">
                  <ApplicantNotes
                    applicantData={applicantData}
                    handleGetApplicantDetails={handleGetApplicantDetails}
                  />
                </div>
                <div className="my-3">
                  <Documents
                    applicantDetails={applicantData}
                    handleGetApplicantDetails={handleGetApplicantDetails}
                  />
                </div>
                <div className="my-3">
                  <Submissions applicantData={applicantData} />
                </div>
                <div className="my-3">
                  <EInterviews applicantData={applicantData} />
                </div>
                <div className="my-3">
                  <EForms />
                </div>
                <div className="my-3">
                  <SubmissionsEforms applicantData={applicantData} />
                </div>
                <div className="my-3">
                  <TaskManager
                    applicantData={applicantData}
                    handleGetApplicantDetails={handleGetApplicantDetails}
                  />
                </div>
                <div className="my-3">
                  <CallLogs
                    applicantData={applicantData}
                    handleGetApplicantDetails={handleGetApplicantDetails}
                  />
                </div>
                <div className="my-3">
                  <MeetingSchedules
                    applicantData={applicantData}
                    handleGetApplicantDetails={handleGetApplicantDetails}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-3">
            <ApplicantDetails applicantData={applicantData} />
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default Index;
