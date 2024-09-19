'use client'
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import CopyrightFooter from "../../CopyrightFooter";
import PersonalInfo from "./components/PersonalInfo";
import AttendanceCalender from "./components/AttendanceCalender";
import HolidayCalender from "./components/HolidayCalender";
import LeaveManagement from "./components/LeaveManagement";
import { useEffect, useState } from "react";
import EmployeeProfile from "./components/EmployeeProfile";
import WorkFromHome from "./components/WorkFromHome";
import HelpDesk from "./components/HelpDesk";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import { getReq } from "@/utils/apiHandlers";

const Index = () => {
  const [menuItem, setMenuItem] = useState('employee-detial')
  const [userDetails, setUserDetails] = useState();

  const getUserDetails = async() => {
     const response = await getReq(`/current-user/`);
     if(response.status){
      console.log("---------------response data -----", response.data);
      setUserDetails(response.data);
     }
  }

  useEffect(() => {
     getUserDetails();
  }, [])

  return (
      <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="Dashboard Home!" /> */}
          {/* breadCrumb */}
          <div className="py-2 px-3">
          <PersonalInfo userDetails={userDetails} menuItem={menuItem} setMenuItem={setMenuItem} />
          <div className="my-2">
          {menuItem == 'employee-detial' &&
          <EmployeeProfile userDetails={userDetails} />
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
      </InnerLayout>
  );
};

export default Index;
