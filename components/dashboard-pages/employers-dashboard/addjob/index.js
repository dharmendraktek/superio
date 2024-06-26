"use client"
import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import CopyrightFooter from "../../CopyrightFooter";
import JobApplied from "./components/JobApplied";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import MyProfile from './components/components/my-profile';
import Link from "next/link";
import { reactIcons } from "@/utils/icons";
import ManualCreation from "./components/ManualCreation";
import JobParse from "./components/JobParse";
import { useState } from "react";

const Index = () => {
  const [tab, setTab] = useState(null);

  console.log("------------tab ", tab);
  return (
    <div className="page-wrapper">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader /> 
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <DashboardCandidatesSidebar /> */}
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            {tab == null &&
            <div className="col-xl-12 col-lg-12 px-5 mt-5">
               <div className="d-flex justify-content-center">
                    <div className="mt-5 text-center" >
                         <h2>New Job Posting</h2>
                         <div className="d-flex">
                         <div onClick={() => setTab(1)} className="my-3 me-3 cursor-pointer" style={{width:'160px'}}>
                            <div className="text-center rounded-1 py-3" style={{background:"#1fa0e4"}}>
                                 <span className="text-white fs-2">{reactIcons.list}</span>
                                 <p className="text-white fs-5">
                                   Manual Creation
                                 </p>
                            </div>
                         </div>
                         <div onClick={() => setTab(2)} className="my-3 me-3 cursor-pointer" style={{width:'160px'}} >
                            <div className=" text-center rounded-1 py-3" style={{background:"#ea88b9"}}>
                                 <span className="text-white fs-2">{reactIcons.upload}</span>
                                 <p className="text-white fs-5">
                                   Parse Job Details
                                 </p>
                            </div>
                         </div>
                         </div>
                    </div>
               </div>
            </div>
            }
            <div>
               {tab == 1 && 
               <ManualCreation tab={tab} setTab={setTab} />
               }
              {tab == 2 &&
              <JobParse tab={tab} setTab={setTab} />
              }
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
   
    </div>
  );
};

export default Index;
