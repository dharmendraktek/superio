"use client";
import { currencyJson } from "@/utils/currency";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import moment from "moment";
import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";
import UploadSingleDocument from "./UploadSingleDocument";
import BtnBeatLoader from "./BtnBeatLoader";
import { documentTypes } from "../dashboard-pages/employers-dashboard/addapplicant/components/constant";
import {
  LinkendInConnection,
  LinkendInCreaction,
  VendorCopanyLinkedInFollower,
  VendorCopanyStrength,
} from "@/utils/constant";
import ApplicantRatingModal from "./ApplicantRatingModal";
import {
  relocationReasonList,
  TaxTerms,
  taxTermSubType,
} from "../dashboard-pages/employers-dashboard/addjob/components/constant";
import DocumentListModal from "./DocumentListModal";
import Loader from "./Loader";

const { default: Paper } = require("@/components/common/Paper");

const initialState = {
  name: "",
  company: "",
  designation: "",
  contact: "",
  email: "",
  reference_type: "",
  years_acquainted: "",
};

const manualRatingInitialState = {
  applicant_id: "",
    app_profile_picture: "",
    app_connections: "",
    app_linkedin_match_with_resume: "true",
    app_creation_date: "",
    vendor_followers: "",
    vendor_employees_strength: "",
    vendor_glassdoor: "",
    app_skill_matrix: "",
    app_active_offer: "",
    app_technical_questionaire: "",
    reference_check: "",
    taxterm: "",
    subtype_taxterms:"",
    relocation:"",
    relocation_reason:"",
    relocation_otherreason:'',
    rtr_employer_name: false,
    passport_number: "pass12345",
    comment: "",
    visa_employer_name: false
}

const ApplicantSubmissionDetails = ({
  multiSubmissionForm,
  setMultiSubmissionForm,
  index,
  applicantData,
  clearAll,
}) => {
  const [refrenceDetails, setRefrenceDetails] = useState({
    name: "",
    company: "",
    designation: "",
    contact: "",
    email: "",
    reference_type: "",
    years_acquainted: "",
  });
  const [referenceDetailsErr, setRefrenceDetailsErr] = useState({
    nameErr: "",
    companyErr: "",
    refTypeErr: "",
    yearAcqErr: "",
  });
  const [usersList, setUsersList] = useState([]);
  const [search, setSearch] = useState("");
  const [openRef, setOpenRef] = useState(false);
  const [openEmpDetl, setOpenEmpDetl] = useState(false);
  const [opensubDetl, setOpenSubDetl] = useState(true);
  const [submissionDetailsErr, setSubmissionDetailsERr] = useState({
    availabilityErr: "",
    payRateErr: "",
    resumeErr: "",
  });
  const [openSkill, setOpenSkill] = useState(true);
  const [form, setForm] = useState({
    recipientList: [],
    notifiersList: [],
    recipientIds: [],
    notifiersIds: [],
    interviewIds: [],
    otherEmailIds: [],
  });
  const [skillsField, setSkillField] = useState([
    // {name:'', years_of_experience:'', nameErr:'', experienceErr:''}
  ]);

  const [openRecp, setOpenRecp] = useState(false);
  const [openNotifer, setOpenNotifer] = useState(false);
  const [updateRef, setUpdateRef] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isDefault, setIsDefault] = useState(true);
  const [newResumeDoc, setNewResumeDoc] = useState([]);
  const [openForm, setOpenForm] = useState(0);
  const [addDoc, setAddDoc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [applicantCheck, setApplicantCheck] = useState(manualRatingInitialState);

  const [applicantCheckErr, setApplicantCheckErr] = useState();
  const [docDetail, setDocDetail] = useState({
    title: "",
    type: "Select",
    comment: "",
    applicant: "",
    is_default: "true",
  });
  const [loadingAiCheck, setLoadingAiCheck] = useState(false);
  const [aiCheckResult, setAiCheckResult] = useState({});
  const [openManualRating, setOpenManualRating] = useState(true);
  const [availableDoc, setAvailabeleDoc] = useState([]);

  useEffect(() => {
    getApplicantDocuments();
  }, []);

  // this function handle the skills

  const handleSkillChange = (index, name, value) => {
    const updatedSkills = [...skillsField];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };
    if (name == "name")
      updatedSkills[index] = { ...updatedSkills[index], ["nameErr"]: "" };
    else
      updatedSkills[index] = { ...updatedSkills[index], ["experienceErr"]: "" };
    setSkillField(updatedSkills);
  };

  const handleAddMoreSkills = () => {
    if (skillsField.length == 0) {
      setSkillField([
        ...skillsField,
        { name: "", years_of_experience: "", nameErr: "", experienceErr: "" },
      ]);
      return;
    }
    const updatedSkills = [...skillsField];
    const lastSkill = updatedSkills[updatedSkills.length - 1];

    // Reset error messages
    lastSkill.nameErr = "";
    lastSkill.experienceErr = "";

    // Validate the last skill before adding a new one
    if (lastSkill.name.trim() === "") {
      lastSkill.nameErr = "Skill name is required.";
    }

    if (lastSkill.years_of_experience.trim() === "") {
      lastSkill.experienceErr = "Experience is required.";
    }

    // If there are any errors, update the state and return
    if (lastSkill.nameErr || lastSkill.experienceErr) {
      setSkillField(updatedSkills);
      return;
    }

    // If both fields are filled, add a new skill object
    setSkillField([
      ...skillsField,
      { name: "", years_of_experience: "", nameErr: "", experienceErr: "" },
    ]);
  };

  const handleRemove = (index) => {
    const updatedSkills = skillsField.filter(
      (_, skillIndex) => skillIndex !== index
    );
    setSkillField(updatedSkills);
  };

  const handleSaveSkills = (formIndex) => {
    const updatedSkills = [...skillsField];
    const lastSkill = updatedSkills[updatedSkills.length - 1];

    // Reset error messages
    lastSkill.nameErr = "";
    lastSkill.experienceErr = "";

    // Validate the last skill before adding a new one
    if (lastSkill.name.trim() === "") {
      lastSkill.nameErr = "Skill name is required.";
    }

    if (lastSkill.years_of_experience.trim() === "") {
      lastSkill.experienceErr = "Experience is required.";
    }

    // If there are any errors, update the state and return
    if (lastSkill.nameErr || lastSkill.experienceErr) {
      setSkillField(updatedSkills);
      return;
    }
    // Check for errors in skillsField
    const hasErrors = skillsField.some(
      (skill) => skill.nameErr || skill.experienceErr
    );

    if (hasErrors) {
      toast.error("Please resolve all errors before saving.");
      return; // Prevent saving if there are errors
    }

    // Create a new skills array without the error keys
    const cleanedSkillsField = skillsField.map(
      ({ nameErr, experienceErr, ...rest }) => rest
    );

    // Update the multiSubmissionForm state
    setMultiSubmissionForm((prev) =>
      prev.map((form, index) =>
        index === formIndex
          ? {
              ...form,
              skills: cleanedSkillsField, // Spread cleanedSkillsField to add individual skill objects
            }
          : form
      )
    );
    setOpenSkill(true);
  };

  const handleRatingChange = (formIndex, field, value) => {
    setMultiSubmissionForm((prev) =>
      prev.map((form, index) =>
        index === formIndex
          ? {
              ...form,
              applicant_rating: {
                ...form.applicant_rating,
                [field]: value,
              },
            }
          : form
      )
    );
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setRefrenceDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReference = (formIndex, type) => {
    if (!refrenceDetails.name) {
      setRefrenceDetailsErr((prev) => ({
        ...prev,
        nameErr: "This Field is required",
      }));
    }
    if (!refrenceDetails.company) {
      setRefrenceDetailsErr((prev) => ({
        ...prev,
        companyErr: "This Field is required",
      }));
    }
    if (!refrenceDetails.reference_type) {
      setRefrenceDetailsErr((prev) => ({
        ...prev,
        refTypeErr: "This Field is required",
      }));
    }
    if (!refrenceDetails.years_acquainted) {
      setRefrenceDetailsErr((prev) => ({
        ...prev,
        yearAcqErr: "This Field is required",
      }));
    }

    let { name, company, reference_type, years_acquainted } = refrenceDetails;
    if (
      name &&
      company &&
      reference_type &&
      years_acquainted &&
      type == "save"
    ) {
      setMultiSubmissionForm((prev) =>
        prev.map((form, index) =>
          index === formIndex
            ? {
                ...form,
                references: [...form.references, refrenceDetails],
              }
            : form
        )
      );
      setOpenRef(false);
      setRefrenceDetails(initialState);
    } else if (
      name &&
      company &&
      reference_type &&
      years_acquainted &&
      type == "update"
    ) {
      setMultiSubmissionForm((prev) =>
        prev.map((form, index) =>
          index === formIndex
            ? {
                ...form,
                references: form.references.map((ref, refIndex) =>
                  refIndex === updateRef ? refrenceDetails : ref
                ),
              }
            : form
        )
      );
      setOpenRef(false);
      setRefrenceDetails(initialState);
      setUpdateRef(null);
    }
  };

  const handleEditReference = (formIndex, refIndex) => {
    setOpenRef(true);
    let update = [...multiSubmissionForm];
    setRefrenceDetails(update[formIndex].references[refIndex]);
    setUpdateRef(refIndex);
  };

  const handleRemoveReference = (formIndex, refIndex) => {
    setMultiSubmissionForm((prev) =>
      prev.map((form, index) =>
        index === formIndex
          ? {
              ...form,
              references: form.references.filter(
                (item, rIndex) => rIndex != refIndex
              ),
            }
          : form
      )
    );
  };

  const handleSubmissionChange = (e, formIndex) => {
    const { name, value } = e.target;
    setMultiSubmissionForm((prev) =>
      prev.map((form, index) =>
        index === formIndex ? { ...form, [name]: value } : form
      )
    );
  };

  useEffect(() => {
    if (usersList.length == 0) handleGetUsersList();
  }, [openRecp]);

  const handleGetUsersList = async () => {
    const response = await getReq(
      `/users/${search ? `?search=${search}` : ""}`
    );
    if (response.status) {
      setUsersList(response.data);
    }
  };

  const handleSaveSubDetails = (formIndex) => {
    if (!multiSubmissionForm[formIndex].availability) {
      setSubmissionDetailsERr((prev) => ({
        ...prev,
        availabilityErr: "This field is required",
      }));
    }
    if (
      !multiSubmissionForm[formIndex].pay_rate_currency ||
      !multiSubmissionForm[formIndex].pay_rate_amount ||
      !multiSubmissionForm[formIndex].pay_rate_type ||
      !multiSubmissionForm[formIndex].pay_rate_contract_type
    ) {
      setSubmissionDetailsERr((prev) => ({
        ...prev,
        payRateErr: "All field is required",
      }));
    }
    if (!multiSubmissionForm[formIndex].resume) {
      setSubmissionDetailsERr((prev) => ({
        ...prev,
        resumeErr: "This field is required",
      }));
    } else {
      setOpenSubDetl(false);
    }

    setMultiSubmissionForm((prev) =>
      prev.map((_item, index) =>
        index === formIndex
          ? { ..._item, ["recipients"]: form.recipientIds }
          : _item
      )
    );
    setMultiSubmissionForm((prev) =>
      prev.map((_item, index) =>
        index === formIndex
          ? { ..._item, ["additional_notifiers"]: form.notifiersIds }
          : _item
      )
    );
    setMultiSubmissionForm((prev) =>
      prev.map((_item, index) =>
        index === formIndex
          ? { ..._item, ["interviewer"]: form.interviewIds }
          : _item
      )
    );
    setMultiSubmissionForm((prev) =>
      prev.map((_item, index) =>
        index === formIndex
          ? { ..._item, ["other_email"]: form.otherEmailIds }
          : _item
      )
    );
  };

  const handleClear = () => {
    setSkillField([]);
    setMultiSubmissionForm([]);
  };

  useEffect(() => {
    if (clearAll) {
      handleClear();
    }
  }, [clearAll]);

  const handleFileUpload = (e) => {
    let file = e.target.files;
    Object.values(file).forEach((item) => {
      setDocuments((prev) => [...prev, item]);
      setDocDetail((prev) => ({ ...prev, title: item.name }));
    });
  };

  const handleRemoveDoc = (dIndex) => {
    let updated = [...documents];
    let filteredData = updated.filter((item, _index) => _index !== dIndex);
    setDocuments(filteredData);
  };

  const getApplicantDocuments = async () => {
    const response = await getReq(
      `/applicant-documents/?applicant_id=${applicantData?.id}`
    );
    if (response.status) {
      setAvailabeleDoc(response.data);
    }
  };

  let applicantDetails =
    applicantData?.length > 0 ? applicantData[index] : applicantData;
  const handleUploadDoc = async (formIndex) => {
    setIsLoading(true);
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append("files", file);
    });
    formData.append("title", docDetail.title ? docDetail.title : "document");
    formData.append(
      "type",
      docDetail.type ? docDetail.type : "Additional document"
    );
    formData.append(
      "comment",
      docDetail.comment ? docDetail.comment : "submission"
    );
    formData.append("applicant", applicantDetails.id);

    if (documents.length > 0) {
      const response = await postApiReq(`/applicant-documents/`, formData);
      setIsLoading(false);
      if (response.status) {
        getApplicantDocuments();
        setDocuments([]);
        setDocDetail((prev) => ({ ...prev, title: "", type: "", comment: "" }));
        setAddDoc(false);
        toast.success("Document has been uploaded successfully!");
      }
    }
  };
  let applicantDocument =
    applicantData?.length > 0
      ? applicantData[index]?.documents
      : applicantData?.documents;

  const handleUploadNewResume = (e) => {
    let file = e.target.files;
    Object.values(file).forEach((item) => {
      setNewResumeDoc((prev) => [...prev, item]);
    });
  };

  const handleSaveNewResume = async () => {
    const formData = new FormData();
    if (newResumeDoc.length > 0) {
      newResumeDoc.forEach((file, index) => {
        formData.append("files", file);
      });
      formData.append("title", "document");
      formData.append("type", "Additional document");
      formData.append("comment", "submission");
      formData.append("applicant", applicantDetails.id);
      if (isDefault) {
        formData.append("is_default", isDefault);
      }
      const response = await postApiReq(`/applicant-documents/`, formData);
      if (response.status) {
      }
    }
  };

  const handleApplicantChangeCheck = (e) => {
    const { name, value } = e.target;
    setApplicantCheck((prev) => ({ ...prev, [name]: value }));
  };

  const validateApplicantCheck = () => {
    // Create a new error object
    const newErrors = {};

    // Iterate through each key in applicantCheck
    for (const key in applicantCheck) {
      // If the value is empty, set an error message for that key
      if (!applicantCheck[key]) {
        newErrors[key] = "This field is required";
      } else {
        // Otherwise, clear any previous error message for that key
        newErrors[key] = "";
      }
    }
    // Update the applicantCheckErr state with the new errors
    setApplicantCheckErr(newErrors);
  };

  const handleSubmitManualRating = async () => {
    validateApplicantCheck();
    if (
      applicantCheck.app_active_offer &&
      applicantCheck.app_connections &&
      applicantCheck.app_creation_date &&
      applicantCheck.app_linkedin_match_with_resume &&
      applicantCheck?.app_profile_picture &&
      applicantCheck.app_skill_matrix &&
      applicantCheck.reference_check &&
      applicantCheck.vendor_employees_strength &&
      applicantCheck.vendor_glassdoor &&
      applicantCheck.app_technical_questionaire &&
      applicantCheck.vendor_followers
    ) {
      const response = await postApiReq(
        "/linkedin-manual-check/",
        applicantCheck
      );
      if (response.status) {
        setOpenManualRating(false);
        toast.success("Next Proccess to click AI Checking Button");
      }
    }
  };

  useEffect(() => {
    if (applicantDetails) {
      setApplicantCheck((prev) => ({
        ...prev,
        applicant_id: applicantDetails.id,
      }));
    }
  }, [applicantDetails]);

  const handleAIChecking = async () => {
    let data = {
      applicant_id: applicantData?.id,
      job_id: multiSubmissionForm[index].job,
    };
    setLoadingAiCheck(true);
    const response = await postApiReq("/candidate-ai-check/", data);
    setLoadingAiCheck(false);
    if (response.status) {
      setAiCheckResult(response.data.ratings);
      let btnRating = document.getElementById("ratingBtn");
      btnRating.click();
    }
  };

  const handleDeleteDoc = async (id) => {
    const response = await deleteReq(`/applicant-documents/${id}/`);
    if (response.status) {
      toast.success("Document deleted successfully");
      handleGetApplicantDetails();
    } else if (response.error) {
      toast.error(response.error.error);
      getApplicantDocuments();
    }
  };

  console.log("----------applicant check ------", applicantCheck);


  return (
    <Paper>
      {loadingAiCheck && <Loader text="AI checking process" />}
      <div
        className="d-flex justify-content-between px-2 py-1 text-white rounded-1 mb-3"
        style={{ backgroundColor: "var(--primary-2nd-color)" }}
      >
        <h4 className="fw-medium fs-4">
          {(applicantDetails?.firstname || "") +
            " " +
            (applicantDetails?.middlename || "") +
            " " +
            (applicantDetails?.lastname || "")}
        </h4>
        <span
          onClick={() => {
            if (openForm == index) {
              setOpenForm(null);
            } else {
              setOpenForm(index);
            }
          }}
          className="fs-3 cursor-pointer"
        >
          {openForm == index
            ? reactIcons.arrowfillup
            : reactIcons.arrowfilldown}
        </span>
      </div>
      {openForm == index && (
        <div>
          <div className="my-3 px-2">
            <div
              className="d-flex justify-content-between py-1 px-2 rounded-1"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Skills</h5>
              <button
                onClick={() => {
                  setOpenSkill(false);
                  if (skillsField.length == 0) {
                    handleAddMoreSkills(index);
                  }
                }}
                type="button"
                className="theme-btn btn-style-one small"
              >
                {multiSubmissionForm[index]?.skills?.length == 0
                  ? "Add"
                  : "Edit"}
              </button>
            </div>
            <div className="my-2">
              {openSkill ? (
                <div
                  className="d-flex gap-2 px-2 align-items-center my-1"
                  style={{ width: "100%" }}
                >
                  <table className="w-100 border">
                    <thead className="bg-secondary py-2">
                      <th className="px-2">Skills</th>
                      <th className="px-2">Experience</th>
                    </thead>
                    <tbody>
                      {multiSubmissionForm[index]?.skills?.map(
                        (item, skillIndex) => {
                          return (
                            <tr>
                              <td className="px-2">{item.name}</td>
                              <td className="px-2">
                                {item.years_of_experience}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-50">
                  {skillsField?.map((item, skillIndex) => {
                    return (
                      <div className="d-flex gap-2 align-items-center my-1 w-100">
                        <div className="w-50">
                          <p>Skills</p>
                          <input
                            type="text"
                            name="name"
                            onChange={(e) => {
                              let { name, value } = e.target;
                              handleSkillChange(skillIndex, name, value);
                            }}
                            value={item.name}
                            className="client-form-input"
                            placeholder="skills"
                          />
                          <div>
                            <span className="text-danger">{item.nameErr}</span>
                          </div>
                        </div>
                        <div className="w-50">
                          <p>Experience</p>
                          <input
                            type="number"
                            name="years_of_experience"
                            onChange={(e) => {
                              let { name, value } = e.target;
                              handleSkillChange(skillIndex, name, value);
                            }}
                            value={item.years_of_experience}
                            className="client-form-input"
                            placeholder="no of years"
                          />
                          <div>
                            <span className="text-danger">
                              {item.experienceErr}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span
                            onClick={() => handleRemove(skillIndex)}
                            className="text-danger cursor-pointer fs-5"
                          >
                            {reactIcons.delete}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="d-flex gap-2 my-3">
                    <button
                      onClick={() => handleAddMoreSkills()}
                      className="theme-btn btn-style-two small"
                    >
                      Add more
                    </button>
                    <button
                      onClick={() => {
                        if (skillsField.length > 0) {
                          handleSaveSkills(index);
                        }
                      }}
                      className="theme-btn btn-style-one small"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setOpenSkill(true)}
                      className="theme-btn btn-style-three small"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-2 px-2 ">
            <div
              className="d-flex justify-content-between px-2 py-1"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Applicant Rating</h5>
              {/* <button type="button" className="theme-btn btn-style-one small">
            Add
          </button> */}
            </div>
            <div className="my-3 px-2">
              <div className="d-flex align-items-center gap-2">
                <div className="w-25">
                  <p>Technical Skills</p>
                </div>
                <StarRating
                  initialRating={
                    multiSubmissionForm[index]?.applicant_rating?.technical
                  }
                  onRatingChange={(newRating) =>
                    handleRatingChange(index, "technical", newRating)
                  }
                />
              </div>
              <div className="d-flex gap-2">
                <div className="w-25">
                  <p>Communication Skills</p>
                </div>
                <StarRating
                  initialRating={
                    multiSubmissionForm[index]?.applicant_rating?.communication
                  }
                  onRatingChange={(newRating) =>
                    handleRatingChange(index, "communication", newRating)
                  }
                />
              </div>
              <div className="d-flex gap-2">
                <div className="w-25">
                  <p>Profesionalism</p>
                </div>
                <StarRating
                  initialRating={
                    multiSubmissionForm[index]?.applicant_rating?.profesionalism
                  }
                  onRatingChange={(newRating) =>
                    handleRatingChange(index, "profesionalism", newRating)
                  }
                />
              </div>
              <div className="d-flex gap-2">
                <div className="w-25">
                  <p>Overall Rating</p>
                </div>
                <StarRating
                  initialRating={
                    multiSubmissionForm[index]?.applicant_rating?.overall
                  }
                  onRatingChange={(newRating) =>
                    handleRatingChange(index, "overall", newRating)
                  }
                />
              </div>
            </div>
          </div>
          <div className="my-2 px-2 ">
            <div
              className="d-flex  justify-content-between px-2 py-1"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Reference Details</h5>
              <button
                onClick={() => setOpenRef(true)}
                type="button"
                className="theme-btn btn-style-one small"
              >
                Add
              </button>
            </div>
            <div>
              {openRef ? (
                <div className="px-2">
                  <div className="row my-2">
                    <div className="col-4 my-1">
                      <p>
                        Reference Name{" "}
                        <strong className="text-danger">*</strong>
                      </p>
                      <input
                        name="name"
                        onChange={(e) => {
                          handleChange(e);
                          setRefrenceDetailsErr((prev) => ({
                            ...prev,
                            nameErr: "",
                          }));
                        }}
                        value={refrenceDetails.name}
                        type="text"
                        className="client-form-input"
                      />
                      <span className="text-danger fs-6 mt-1">
                        {referenceDetailsErr.nameErr}
                      </span>
                    </div>
                    <div className="col-4 my-1">
                      <p>
                        Company Name <strong className="text-danger">*</strong>
                      </p>
                      <input
                        name="company"
                        onChange={(e) => {
                          handleChange(e);
                          setRefrenceDetailsErr((prev) => ({
                            ...prev,
                            companyErr: "",
                          }));
                        }}
                        value={refrenceDetails.company}
                        type="text"
                        className="client-form-input"
                      />
                      <span className="text-danger fs-6 mt-1">
                        {referenceDetailsErr.companyErr}
                      </span>
                    </div>
                    <div className="col-4 my-1">
                      <p>Designation</p>
                      <input
                        name="designation"
                        onChange={handleChange}
                        value={refrenceDetails.designation}
                        type="text"
                        className="client-form-input"
                      />
                    </div>
                    <div className="col-4 my-1">
                      <p>Contact Number</p>
                      <input
                        name="contact"
                        onChange={handleChange}
                        value={refrenceDetails.contact}
                        type="text"
                        className="client-form-input"
                      />
                    </div>
                    <div className="col-4 my-1">
                      <p>Email</p>
                      <input
                        name="email"
                        onChange={handleChange}
                        value={refrenceDetails.email}
                        type="text"
                        className="client-form-input"
                      />
                    </div>
                    <div className="col-4 my-1">
                      <p>
                        Reference Type{" "}
                        <strong className="text-danger">*</strong>
                      </p>
                      <select
                        name="reference_type"
                        onChange={(e) => {
                          handleChange(e);
                          setRefrenceDetailsErr((prev) => ({
                            ...prev,
                            refTypeErr: "",
                          }));
                        }}
                        value={refrenceDetails.reference_type}
                        type="text"
                        className="client-form-input"
                      >
                        <option>Select</option>
                        <option>Personal</option>
                        <option>Professional</option>
                        <option>Other</option>
                      </select>
                      <span className="text-danger fs-6 mt-1">
                        {referenceDetailsErr.refTypeErr}
                      </span>
                    </div>
                    <div className="col-4 my-1">
                      <p>
                        Year Acquainted{" "}
                        <strong className="text-danger">*</strong>
                      </p>
                      <input
                        name="years_acquainted"
                        onChange={(e) => {
                          handleChange(e);
                          setRefrenceDetailsErr((prev) => ({
                            ...prev,
                            yearAcqErr: "",
                          }));
                        }}
                        value={refrenceDetails.years_acquainted}
                        type="text"
                        className="client-form-input"
                      />
                      <span className="text-danger fs-6 mt-1">
                        {referenceDetailsErr.yearAcqErr}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-2 my-2">
                    <button
                      onClick={() => {
                        if (updateRef == null) {
                          handleAddReference(index, "save");
                        } else {
                          handleAddReference(index, "update");
                        }
                      }}
                      className="theme-btn btn-style-one small"
                    >
                      {updateRef ? "Update" : "Save"}
                    </button>
                    <button
                      onClick={() => setOpenRef(false)}
                      className="theme-btn btn-style-three small"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-3 px-2 ">
                  <table className="w-100 border">
                    <thead className="bg-secondary py-2">
                      <th className="px-2">SELECT</th>
                      <th>REFRENCE NAME</th>
                      <th>COMPANY NAME</th>
                      <th>EMAIL</th>
                      <th>REFRENCE TYPE</th>
                      <th>CONTACT NUMBER</th>
                      <th>ACTION</th>
                    </thead>
                    <tbody>
                      {multiSubmissionForm[index]?.references.map(
                        (item, refIndex) => {
                          return (
                            <tr key={refIndex}>
                              <td className="px-2">
                                <input type="checkbox" />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.company}</td>
                              <td>{item.email}</td>
                              <td>{item.reference_type}</td>
                              <td>{item.contact}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <span
                                    className="cursor-pointer text-primary"
                                    onClick={() =>
                                      handleEditReference(index, refIndex)
                                    }
                                  >
                                    {reactIcons.edit}
                                  </span>
                                  <span
                                    className="text-danger cursor-pointer"
                                    onClick={() =>
                                      handleRemoveReference(index, refIndex)
                                    }
                                  >
                                    {reactIcons.delete}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div className="my-2 px-2 ">
            <div
              className="d-flex px-2 py-1 justify-content-between"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Employer Details</h5>
              <button
                onClick={() => setOpenEmpDetl(true)}
                type="button"
                className="theme-btn btn-style-one small"
              >
                Add
              </button>
            </div>
            {openEmpDetl && (
              <div>
                <div>
                  <div className="d-flex gap-4 mt-3">
                    <div className="d-flex gap-2">
                      <input
                        name="form"
                        onChange={handleChange}
                        value={true}
                        type="radio"
                        checked={
                          multiSubmissionForm[index].relocation == "true"
                            ? true
                            : false
                        }
                        // className="client-form-input"
                      />
                      <label>Add New</label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        name="form"
                        onChange={handleChange}
                        value={false}
                        type="radio"
                        checked={
                          multiSubmissionForm[index].relocation == "false"
                            ? true
                            : false
                        }
                        // className="client-form-input"
                      />
                      <label>Add from existing vendor contact records</label>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-4 my-1">
                    <p>Choose Vendor Contact</p>
                    <select className="client-form-input">
                      <option></option>
                    </select>
                  </div>
                  <div className="col-4 my-1">
                    <p>First Name</p>
                    <input className="client-form-input" />
                  </div>
                  <div className="col-4 my-1">
                    <p>Last Name</p>
                    <input className="client-form-input" />
                  </div>
                  <div className="col-4 my-1">
                    <p>Employer Name</p>
                    <input className="client-form-input" />
                  </div>
                  <div className="col-4 my-1">
                    <p>Office Number</p>
                    <input className="client-form-input" />
                  </div>
                  <div className="col-4 my-1">
                    <p>Mobile Number</p>
                    <input className="client-form-input" />
                  </div>
                  <div className="col-4 my-1">
                    <p>Email ID</p>
                    <input className="client-form-input" />
                  </div>
                </div>
                <div className="d-flex gap-2 my-2">
                  <button
                    // onClick={() => handleAddReference(index)}
                    className="theme-btn btn-style-one small"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setOpenEmpDetl(false)}
                    className="theme-btn btn-style-three small"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="my-2 px-2 ">
            <div
              className="d-flex justify-content-between px-2 py-1"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Available Documents</h5>
              <button
                onClick={() => setAddDoc(true)}
                type="button"
                className="theme-btn btn-style-one small"
              >
                Add
              </button>
            </div>
            {addDoc ? (
              <div>
                <div className="row mt-4    ">
                  <div className="col-4">
                    <p className="mb-2">Upload Document</p>
                    <UploadSingleDocument handleFileUpload={handleFileUpload} />
                    {documents.length > 0 &&
                      documents.map((file) => {
                        return <p className="text-danger">{file?.name}</p>;
                      })}
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-fill gap-5 ">
                      <div className="w-50">
                        <p className="py-2">Document Type</p>
                        <select
                          onChange={(e) =>
                            setDocDetail((prev) => ({
                              ...prev,
                              type: e.target.value,
                            }))
                          }
                          className="client-form-input"
                          value={docDetail.type}
                        >
                          <option value="Select">Select</option>
                          {documentTypes.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="w-50">
                        <p className="py-2">Document Title</p>
                        <input
                          onChange={(e) =>
                            setDocDetail((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          type="text"
                          value={docDetail?.title}
                          className="client-form-input"
                        />
                      </div>
                    </div>
                    {docDetail.type == "Resume" && (
                      <div className="my-2">
                        <p>Resume Visibility</p>
                        <div className="d-flex gap-3">
                          <div className="d-flex gap-1 ">
                            <input
                              type="radio"
                              name="is_default"
                              value="true"
                              checked={docDetail.is_default == "true"}
                              onChange={(e) => {
                                docDetail((prev) => ({
                                  ...prev,
                                  is_default: e.target.value,
                                }));
                              }}
                            />
                            <p>Add and Make Default</p>
                          </div>
                          <div className="d-flex gap-1">
                            <input
                              type="radio"
                              name="is_default"
                              checked={form.is_default == "false"}
                              value="false"
                              onChange={(e) =>
                                setDocDetail((prev) => ({
                                  ...prev,
                                  is_default: "false",
                                }))
                              }
                            />
                            <p>Add Only</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="my-2">
                      <p className="py-2">Description</p>
                      <textarea
                        onChange={(e) =>
                          setDocDetail((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                        className="border w-100 p-2"
                      />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="theme-btn btn-style-one small"
                        onClick={handleUploadDoc}
                        disabled={isLoading}
                      >
                        {isLoading ? <BtnBeatLoader /> : "Save"}
                      </button>
                      <button
                        onClick={() => setAddDoc(false)}
                        className="theme-btn btn-style-four small"
                        id="btnCancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-3">
                <table className="w-100 border">
                  <thead className="bg-secondary py-2">
                    <th className="px-2">Title</th>
                    <th>Type</th>
                    <th>Uploaded By</th>
                    <th>Uploaded On</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {availableDoc?.map((item, index) => {
                      let updated_by = { item };
                      let { first_name, last_name } = updated_by;
                      return (
                        <tr>
                          <td className="px-2">{item.document_name}</td>
                          <td>{item.type}</td>
                          <td>
                            {first_name} {last_name}
                          </td>
                          <td>
                            {moment(item.uploaded_at).format(
                              "DD-MM-YYYY hh:mm A"
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <span className="text-primary cursor-pointer">
                                {reactIcons.download}
                              </span>
                              <span
                                onClick={() => handleDeleteDoc(item.id)}
                                className="text-danger cursor-pointer"
                              >
                                {reactIcons.delete}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="my-2 px-2 ">
            <div
              className="d-flex justify-content-between px-2 py-1"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Manual Rating</h5>
              {!openManualRating && (
                <button
                  type="button"
                  className="theme-btn btn-style-one small"
                  onClick={() => handleAIChecking(applicantData.id)}
                  disabled={openManualRating}
                >
                  {loadingAiCheck ? <BtnBeatLoader /> : "AI Checking"}
                </button>
              )}
              {/* <button
                onClick={() => setAddDoc(true)}
                type="button"
                className="theme-btn btn-style-one small"
              >
                Add
              </button> */}
            </div>
            {openManualRating && (
              <div className="my-2">
                <div className="row">
                  <div className="col-4 my-2">
                    <p>
                      Tax Terms <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="taxterm"
                      onChange={handleApplicantChangeCheck}
                      value={applicantCheck.taxterm}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      {TaxTerms.slice(0, 2).map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {applicantCheckErr?.taxterm}
                    </span>
                  </div>
                  {!(applicantCheck.taxterm == "Select") && applicantCheck.taxterm 
                       && (
                    <div className="col-4 my-1">
                      <p>
                        Corporation Type <strong className="text-danger">*</strong>
                      </p>
                      <div className="d-flex gap-2 mt-3">
                        <div className="d-flex gap-2">
                          <input
                            name="subtype_taxterms"
                            onChange={handleApplicantChangeCheck}
                            value={taxTermSubType.find(
                              (item) => item.name == applicantCheck.taxterm
                            )?.type?.source1}
                            type="radio"
                            checked={
                              applicantCheck.subtype_taxterms == taxTermSubType.find(
                                (item) => item.name == applicantCheck.taxterm
                              )?.type?.source1  
                            }
                            // className="client-form-input"
                          />
                          <label>
                            {
                              taxTermSubType.find(
                                (item) => item.name == applicantCheck.taxterm
                              )?.type?.source1
                            }
                          </label>
                        </div>
                        <div className="d-flex gap-2">
                          <input
                            name="subtype_taxterms"
                            onChange={handleApplicantChangeCheck}
                            value={taxTermSubType.find(
                              (item) => item.name == applicantCheck.taxterm
                            )?.type?.source2}
                            type="radio"
                            checked={
                              applicantCheck.subtype_taxterms == taxTermSubType.find(
                                (item) => item.name == applicantCheck.taxterm
                              )?.type?.source2
                            }
                            // className="client-form-input"
                          />
                          <label>
                            {
                              taxTermSubType.find(
                                (item) => item.name == applicantCheck.taxterm
                              )?.type?.source2
                            }
                          </label>
                        </div>
                      </div>
                      <span className="text-danger">
                        {applicantCheckErr?.subtype_taxterms}
                      </span>
                    </div>
                  )}
                  {applicantCheck.subtype_taxterms && (
                    <div className="col-4">
                      <p>Mandatory Documents</p>
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#documentListModal"
                        className="text-primary cursor-pointer"
                      >
                        View List
                      </span>
                    </div>
                  )}
                   <div className="col-4 my-1">
                    <p>
                      Relocation{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="relocation"
                          onChange={handleApplicantChangeCheck}
                          value={'Yes'}
                          type="radio"
                          checked={
                            applicantCheck.relocation == "Yes"
                          }
                        />
                        <label>Yes</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="relocation"
                          onChange={handleApplicantChangeCheck}
                          value={"No"}
                          type="radio"
                          checked={
                            applicantCheck.relocation == "No"
                          }
                          // className="client-form-input"
                        />
                        <label>No</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="relocation"
                          onChange={handleApplicantChangeCheck}
                          value={"Local"}
                          type="radio"
                          checked={
                            applicantCheck.relocation== "Local"
                          }
                        />
                        <label>Local</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.relocation}
                    </span>
                  </div>
                  {applicantCheck.relocation == "Yes" &&
                  <div className="col-4 my-2">
                    <p>
                      Reason{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="relocation_reason"
                      onChange={handleApplicantChangeCheck}
                      value={applicantCheck.relocation_reason}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      {relocationReasonList.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {applicantCheckErr?.reason}
                    </span>
                  </div>
                  }
                  {(applicantCheck.relocation == 'Yes') && !(applicantCheck.relocation_reason == "Select") && applicantCheck.relocation_reason &&
                  <div className="col-4 my-2">
                    <p>
                      Other Reason{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <textarea
                      name="relocation_otherreason"
                      onChange={handleApplicantChangeCheck}
                      placeholder="Type here..."
                      value={applicantCheck.relocation_otherreason}
                      type="text"
                      className="client-form-input"
                    />
                    <span className="text-danger">
                      {applicantCheckErr?.relocation_otherreason}
                    </span>
                  </div>
                  }
                    <div className="col-4 my-2">
                      <div className="d-flex gap-2">
                       <input name="rtr_employer_name" type='checkbox' checked={applicantCheck.rtr_employer_name} onChange={(e) => setApplicantCheck((prev) => ({...prev, rtr_employer_name:e.target.checked}))} />
                       <p>RTR Employer Name</p>
                      </div>
                      <div className="d-flex gap-2">
                       <input name="visa_employer_name" type='checkbox' checked={applicantCheck.visa_employer_name} onChange={(e) => ({...prev, visa_employer_name:e.target.checked})} />
                       <p>Visa Employer Name</p>
                      </div>
                    </div>
                     <div className="col-4 my-2">
                     <p>
                       Passport Number
                       <strong className="text-danger">*</strong>
                     </p>
                     <textarea
                       name="relocation_otherreason"
                       onChange={handleApplicantChangeCheck}
                       placeholder="Type here..."
                       value={applicantCheck.passport_number}
                       type="text"
                       className="client-form-input"
                     />
                     <span className="text-danger">
                       {applicantCheckErr?.passport_number}
                     </span>
                   </div>
                   <div className="col-4 my-2">
                    <p>
                      Comment{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <textarea
                      name="comment"
                      onChange={handleApplicantChangeCheck}
                      placeholder="Type here..."
                      value={applicantCheck.comment}
                      type="text"
                      className="client-form-input"
                    />
                    <span className="text-danger">
                      {applicantCheckErr?.comment}
                    </span>
                  </div>
                  
                  <div className="col-12 my-2">
                    <h5>LinkedIn</h5>
                  </div>
                  <div className="col-4 my-1">
                    <p>
                      LinkedIn Profile Picture{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="app_profile_picture"
                          onChange={handleApplicantChangeCheck}
                          value={true}
                          type="radio"
                          checked={
                            applicantCheck.app_profile_picture == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Yes</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="app_profile_picture"
                          onChange={handleApplicantChangeCheck}
                          value={false}
                          type="radio"
                          checked={
                            applicantCheck.app_profile_picture == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>No</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.app_profile_picture}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Applicant LinkedIn Connection{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="app_connections"
                      onChange={handleApplicantChangeCheck}
                      value={applicantCheck.app_connections}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      {LinkendInConnection.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {applicantCheckErr?.app_connections}
                    </span>
                  </div>
                  {/* <div className="col-4 my-2">
                  <p>
                    Applicant linkedin match with resume{" "}
                    <strong className="text-danger"></strong>
                  </p>
                  <div className="d-flex gap-2 mt-3">
                    <div className="d-flex gap-2">
                      <input
                        name="app_linkedin_match_with_resume"
                        onChange={handleApplicantChangeCheck}
                        value={true}
                        type="radio"
                        checked={
                          applicantCheck.app_linkedin_match_with_resume ==
                          "true"
                            ? true
                            : false
                        }
                        // className="client-form-input"
                      />
                      <label>Yes</label>
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        name="app_linkedin_match_with_resume"
                        onChange={handleApplicantChangeCheck}
                        value={false}
                        type="radio"
                        checked={
                          applicantCheck.app_linkedin_match_with_resume ==
                          "false"
                            ? true
                            : false
                        }
                        // className="client-form-input"
                      />
                      <label>No</label>
                    </div>
                  </div>
                  <span className="text-danger">
                    {submissionDetailsErr.resumeErr}
                  </span>
                </div> */}
                  <div className="col-4 my-2">
                    <p>
                      LinkedIn Creation{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="app_creation_date"
                      onChange={handleApplicantChangeCheck}
                      value={applicantCheck.app_creation_date}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      {LinkendInCreaction.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {applicantCheckErr?.app_creation_date}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Vendor Company Strength{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="vendor_employees_strength"
                      onChange={handleApplicantChangeCheck}
                      value={applicantCheck.vendor_employees_strength}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      {VendorCopanyStrength.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {applicantCheckErr?.vendor_employees_strength}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Vendor Company LinkendIn Followers{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="vendor_followers"
                      onChange={handleApplicantChangeCheck}
                      value={applicantCheck.vendor_followers}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      {VendorCopanyLinkedInFollower.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {applicantCheckErr?.vendor_followers}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Glassdor review about Vendor
                      <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="vendor_glassdoor"
                          onChange={handleApplicantChangeCheck}
                          value={true}
                          type="radio"
                          checked={
                            applicantCheck.vendor_glassdoor == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Positive</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="vendor_glassdoor"
                          onChange={handleApplicantChangeCheck}
                          value={false}
                          type="radio"
                          checked={
                            applicantCheck.vendor_glassdoor == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Negative</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.vendor_glassdoor}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Applicant Skilled Matrix
                      <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="app_skill_matrix"
                          onChange={handleApplicantChangeCheck}
                          value={true}
                          type="radio"
                          checked={
                            applicantCheck.app_skill_matrix == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Mentioned</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="app_skill_matrix"
                          onChange={handleApplicantChangeCheck}
                          value={false}
                          type="radio"
                          checked={
                            applicantCheck.app_skill_matrix == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Not Mentioned</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.app_skill_matrix}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Does Applicant have Active Offer ?
                      <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="app_active_offer"
                          onChange={handleApplicantChangeCheck}
                          value={true}
                          type="radio"
                          checked={
                            applicantCheck.app_active_offer == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Yes</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="app_active_offer"
                          onChange={handleApplicantChangeCheck}
                          value={false}
                          type="radio"
                          checked={
                            applicantCheck.app_active_offer == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>No</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.app_active_offer}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Technical Questionaire{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="app_technical_questionaire"
                          onChange={handleApplicantChangeCheck}
                          value={true}
                          type="radio"
                          checked={
                            applicantCheck.app_technical_questionaire == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Yes</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="app_technical_questionaire"
                          onChange={handleApplicantChangeCheck}
                          value={false}
                          type="radio"
                          checked={
                            applicantCheck.app_technical_questionaire == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>No</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.app_technical_questionaire}
                    </span>
                  </div>
                  <div className="col-4 my-2">
                    <p>
                      Reference Check <strong className="text-danger">*</strong>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="reference_check"
                          onChange={handleApplicantChangeCheck}
                          value={true}
                          type="radio"
                          checked={
                            applicantCheck.reference_check == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Yes</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="reference_check"
                          onChange={handleApplicantChangeCheck}
                          value={false}
                          type="radio"
                          checked={
                            applicantCheck.reference_check == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>No</label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {applicantCheckErr?.reference_check}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    onClick={() => {
                      handleSubmitManualRating();
                    }}
                    className="theme-btn btn-style-one small"
                  >
                    Save
                  </button>
                  <button onClick={() => setApplicantCheck(manualRatingInitialState)} className="theme-btn btn-style-four small">
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="my-2 px-2">
            <ApplicantRatingModal aiCheckResult={aiCheckResult} />
            <DocumentListModal applicantCheck = {applicantCheck} />
            <div
              className="d-flex justify-content-between px-2 py-1"
              style={{ backgroundColor: "rgb(240 248 255 / 98%)" }}
            >
              <h5 className="fw-medium">Submission Details</h5>
              {/* <button
                type="button"
                className="theme-btn btn-style-one small"
                onClick={() => handleAIChecking(applicantData.id)}
              >
                {loadingAiCheck ?
                 <BtnBeatLoader />
                 :
                 'AI Checking'
                }
              </button> */}
              <button
                type="button"
                className="theme-btn d-none btn-style-one small"
                data-bs-toggle="modal"
                data-bs-target="#applicantRatingModal"
                id="ratingBtn"
              >
                Rating
              </button>
            </div>
            {opensubDetl ? (
              <div>
                <div className="row my-2">
                  <div className="col-6 my-2">
                    <p>
                      Availability <strong className="text-danger">*</strong>
                    </p>
                    <input
                      name="availability"
                      onChange={(e) => {
                        handleSubmissionChange(e, index);
                        setSubmissionDetailsERr((prev) => ({
                          ...prev,
                          availabilityErr: "",
                        }));
                      }}
                      value={multiSubmissionForm[index].availability}
                      type="text"
                      className="client-form-input"
                    />
                    <span className="text-danger">
                      {submissionDetailsErr.availabilityErr}
                    </span>
                  </div>
                  <div className="col-6 my-2">
                    <p>
                      Rate Pay <span className="text-danger">*</span>
                    </p>
                    <div className="d-flex gap-3">
                      <select
                        name="pay_rate_currency"
                        value={multiSubmissionForm[index].pay_rate_currency}
                        onChange={(e) => handleSubmissionChange(e, index)}
                        className="client-input-style form-mult-box"
                      >
                        <option>Select</option>
                        {currencyJson.map((item, index) => {
                          return (
                            <option value={item.code}>
                              {" "}
                              {item.code} ({item.name})
                            </option>
                          );
                        })}
                      </select>
                      <input
                        name="pay_rate_amount"
                        onChange={(e) => handleSubmissionChange(e, index)}
                        type="text"
                        value={multiSubmissionForm[index].pay_rate_amount}
                        placeholder="Rate"
                        className="px-2 client-input-style form-mult-box form-mult-box"
                      />
                      <select
                        name="pay_rate_type"
                        value={multiSubmissionForm[index].pay_rate_type}
                        onChange={(e) => handleSubmissionChange(e, index)}
                        className="client-input-style form-mult-box"
                      >
                        <option>Select</option>
                        <option>Hourly</option>
                        <option>Monthly</option>
                        <option>Annually</option>
                      </select>
                      <select
                        name="pay_rate_contract_type"
                        onChange={(e) => handleSubmissionChange(e, index)}
                        className="client-input-style form-mult-box"
                        value={
                          multiSubmissionForm[index].pay_rate_contract_type
                        }
                      >
                        <option>Select</option>
                        {TaxTerms.map((item, index) => {
                          return <option key={index}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                    <span className="text-danger">
                      {submissionDetailsErr.payRateErr}
                    </span>
                  </div>
                  <div className="col-6 my-2">
                    <p>Bill Rate</p>
                    <div className="d-flex gap-3">
                      <select
                        name="bill_rate_currency"
                        onChange={(e) => handleSubmissionChange(e, index)}
                        className="client-input-style form-mult-box"
                        value={multiSubmissionForm[index].bill_rate_currency}
                      >
                        <option>Select</option>
                        {currencyJson.map((item, index) => {
                          return (
                            <option value={item.code}>
                              {" "}
                              {item.code} ({item.name})
                            </option>
                          );
                        })}
                      </select>
                      <input
                        name="bill_rate_amount"
                        placeholder="Rate"
                        value={multiSubmissionForm[index].bill_rate_amount}
                        onChange={(e) => handleSubmissionChange(e, index)}
                        type="text"
                        className="px-2 client-input-style form-mult-box form-mult-box"
                      />
                      <select
                        name="bill_rate_type"
                        value={multiSubmissionForm[index].bill_rate_type}
                        onChange={(e) => handleSubmissionChange(e, index)}
                        className="client-input-style form-mult-box"
                      >
                        <option>Select</option>
                        <option>Hourly</option>
                        <option>Monthly</option>
                        <option>Annually</option>
                      </select>
                      <select
                        name="bill_rate_contract_type"
                        value={
                          multiSubmissionForm[index].bill_rate_contract_type
                        }
                        onChange={(e) => handleSubmissionChange(e, index)}
                        className="client-input-style form-mult-box"
                      >
                        <option>Select</option>
                        {TaxTerms.map((item, index) => {
                          return <option key={index}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-6 my-1">
                    <p>Relocation</p>
                    <div className="d-flex gap-2 mt-3">
                      <div className="d-flex gap-2">
                        <input
                          name="relocation"
                          onChange={(e) => handleSubmissionChange(e, index)}
                          value={true}
                          type="radio"
                          checked={
                            multiSubmissionForm[index].relocation == "true"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>Yes</label>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          name="relocation"
                          onChange={(e) => handleSubmissionChange(e, index)}
                          value={false}
                          type="radio"
                          checked={
                            multiSubmissionForm[index].relocation == "false"
                              ? true
                              : false
                          }
                          // className="client-form-input"
                        />
                        <label>No</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <p>
                      Resume <strong className="text-danger">*</strong>
                    </p>
                    <select
                      name="resume"
                      onChange={(e) => handleSubmissionChange(e, index)}
                      value={multiSubmissionForm[index].resume}
                      type="text"
                      className="client-form-input"
                    >
                      <option>Select</option>
                      <option>Upload new Resume</option>
                      {applicantDocument?.find(
                        (item) => item.is_default == true
                      ) && (
                        <option>
                          {
                            applicantDocument?.find(
                              (item) => item.is_default == true
                            ).document_name
                          }
                        </option>
                      )}
                    </select>
                    <span className="text-danger">
                      {submissionDetailsErr.resumeErr}
                    </span>
                  </div>
                  {multiSubmissionForm[index].resume == "Upload new Resume" && (
                    <div className="col-6 my-2">
                      <p>New Resume</p>
                      <input type="file" onChange={handleUploadNewResume} />
                      {/* <div>
                    <input
                      type="checkbox"
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                    <span>Set As Default Resume</span>
                  </div> */}
                    </div>
                  )}
                  <div className="col-6 my-2">
                    <p>Video Link</p>
                    <input
                      name="video_link"
                      onChange={(e) => handleSubmissionChange(e, index)}
                      value={multiSubmissionForm[index].video_link}
                      type="text"
                      className="client-form-input"
                    />
                  </div>
                  <div className="col-6 my-2">
                    <p>Additional Attachment</p>
                    <UploadSingleDocument handleFileUpload={handleFileUpload} />
                    <div className="my-2">
                      {documents.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="d-flex my-1 bg-secondary justify-content-between px-2 border border-secondary rounded-1"
                          >
                            <span>{item.name}</span>
                            <span onClick={() => handleRemoveDoc(index)}>
                              {reactIcons.close}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <p>eForms</p>
                    <select
                      name="eforms"
                      onChange={(e) => handleSubmissionChange(e, index)}
                      value={multiSubmissionForm[index].eforms}
                      type="text"
                      className="client-form-input"
                    >
                      <option></option>
                    </select>
                  </div>
                  <div className="col-6 my-2">
                    <p>Recipients</p>
                    <div className="position-relative cursor-pointer">
                      <div
                        className="client-form-input d-flex justify-content-between"
                        onClick={() => setOpenRecp(!openRecp)}
                        style={{ minHeight: "36px", maxHeight: "fit-content" }}
                      >
                        <div className="d-flex flex-wrap gap-2">
                          {form.recipientList.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                                style={{
                                  background: "var(--primary-2nd-color)",
                                }}
                              >
                                <span>
                                  {item.first_name} {item.last_name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <span className="float-end">
                          {reactIcons.downarrow}
                        </span>
                      </div>
                      {openRecp && (
                        <div
                          className="position-absolute bg-white border border-1 w-100 px-2 "
                          style={{
                            top: "33px",
                            zIndex: 10000,
                            height: "200px",
                            overflow: "auto",
                          }}
                        >
                          {usersList.map((item, index) => {
                            return (
                              <div key={index} className="">
                                <input
                                  type="checkbox"
                                  checked={form?.recipientList?.find(
                                    (_item) =>
                                      _item.first_name == item.first_name
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setForm((prev) => ({
                                        ...prev,
                                        recipientList: [
                                          ...prev.recipientList,
                                          {
                                            first_name: item.first_name,
                                            last_name: item.last_name,
                                          },
                                        ],
                                      }));
                                      setForm((prev) => ({
                                        ...prev,
                                        recipientIds: [
                                          ...prev.recipientIds,
                                          item.id,
                                        ],
                                      }));
                                    } else {
                                      setForm((prev) => ({
                                        ...prev,
                                        recipientList:
                                          prev.recipientList.filter(
                                            (_item, _index) =>
                                              _item.first_name !==
                                              item.first_name
                                          ),
                                      }));
                                      setForm((prev) => ({
                                        ...prev,
                                        recipientIds: prev.recipientIds.filter(
                                          (_item, _index) => _item !== item.id
                                        ),
                                      }));
                                    }
                                  }}
                                />
                                <span className="mx-2">
                                  {item.first_name} {item.last_name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <p>Additional Notifiers</p>
                    <div className="position-relative cursor-pointer">
                      <div
                        className="client-form-input d-flex justify-content-between"
                        onClick={() => setOpenNotifer(!openNotifer)}
                        style={{ minHeight: "36px", maxHeight: "fit-content" }}
                      >
                        <div className="d-flex flex-wrap gap-2">
                          {form.notifiersList.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                                style={{
                                  background: "var(--primary-2nd-color)",
                                }}
                              >
                                <span>{item.first_name}</span>
                              </div>
                            );
                          })}
                        </div>
                        <span className="float-end">
                          {reactIcons.downarrow}
                        </span>
                      </div>
                      {openNotifer && (
                        <div
                          className="position-absolute bg-white border border-1 w-100 px-2"
                          style={{
                            top: "33px",
                            zIndex: 10000,
                            height: "200px",
                            overflow: "auto",
                          }}
                        >
                          {usersList.map((item, index) => {
                            return (
                              <div key={index} className="">
                                <input
                                  type="checkbox"
                                  checked={form?.notifiersList?.find(
                                    (_item) =>
                                      _item.first_name == item.first_name
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setForm((prev) => ({
                                        ...prev,
                                        notifiersList: [
                                          ...prev.notifiersList,
                                          { first_name: item.first_name },
                                        ],
                                      }));
                                      setForm((prev) => ({
                                        ...prev,
                                        notifiersIds: [
                                          ...prev.notifiersIds,
                                          item.id,
                                        ],
                                      }));
                                    } else {
                                      setForm((prev) => ({
                                        ...prev,
                                        notifiersList:
                                          prev.notifiersList.filter(
                                            (_item, _index) =>
                                              _item.first_name !==
                                              item.first_name
                                          ),
                                      }));
                                      setForm((prev) => ({
                                        ...prev,
                                        notifiersIds: prev.notifiersIds.filter(
                                          (_item, _index) => _item !== item.id
                                        ),
                                      }));
                                    }
                                  }}
                                />
                                <span className="mx-2">{item.first_name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-6 my-2">
                <p>Additional Notifiers</p>
                <select
                  name="designation"
                  onChange={handleChange}
                  // value={form.designation}
                  type="text"
                  className="client-form-input"
                >
                  <option></option>
                </select>
              </div> */}
                  <div className="col-6 my-1">
                    <p>Interviewer</p>
                    <textarea
                      placeholder="Enter Email-IDs with comma separator"
                      className="client-form-input"
                      type="text"
                      style={{
                        height: "60px",
                      }}
                      name="interviewer"
                      value={form.interviewIds}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          interviewIds: e.target.value.split(","),
                        }));
                      }}
                    />
                  </div>
                  <div className="col-6 my-1">
                    <p>Other Email Ids</p>
                    <textarea
                      placeholder="Enter Email-IDs with comma separator"
                      className="client-form-input"
                      type="text"
                      style={{
                        height: "60px",
                      }}
                      name="other_emails"
                      value={form.otherEmailIds}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          otherEmailIds: e.target.value.split(","),
                        }));
                      }}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <p>Comments</p>
                    <textarea
                      name="comment"
                      onChange={(e) => handleSubmissionChange(e, index)}
                      value={multiSubmissionForm[index].comment}
                      type="text"
                      className="client-form-input"
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 my-2">
                  <button
                    onClick={() => {
                      handleSaveSubDetails(index);
                      handleUploadDoc(index);
                      handleSaveNewResume();
                    }}
                    className="theme-btn btn-style-one small"
                  >
                    Save
                  </button>
                  {/* <button
                onClick={() => setOpenSubDetl(true)}
                className="theme-btn btn-style-three small"
              >
                Cancel
              </button> */}
                </div>
              </div>
            ) : (
              <div className="my-2">
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => setOpenSubDetl(true)}
                    className="theme-btn btn-style-one small"
                  >
                    Edit
                  </button>
                </div>
                <div className="row my-3">
                  <div className="col-4">
                    <p>Availability</p>
                    <strong>{multiSubmissionForm[index]?.availability}</strong>
                  </div>
                  <div className="col-4">
                    <p>Pay Rate</p>
                    <strong>
                      {multiSubmissionForm[index]?.pay_rate_currency}/{" "}
                      {multiSubmissionForm[index]?.pay_rate_amount} /{" "}
                      {multiSubmissionForm[index]?.pay_rate_type} /{" "}
                      {multiSubmissionForm[index]?.pay_rate_contract_type}
                    </strong>
                  </div>
                  <div className="col-4">
                    <p>Bill Rate</p>
                    <strong>
                      {multiSubmissionForm[index]?.bill_rate_currency}/{" "}
                      {multiSubmissionForm[index]?.bill_rate_amount} /{" "}
                      {multiSubmissionForm[index]?.bill_rate_type} /{" "}
                      {multiSubmissionForm[index]?.bill_rate_contract_type}
                    </strong>
                  </div>
                  <div className="col-4">
                    <p>Relocation</p>
                    <strong>
                      {multiSubmissionForm[index]?.relocation ? "Yes" : "No"}
                    </strong>
                  </div>
                  <div className="col-4">
                    <p>Resume</p>
                    <strong>{multiSubmissionForm[index]?.resume}</strong>
                  </div>
                  <div className="col-4">
                    <p>Video Link</p>
                    <strong>{multiSubmissionForm[index]?.video_link}</strong>
                  </div>
                  <div className="col-4">
                    <p>Additional Attachment</p>
                    <strong>{multiSubmissionForm[index]?.availability}</strong>
                  </div>
                  <div className="col-4">
                    <p>eForms</p>
                    <strong>{multiSubmissionForm[index]?.eforms}</strong>
                  </div>
                  <div className="col-4">
                    <p>Recipients</p>
                    <div className="d-flex flex-wrap gap-2">
                      {form.recipientList.map((item, index) => {
                        return <storng key={index}>{item.first_name}</storng>;
                      })}
                    </div>
                  </div>
                  <div className="col-4">
                    <p>Additional Notifiers</p>
                    <div className="d-flex flex-wrap gap-2">
                      {form.notifiersList.map((item, index) => {
                        return <storng key={index}>{item.first_name}</storng>;
                      })}
                    </div>
                  </div>
                  <div className="col-4">
                    <p>Interviewer</p>
                    <div className="d-flex flex-wrap gap-2">
                      {form.interviewIds.map((item, index) => {
                        return <storng key={index}>{item}</storng>;
                      })}
                    </div>
                  </div>
                  <div className="col-4">
                    <p>Other Email Ids</p>
                    <div className="d-flex flex-wrap gap-2">
                      {form.otherEmailIds.map((item, index) => {
                        return <storng key={index}>{item}</storng>;
                      })}
                    </div>
                  </div>
                  <div className="col-4">
                    <p>Comments</p>
                    <strong>{multiSubmissionForm[index]?.comment}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default ApplicantSubmissionDetails;
