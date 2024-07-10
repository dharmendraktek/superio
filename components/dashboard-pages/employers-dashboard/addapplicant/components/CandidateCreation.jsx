'use client'
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { Country, State } from "country-state-city";
import { useState } from "react";

const CandidateCreation = ({tab, setTab}) => {
  const [countryCode, setCountryCode] = useState("AF");
  const countryList = Country.getAllCountries();
  const stateList = State.getStatesOfCountry(countryCode);
  const [bulkResume, setBulkResume] = useState([]);
  const [form, setForm] = useState({
     name_title:'',
     firstname:'',
     middlename:'',
     lastname:'',
     email:'',
     mobile:'',
     dob:'',
     state:'',
     city:'',
     address:'',
     city:'',
     country:'',
     state:'',
     zipcode:'',
     source:'',
     referred_by:'',
     status:'',
     ownership:'',
     job_title:'',
     relocation:'',
     skills:[],
     primary_skills:[],
     notice_period:'',
     
  })


  const handleChange = (e) => {
     const {name, value} = e.target;
     setForm((prev) => ({...prev, [name]:value}))
  }


  return (
    <div className="shadow py-3 px-4">
      <div className="d-flex justify-content-between">
        <h4>Fill Applicant Details</h4>
        <div className="d-flex gap-2">
          <button className="theme-btn btn-style-one small">
            Save & Continue
          </button>
          <button className="theme-btn btn-style-four small">Reset</button>
          <button onClick={() => setTab(null)} className="theme-btn btn-style-four small">Cancel</button>
        </div>
      </div>
      <div className="row">
        <div className="col-4 my-1">
          <p>First Name</p>
          <div className="d-flex gap-2">
            <div className="w-25">
              <select value={form.name_title} name="name_title" onChange={handleChange} className="client-form-input">
                <option>Select</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
              </select>
            </div>
            <div className="w-75">
              <input name="firstname" onChange={handleChange} value={form.firstname} type="text" className="client-form-input" />
            </div>
          </div>
        </div>
        <div className="col-4 my-1">
          <p>Middle Name</p>
          <input name="middlename" onChange={handleChange} value={form.middlename} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
          <p>Last Name</p>
          <input name='lastname'  onChange={handleChange} value={form.lastname} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Email</p>
          <input name="email" onChange={handleChange} value={form.email} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Mobile</p>
          <input name="mobile" onChange={handleChange} value={form.mobile} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Date Of Birth</p>
            <DatePickerCustom  handleDate={(date) => setForm((prev) => ({...prev, dob:date}))} date={form.dob}  />
          {/* <input type="text" className="client-form-input" /> */}
        </div>
        <div className="col-4 my-1">
            <p>Address</p>
          <input name="address" onChange={handleChange} value={form.address} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>City</p>
          <input name="city" onChange={handleChange} value={form.city} type="text" className="client-form-input" />
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
                  <option value={form.state}>
                    {form.state}
                  </option>
                )}
              </select>
        </div>
        <div className="col-4 my-1">
            <p>Zip Code</p>
          <input name="zipcode" onChange={handleChange} value={form.zipcode} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Source</p>
          <input name="source" onChange={handleChange} value={form.source} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Experience</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Referred By</p>
          <input name="referred_by" onChange={handleChange} value={form.referred_by} type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Applicant Status</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Ownership</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Job Title</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Relocation</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Zip Code</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Notice Period</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Skills</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Primary Skills</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Expected Pay</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Current CTC</p>
          <input type="text" className="client-form-input" />
        </div>
        <div className="col-4 my-1">
            <p>Current Company</p>
          <input type="text" className="client-form-input" />
        </div>
      </div>
    </div>
  );
};

export default CandidateCreation;
