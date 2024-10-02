// "use client"
// import MobileMenu from "../../../header/MobileMenu";
// import LoginPopup from "../../../common/form/login/LoginPopup";
// import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
// import BreadCrumb from "../../BreadCrumb";
// import TopCardBlock from "./components/TopCardBlock";
// import ProfileChart from "./components/ProfileChart";
// import Notification from "./components/Notification";
// import CopyrightFooter from "../../CopyrightFooter";
// import JobApplied from "./components/JobApplied";
// import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
// import MenuToggler from "../../MenuToggler";
// import MyProfile from './components/components/my-profile';
// import Link from "next/link";
// import { reactIcons } from "@/utils/icons";
// import ManualCreation from "./components/ManualCreation";
// import JobParse from "./components/JobParse";
// import { useState } from "react";
// import ParseEmailJobTable from "./components/ParseEmailJobTable";
// import ParseJobEmailModal from "./components/components/ParseJobEmailModal";

// const Index = () => {
//   const [tab, setTab] = useState(null);

//   return (
//     <div className="page-wrapper theme-background">
//       <span className="header-span"></span>
//       {/* <!-- Header Span for hight --> */}

//       <LoginPopup />
//       {/* End Login Popup Modal */}

//       <DashboardCandidatesHeader /> 
//       {/* End Header */}

//       <MobileMenu />
//       <ParseJobEmailModal setTab={setTab} />
//       {/* End MobileMenu */}

//       {/* <DashboardCandidatesSidebar /> */}
//       {/* <!-- End Candidates Sidebar Menu --> */}

//       {/* <!-- Dashboard --> */}
//       <section className="user-dashboard">
//         <div className="dashboard-outer">
//              {/* <button className='theme-btn px-2 mx-4 btn-style-four small'> */}
//              {/* <span className="fs-5">Back</span> */}
//              {/* </button> */}
//            {/* <div className="px-5 py-3">
//              <Link href='/employers-dashboard/job-posts/'>
//              <div className=" d-flex align-items-center justify-content-center" style={{width:'36px', height:'36px', borderRadius:'50%', background:'var(--primary-2nd-color)'}}>
//              <span className="fs-2  text-black cursor-pointer">{reactIcons.backarrow}</span>
//              </div>
//              </Link>
//            </div> */}
//           <div className="row px-4">
//             {tab == null &&
//             <div className="col-xl-12 col-lg-12 px-5 mt-5">
//                <div className="d-flex justify-content-center">
//                     <div className="mt-5 mb-3 text-center" >
//                          <h2>New Job Posting</h2>
//                          <div className="d-flex gap-3">
//                          <div onClick={() => setTab(1)} className="my-3 me-3 cursor-pointer" style={{width:'210px', }}>
//                             <div className="text-center rounded-1 py-3" style={{background:"#1fa0e4", height:"120px"}}>
//                                  <span className="text-white fs-1">{reactIcons.list}</span>
//                                  <p className="text-white fs-5 my-3 fw-semibold">
//                                    Manual Creation
//                                  </p>
//                             </div>
//                          </div>
//                          <div
//                           onClick={() => setTab(2)} className="my-3  cursor-pointer" style={{width:'210px', height:"115px"}} >
//                             <div className=" text-center rounded-1 py-3" style={{background:"#ea88b9"}}>
//                                  <span className="text-white fs-1">{reactIcons.copy}</span>
//                                  <p className="text-white fs-5 fw-semibold">
//                                    Copy Paste Parse Job Details
//                                  </p>
//                             </div>
//                          </div>
//                          <div
//                            className="my-3 cursor-pointer" style={{width:'210px', height:"115px"}} >
//                             <div  
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#parseJobEmailModal" 
//                                 className=" text-center rounded-1 py-3 bg-primary" >
//                                  <span className="text-white fs-1">{reactIcons.emailRead}</span>
//                                  <p className="text-white fs-5 fw-semibold">
//                                    Parse Job Details by Email
//                                  </p>
//                             </div>
//                          </div>
//                          </div>
//                     </div>
//                </div>
//             </div>
//             }
//             <div>
//                {tab == 1 && 
//                <ManualCreation tab={tab} setTab={setTab} name='create' />
//                }
//               {tab == 2 &&
//               <JobParse tab={tab} setTab={setTab} />
//               }
//               {
//                 tab == 3 &&
//                 <ParseEmailJobTable />
//               }
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- End Dashboard --> */}

//       {/* <CopyrightFooter /> */}
   
//     </div>
//   );
// };

// export default Index;




"use client";
import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import ManualCreation from "./components/ManualCreation";
import JobParse from "./components/JobParse";
import ParseEmailJobTable from "./components/ParseEmailJobTable";
import ParseJobEmailModal from "./components/components/ParseJobEmailModal";
import { useState, useEffect } from "react";
import { reactIcons } from "@/utils/icons";

const Index = () => {
  const [tab, setTab] = useState(null);

  // Ensure that modals and other window-specific functions run only on the client
  useEffect(() => {
    // Any initialization for modals, etc., can go here
  }, []);

  return (
    <div className="page-wrapper theme-background">
      <span className="header-span"></span>
      {/* Header Span for height */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      <ParseJobEmailModal setTab={setTab} />
      {/* End MobileMenu */}

      {/* Dashboard */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row px-4">
            {/* Conditionally render the job creation options */}
            {tab === null && (
              <div className="col-xl-12 col-lg-12 px-5 mt-5">
                <div className="d-flex justify-content-center">
                  <div className="mt-5 mb-3 text-center">
                    <h2>New Job Posting</h2>
                    <div className="d-flex gap-3">
                      <div
                        onClick={() => setTab(1)}
                        className="my-3 me-3 cursor-pointer"
                        style={{ width: "210px" }}
                      >
                        <div
                          className="text-center rounded-1 py-3"
                          style={{ background: "#1fa0e4", height: "120px" }}
                        >
                          <span className="text-white fs-1">{reactIcons.list}</span>
                          <p className="text-white fs-5 my-3 fw-semibold">
                            Manual Creation
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => setTab(2)}
                        className="my-3 cursor-pointer"
                        style={{ width: "210px", height: "115px" }}
                      >
                        <div
                          className="text-center rounded-1 py-3"
                          style={{ background: "#ea88b9" }}
                        >
                          <span className="text-white fs-1">{reactIcons.copy}</span>
                          <p className="text-white fs-5 fw-semibold">
                            Copy Paste Parse Job Details
                          </p>
                        </div>
                      </div>
                      <div
                        className="my-3 cursor-pointer"
                        style={{ width: "210px", height: "115px" }}
                      >
                        <div
                          // data-bs-toggle="modal"
                          // data-bs-target="#parseJobEmailModal"
                          className="text-center rounded-1 py-3 bg-secondary"
                        >
                          <span className="text-white fs-1">{reactIcons.emailRead}</span>
                          <p className="text-white fs-5 fw-semibold">
                            Parse Job Details by Email
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Conditionally render the components based on the tab selection */}
            <div>
              {tab === 1 && <ManualCreation tab={tab} setTab={setTab} name="create" />}
              {tab === 2 && <JobParse tab={tab} setTab={setTab} />}
              {tab === 3 && <ParseEmailJobTable />}
            </div>
          </div>
        </div>
      </section>
      {/* End Dashboard */}
    </div>
  );
};

export default Index;
