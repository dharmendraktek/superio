"use client"
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import ManualCreation from "@/components/dashboard-pages/employers-dashboard/addjob/components/ManualCreation";
import DashboardHeader from "@/components/header/DashboardHeader";
import MobileMenu from "@/components/header/MobileMenu";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const Index = () => {
  const [open, setOpen] = useState(true);
  const [jobData, setJobData] = useState();
  const searchParams = useSearchParams();
 const jobId = searchParams.get('jobId')

 const handleGetJobDetails = async() => {
    const response = await axios.get(BASE_URL + `/jobs/${jobId}/`)
    setJobData(response.data);
 }

 useEffect(() => {
   if(jobId){
     handleGetJobDetails()
   }
 }, [jobId])

 
  return (
    <div className="page-wrapper">
      <span className="header-span"></span>
      {/* <!-- Header Span for height --> */}

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
          {/* <BreadCrumb title="Manage jobs!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {open ?
              <>
               <div className="shadow mx-5 my-3 px-2 py-3">
                  <div className="d-flex gap-2 align-items-center">
                    <Link href='/employers-dashboard/job-posts'>
                    <span className="fs-2">{reactIcons.backarrow}</span>
                    </Link>
                    <h5>{jobData?.job_code}</h5>
                    <h5>{jobData?.title}</h5>
                  </div>
                  <div >
                   <div className="d-flex">
                    <p className="me-2">client name</p>  |  <p className="mx-2"> {jobData?.address} {jobData?.city}  {jobData?.state}  {jobData?.country}</p>
                   </div>
                   <div>
                   <span> Assigned To - </span>
                   <span>{jobData?.assign_name}</span>
                   </div>
                   <div>
                   <button onClick={() => setOpen(!open)} className="theme-btn btn-style-four small">Edit Job</button>
                   </div>
                  </div>
                  <hr></hr>
                  <div className="d-flex justify-content-around">
                     <div>
                      <span>Delivery Manager</span>
                      <br />
                      <strong>Name</strong>
                     </div>
                     <div>
                      <span>Client Bill Rate/Salery</span>
                      <br />
                      <strong>$140/yearly/Full Time</strong>
                     </div>
                     <div>
                      <span>Pay Rate / Salery</span>
                      <br />
                      <strong>N/A</strong>
                     </div>
                     <div>
                      <span>Created By & On</span>
                      <br />
                      <strong>Name</strong>
                      <strong>On 06/26/24</strong>
                     </div>
                  </div>
                  <div>
                    <h5>Job Description</h5>
                    <p>description</p>
                  </div>
               </div>
               <div className="shadow my-2 mx-5">
                 <div className="d-flex">
                  <h2>Submissions</h2>
                  <div>
                   tabs
                  </div>
                 </div>
               </div>
              </>
               :
               <ManualCreation setOpen={setOpen} jobData={jobData} />
              }
            </div>
          </div>
          {/* End .row */}
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
