"use client";

import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";
import CandidateCreation from "./components/CandidateCreation";
import Documents from "@/app/employers-dashboard/all-applicants/[id]/components/Documents";
import EducationDetails from "./components/EducationDetails";
import Certificate from "./components/Certificate";
import Languages from "./components/Languages";
import Experience from "./components/Experience";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sourceData } from "@/utils/constant";

const tabsName = [
  { id: 1, name: "Personal Details", icon: reactIcons.personalDetails },
  { id: 2, name: "Documents", icon: reactIcons.document },
  { id: 3, name: "Education Details", icon: reactIcons.education },
  { id: 4, name: "Certifications", icon: reactIcons.certificate },
  { id: 5, name: "Languages", icon: reactIcons.language },
  { id: 6, name: "Work Experience", icon: reactIcons.workexp },
  // { id: 7, name: "Employer Details", icon:reactIcons.detail },
];

const resumeDefaultOption = [
  {name:'Overwrite Existing', value:'overwrite_existing'},
  {name:'Add as a default resume', value:'add_as_default_resume'},
  {name:'Add just as resume', value:'add_just_as_resume'},
  {name:'Do Nothing', value:'do_nothing'},
]

const Index = () => {
  const [tab, setTab] = useState(null);
  const [resume, setResume] = useState([]);
  const [bulkResumeFiles, setBulkResumeFiles] = useState([]);
  const [activeForm, setActiveForm] = useState(1);
  const [applicantDetails, setApplicantDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [applicantId, setApplicantId] = useState();
  const router = useRouter();

  const handleFileChange = (e) => {
    const button = document.getElementById("uploadResumeModal");
    setResume((prev) => [...prev, e.target.files[0]]);
    button.click();
  };


  const handleBulkUploadFile = (e) => {
    const button = document.getElementById("uploadBulkResumeModal");
    setBulkResumeFiles(Object.values(e.target.files));
    button.click();
  };

  const handleDeleteFile = (index) => {
    let updated = [...bulkResumeFiles];
    let filteredData = updated.filter((item, _index) => _index !== index);
    setBulkResumeFiles(filteredData);
  };

  const handleSelectAll = (checked) => {
    const data = [...bulkResumeFiles];
    const updatedFileArray = data.map((file) => {
      file["isSelect"] = checked;
      return file;
    });
    setBulkResumeFiles(updatedFileArray);
  };
  const handleSelectOne = (index, value) => {
    // const data = [...bulkResumeFiles];
    // const updatedFileArray = data[index]['isSelect'] = value;
    // setBulkResumeFiles(updatedFileArray);
  };

  const handleGetApplicantDetails = async () => {
    // setIsLoading(true);
    const response = await getReq(`/applicants/${applicantDetails.id}/`);
    // setIsLoading(false);
    if (response.status) {
      setApplicantDetails(response.data);
    }
  };

  function formatFileSize(bytes, decimalPoint) {
    if (bytes === 0) return "0 Bytes";
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    return (bytes / Math.pow(k, 1)).toFixed(dm) + " " + sizes[1];
  }

  const handleParseResume = async () => {
    // setIsLoading(true);
    // let formData = new FormData();
    // resume.forEach((item) => {
    //     formData.append("resume_files", item); 
    // })
    // const response = await postApiReq("/parse-resumes/", formData);
    // setIsLoading(false);
    // if (response){
    //   setApplicantDetails(response.data[0].data);
    //   let data = { email: response.data[0].data.email, mobile:response.data[0].data.mobile };
    //   const res = await postApiReq("/duplicate-applicant-check/", data);
    //   if (res.data.duplicate) {
    //     const button = document.getElementById("setResumeModal");
    //     setApplicantId(res.data.id);
    //     button.click();
    //   } else {
    //     setTab(1);
    //   }
    // }
  };

  const handleAddResume = async (key) => {
//    let closeBtn = document.getElementById('btnClose');

//     if (key == "do_nothing") {
//       closeBtn.click();
//       router.push(`/employers-dashboard/all-applicants/${applicantId}`);
//       return;
//     }
//     const formData = new FormData();
//     formData.append("applicant_id", applicantId);
//     formData.append("action", key);
//     resume.forEach((item) => {
//         formData.append("file", item);
//     })
//     formData.append("applicant", applicantId);
//     formData.append("title", key);
//     formData.append("type", "Resume");
//     formData.append("comment", '');
//     const response = await postApiReq("/handle-duplicate-resume/", formData);
//     if (response.status) {
//       closeBtn.click();
//       router.push(`/employers-dashboard/all-applicants/${applicantId}`);
//     }
  };

  return (
    <>
      {isLoading && <Loader />}
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
            id="resumeSetModal"
            tabindex="-1"
            aria-labelledby="resumeSetModalLabel"
            aria-hidden="true"
          >
            <button
              type="button"
              id="setResumeModal"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#resumeSetModal"
            >
              Launch demo modal
            </button>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Resume Parsing
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    id='btnClose'
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="py-2">
                    <h6>
                      Please select an option below to parse duplicate resume.
                    </h6>
                  </div>
                  <div className="d-flex flex-wrap my-2 w-100">
                    <div className="w-50 p-2">
                      <div
                        onClick={() =>
                          handleAddResume("add_as_default_resume")
                        }
                        className="shadow hover:bg-primary hover:text-white cursor-pointer p-3"
                      >
                        <h5>Add as default resume</h5>
                        <span>
                          This action will add the new resume as a default
                          resume but won't reparse the information from the new
                          resume
                        </span>
                      </div>
                    </div>
                    <div className="w-50 p-2">
                      <div
                        onClick={() => handleAddResume("add_just_as_resume")}
                        className="p-3 shadow cursor-pointer"
                      >
                        <h5>Add just as a Resume</h5>
                        <span>
                          This action will add the new resume as "Just as a
                          resume" In the recard and won't reparse the
                          information from the new resume
                        </span>
                      </div>
                    </div>
                    <div className="w-50 p-2">
                      <div className="p-3 shadow cursor-pointer">
                        <h5
                          onClick={() => handleAddResume("overwrite_existing")}
                        >
                          Overwrite Existing
                        </h5>
                        <span>
                          This action will repase the new resume info the
                          existing profile to overwite the old information with
                          new information and will update the new information
                          and will update the new resume as a default resume
                        </span>
                      </div>
                    </div>
                    <div className="w-50 p-2">
                      <div
                        onClick={() => handleAddResume("do_nothing")}
                        className="p-3 shadow cursor-pointer"
                      >
                        <h5>Do Nothing</h5>
                        <span>
                          System doesn't do anything if it finds a duplicate
                          record
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <h5>SET AS DEFAULT RESUME</h5> */}
                </div>
              </div>
            </div>
          </div>
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
                  <h5>You are trying to parse "{resume[0]?.name}"</h5>
                </div>
                <div className="d-flex justify-content-center gap-2 py-2">
                  <button
                    onClick={handleParseResume}
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
              upload
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
                      htmlFor="upload"
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
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                      <label>Select All</label>
                    </div>
                    <div className="d-flex gap-2">
                      <div className="d-flex gap-2">
                        <label>
                          Default option when system finds duplicate resume:
                        </label>
                        <select
                          className="client-form-input"
                          style={{ width: "130px" }}
                        >
                          <option>Select</option>
                          {resumeDefaultOption.map((item, index) => {
                            return(
                              <option value={item.value} key={index} >{item.name}</option>
                            )
                          })
                          }
                        </select>
                      </div>
                      <div className="d-flex gap-2">
                        <label>Source:</label>
                        <select
                          className="client-form-input"
                          style={{ width: "130px" }}
                        >
                          <option>Select</option>
                          {sourceData.map((item, index) => {
                            return(
                              <option key={index} value={item.value}>{item.name}</option>
                            )
                          })
                          }
                        </select>
                      </div>
                      <button className="theme-btn btn-style-one small">
                        Apply All
                      </button>
                    </div>
                  </div>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table
                      className=""
                      style={{ width: "100%", border: "1px solid lightgray" }}
                    >
                      {bulkResumeFiles.map((item, index) => {
                        return (
                          <tr key={index} className="py-2">
                            <td className="px-2">
                              <input
                                type="checkbox"
                                checked={item.isSelect}
                                onChange={(e) =>
                                  handleSelectOne(index, e.target.checked)
                                }
                              />
                            </td>
                            <td style={{ width: "700px" }}>
                              <span>{item.name}</span>
                              {!(
                                item.name.split(".")[1] == "pdf" ||
                                item.name.split(".")[1] == "docx"
                              ) && (
                                <p className="text-danger">
                                  This file format is not supported
                                </p>
                              )}
                            </td>
                            <td>
                              {item.size && (
                                <span>{formatFileSize(item?.size, 2)}</span>
                              )}
                              <div
                                className="rounded-2 my-2 border border-primary"
                                style={{
                                  width: "100px",
                                  height: "15px",
                                  background: "green",
                                }}
                              ></div>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDeleteFile(index)}
                                className="theme-btn btn-style-four small"
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </div>
                <div className="modal-footer py-2">
                  <button
                    onClick={() => handleParseResume()}
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
                      <h2>Add Applicant</h2>
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
                              <p className="text-white py-2 fs-5">
                                Parse Resume
                              </p>
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
              <div className="my-2 px-5 ">
                {tab == 1 && (
                  <>
                    <div className="d-flex gap-2 mb-2 justify-content-end">
                      <Link href='/employers-dashboard/all-applicants'>
                      <button
                        // onClick={() => setTab(null)}
                        className="theme-btn btn-style-one small"
                      >
                        Save All
                      </button>
                      </Link>
                      <button
                        onClick={() => setTab(null)}
                        className="theme-btn btn-style-four small"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="gap-1 h-100 ">
                          {tabsName.map((item, index) => {
                            return (
                              <div
                                onClick={() => {
                                  if (applicantDetails?.id) {
                                    setActiveForm(item.id);
                                  }
                                }}
                                className={`d-flex gap-3 px-3 mb-2 align-items-center rounded-1  ${
                                  activeForm == item.id
                                    ? "bg-primary text-white border-primary fw-medium fs-6"
                                    : "bg-white fs-6 fw-medium"
                                }`}
                                key={index}
                                style={{
                                  width: "100%",
                                  height: "40px",
                                  border: "1px solid black",
                                  cursor: `${
                                    applicantDetails?.id
                                      ? "pointer"
                                      : "not-allowed"
                                  }`,
                                }}
                              >
                                <span className="fs-5">{item.icon}</span>
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-10">
                        {activeForm == 1 && (
                          <CandidateCreation
                            applicantData={applicantDetails}
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            tab={tab}
                            setTab={setTab}
                            name="create"
                            setActiveForm={setActiveForm}
                          />
                        )}
                        {activeForm == 2 && (
                          <Documents
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            setActiveForm={setActiveForm}
                            resume={resume[0]}
                            handleGetApplicantDetails={
                              handleGetApplicantDetails
                            }
                          />
                        )}
                        {activeForm == 3 && (
                          <EducationDetails
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            setActiveForm={setActiveForm}
                            handleGetApplicantDetails={
                              handleGetApplicantDetails
                            }
                          />
                        )}
                        {activeForm == 4 && (
                          <Certificate
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            setActiveForm={setActiveForm}
                            handleGetApplicantDetails={
                              handleGetApplicantDetails
                            }
                          />
                        )}
                        {activeForm == 5 && (
                          <Languages
                            setActiveForm={setActiveForm}
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            handleGetApplicantDetails={
                              handleGetApplicantDetails
                            }
                          />
                        )}
                        {activeForm == 6 && (
                          <Experience
                            setActiveForm={setActiveForm}
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            handleGetApplicantDetails={
                              handleGetApplicantDetails
                            }
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Dashboard --> */}

        {/* <CopyrightFooter /> */}
      </div>
    </>
  );
};

export default Index;
