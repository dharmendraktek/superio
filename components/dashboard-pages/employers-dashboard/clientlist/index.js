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
import ClientTable from "./components/components/ClientTable";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";
import Link from "next/link";

const Index = () => {
  const [open, setOpen] = useState(false);
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
          <div className="col-xl-12 col-lg-12 px-5 mt-3">
            {/* <div className="d-flex justify-content-end">
                 <div>
                   <div className="position-relative">
                     <button onClick={() => setOpen(!open)} className="border px-2 rounded-1">
                        <span className="fs-6">New</span>
                        <span className="fs-6">{reactIcons.downarrow}</span>
                      </button>   
                      {open &&
                        <div className="position-absolute rounded-1 py-1 text-black" style={{width:"160px", height:"70px", right:"0px", top:'35px', zIndex:1000, border:'1px solid #f9f9f9', background:"#f9f9f9"}}>
                            <Link href='/candidates-dashboard/client-list/add-client'>
                            <li  className="cursor-pointer text-black hover-bg-gray px-2">Client</li>
                            </Link>
                            <Link href='/candidates-dashboard/client-list/add-client'>
                            <li className="cursor-pointer  text-black hover-bg-gray px-2">Contact</li>
                            </Link>
                          </div>
                      }
                   </div>
                 </div>
            </div> */}
            </div>
            <div className="col-xl-12 col-lg-12 px-5">
               <ClientTable />
            </div>
          
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
