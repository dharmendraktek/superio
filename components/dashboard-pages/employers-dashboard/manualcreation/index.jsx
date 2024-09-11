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
import Link from "next/link";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const initialState = {};

const Index = () => {
  const [manualData, setManualData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
  };
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
          <div className="shadow px-3 py-3 mx-5 mt-5">
            <div className="my-2">
              <h5 className="fw-bold">Job Details</h5>
            </div>
            <div className="row">
              <div className="col-4 my-1">
                <p>Job Code</p>
                <input
                  name="job-code"
                  value={manualData.email}
                  onChange={handleChange}
                  className="client-form-input"
                  type="text"
                />
              </div>
              <div className="col-4 my-1">
                <p>Job Title</p>
                <input
                  name="job-code"
                  value={manualData.email}
                  onChange={handleChange}
                  className="client-form-input"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="col-4 my-1">
              <p>Current Bill/Salary</p>
              <div>
                <select className="client-input-style">
                  <option>USD</option>
                </select>
                <input type="text" className="client-input-style" />
                <select className="client-input-style">
                  <option>USD</option>
                </select>
                <select className="client-input-style">
                  <option>USD</option>
                </select>
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
