'use client'

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

import { useParams } from 'next/navigation';
import CandidateCreation from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/CandidateCreation";
import { useEffect, useState } from "react";
import { getReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";


const Index = () => {
    const [tab, setTab] = useState(null);
    const [applicantData, setApplicantData] = useState([]);
    const param = useParams();
    const {id} = param;
    const [isLoading, setIsLoading] = useState(false);
    

    const handleGetApplicantDetails = async() => {
        setIsLoading(true);
        const response = await getReq(`/applicants/${id}/`)
        setIsLoading(false);
        if(response.status){
            setApplicantData(response.data);
        }
    }
    useEffect(() => {
        handleGetApplicantDetails()
    }, [id])





    return(
        <>
        {isLoading &&
          <Loader />
        }
        
      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader /> 
      {/* End Header */}

      <MobileMenu />
        <div className="py-5 mt-5 px-4">
            {tab ?
             <CandidateCreation setTab={setTab} applicantData={applicantData} />
            :
            <div className="row">
            <div className="col-9">
            <div className="mb-3">
            <Profile setTab={setTab} applicantData={applicantData} setApplicantData={setApplicantData} />
            </div>
            <div className="my-3">
            <ApplicantNotes applicantData={applicantData} handleGetApplicantDetails={handleGetApplicantDetails} />
            </div>
            <div className="my-3">
            <Documents  applicantDetails={applicantData} handleGetApplicantDetails={handleGetApplicantDetails} />
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
                <SubmissionsEforms  applicantData={applicantData}/>
            </div>
            <div className="my-3">
                <TaskManager applicantData={applicantData} handleGetApplicantDetails={handleGetApplicantDetails} />
            </div>
            <div className="my-3">
                <CallLogs applicantData={applicantData} handleGetApplicantDetails={handleGetApplicantDetails} />
            </div>
            <div className="my-3">
                <MeetingSchedules applicantData={applicantData} handleGetApplicantDetails={handleGetApplicantDetails} />
            </div>
            </div>
            <div className="col-3">
               <ApplicantDetails applicantData={applicantData} /> 
            </div>
            </div>
            }
            
        </div>
        </>
    )
}

export default Index;