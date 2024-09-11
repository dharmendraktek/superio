'use client'
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import ProfileChart from "./components/ProfileChart";
import Notification from "./components/Notification";
import Applicants from "./components/Applicants";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import PersonalInfo from "./components/PersonalInfo";
import JobInfo from "./components/JobInfo";
import AttendanceCalender from "./components/AttendanceCalender";
import HolidayCalender from "./components/HolidayCalender";
import LeaveManagement from "./components/LeaveManagement";
import EmployeeInfo from "./components/EmployeeInfo";
import { useState } from "react";
import EmployeeProfile from "./components/EmployeeProfile";
import WorkFromHome from "./components/WorkFromHome";
import HelpDesk from "./components/HelpDesk";

const Index = () => {
  const [menuItem, setMenuItem] = useState('employee-detial')
  return (
    <div className="page-wrapper theme-background ">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
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
          {/* <BreadCrumb title="Dashboard Home!" /> */}
          {/* breadCrumb */}
          <div className="py-2 px-3">
          <PersonalInfo menuItem={menuItem} setMenuItem={setMenuItem} />
          <div className="my-2">
          {menuItem == 'employee-detial' &&
          <EmployeeProfile />
          }
          {menuItem == 'attendance' &&
          <AttendanceCalender />
          }
          {menuItem == 'holiday' &&
          <HolidayCalender />
          }
          {menuItem == 'leave-management' &&
          <LeaveManagement />
          }
          {menuItem == 'work-from-home' &&
          <WorkFromHome />
          }
          {menuItem == 'helpdesk-ticket' &&
          <HelpDesk />
          }
          </div>
          </div>
          {/* <div className="px-3">
          <EmployeeInfo />
          </div>
          <div className="py-2 px-3">
          <JobInfo />
          </div> */}
          {/* <div className="py-2 px-3">
          </div> */}
          {/* <MenuToggler /> */}
          {/* Collapsible sidebar button */}

          {/* <div className="row"> */}
            {/* <TopCardBlock /> */}
          {/* </div> */}
          {/* End .row top card block */}

          {/* <div className="row">
            <div className="col-xl-7 col-lg-12">
              <div className="graph-widget ls-widget">
                <ProfileChart />
              </div>
            </div>

            <div className="col-xl-5 col-lg-12">
              <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Notifications</h4>
                </div>
                <div className="widget-content">
                  <Notification />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Recent Applicants</h4>
                </div>
                <div className="widget-content">
                  <div className="row">

                    <Applicants />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
