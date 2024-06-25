"use client";

import DatePickerCustom from "@/components/common/DatePickerCustom";
import { BASE_URL } from "@/utils/endpoints";
import axios from "axios";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { jobTypes, priorityTypes } from "./constant";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import HtmlEditor from "@/components/common/Editor";

const initialState = {
  job_code: "",
  title: "",
  currency: "",
  amount: "",
  payment_frequency: "",
  job_type: "",
  start_date: "",
  end_date: "",
  remote: "",
  lob: "",
  address: "",
  country: "",
  city: "",
  job_status: "",
  client: "",
  contact_manager: "",
  interview_mode: "",
  application_form: "",
  primary_skills: [],
  secondary_skills: [],
  languages: "",
  experiance: "",
  number_of_position: "",
  job_head_account_manager: "",
  job_account_manager: "",
  job_delivery_manager: "",
  assign: "",
  tax_term: "",
  department: "",
  description: "",
  post_on_portal: "",
  is_active: "",
};

const ManualCreation = ({ setTab }) => {
  const [form, setForm] = useState(initialState);
  const [countryCode, setCountryCode] = useState("AF");
  const [clientNameList, setClientNameList] = useState([]);
  const [lobList, setLobList] = useState([]);
  const [clientManagerList, setClientManagerList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const countryList = Country.getAllCountries();
  const stateList = State.getStatesOfCountry(countryCode);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (form.country) {
      let country = countryList.find((item) => item.name == form.country);
      setCountryCode(country.isoCode);
    }
  }, [form.country]);

  useEffect(() => {
    handleGetClientNames();
    handleGetUsersList();
  }, []);

  useEffect(() => {
    if (form.client) {
      handleGetClientContactManagers();
    }
  }, [form.client]);

  const handleGetLobs = async () => {
    const response = await axios.get(BASE_URL + "/lob/");
    if (response.status) {
      setLobList(response.data);
    }
  };

  const handleGetClientNames = async () => {
    const response = await axios.get(BASE_URL + "/clients-dropdown/");
    if (response.status) {
      setClientNameList(response.data);
    }
  };

  const handleGetClientContactManagers = async () => {
    const response = await axios.get(BASE_URL + `/client-details/${form.client}/`);
     if(response.status){
    setClientManagerList(response.data.contact_manager);
     }
  };


  const handleGetUsersList = async () => {
    const response = await axios.get(BASE_URL + "/users/");
    if (response.status) {
      console.log("--------respone ", response.data);
      setUsersList(response.data);
    }
  };

  const handleSubmit = async() =>{
    try{
      setIsLoading(true);
      const response = await axios.post(BASE_URL + '', form);
      console.log("--------response ", response);
    }catch(err){
      console.log("--------eror ", err);
      toast.error(err.response || "Something went wrong")
    }
  }

  const handleRemoveSkills = (_index) => {
    setForm((prev) => ({
      ...prev, 
      primary_skills:prev.primary_skills.filter((_, index) => index !== _index)
    }))
  }
  console.log("--------------forn ", form);

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between">
        <h4>New Job Posting</h4>
        <div>
          <button className="theme-btn btn-style-one mx-2 small" onClick={handleSubmit}>Save</button>
          <button
            onClick={() => setTab(null)}
            className="theme-btn btn-style-three small"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="shadow px-3 py-3 mt-2 border-2 border-top-primary">
        <div className="my-2">
          <h4 className="">Job Details</h4>
        </div>
        <div className="row">
          <div className="col-4 my-1">
            <p>Job Code</p>
            <input
              name="job_code"
              value={form.job_code}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Job Title</p>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Current Bill/Salary</p>
            <div className="d-flex gap-3">
              <select
                name="currency"
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>USD</option>
                <option>INR</option>
              </select>
              <input
                name="amount"
                type="text"
                onChange={handleChange}
                className="px-2 client-input-style form-mult-box form-mult-box"
              />
              <select
                name="payment_frequency"
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>Hourly</option>
              </select>
              {/* <select
                name="job_type"
                onChange={handleChange}
                className="client-input-style form-mult-box"
              >
                <option>Contract</option>
              </select> */}
            </div>
          </div>
          <div className="col-4 my-1">
            <p>Remote Job</p>
            <div className="d-flex gap-2">
              <input
                onChange={handleChange}
                type="radio"
                name="remote"
                value="yes"
              />
              <span>Yes</span> {" "}
              <input
                onChange={handleChange}
                type="radio"
                name="remote"
                value="no"
              />
              <span>No</span> {" "}
              <input
                onChange={handleChange}
                type="radio"
                name="remote"
                value="Hybrid"
              />
              <span>Hybrid</span>
            </div>
          </div>
          <div className="col-4 my-1">
            <p>Job Start Date</p>
            <DatePickerCustom
              handleDate={(date) =>
                setForm((prev) => ({ ...prev, start_date: date }))
              }
              date={form.start_date}
            />
          </div>
          <div className="col-4 my-1">
            <p>Job End Date</p>
            <DatePickerCustom
              handleDate={(date) =>
                setForm((prev) => ({ ...prev, end_date: date }))
              }
              date={form.end_date}
            />
          </div>
          <div className="col-4 my-1">
            <p>Names of LOB</p>
            <select
              value={form.lob}
              className="client-form-input"
              name="lob"
              onChange={handleChange}
              // disabled={contactDetails}
            >
              <option>Select</option>
              {lobList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.client_name}
                  </option>
                );
              })}
            </select>
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
                <option value={form.client_country}>
                  {form.client_country}
                </option>
              )}
            </select>
          </div>
          <div className="col-4 my-1">
            <p>City</p>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Job Status</p>
            <select
              value={form.job_status}
              className="client-form-input"
              name="job_status"
              // onChange={handleContactChange}
            >
              <option>Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Job Type</p>
            <select
              value={form.job_type}
              className="client-form-input"
              name="job_type"
              onChange={handleChange}
            >
              <option>Select</option>
              {jobTypes.map((item) => {
                return <option value={item.name}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Client</p>
            <select
              value={form.client}
              className="client-form-input"
              name="client"
              onChange={handleChange}
              // disabled={contactDetails}
            >
              <option>Select</option>
              {clientNameList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.client_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Contact Manager</p>
            <select
              value={form.contact_manager}
              className="client-form-input"
              name="contact_manager"
              onChange={handleChange}
            >
              <option>Select</option>
              {clientManagerList?.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Priority</p>
            <select
              value={form.priority}
              className="client-form-input"
              name="priority"
              onChange={handleChange}
            >
              <option>Select</option>
              {priorityTypes.map((item) => {
                return(
                  <option value={item.name}>{item.name}</option>
                )
              })
              }
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Application Form</p>
            <select
              value={form.application_form}
              className="client-form-input"
              name="application_form"
              onChange={handleChange}
            >
              <option>Select</option>
              <option value="General Application">General Application</option>
              <option value="Referral Portal Form">Referral Portal Form</option>
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Address</p>
            <textarea
              className="client-form-input"
              style={{ height: "65px" }}
            />
          </div>
          <div className="col-12 my-2">
            <h4>Skills</h4>
          </div>
          <div className="col-4 my-1">
            <p>Experience</p>
            <div className="d-flex gap-2">
              <input
                placeholder="Experiance"
                className="client-form-input"
                type="text"
                name="experiance"
                value={form.experiance}
                onChange={handleChange}
                style={{ width: "200px" }}
              />
              {/* <input
                placeholder="max"
                className="client-form-input"
                type="text"
                style={{ width: "150px" }}
              /> */}
              <span>Years</span>
            </div>
          </div>
          <div className="col-4 my-1">
            <p>Primary Skills <span data-bs-toggle="tooltip" data-bs-placement="top-right" title="Please enter skills enter button as seprator">{reactIcons.info}</span></p>
            <div className="position-relative">
            <input
              name="primary_skills"
              value={skills}
              onKeyDown={(e) => {
                console.log("--------e ", e.key)
                if(e.key == 'Enter'){
                  setForm((prev) => ({...prev, primary_skills:[...prev.primary_skills, {name:skills}]}))
                  setSkills('');
                }
              }}
              onChange={(e) => {
                  setSkills(e.target.value)
              }}
              className="client-form-input"
              type="text"
            />
            <div className="d-flex position-absolute mt-1">
             {form.primary_skills.map((item, index) => {
              return(
              <div key={index} className="mx-1 px-1 gap-6 text-white rounded bg-primary">
                   <span>{item.name}</span>
                   <span className="cursor-pointer ms-2" onClick={() => handleRemoveSkills(index)}>{reactIcons.close}</span>
              </div>
              )
             })
             }
            </div>
            </div>
          </div>
          <div className="col-4 my-1">
            <p>Secondary Skills</p>
            <input
              name="secondary_skills"
              // value={form.secondary_skills}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Languages</p>
          </div>
          <div className="col-12 my-2">
            <h4>Organizational Information</h4>
          </div>
          <div className="col-4 my-1">
            <p>Number of positions</p>
            <input
              name="number_of_position"
              value={form.number_of_position}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Maximum Allowed Submissions</p>
            <input
              name="job-code"
              value={form.email}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Tax Terms</p>
            <select
              // value={contactData.status}
              className="client-form-input"
              name="tax_term"
              // onChange={handleContactChange}
            >
              <option>Select</option>

              <option value="active">Fulltime</option>
              <option value="inactive">Part Time</option>
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Head Account Managers</p>
            <select
              value={form.head_account_manager}
              className="client-form-input"
              name="job_head_account_manager"
              onChange={handleChange}
            >
            {usersList.map((item) => {
              return <option key={item.id}>{item.username}</option>
            })
            }
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Department</p>
            <select
              value={form.department}
              className="client-form-input"
              name="department"
              onChange={handleChange}
            >
              <option>Select</option>

              <option value="active">Fulltime</option>
              <option value="inactive">Part Time</option>
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Delivery Manager</p>
            <select className="client-form-input" name="job_delivery_manager">
              <option>Select</option>
              {usersList.map((item) => {
              return <option key={item.id}>{item.username}</option>
            })
            }
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Account Manager</p>
            <select className="client-form-input" name="job_account_manager">
              <option>Select</option>
              {usersList.map((item) => {
              return <option key={item.id}>{item.username}</option>
            })
            }
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Assigned To</p>
            <select
              className="client-form-input"
              name="assign"
              value={form.assign}
              onChange={handleChange}
            >
              <option>Select</option>
              {usersList.map((item) => {
              return <option key={item.id}>{item.username}</option>
            })
            }
            </select>
          </div>
          <div className="col-4 my-1">
            <p>Career Portal Published Date</p>
            <DatePickerCustom />
          </div>
          <div className="col-12 my-1">
            <p>Job Description</p>
            <HtmlEditor />
          </div>
          <div className="col-12 my-1">
            <h4>Documents</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualCreation;
