"use client";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { currencyJson } from "@/utils/currency";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { noticePeriodOption } from "./constant";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import { getReq, postApiReq } from "@/utils/apiHandlers";


const initialState = {
  name_title: "",
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  mobile: "",
  dob: "",
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
  skype_id:'',
  linkedin:'',
  authorization:'',
  authorization_expiry:'',
  is_clearance:'',
  clearance:'',
  relocation:'',
  current_compay:'',
  tax_terms:'',
  notice_period:'',
  experience:'',
  preferred_location:'',
  tex_terms:'',
  industry:'',
  expect_currency:'',
  expect_amount:'',
  expect_payment_frequency:'',
  expect_job_type:'',
  pancard:'',
  aadharcard:'',
  lwd:'',
  current_currency:'',
  current_amount:'',
  current_payment_frequency:'',
  current_job_type:'',
}

const CandidateCreation = ({ tab, setTab }) => {
  const [countryCode, setCountryCode] = useState("AF");
  const countryList = Country.getAllCountries();
  const stateList = State.getStatesOfCountry(countryCode);
  const [bulkResume, setBulkResume] = useState([]);
  const [primarySkils, setPrimarySkills] = useState([]);
  const [secondarySkills, setSecondarySkills] = useState([]);
  const [skills, setSkills] = useState("");
  const [form, setForm] = useState(initialState);
  const [usersList, setUsersList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveSkills = (_index) => {
    setForm((prev) => ({
      ...prev,
      primary_skills: prev.primary_skills.filter(
        (_, index) => index !== _index
      ),
    }));
  };

  const handleRemoveSecondarySkills = (_index) => {
    setForm((prev) => ({
      ...prev,
      secondary_skills: prev.secondary_skills.filter(
        (_, index) => index !== _index
      ),
    }));
  };

  useEffect(() => {
      handleGetUsersList();
  }, [])

  const handleGetUsersList = async () => {
    const response = await getReq(`/users/`);
    if (response.status) {
      setUsersList(response.data);
    }
  };

  const handleSubmit = async() => {
    try{
        const response = await postApiReq('/applicants/', form)
        if(response.status){
          toast.success('Applicant created successfully')
        }
        if(response.error){
          toast.error(response.error.detail);
        }
    }
    catch(err){
         toast.error()
    }
  }

  console.log("----------form ", form);
  

  return (
    <div className="shadow py-3 px-5">
      <div className="d-flex justify-content-between">
        <h4>Fill Applicant Details</h4>
        <div className="d-flex gap-2">
          <button onClick={handleSubmit} className="theme-btn btn-style-one small">
            Save & Continue
          </button>
          <button onClick={() => setForm(initialState)} className="theme-btn btn-style-four small">Reset</button>
          <button
            onClick={() => setTab(null)}
            className="theme-btn btn-style-four small"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-4 my-1">
          <p>First Name</p>
          <div className="d-flex gap-2">
            <div className="w-25">
              <select
                value={form.name_title}
                name="name_title"
                onChange={handleChange}
                className="client-form-input"
              >
                <option>Select</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
              </select>
            </div>
            <div className="w-75">
              <input
                name="firstname"
                onChange={handleChange}
                value={form.firstname}
                type="text"
                className="client-form-input"
              />
            </div>
          </div>
        </div>
        <div className="col-4 my-1">
          <p>Middle Name</p>
          <input
            name="middlename"
            onChange={handleChange}
            value={form.middlename}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Last Name</p>
          <input
            name="lastname"
            onChange={handleChange}
            value={form.lastname}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Email</p>
          <input
            name="email"
            onChange={handleChange}
            value={form.email}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Mobile</p>
          <input
            name="mobile"
            onChange={handleChange}
            value={form.mobile}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Date Of Birth</p>
          <DatePickerCustom
            handleDate={(date) => setForm((prev) => ({ ...prev, dob: date }))}
            date={form.dob}
          />
          {/* <input type="text" className="client-form-input" /> */}
        </div>
        <div className="col-4 my-1">
          <p>Skype ID</p>
          <input
            name="skype_id"
            onChange={handleChange}
            value={form.skype_id}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Linkedin Profile URL</p>
          <input
            name="linkedin"
            onChange={handleChange}
            value={form.linkedin}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Work Authorization</p>
          <select
            name="authorization"
            onChange={handleChange}
            value={form.authorization}
            type="text"
            className="client-form-input"
          >
            <option>Select</option>
            <option>US Authorized</option>
            <option>US Citizen</option>
          </select>
        </div>
        <div className="col-4 my-1">
          <p>Clearance</p>
          <div className="d-flex gap-2">
          <div className="d-flex gap-2">
            <input
              name="is_clearance"
              onChange={handleChange}
              value="yes"
              checked={form.is_clearance == "yes"}
              type="radio"
              // className="client-form-input"
            />
            <label>Yes</label>
          </div>
          <div className="d-flex gap-2">
            <input
              name="is_clearance"
              onChange={handleChange}
              value="no"
              checked={form.is_clearance == "no"}
              type="radio"
              // className="client-form-input"
            />
            <label>No</label>
          </div>
          </div>
        </div>
        {form.is_clearance == 'yes' &&
        <div className="col-4 my-1">
          <p>Clearance</p>
          <input
            name="clearance"
            onChange={handleChange}
            value={form.clearance}
            type="text"
            className="client-form-input"
          />
        </div>
        }
        <div className="col-4 my-1">
          <p>Address</p>
          <textarea
            name="address"
            onChange={handleChange}
            value={form.address}
            type="text"
            style={{height:'70px'}}
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Country</p>
          <select
            className="client-form-input"
            name="country"
            onChange={handleChange}
            value={form.country}
          >
            <option>Select</option>

            {countryList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-4 my-1">
          <p>State</p>
          <select
            className="client-form-input"
            name="state"
            onChange={handleChange}
            value={form.state}
          >
            <option>Select</option>
            {stateList.length > 0 ? (
              stateList.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })
            ) : (
              <option value={form.state}>{form.state}</option>
            )}
          </select>
        </div>
        <div className="col-4 my-1">
          <p>City</p>
          <input
            name="city"
            onChange={handleChange}
            value={form.city}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Zip Code</p>
          <input
            name="zipcode"
            onChange={handleChange}
            value={form.zipcode}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Source</p>
          <select
            name="source"
            onChange={handleChange}
            value={form.source}
            type="text"
            className="client-form-input"
          >
            <option>Dice</option>
            <option>Monester</option>
          </select>
        </div>
        <div className="col-4 my-1">
          <p>Experience</p>
          <input type="text" name="experience" value={form.experience} onChange={handleChange} className="client-form-input" />
        </div>
        <div className="col-4 my-1">
          <p>Referred By</p>
          <input
            name="referred_by"
            onChange={handleChange}
            value={form.referred_by}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Applicant Status</p>
          <select type="text" className="client-form-input" name="status" value={form.status} onChange={handleChange} >
            <option>Select</option>
            <option>Do NOT Call</option>
            <option>Do NOT Submit</option>
            <option>Imported from Ktek</option>
            <option>New Lead</option>
            <option>Out of Market</option>
            <option>Placed</option>
          </select>
        </div>
      
        <div className="col-4 my-2">
            <p>Ownership</p>
            <div className="position-relative cursor-pointer">
              <div
                className="client-form-input d-flex justify-content-between custom-scroll-sm"
                onClick={() => setOpen(!open)}
                style={{ minHeight: "36px", maxHeight: "100px", overflow:'auto' }}
              >
                <div className="d-flex flex-wrap gap-2">
                  {ownerList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                        style={{ background: "var(--primary-2nd-color)" }}
                      >
                        <span>{item.first_name} {item.last_name}</span>
                        {/* <span onClick={() => handleClose(item)} className="text-black fs-6 cursor-pointer">{reactIcons.close}</span> */}
                      </div>
                    );
                  })}
                </div>
                <span className=" float-end">{reactIcons.downarrow}</span>
              </div>
              {open && (
                <div
                  className="position-absolute bg-white border border-1 w-100 px-2 custom-scroll-sm"
                  style={{ top: "33px", zIndex: 10000 }}
                >
                  {/* <div>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#languageModal"
                      className="theme-btn btn-style-three small d-flex align-items-center"
                      onClick={() => setOpen(false)}
                      style={{ width: "100%" }}
                    >
                      <span>Add</span>
                    </button>
                  </div> */}
                  {usersList.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <input
                          type="checkbox"
                          checked={form?.ownership?.find(
                            (_item) => _item == item.id
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOwnerList((prev) => [...prev, item])
                              setForm((prev) => ({
                                ...prev,
                                ownership: [
                                  ...prev.ownership,
                                  item.id
                                ],
                              }));
                            } else {
                              const updatedOwnerList = ownerList.filter((_item) => _item.id !== item.id)
                               setOwnerList(updatedOwnerList);
                              setForm((prev) => ({
                                ...prev,
                                ownership: prev.ownership.filter(
                                  (_item) => _item !== item.id
                                ),
                              }));
                            }
                          }}
                        />
                        <span className="mx-2">{item.first_name} {item.last_name} {item.email}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        <div className="col-4 my-1">
          <p>Job Title</p>
          <input name='job_title' value={form.job_title} onChange={handleChange} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-2">
            <p>Expected Pay</p>
            <div className="d-flex gap-3">
              <select
                name="expect_currency"
                value={form.expect_currency}
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>Select</option>
                {currencyJson.map((item, index) => {
                   return(
                     <option value={item.code}> {item.code} ({item.name})</option>
                   )
                })
                }
              </select>
              <input
                name="expect_amount"
                type="text"
                value={form.expect_amount}
                placeholder="Rate"
                onChange={handleChange}
                className="px-2 client-input-style form-mult-box form-mult-box"
              />
              <select
                value={form.expect_payment_frequency}
                name="expect_payment_frequency"
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>Select</option>
                <option>Hourly</option>
                <option>Monthly</option>
                <option>Annually</option>
              </select>
              <select
                value={form.expect_job_type}
                name="expect_job_type"
                onChange={handleChange}
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
        <div className="col-4 my-1">
          <p>Relocation</p>
          <div className="d-flex gap-2">
          <div className="d-flex gap-2">
            <input
              name="relocation"
              onChange={handleChange}
              value={form.relocation}
              type="radio"
              // className="client-form-input"
            />
            <label>Yes</label>
          </div>
          <div className="d-flex gap-2">
            <input
              name="relocation"
              onChange={handleChange}
              value={form.relocation}
              type="radio"
              // className="client-form-input"
            />
            <label>No</label>
          </div>
          </div>
        </div>
        <div className="col-4 my-1">
          <p>Current Company</p>
          <input name="current_company" onChange={handleChange} value={form.current_compay} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-2">
            <p>
              Primary Skills{" "}
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="top-right"
                title="Please enter skills enter button as seprator"
                className="text-primary"
              >
                {reactIcons.info}
              </span>
            </p>
            <div  className="d-flex flex-wrap position-relative custom-scroll-sm  px-2" style={{minHeight:'36px',border:'1px solid black', borderRadius:'3px', maxHeight:'125px', overflowY:'auto'}}>
                    <div className="d-flex  flex-wrap mt-1">
                      {form.primary_skills.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="mx-1 my-1 px-1 gap-6 text-black fw-medium  rounded"
                            style={{ background: "var(--primary-2nd-color)" }}
                          >
                            <span>{item.name ? item.name : item}</span>
                            <span
                              className="cursor-pointer text-black ms-2"
                              onClick={() => handleRemoveSkills(index)}
                            >
                              {reactIcons.close}
                            </span>
                          </div>
                        );
                      })}
                    </div>
              <input
                name="primary_skills"
                value={skills}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setForm((prev) => ({
                      ...prev,
                      primary_skills: [
                        ...prev.primary_skills,
                        { name: skills },
                      ],
                    }));
                    setSkills("");
                  }
                }}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
                
                type="text"
              />
            </div>
          </div>
          <div className="col-4 my-2">
            <p>
              Secondary Skills{" "}
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top-right"
                title="Please enter skills enter button as seprator"
                className="text-primary"
              >
                <span>{reactIcons.info}</span>
              </button>
            </p>
            <div className="d-flex flex-wrap position-relative custom-scroll-sm  px-2" style={{minHeight:'36px',border:'1px solid black', borderRadius:'3px', maxHeight:'125px', overflowY:'auto'}}>
                    <div className="d-flex   flex-wrap mt-1">
                      {form.secondary_skills.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="mx-1 px-1 my-1 gap-6 text-black fw-medium rounded"
                            style={{ background: "var(--primary-2nd-color)" }}
                          >
                            <span>{item.name ? item.name : item}</span>
                            <span
                              className="cursor-pointer ms-2 text-black"
                              onClick={() => handleRemoveSecondarySkills(index)}
                            >
                              {reactIcons.close}
                            </span>
                          </div>
                        );
                      })}
                    </div>
              <input
                name="secondary_skills"
                value={secondarySkills}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setForm((prev) => ({
                      ...prev,
                      secondary_skills: [
                        ...prev.secondary_skills,
                        { name: secondarySkills },
                      ],
                    }));
                    setSecondarySkills("");
                  }
                }}
                onChange={(e) => {
                  setSecondarySkills(e.target.value);
                }}
                // className="client-form-input"
                type="text"
              />
            </div>
          </div>
          <div className="col-4 my-1">
          <p>Work Authorization Expiry</p>
           <DatePickerCustom  handleDate={(date) => setForm((prev) => ({ ...prev, authorization_expiry: date }))}
            date={form.authorization_expiry} />
        </div>
        <div className="col-4 my-1">
          <p>Tax Terms</p>
          <select name="tax_terms" value={form.tax_terms} onChange={handleChange} className="client-form-input" >
            <option>select</option>
            <option>Contract</option>
            <option>Full Time</option>
            <option>Part Time</option>
            </select>
        </div>
       
        <div className="col-4 my-1">
          <p>Notice Period</p>
          <select value={form.notice_period} name="notice_period" onChange={handleChange} className="client-form-input" >
            <option>Select</option>
            {noticePeriodOption.map((item, index) => {
              return(
                <option key={index}>{item.name}</option>
              )
            })

            }
            </select>
            {form.notice_period == 'Currently Serving Notice Period' &&
              <div className="py-2">
                <DatePickerCustom 
                  handleDate={(date) => setForm((prev) => ({ ...prev, lwd: date }))}
                  date={form.lwd}
                />
              </div>
            }
        </div>
        <div className="col-4 my-1">
          <p>Industry</p>
          <select type="text" onChange={handleChange} name="industry" value={form.industry} className="client-form-input" >
             <option>Software</option>
             <option>Hardware</option>
            </select>
        </div>
        <div className="col-4 my-1">
          <p>Current CTC</p>
          <div className="d-flex gap-3">
              <select
                name="current_currency"
                value={form.current_currency}
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>Select</option>
                {currencyJson.map((item, index) => {
                   return(
                     <option value={item.code}> {item.code} ({item.name})</option>
                   )
                })
                }
              </select>
              <input
                name="current_amount"
                type="text"
                value={form.current_amount}
                placeholder="Rate"
                onChange={handleChange}
                className="px-2 client-input-style form-mult-box form-mult-box"
              />
              <select
                value={form.current_payment_frequency}
                name="current_payment_frequency"
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>Select</option>
                <option>Hourly</option>
                <option>Monthly</option>
                <option>Annually</option>
              </select>
              <select
                value={form.current_job_type}
                name="current_job_type"
                onChange={handleChange}
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
        
        <div className="col-4 my-1">
          <p>Pan Card Number</p>
          <input type="text" onChange={handleChange} name="pancard" value={form.pancard} className="client-form-input" />
        </div>
        <div className="col-4 my-1">
          <p>Aadhar Card Number</p>
          <input type="text" onChange={handleChange} name="aadharcard" value={form.aadharcard} className="client-form-input" />
        </div>
      </div>
    </div>
  );
};

export default CandidateCreation;
