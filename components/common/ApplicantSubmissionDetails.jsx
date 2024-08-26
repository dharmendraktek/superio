"use client";
import { currencyJson } from "@/utils/currency";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import MultiSelect from "@/components/common/MultiSelect";
import StarRating from "./StarRating";

const { default: Paper } = require("@/components/common/Paper");

const initialState = {
  name: "John Doe",
  company: "Tech Corp",
  designation: "Manager",
  contact: "1234567890",
  email: "john.doe@example.com",
  reference_type: "Professional",
  years_acquainted: 5,
};

const ApplicantSubmissionDetails = ({multiSubmissionForm, setMultiSubmissionForm, index, applicantData}) => {

  const [refrenceDetails, setRefrenceDetails] = useState({
    name:'',
    company:'',
    designation:'',
    contact:'',
    email:'',
    reference_type:'',
    years_acquainted:''
}) 
const [usersList, setUsersList] = useState([]);
const [search, setSearch] = useState('');



  const handleAddMoreSkills = (formIndex) => {
    setMultiSubmissionForm(prev => 
        prev.map((form, index) => 
            index === formIndex
                ? { ...form, skills: [...form.skills, { name: '', experience: '' }] }
                : form
        )
    );

};

  const handleRemove = (formIndex, skillIndex) => {
    setMultiSubmissionForm(prev => 
        prev.map((form, index) => 
            index === formIndex
                ? { ...form, skills: form.skills.filter((_, sIndex) => sIndex !== skillIndex) }
                : form
        )
    );
  };


  const handleSkillChange = (formIndex, skillIndex, field, value) => {
    setMultiSubmissionForm(prev => 
        prev.map((form, index) => 
            index === formIndex
                ? {
                    ...form,
                    skills: form.skills.map((skill, sIndex) => 
                        sIndex === skillIndex
                            ? { ...skill, [field]: value }
                            : skill
                    )
                }
                : form
        )
    );
};


const handleRatingChange = (formIndex, field, value) => {
    setMultiSubmissionForm(prev =>
        prev.map((form, index) =>
            index === formIndex
                ? {
                    ...form,
                    applicant_rating: {
                        ...form.applicant_rating,
                        [field]: value
                    }
                }
                : form
        )
    );
};

const handleReferenceChange = (formIndex, skillIndex, field, value) => {
    setMultiSubmissionForm(prev => 
        prev.map((form, index) => 
            index === formIndex
                ? {
                    ...form,
                    refrences: form.refrences.map((reference, sIndex) => 
                        sIndex === skillIndex
                            ? { ...reference, [field]: value }
                            : reference
                    )
                }
                : form
        )
    );
};


  const handleChange = (e) => {
    let { name, value } = e.target;
    setRefrenceDetails((prev) => ({...prev, [name]:value} ))
  };

  const handleAddReference = (formIndex) => {
    setMultiSubmissionForm(prev =>
        prev.map((form, index) =>
            index === formIndex
                ? {
                    ...form,
                    references: [...form.references, refrenceDetails]
                }
                : form
        )
    );
};

const handleSubmissionChange = (e, formIndex) => {
    const {name, value} = e.target;
    setMultiSubmissionForm(prev =>
        prev.map((form, index) =>
            index === formIndex
                ? { ...form, [name]: value }
                : form
        )
    );
};

useEffect(() => {
    handleGetUsersList();
}, [index])

const handleGetUsersList = async () => {
    const response = await getReq(`/users/${search ? `?search=${search}` : ""}`
    );
    if (response.status) {
      setUsersList(response.data);
    }
  };

  const handleSaveSkills = () => {};


  return (
    <Paper>
      <div
        className="d-flex justify-content-between bg-secondary px-2 py-1 rounded-1 mb-3"
        // style={{ background: "var(--theme-color-first)" }}
      >
        <h5>{applicantData?.firstname + ' ' + applicantData?.middlename + ' ' + applicantData?.lastname }</h5>
        <span>{reactIcons.downarrow}</span>
      </div>
      <div className="my-2 px-2">
        <div className="d-flex justify-content-between bg-secondary">
          <h5>Skills</h5>
          <button type="button" className="theme-btn btn-style-one small">
            Add
          </button>
        </div>
        <div>
          {multiSubmissionForm[index]?.skills?.map((item, skillIndex) => {
            return (
              <div className="d-flex gap-2 align-items-center my-1">
                <div>
                  <p>Skills</p>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                        let {name, value} = e.target;
                        handleSkillChange(index, skillIndex, name, value )
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
                    type="text"
                    name="experience"
                    onChange={(e) => {
                        let {name, value} = e.target;
                        handleSkillChange(index, skillIndex, name, value )
                    }}
                    value={item.experience}
                    className="client-form-input"
                    placeholder="no of years"
                  />
                  <span className="text-danger">{item.experienceErr}</span>
                </div>
                <div>
                  <span
                    onClick={() => handleRemove(index, skillIndex)}
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
              onClick={() => handleAddMoreSkills(index)}
              className="theme-btn btn-style-two small"
            >
              Add more
            </button>
            <button
              onClick={() => handleSaveSkills()}
              className="theme-btn btn-style-one small"
            >
              Save
            </button>
          </div>
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
              initialRating={multiSubmissionForm[index].applicant_rating.technical}
              onRatingChange={(newRating) => handleRatingChange(index, 'technical', newRating)}
            />
          </div>
          <div className="d-flex gap-2">
            <div className="w-25">
              <p>Communication Skills</p>
            </div>
            <StarRating
                 initialRating={multiSubmissionForm[index].applicant_rating.communication}
                 onRatingChange={(newRating) => handleRatingChange(index, 'communication', newRating)}
            />
          </div>
          <div className="d-flex gap-2">
            <div className="w-25">
              <p>Profesionalism</p>
            </div>
            <StarRating 
               initialRating={multiSubmissionForm[index].applicant_rating.profesionalism}
               onRatingChange={(newRating) => handleRatingChange(index, 'profesionalism', newRating)}
            />
          </div>
          <div className="d-flex gap-2">
            <div className="w-25">
              <p>Overall Rating</p>
            </div>
            <StarRating 
               initialRating={multiSubmissionForm[index].applicant_rating.overall}
               onRatingChange={(newRating) => handleRatingChange(index, 'overall', newRating)}
            />
          </div>
        </div>
      </div>
      <div className="my-2 px-2 ">
        <div className="d-flex bg-secondary justify-content-between">
          <h5>Reference Details</h5>
          <button type="button" className="theme-btn btn-style-one small">
            Add
          </button>
        </div>
        <div>
            {false ?
             <div>
                <table>
                    <thead>
                        <th>SELECT</th>
                        <th>REFRENCE NAME</th>
                        <th>COMPANY NAME</th>
                        <th>EMAIL</th>
                        <th>REFRENCE TYPE</th>
                        <th>CONTACT NUMBER</th>
                        <th>ACTION</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
             </div>
           :
           <div>
          <div className="row my-2">
            <div className="col-4 my-1">
              <p>Reference Name</p>
              <input
                name="name"
                onChange={handleChange}
                value={refrenceDetails.name}
                type="text"
                className="client-form-input"
              />
            </div>
            <div className="col-4 my-1">
              <p>Company Name</p>
              <input
                name="company"
                onChange={handleChange}
                value={refrenceDetails.company}
                type="text"
                className="client-form-input"
              />
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
              <p>Reference Type</p>
              <input
                name="name"
                onChange={handleChange}
                value={refrenceDetails.reference_type}
                type="text"
                className="client-form-input"
              />
            </div>
            <div className="col-4 my-1">
              <p>Year Acquainted</p>
              <input
                name="name"
                onChange={handleChange}
                value={refrenceDetails.years_acquainted}
                type="text"
                className="client-form-input"
              />
            </div>
          </div>
          <div className="d-flex gap-2 my-2">
            <button onClick={() => handleAddReference(index)} className="theme-btn btn-style-one small">Save</button>
            <button className="theme-btn btn-style-three small">Cancel</button>
          </div>
           </div>

            }
        </div>
      </div>
      <div className="my-2 px-2 ">
        <div className="d-flex bg-secondary justify-content-between">
          <h5>Employer Details</h5>
          <button type="button" className="theme-btn btn-style-one small">
            Add
          </button>
        </div>
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
                <label>Add from existing vendor contact records
                </label>
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
        </div>
            </div>



      <div className="my-2 px-2 bg-secondary">
        <div className="d-flex justify-content-between">
          <h5>Available Documents</h5>
          <button type="button" className="theme-btn btn-style-one small">
            Add
          </button>
        </div>
      </div>
      <div className="my-2 px-2">
        <div className="d-flex justify-content-between bg-secondary">
          <h5>Submission Details</h5>
          {/* <button type="button" className="theme-btn btn-style-one small">
            Add
          </button> */}
        </div>
        <div className="row my-2">
          <div className="col-6 my-2">
            <p>Availability</p>
            <input
              name="availability"
              onChange={(e) => handleSubmissionChange(e, index)}
              // value={form.designation}
              type="text"
              className="client-form-input"
            />
          </div>
          <div className="col-6 my-2">
            <p>
              Rate Pay <strong className="text-danger">*</strong>
            </p>
            <div className="d-flex gap-3">
              <select
                name="pay_rate_currency"
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
                // value={form.amount}
                placeholder="Rate"
                className="px-2 client-input-style form-mult-box form-mult-box"
              />
              <select
                name="pay_rate_type"
                onChange={(e) => handleSubmissionChange(e, index)}
                className="client-input-style form-mult-box"
              >
                <option>Select</option>
                <option>Hourly</option>
                <option>Monthly</option>
                <option>Annually</option>
              </select>
              <select
                name="pay_rate_contract_type           "
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
          <div className="col-6 my-2">
            <p>
              Bill Rate <strong className="text-danger">*</strong>
            </p>
            <div className="d-flex gap-3">
              <select
                  name="bill_rate_currency"
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
                  name="bill_rate_amount"
                  onChange={(e) => handleSubmissionChange(e, index)}
                type="text"
                className="px-2 client-input-style form-mult-box form-mult-box"
              />
              <select
                 name="bill_rate_type"
                 onChange={(e) => handleSubmissionChange(e, index)}
                className="client-input-style form-mult-box"
              >
                <option>Select</option>
                <option>Hourly</option>
                <option>Monthly</option>
                <option>Annually</option>
              </select>
              <select
                  name="bill_rate_contract_type           "
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
                  // checked={form.relocation ? true : false}
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
                  // checked={form.relocation ? false : true}
                  // className="client-form-input"
                />
                <label>No</label>
              </div>
            </div>
          </div>
          <div className="col-6 my-2">
            <p>Resume</p>
            <select
              name="resume"
              onChange={(e) => handleSubmissionChange(e, index)}
              // value={form.designation}
              type="text"
              className="client-form-input"
            >
              <option></option>
            </select>
          </div>
          <div className="col-6 my-2">
            <p>Video Link</p>
            <input
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            />
          </div>
          <div className="col-6 my-2">
            {/* <p>Availability</p>
            <input
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            /> */}
          </div>
          <div className="col-6 my-2">
            <p>eForms</p>
            <select
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            >
              <option></option>
            </select>
          </div>
          <div className="col-6 my-2">
            <MultiSelect label='Recipients' usersList={usersList} />
            {/* <input
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            /> */}
          </div>
          <div className="col-6 my-2">
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
          </div>
          <div className="col-6 my-2">
            <p>Interviewer</p>
            <select
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            >
              <option></option>
            </select>
          </div>
          <div className="col-6 my-2">
            <p>Other Email Ids</p>
            <input
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            />
          </div>
          <div className="col-6 my-2">
            <p>Comments</p>
            <textareaś
              name="designation"
              onChange={handleChange}
              // value={form.designation}
              type="text"
              className="client-form-input"
            />
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ApplicantSubmissionDetails;
