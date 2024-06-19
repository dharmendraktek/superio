"use client";
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
import MyProfile from "./components/components/my-profile";
import UserTable from "./components/UserTable";
import { useState } from "react";

const tabsName = [
  { id: 1, name: "ACTIVE USERS" },
  { id: 2, name: "INACTIVE USERS" },
];

const Index = () => {
  const [active, setActive] = useState(1);
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
            <div className="col-xl-12 col-lg-12 px-5 mt-5">
              <div className="d-flex justify-content-between">
              <div className="d-flex border border-primary " style={{width:"300px"}}>
                {tabsName.map((item, index) => {
                  return (
                    <div
                      style={{width:"150px"}}
                      className={`text-center ${
                        active == item.id
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                      key={index}
                    >
                      <li onClick={() => setActive(item.id)}>{item.name}</li>
                    </div>
                  );
                })}
              </div>
              <div className="">
                <input type="text"  style={{width:"350px", height:"40px"}} className="border border-secondary px-2 rounded-2 h-100" placeholder="Search anything..." />
                {/* <div>
                  <button>Upload File</button>
                </div> */}
              </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 px-5 mt-3">
              <UserTable />
            </div>
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
