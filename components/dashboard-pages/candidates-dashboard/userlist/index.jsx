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
import { reactIcons } from "@/utils/icons";

const tabsName = [
  { id: 1, name: "ACTIVE USERS" },
  { id: 2, name: "INACTIVE USERS" },
];

const Index = () => {
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState();
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
              <div className="d-flex border border-primary rounded-1" style={{width:"300px"}}>
                {tabsName.map((item, index) => {
                  return (
                    <div
                      style={{width:"150px", borderLeft:'2px'}}
                      className={`text-center cursor-pointer rounded-1 ${
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
              <div className="position-relative">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} style={{width:"350px", height:"45px"}} className="border border-primary px-4 rounded-1 h-100" placeholder="Search anything..." />
                <span className="position-absolute fs-4 text-primary" style={{left:"2px"}}>{reactIcons.search}</span>
                {search &&
                <span onClick={() => setSearch('')} className="position-absolute cursor-pointer	  text-primary fs-5" style={{right:"8px"}}>{reactIcons.close}</span>
                }
                {/* <div>
                  <button>Upload File</button>
                </div> */}
              </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 px-5 mt-3">
              <UserTable active={active} search={search} setSearch={setSearch} />
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
