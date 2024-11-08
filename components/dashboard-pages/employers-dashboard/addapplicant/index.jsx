"use client";

import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
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
import { includes } from "@/data/blogs";
import { toast } from "react-toastify";
import { previousMonday } from "date-fns";
import { BarLoader, PropagateLoader } from "react-spinners";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";

const initialState = {
  name_title: "",
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  mobile: "",
  dob: new Date(),
  state: "",
  city: "",
  address: "",
  city: "",
  country: "",
  state: "",
  zipcode: "",
  source: "",
  referred_by: "",
  status: "",
  ownership: [],
  job_title: "",
  relocation: "",
  secondary_skills: [],
  primary_skills: [],
  notice_period: "",
  skype_id: "",
  linkedin: "",
  authorization: "",
  authorization_expiry: new Date(),
  is_clearance: "",
  clearance: "",
  relocation: "",
  current_company: "",
  tax_terms: "",
  notice_period: "",
  experience: "",
  preferred_location: "",
  tex_terms: "",
  industry: "",
  expect_currency: "",
  expect_amount: "",
  expect_payment_frequency: "",
  expect_job_type: "",
  pancard: "",
  aadharcard: "",
  lwd: new Date(),
  current_currency: "",
  current_amount: "",
  current_payment_frequency: "",
  current_job_type: "",
};

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
  { name: "Overwrite Existing", value: "overwrite_existing" },
  { name: "Add as a default resume", value: "add_as_default_resume" },
  { name: "Add just as resume", value: "add_just_as_resume" },
  { name: "Do Nothing", value: "do_nothing" },
];

const Index = () => {
  const [tab, setTab] = useState(null);
  const [resume, setResume] = useState([]);
  const [bulkResumeFiles, setBulkResumeFiles] = useState([]);
  const [activeForm, setActiveForm] = useState(1);
  const [applicantDetails, setApplicantDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [applicantId, setApplicantId] = useState();
  const router = useRouter();
  const [form, setForm] = useState({
    source: "Select",
    sourceErr: "",
  });
  const [bulkApplicantDetails, setBulkApplicantDetails] = useState([]);
  const [bulkApplicantValidationData, setBulkApplicationValidationData] =
    useState([]);
  const [applicantData, setApplicantData] = useState([]);
  const [addDocuments, setAddDocuments] = useState([]);
  const [bulkApplicantData, setBulkApplicantData] = useState([]);
  const [actionName, setActionName] = useState("Select");
  const [actionNameErr, setActionNameErr] = useState("");
  const [generalActivity, setGeneralActivity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleParseLoading, setSingleParseLoading] = useState(false);

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

  const handleAddMoreUploadFile = (e) => {
    Object.values(e.target.files).forEach((item) => {
      setBulkResumeFiles((prev) => [...prev, item]);
    });
  };

  const handleDeleteFile = (index) => {
    setGeneralActivity(true);
    let updated = [...bulkResumeFiles];
    let filteredData = updated.filter((item, _index) => _index !== index);
    setBulkResumeFiles(filteredData);
  };

  const handleSelectAll = (checked) => {
    setGeneralActivity(true);
    const data = [...bulkResumeFiles];
    const updatedFileArray = data.map((file) => {
      file["isSelect"] = checked;
      return file;
    });
    setBulkResumeFiles(updatedFileArray);
  };

  const handleSelectOne = (index, value) => {
    setGeneralActivity(true);
    const data = [...bulkResumeFiles];
    data[index]["isSelect"] = value;
    setBulkResumeFiles(data);
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

  useEffect(() => {
    if (bulkResumeFiles.length > 0 && !generalActivity) {
      handleParseResume();
    }
  }, [bulkResumeFiles]);

  // this function is checked applicant duplicat data

  const handleCheckDuplicatProfile = async (data, parseResumeData) => {
    const res = await postApiReq("/duplicate-applicant-check/", data);
    const mergedProfiles = parseResumeData.map((profile, index) => {
      return {
        ...profile,
        duplicate_info: res.data[index],
      };
    });
    setGeneralActivity(true);
    const updateData = [...bulkResumeFiles];
    const updatedFileArray = updateData.map((file, index) => {
      file["duplicate_info"] = res.data[index];
      return file;
    });
    setBulkResumeFiles(updatedFileArray);
    setApplicantData(res.data);
    setBulkApplicantDetails(mergedProfiles);
    setBulkApplicationValidationData(res.data);
    if (resume.length == 1 && res.data[0].duplicate) {
      const button = document.getElementById("setResumeModal");
      setApplicantId(res.data[0].id);
      button.click();
    } else if (resume.length == 1) {
      setTab(1);
    }
    // else if(bulkResumeFiles.length){
    //       handleCreateBulkCandidate();
    // }
  };

  //parsing the resume data
  const handleParseResume = async () => {
    setIsLoading(true);
    let formData = new FormData();
    if (bulkResumeFiles.length) {
      bulkResumeFiles.forEach((item) => {
        if (
          item?.name?.split(".")[1] == "pdf" ||
          item?.name?.split(".")[1] == "docx" ||
          item?.name?.split(".")[1] == "doc"
        ) {
          formData.append("resume_files", item);
        }
      });
    } else {
      setSingleParseLoading(true);
      resume.forEach((item) => {
        formData.append("resume_files", item);
      });
    }
    const response = await postApiReq("/parse-resumes/", formData);
    setIsLoading(false);
    setSingleParseLoading(false);
    if (response.status) {
      setApplicantDetails(response.data[0].data);
      let filterData = [];
      for (let item of response.data) {
        if (!item.data.email || item.data.email == "null") {
          toast.error(
            `Applicant ${
              item.data.firstname + " " + item.data.lastname
            } email is not found `
          );
        } else {
          filterData.push({ email: item.data.email, mobile: item.data.mobile });
        }
      }
      let data = { applicants: filterData };
      if (filterData.length > 0) {
        handleCheckDuplicatProfile(data, response.data);
      } else {
        let cancelBtn = document.getElementById("cancelBtn");
        cancelBtn.click();
        router.push(`/employers-dashboard/all-applicants`);
      }
    }
    if(!response.status){
      toast.error(response.error[0].message);
    }
  };

  useEffect(() => {
    let temp = [];
    if (
      bulkApplicantDetails.length > 0 &&
      bulkApplicantValidationData.length > 0
    ) {
      bulkApplicantDetails.forEach((item) => {
        const mergedData = { ...initialState }; // Create a copy of initialState
        for (const key in initialState) {
          if (key == "primary_skills" || key == "secondary_skills") {
            mergedData[key] = item.data[key]
              ? item.data[key]?.split(",").map((item) => {
                  return { name: item };
                })
              : [];
          } else if (key == "source") {
            mergedData[key] = form.source;
          } else if (item.data.hasOwnProperty(key)) {
            mergedData[key] =
              !item.data[key] || item.data[key] == "null" ? null : item.data[key];
          }
        }
        temp.push(mergedData);
      });
    }
    if (temp.length) {
      setBulkApplicantData(temp);
    }
  }, [bulkApplicantDetails, bulkApplicantValidationData, form]);

  const handleApplyAll = () => {
    setGeneralActivity(true);
    let update = [...bulkResumeFiles];
    const updatedFileArray = update.map((file) => {
      file["value"] = form.source;
      return file;
    });
    setBulkResumeFiles(updatedFileArray);
  };

  const handleAddResume = async (key) => {
    let closeBtn = document.getElementById("btnClose");
    if (key == "do_nothing") {
      closeBtn.click();
      router.push(`/employers-dashboard/all-applicants/${applicantId}`);
      return;
    }
    let actions = [];
    const formData = new FormData();
    actions.push({
      applicant_id: applicantId,
      action: key,
      document: {
        applicant: applicantId,
        title: `Resume 1`,
        file_field: `file1`,
        type: "Resume",
        comment: "",
      },
    });
    formData.append("actions", JSON.stringify(actions));
    formData.append("file1", resume[0]);
    const response = await postApiReq("/handle-duplicate-resume/", formData);
    if (response.status) {
      let closeBtn = document.getElementById("btnClose");
      closeBtn.click();
      router.push(`/employers-dashboard/all-applicants`);
    }
  };

  let handleCreateBulkCandidate = async () => {
    if (actionName == "Select") {
      setActionNameErr("This field is required");
      return;
    } else if (form.source == "Select") {
      setForm((prev) => ({ ...prev, sourceErr: "This Field is required" }));
      return;
    }
    let update = [];
    bulkApplicantValidationData.map((item) => {
      let valid = bulkApplicantData.find(
        (_item) => _item.email == item.applicant_data.email
      );
      if (!item.duplicate && valid) {
        update.push(valid);
      } else if (
        bulkApplicantDetails.find(
          (item_) => item_.data.email == item.applicant_data.email
        )
      ) {
        let temp = bulkApplicantDetails.find(
          (item_) => item_.data.email == item.applicant_data.email
        );
        let newTemp = bulkResumeFiles.find(
          (item) => item.file == temp.file_name
        );
        setAddDocuments((prev) => [...prev, { applicant_Id: item.id, action_name:actionName }]);
      }
    });
    if (update.length > 0) {
      const response = await postApiReq("/applicants/bulk_create/", update);
      if (response.status) {
        response.data.map((_item) => {
          setAddDocuments((prev) => [...prev, { applicant_Id: _item.id, action_name:'add_as_default_resume' }]);
        });
      }
    }
  };

  useEffect(() => {
    const formData = new FormData();
    let actions = [];
    if (addDocuments.length) {
      addDocuments.map((item, index) => {
        actions.push({
          applicant_id: item.applicant_Id,
          action: item.action_name,
          document: {
            applicant: item.applicant_Id,
            title: `Resume ${index + 1}`,
            file_field: `file${index + 1}`,
            type: "Resume",
            comment: "",
          },
        });
      });
      formData.append("actions", JSON.stringify(actions));
    }

    if (actions.length) {
      bulkResumeFiles.map((item, index) => {
        formData.append(`file${index + 1}`, item);
      });
    }
    if (actions.length > 0) {
      handleAddMultiResume(formData);
    }
  }, [addDocuments]);

  const handleAddMultiResume = async (formData) => {
    setLoading(true);
    const response = await postApiReq("/handle-duplicate-resume/", formData);
    setLoading(false);
    if (response.status) {
      let cancelBtn = document.getElementById("cancelBtn");
      cancelBtn.click();
      router.push(`/employers-dashboard/all-applicants`);
    }
  };


  

  // const handleAddDefaultResume

  return (
    <>
      {loading || (singleParseLoading && <Loader />)}
      <div className="page-wrapper theme-background">
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
            data-backdrop="static"
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
                    id="btnClose"
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
                        onClick={() => handleAddResume("add_as_default_resume")}
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
            data-backdrop="static"
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
            data-backdrop="static"
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
                    <div>
                      <label htmlFor="addMoreResume">
                        <div className="theme-btn btn-style-one small fs-6">
                          <span className="fs-4 me-2">
                            {reactIcons.addcircle}
                          </span>
                          Add More
                        </div>
                      </label>
                      <input
                        type="file"
                        id="addMoreResume"
                        className="d-none"
                        onChange={(e) => {
                          setGeneralActivity(false);
                          handleAddMoreUploadFile(e);
                        }}
                        multiple
                      />
                    </div>
                    {/* <button
                      type="button"
                      className="theme-btn btn-style-two small fs-6"
                      data-bs-dismiss="modal"
                    >
                      <span className="fs-4 me-2">{reactIcons.cancel}</span>
                      Cancel
                    </button> */}
                    <button
                      type="button"
                      className="theme-btn btn-style-nine small fs-6"
                      onClick={() => {
                        let data = [...bulkResumeFiles];
                        const filteredFiles = data.filter((file) => {
                          if (!file.isSelect) {
                            return file;
                          }
                        });
                        setBulkResumeFiles(filteredFiles);
                      }}
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
                        // checked={bulkResumeFiles.length == 0 ? false : ''}
                      />
                      <label>Select All</label>
                    </div>
                    <div className="d-flex gap-2">
                      <div className="d-flex gap-2">
                        <label>
                          Default option when system finds duplicate resume:
                        </label>
                        <div>
                          <select
                            className="client-form-input"
                            style={{ width: "130px" }}
                            onChange={(e) => {
                              setActionName(e.target.value);
                              setActionNameErr("");
                            }}
                            value={actionName}
                          >
                            <option>Select</option>
                            {resumeDefaultOption.map((item, index) => {
                              return (
                                <option value={item.value} key={index}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                          <p className="text-danger">{actionNameErr}</p>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <label>Source:</label>
                        <div>
                          <select
                            className="client-form-input"
                            style={{ width: "130px" }}
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                source: e.target.value,
                                sourceErr: "",
                              }));
                            }}
                          >
                            <option>Select</option>
                            {sourceData.map((item, index) => {
                              return (
                                <option key={index} value={item.value}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                          <p className="text-danger">{form.sourceErr}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleApplyAll}
                        className="theme-btn btn-style-one small"
                        style={{ height: "36px" }}
                      >
                        Apply All
                      </button>
                    </div>
                  </div>
                  <div
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                    className="custom-scroll-sm"
                  >
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
                                checked={item.isSelect ? item.isSelect : false}
                                onChange={(e) =>
                                  handleSelectOne(index, e.target.checked)
                                }
                              />
                            </td>
                            <td style={{ width: "500px" }}>
                              <span>{item.name}</span>
                              {!(
                                item?.name?.split(".")[1] == "pdf" ||
                                item?.name?.split(".")[1] == "docx" || 
                                item?.name?.split(".")[1] == "doc"
                              ) && (
                                <p className="text-danger">
                                  This file format is not supported
                                </p>
                              )}
                              {/* { item.duplicate_info.duplicate && 
                                <p className="text-danger">
                                  This profile is already exist
                                </p>
                              } */}
                            </td>
                            <td>
                              {isLoading ? (
                                <div
                                  className="rounded-2 my-2  py-3"
                                  style={{ width: "100px" }}
                                >
                                  <BarLoader
                                    size={10}
                                    color="#6be739"
                                    loading={isLoading}
                                  />
                                </div>
                              ) : (
                                <div className="my-2">
                                  {item.size && (
                                    <span className="fw-medium text-black fs-6">
                                      {formatFileSize(item?.size, 2)}
                                    </span>
                                  )}
                                  <p>Size</p>
                                  {/* <div
                                className="rounded-2 my-2 border border-primary"
                                style={{
                                  width: "100px",
                                  height: "15px",
                                  background: "#35aff0",
                                }}
                              ></div> */}
                                </div>
                              )}
                            </td>
                            <td>
                              <select
                                value={item.value}
                                className="client-form-input"
                              >
                                <option>Select</option>
                                {sourceData.map((item, index) => {
                                  return (
                                    <option key={index} value={item.name}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td className="text-end px-2">
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
                {!isLoading && (
                  <div className="modal-footer py-2">
                    <button
                      onClick={() => handleCreateBulkCandidate()}
                      type="button"
                      className="theme-btn btn-style-one small"
                      // data-bs-dismiss="modal"
                    >
                      {loading ? <BtnBeatLoader /> : "Start Parsing"}
                    </button>
                    <button
                      type="button"
                      className="theme-btn btn-style-four small"
                      data-bs-dismiss="modal"
                      id="cancelBtn"
                    >
                      Cancel
                    </button>
                  </div>
                )}
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
                              onClick={() => setResume([])}
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
                              onClick={() => {
                                setGeneralActivity(false);
                                setBulkResumeFiles([]);
                              }}
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
                      {/* <Link href="/employers-dashboard/all-applicants">
                        <button
                          // onClick={() => setTab(null)}
                          className="theme-btn btn-style-one small"
                        >
                          Save All
                        </button>
                      </Link> */}
                      <button
                        onClick={() =>{ 
                          setTab(null) 
                          setActiveForm(1)
                        }}
                        className="theme-btn btn-style-four small"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="row">
                      <div className="col-2 bg-white">
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
                            resume={resume[0]}
                          />
                        )}
                        {activeForm == 2 && (
                          <Documents
                            applicantDetails={applicantDetails}
                            setApplicantDetails={setApplicantDetails}
                            setActiveForm={setActiveForm}
                            resume={resume[0]}
                            setResume={setResume}
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
