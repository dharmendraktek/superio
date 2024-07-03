"use client";

import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";
import CandidateCreation from "./components/CandidateCreation";

const Index = () => {
  const [tab, setTab] = useState(null);
  const [resume, setResume] = useState();
  const [bulkResumeFiles, setBulkResumeFiles] = useState([]);

  const handleFileChange = (e) => {
    console.log("----------e---", e.target.files);
    const button = document.getElementById("uploadResumeModal");
  
    setResume(e.target.files[0]);
    // Simulate a click on the button
    button.click();
  };

  const handleBulkUploadFile = (e) => {
    const button = document.getElementById("uploadBulkResumeModal");
    // let arr = [];
    // arr.push(e.target.files)

    setBulkResumeFiles(Object.values(e.target.files))
    button.click();
  }
  console.log("-------------- bulk resmue files ", bulkResumeFiles)
  
  const handleSelectAll = () => {
    // setBulkResumeFiles((prev) => {
    //   return prev.map((item) => ({ ...item, isSelect: true, ...item })
    // )
    // })
  }

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
        <div
          className="modal fade"
          id="parseResumeModal"
          tabindex="-1"
          aria-labelledby="parseResumeModalLabel"
          aria-hidden="true"
        >
          <button
            type="button"
            id="uploadResumeModal"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#parseResumeModal"
          >
            Launch demo modal
          </button>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button> */}
              </div>
              <div className="modal-body">
                <h5>You are trying to parse "{resume}"</h5>
              </div>
              <div className="d-flex justify-content-center gap-2 py-2">
                <button
                  onClick={() => setTab(1)}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="parseBulkResumeModal"
          tabindex="-1"
          aria-labelledby="parseBulkResumeModalLabel"
          aria-hidden="true"
        >
          <button
            type="button"
            id="uploadBulkResumeModal"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#parseBulkResumeModal"
          >
            Launch demo modal
          </button>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                   Upload Files
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="px-2 gap-2 d-flex">
                <button
                  // type="button"
                  className="theme-btn btn-style-one small fs-6"
                  data-bs-dismiss="modal"
                > 
                 <span className="fs-4 me-2">{reactIcons.addcircle}</span>
                  Add More 
                  </button>
                  <button
                  type="button"
                  className="theme-btn btn-style-two small fs-6"
                  data-bs-dismiss="modal"
                > 
                <span className="fs-4 me-2">{reactIcons.cancel}</span>
                  Cancel 
                  </button>
                  <button
                  type="button"
                  className="theme-btn btn-style-nine small fs-6"
                  data-bs-dismiss="modal"
                > 
                <span className="fs-4 me-2">{reactIcons.delete}</span>
                  Delete
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center my-3 px-2">
                  <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" onClick={handleSelectAll} />
                  <label>Select All</label>
                  </div>
                  <div className="d-flex gap-2">
                    <div className="d-flex gap-2">
                    <label>Default option when system finds duplicate resume:
                    </label>
                    <select className="client-form-input" style={{width:"130px"}}>
                      <option></option>
                    </select>
                    </div>
                    <div className="d-flex gap-2">
                    <label>Source:</label>
                    <select className="client-form-input" style={{width:"130px"}}>
                      <option></option>
                    </select>
                    </div>
                    <button className="theme-btn btn-style-one small">Apply All</button>
                  </div>
                </div>
                <div>
                  <table className="" style={{width:"100%", border:"1px solid lightgray"}}>
                    {bulkResumeFiles.map((item, index) => {

                      // console.log("--------item ", item.Files);
                      return(
                    <tr key={index} className="py-2">
                      <td className="px-2">
                        <input type="checkbox" />
                      </td>
                      <td style={{width:"700px"}}>
                        <span>{item.name}</span>
                        {!(item.name.split('.')[1] == 'pdf' || item.name.split('.')[1] == 'docx') &&
                        <p className="text-danger">This file format is not supported</p>
                        }
                      </td>
                      <td>
                        <span>127 kb</span>
                        <div className='rounded-2 my-2 border border-primary' style={{width:"100px", height:"15px", background:'green'}} ></div>
                      </td>
                      <td>
                        <button className="theme-btn btn-style-four small">Cancel</button>
                      </td>
                    </tr>
                      )
                    })
                    }
                  </table>
                </div>
              </div>
              <div className="modal-footer py-2">
                <button
                  onClick={() => setTab(1)}
                  type="button"
                  className="theme-btn btn-style-one small"
                  data-bs-dismiss="modal"
                >
                 Start Parsing
                </button>
                <button
                  type="button"
                  className="theme-btn btn-style-four small"
                  data-bs-dismiss="modal"
                >
                Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-outer">
          <div className="row">
            {tab == null && (
              <div className="col-xl-12 col-lg-12 px-5 mt-5">
                <div className="d-flex justify-content-center">
                  <div className="mt-5 text-center">
                    <h2>New Job Posting</h2>
                    <div className="d-flex">
                      <div
                        onClick={() => setTab(1)}
                        className="my-3 me-3 cursor-pointer"
                        style={{ width: "170px" }}
                      >
                        <div
                          className="text-center rounded-1 py-3"
                          style={{ background: "#1fa0e4" }}
                        >
                          <span className="text-white fs-2">
                            {reactIcons.addapplicant}
                          </span>
                          <p className="text-white py-2 fs-5">
                            Manual Creation
                          </p>
                        </div>
                      </div>
                      <label>
                        <div
                          htmlFor="#upload"
                          className="my-3 me-3 cursor-pointer"
                          style={{ width: "170px" }}
                        >
                          <div
                            className=" text-center rounded-1 py-3"
                            style={{ background: "#ea88b9" }}
                          >
                            <span className="text-white fs-2">
                              {reactIcons.upload}
                            </span>
                            <p className="text-white py-2 fs-5">Parse Resume</p>
                          </div>
                        </div>
                        <input
                          type="file"
                          id="addresume"
                          onChange={handleFileChange}
                          className="d-none"
                        />
                      </label>
                      <label>
                        <div
                          htmlFor="#upload"
                          className="my-3 me-3 cursor-pointer"
                          style={{ width: "170px" }}
                        >
                          <div
                            className=" text-center rounded-1 py-3"
                            style={{ background: "#1fa0e4" }}
                          >
                            <span className="text-white fs-2">
                              {reactIcons.multupload}
                            </span>
                            <p className="text-white py-2 px-1 fs-5">
                              Bulk Resume Parse
                            </p>
                          </div>
                        </div>
                        <input
                          type="file"
                          id="addresume"
                          className="d-none"
                          onChange={handleBulkUploadFile}
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="my-4 px-5">
              {tab == 1 && (
                <CandidateCreation tab={tab} setTab={setTab} name="create" />
              )}
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
