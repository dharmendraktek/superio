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

// import { useRouter } from 'next/navigation';


const Index = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   console.log("--------id ",router);
    return(
        <>
        <div className="py-5 px-4">
            <div className="row">
            <div className="col-9">
            <div className="mb-3">
            <Profile />
            </div>
            <div className="my-3">
            <ApplicantNotes />
            </div>
            <div className="my-3">
            <Documents />
            </div>
            <div className="my-3">
            <Submissions />
            </div>
            <div className="my-3">
              <EInterviews />
            </div>
            <div className="my-3">
               <EForms />
            </div>
            <div className="my-3">
                <SubmissionsEforms />
            </div>
            <div className="my-3">
                <TaskManager />
            </div>
            <div className="my-3">
                <CallLogs />
            </div>
            <div className="my-3">
                <MeetingSchedules />
            </div>
            </div>
            <div className="col-3">
               <ApplicantDetails /> 
               
            </div>
            </div>
            
        </div>
        </>
    )
}

export default Index;