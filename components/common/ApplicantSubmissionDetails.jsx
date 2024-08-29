"use client";
import { currencyJson } from "@/utils/currency";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import moment from "moment";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import Documents from "@/app/employers-dashboard/all-applicants/[id]/components/Documents";
import { toast } from "react-toastify";
import UploadSingleDocument from "./UploadSingleDocument";

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
    // {name:'', experience:'', nameErr:'', experienceErr:''}
  ]);

  const [openRecp, setOpenRecp] = useState(false);
  const [openNotifer, setOpenNotifer] = useState(false);
  const [updateRef, setUpdateRef] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [newResumeDoc, setNewResumeDoc] = useState([]);

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
        { name: "", experience: "", nameErr: "", experienceErr: "" },
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

    if (lastSkill.experience.trim() === "") {
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
      { name: "", experience: "", nameErr: "", experienceErr: "" },
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

    if (lastSkill.experience.trim() === "") {
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
    if (name && company && reference_type && years_acquainted && type == 'save') {
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
    }else if(name && company && reference_type && years_acquainted && type== 'update'){
      setMultiSubmissionForm((prev) =>
        prev.map((form, index) =>
          index === formIndex
            ? {
                ...form,
                references: form.references.map((ref, refIndex) =>
                  refIndex === updateRef
                    ? refrenceDetails
                    : ref
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
    let update = [...multiSubmissionForm]
    setRefrenceDetails(update[formIndex].references[refIndex])
    setUpdateRef(refIndex);
  }

  const handleRemoveReference = (formIndex, refIndex) => {
    setMultiSubmissionForm((prev) =>
      prev.map((form, index) =>
        index === formIndex
          ? {
              ...form,
              references: form.references.filter((item, rIndex) =>  rIndex != refIndex ),
            }
          : form
      )
    );
  }

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
    });
  };


  const handleRemoveDoc = (dIndex) => {
    let updated = [...documents];
    let filteredData = updated.filter((item, _index) => _index !== dIndex);
    setDocuments(filteredData);
  }

  let applicantDetails = applicantData?.length > 0 ? applicantData[index] : applicantData
  const handleUploadDoc = async (formIndex) => {
    const formData = new FormData();
    documents.forEach((file, index) => {
    formData.append("files", file);
    });
    formData.append("title", 'document');
    formData.append("type", 'Additional document');
    formData.append("comment", 'submission');
    formData.append("applicant", applicantDetails.id);
   
    console.log("------------applicant details ", applicantDetails);
  //  if(documents.length > 0){
  //    const response = await postApiReq(`/applicant-documents/`, formData);
  //    if (response.status) {
  //    }
  //  }
  };
  console.log("------------applicant data ", multiSubmissionForm[index].skills);
  let applicantDocument = applicantData?.length > 0 ? applicantData[index]?.documents : applicantData?.documents

  const handleUploadNewResume = (e) => {
    let file = e.target.files;
    Object.values(file).forEach((item) => {
      setNewResumeDoc((prev) => [...prev, item]);
    });
   
  }

  const handleSaveNewResume = async() => {
    const formData = new FormData();
    if(newResumeDoc.length > 0){
      newResumeDoc.forEach((file, index) => {
        formData.append("files", file);
        });
        formData.append("title", 'document');
        formData.append("type", 'Additional document');
        formData.append("comment", 'submission');
        formData.append("applicant", applicantDetails.id);
        if(isDefault){
          formData.append("is_default", isDefault);
        }
           const response = await postApiReq(`/applicant-documents/`, formData);
           if (response.status) {
           }
    }
  }

  return (
    <Paper>
      <div
        className="d-flex justify-content-between bg-secondary px-2 py-1 rounded-1 mb-3"
        // style={{ background: "var(--theme-color-first)" }}
      >
        {applicantData?.length > 0 ? (
          <h5>
            {applicantData[index]?.firstname +
              " " +
              applicantData[index]?.middlename +
              " " +
              applicantData[index]?.lastname}
          </h5>
        ) : (
          <h5>
            {applicantData?.firstname +
              " " +
              applicantData?.middlename +
              " " +
              applicantData?.lastname}
          </h5>
        )}
        <span>{reactIcons.downarrow}</span>
      </div>
      <div className="my-3 px-2">
        <div className="d-flex justify-content-between bg-secondary">
          <h5>Skills</h5>
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
            {multiSubmissionForm[index].skills.length == 0 ? "Add" : "Edit"}
          </button>
        </div>
        <div>
          {openSkill ? (
            <div
              className="d-flex gap-2 align-items-center my-1"
              style={{ width: "100%" }}
            >
              <table className="w-100">
                <thead className="border">
                  <th>Skills</th>
                  <th>Experience</th>
                </thead>
                <tbody>
                  {multiSubmissionForm[index]?.skills?.map(
                    (item, skillIndex) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.experience}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              {skillsField?.map((item, skillIndex) => {
                return (
                  <div className="d-flex gap-2 align-items-center my-1">
                    <div>
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
                      <span className="text-danger">{item.nameErr}</span>
                    </div>
                    <div>
                      <p>Experience</p>
                      <input
                        type="number"
                        name="experience"
                        onChange={(e) => {
                          let { name, value } = e.target;
                          handleSkillChange(skillIndex, name, value);
                        }}
                        value={item.experience}
                        className="client-form-input"
                        placeholder="no of years"
                      />
                      <span className="text-danger">{item.experienceErr}</span>
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
        <div className="d-flex justify-content-between bg-secondary">
          <h5>Applicant Rating</h5>
          {/* <button type="button" className="theme-btn btn-style-one small">
            Add
          </button> */}
        </div>
        <div className="my-3">
          <div className="d-flex gap-2">
            <div className="w-25">
              <p>Technical Skills</p>
            </div>
            <StarRating
              initialRating={
                multiSubmissionForm[index].applicant_rating.technical
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
                multiSubmissionForm[index].applicant_rating.communication
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
                multiSubmissionForm[index].applicant_rating.profesionalism
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
                multiSubmissionForm[index].applicant_rating.overall
              }
              onRatingChange={(newRating) =>
                handleRatingChange(index, "overall", newRating)
              }
            />
          </div>
        </div>
      </div>
      <div className="my-2 px-2 ">
        <div className="d-flex bg-secondary justify-content-between">
          <h5>Reference Details</h5>
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
            <div>
              <div className="row my-2">
                <div className="col-4 my-1">
                  <p>
                    Reference Name <strong className="text-danger">*</strong>
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
                    Reference Type <strong className="text-danger">*</strong>
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
                    Year Acquainted <strong className="text-danger">*</strong>
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
                  onClick={() =>{
                    if(updateRef == null){
                      handleAddReference(index, 'save')
                    }else{
                      handleAddReference(index, 'update')
                    }}
                  }
                  className="theme-btn btn-style-one small"
                >
                  {updateRef ?'Update' :'Save'}
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
            <div className="my-3">
              <table className="w-100">
                <thead className="bg-secondary py-2">
                  <th>SELECT</th>
                  <th>REFRENCE NAME</th>
                  <th>COMPANY NAME</th>
                  <th>EMAIL</th>
                  <th>REFRENCE TYPE</th>
                  <th>CONTACT NUMBER</th>
                  <th>ACTION</th>
                </thead>
                <tbody>
                  {multiSubmissionForm[index]?.references.map((item, refIndex) => {
                    return (
                      <tr key={refIndex}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.company}</td>
                        <td>{item.email}</td>
                        <td>{item.reference_type}</td>
                        <td>{item.contact}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <span className="cursor-pointer text-primary" onClick={() => handleEditReference(index, refIndex)}>
                              {reactIcons.edit}
                            </span>
                            <span className="text-danger cursor-pointer" onClick={() => handleRemoveReference(index, refIndex)}>{reactIcons.delete}</span>
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
      </div>
      <div className="my-2 px-2 ">
        <div className="d-flex bg-secondary justify-content-between">
          <h5>Employer Details</h5>
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
                    name="relocation"
                    onChange={handleChange}
                    value={true}
                    type="radio"
                    // checked={form.relocation ? true : false}
                    // className="client-form-input"
                  />
                  <label>Add New</label>
                </div>
                <div className="d-flex gap-2">
                  <input
                    name="relocation"
                    onChange={handleChange}
                    value={false}
                    type="radio"
                    // checked={form.relocation ? false : true}
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
        <div className="d-flex justify-content-between bg-secondary">
          <h5>Available Documents</h5>
          <button type="button" className="theme-btn btn-style-one small">
            Add
          </button>
        </div>
        <div className="my-3">
          <table className="w-100">
            <thead className="bg-secondary">
              <th>Title</th>
              <th>Type</th>
              <th>Uploaded By</th>
              <th>Uploaded On</th>
              <th>Action</th>
            </thead>
            <tbody>
              {(applicantData?.length > 0
                ? applicantData[index]
                : applicantData
              )?.documents?.map((item, index) => {
                return (
                  <tr>
                    <td>{item.document_name}</td>
                    <td>{item.type}</td>
                    <td>-</td>
                    <td>
                      {moment(item.uploaded_at).format("DD-MM-YYYY hh:mm A")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-2 px-2">
        <div className="d-flex justify-content-between bg-secondary">
          <h5>Submission Details</h5>
          {/* <button type="button" className="theme-btn btn-style-one small">
            Add
          </button> */}
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
                    value={multiSubmissionForm[index].pay_rate_contract_type}
                  >
                    <option>Select</option>
                    <option>1099</option>
                    <option>C2H</option>
                    <option>Contract</option>
                    <option>Full Time</option>
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
                    value={multiSubmissionForm[index].bill_rate_contract_type}
                    onChange={(e) => handleSubmissionChange(e, index)}
                    className="client-input-style form-mult-box"
                  >
                    <option>Select</option>
                    <option>1099</option>
                    <option>C2H</option>
                    <option>Contract</option>
                    <option>Full Time</option>
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
                        multiSubmissionForm[index].relocation ? true : false
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
                        multiSubmissionForm[index].relocation ? false : true
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
                  {applicantDocument?.find((item) => item.is_default == true) &&
                  <option>{applicantDocument?.find((item) => item.is_default == true).document_name}</option>
                  }
                </select>
                <span className="text-danger">
                  {submissionDetailsErr.resumeErr}
                </span>
              </div>
              { multiSubmissionForm[index].resume == 'Upload new Resume' &&
                 <div className="col-6 my-2">
                 <p>
                   New Resume 
                 </p>
                 <input type="file" onChange={handleUploadNewResume} />
                 <div>
                  <input type="checkbox"  onChange={(e) => setIsDefault(e.target.checked)} />
                  <span>Set As Default Resume</span>
                 </div>
               </div>
              }
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
                    return(
                        <div key={index} className="d-flex my-1 bg-secondary justify-content-between px-2 border border-secondary rounded-1">
                           <span>{item.name}</span>
                           <span onClick={() => handleRemoveDoc(index)}>{reactIcons.close}</span>
                        </div>
                    )
                  })
                  }
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
                            style={{ background: "var(--primary-2nd-color)" }}
                          >
                            <span>{item.first_name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <span className="float-end">{reactIcons.downarrow}</span>
                  </div>
                  {openRecp && (
                    <div
                      className="position-absolute bg-white border border-1 w-100 px-2"
                      style={{ top: "33px", zIndex: 10000 }}
                    >
                      {usersList.map((item, index) => {
                        return (
                          <div key={index} className="">
                            <input
                              type="checkbox"
                              checked={form?.recipientList?.find(
                                (_item) => _item.first_name == item.first_name
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setForm((prev) => ({
                                    ...prev,
                                    recipientList: [
                                      ...prev.recipientList,
                                      { first_name: item.first_name },
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
                                    recipientList: prev.recipientList.filter(
                                      (_item, _index) =>
                                        _item.first_name !== item.first_name
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
                            <span className="mx-2">{item.first_name}</span>
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
                            style={{ background: "var(--primary-2nd-color)" }}
                          >
                            <span>{item.first_name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <span className="float-end">{reactIcons.downarrow}</span>
                  </div>
                  {openNotifer && (
                    <div
                      className="position-absolute bg-white border border-1 w-100 px-2"
                      style={{ top: "33px", zIndex: 10000 }}
                    >
                      {usersList.map((item, index) => {
                        return (
                          <div key={index} className="">
                            <input
                              type="checkbox"
                              checked={form?.notifiersList?.find(
                                (_item) => _item.first_name == item.first_name
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
                                    notifiersList: prev.notifiersList.filter(
                                      (_item, _index) =>
                                        _item.first_name !== item.first_name
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
                  handleSaveSubDetails(index)
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
    </Paper>
  );
};

export default ApplicantSubmissionDetails;
