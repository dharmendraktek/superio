"use client";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { currencyJson } from "@/utils/currency";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { noticePeriodOption, sourceTypes, workAuthorization } from "./constant";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import { getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import axios from "axios";
import { BASE_URL } from "@/utils/endpoints";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import { useRouter } from "next/navigation";
import { sourceData } from "@/utils/constant";
import { TaxTerms } from "../../addjob/components/constant";

const initialState = {
  name_title: "",
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  mobile: "",
  dob: null,
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
  authorization_expiry: null,
  is_clearance: "no",
  clearance: "",
  relocation: "",
  current_company: "",
  tax_terms: "",
  notice_period: "",
  experience: "",
  preferred_location: "",
  tex_terms: "",
  industry: "",
  expect_currency: "USD",
  expect_amount: "",
  expect_payment_frequency: "",
  expect_job_type: "",
  pancard: "",
  aadharcard: "",
  lwd: null,
  current_currency: "",
  current_amount: "",
  current_payment_frequency: "",
  current_job_type: "",
};

const CandidateCreation = ({
  tab,
  setTab,
  applicantData,
  applicantDetails,
  setApplicantDetails,
  setActiveForm,
  resume,
}) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    mobileErr: "",
    workAuthErr: "",
    sourceErr: "",
    taxTermErr: "",
  });
  
  const [openPrim, setOpenPrim] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [document, setDocument] = useState(resume ? resume : "");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (form.country) {
      let country = countryList.find((item) => item.name == form.country);
      setCountryCode(country?.isoCode);
    }
  }, [form.country]);

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
  }, []);

  useEffect(() => {
    if (applicantData) {
      setOwnerList(
        applicantData.ownership_details ? applicantData.ownership_details : []
      );
      setForm((prev) => ({
        ...prev,
        name_title: applicantData.name_title ? applicantData.name_title : "",
        firstname:
          applicantData.firstname == "null" || !applicantData.firstname
            ? ""
            : applicantData.firstname,
        middlename:
          applicantData.middlename == "null" || !applicantData.middlename
            ? ""
            : applicantData.middlename,
        lastname:
          applicantData.lastname == "null" || !applicantData.lastname
            ? ""
            : applicantData.lastname,
        email:
          applicantData.email == "null" || !applicantData.email
            ? ""
            : applicantData.email,
        mobile:
          applicantData.mobile == "null" || !applicantData.mobile
            ? null
            : applicantData.mobile,
        dob:
          applicantData.dob == "null" || !applicantData.dob
            ? null
            : new Date(applicantData.dob),
        country:
          applicantData.country == "null" || !applicantData.country
            ? ""
            : applicantData.country,
        state:
          applicantData.state == "null" || !applicantData.state
            ? ""
            : applicantData.state,
        city:
          applicantData.city == "null" || !applicantData.city
            ? ""
            : applicantData.city,
        address:
          applicantData.address == "null" || !applicantData.address
            ? ""
            : applicantData.address,
        zipcode: applicantData.zipcode ? applicantData.zipcode : "",
        source: applicantData.source ? applicantData.source : "",
        referred_by: applicantData.referred_by ? applicantData.referred_by : "",
        status: applicantData.status ? applicantData.status : "",
        ownership: applicantData.ownership ? applicantData.ownership : [],
        job_title: applicantData.job_title ? applicantData.job_title : "",
        relocation: applicantData.relocation ? applicantData.relocation : "",
        primary_skills:typeof applicantData.primary_skills == "string"
        ? applicantData.primary_skills.split(",").map((name) => ({ name }))
        : applicantData.primary_skills == "Not specified" ? [] :applicantData.primary_skills ? applicantData.primary_skills : [],
        secondary_skills: typeof applicantData.secondary_skills == "string"
        ? applicantData.secondary_skills.split(",").map((name) => ({ name }))
        : applicantData.secondary_skills == "Not specified" ? [] :applicantData.secondary_skills ? applicantData.secondary_skills : [],
        notice_period: applicantData.notice_period
          ? applicantData.notice_period
          : "",
        skype_id: applicantData.skype_id ? applicantData.skype_id : "",
        linkedin: applicantData.linkedin ? applicantData.linkedin : "",
        authorization: applicantData.authorization
          ? applicantData.authorization
          : "",
        // authorization_expiry: applicantData.authorization_expiry == 'null'
        //   ? new Date() : applicantData.authorization_expiry,
        is_clearance: applicantData.is_clearance
          ? applicantData.is_clearance
          : "",
        clearance: applicantData.clearance ? applicantData.clearance : "",
        current_company:
          applicantData.current_company == "null" ||
          !applicantData.current_company
            ? ""
            : applicantData.current_company,
        tax_terms: applicantData.tax_terms ? applicantData.tax_terms : "",
        experience: applicantData.experience ? applicantData.experience : "",
        preferred_location: applicantData.preferred_location
          ? applicantData.preferred_location
          : "",
        industry: applicantData.industry ? applicantData.industry : "",
        expect_currency: applicantData.expect_currency
          ? applicantData.expect_currency
          : "",
        expect_amount: applicantData.expect_amount
          ? applicantData.expect_amount
          : "",
        expect_payment_frequency: applicantData.expect_payment_frequency
          ? applicantData.expect_payment_frequency
          : "",
        expect_job_type: applicantData.expect_job_type
          ? applicantData.expect_job_type
          : "",
        pancard: applicantData.pancard ? applicantData.pancard : "",
        aadharcard: applicantData.aadharcard ? applicantData.aadharcard : "",
        // lwd: applicantData.lwd == 'null' ? new Date() : applicantData.lwd ,
        current_currency: applicantData.current_currency
          ? applicantData.current_currency
          : "",
        current_amount: applicantData.current_amount
          ? applicantData.current_amount
          : "",
        current_payment_frequency: applicantData.current_payment_frequency
          ? applicantData.current_payment_frequency
          : "",
        current_job_type: applicantData.current_job_type
          ? applicantData.current_job_type
          : "",
      }));
    }
  }, [applicantData]);

  const handleGetUsersList = async () => {
    const response = await getReq(`/users/`);
    if (response.status) {
      setUsersList(response.data);
    }
  };

  const handleSubmit = async () => {
    if (!form.firstname) {
      setError((prev) => ({ ...prev, firstNameErr: "This Field is required" }));
      // return;
    }
    if (!form.lastname) {
      setError((prev) => ({ ...prev, lastNameErr: "This Field is required" }));
      // return;
    }
    if (!form.email) {
      setError((prev) => ({ ...prev, emailErr: "This Field is required" }));
      // return;
    }
    if (!form.mobile) {
      setError((prev) => ({ ...prev, mobileErr: "This Field is required" }));
      // return;
    }
    // if (!form.authorization) {
    //   setError((prev) => ({ ...prev, workAuthErr: "This Field is required" }));
    //   // return;
    // }
    if (!form.source) {
      setError((prev) => ({ ...prev, sourceErr: "This Field is required" }));
      // return;
    }
    // if (!form.tax_terms) {
    //   setError((prev) => ({ ...prev, taxTermErr: "This Field is required" }));
    //   return;
    // }
    if (
      form.firstname &&
      form.lastname &&
      form.email &&
      form.mobile &&
      // form.authorization &&
      form.source 
      // &&
      // form.tax_terms
    ) {
      try {
        setIsLoading(true);
        const response = applicantData?.id
          ? await patchReq(`/applicants/${applicantData?.id}/`, form)
          : await postApiReq("/applicants/", form);
          console.log("-------------respoenr ", response);
         setIsLoading(false);

        if (response.status) {
          setForm(initialState);
          let message = applicantData.id
            ? "Applicant updated successfully"
            : "Applicant created successfully";

          toast.success(message);
          setApplicantDetails(response.data);
          if (!applicantData.id) {
            setActiveForm(2);
            handleUploadDoc(response.data.id);
          } else if (applicantData.id) {
            // router.push('/employers-dashboard/all-applicants/{}')
          }
        }
        if (!response.status) {
          if(response?.error?.mobile[0])
          toast.error(response?.error?.mobile[0]);
        }else if(response?.error?.email[0]){
          toast.error(response?.error?.mobile[0]);
        }
      } catch (err) {
        setIsLoading(false);
        console.log("----------------err ", err);
        toast.error(err.response || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (resume) {
      setForm((prev) => ({ ...prev, type: "Resume" }));
    }
  }, [resume]);

  useEffect(() => {
    if (document) {
      setForm((prev) => ({ ...prev, title: document.name }));
    }
  }, [document]);
  
  
  const handleUploadDoc = async (applicantId) => {
    const formData = new FormData();
    setIsLoading(true);
    // documents.forEach((file, index) => {
    formData.append("files", document);
    // });
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("comment", form.comment);
    formData.append("applicant", applicantId);
    if(form.is_default){
      formData.append("is_default", form.is_default);
    }
    const response = await postApiReq(`/applicant-documents/`, formData);
    setIsLoading(false);
    if (response.status) {
      // handleGetApplicantDetails();
      // setOpen(false);
      // handleClear()
      // toast.success("Document uploaded successfully");
    }
  };

  return (
    <div className="shadow py-3 px-3 bg-white">
      <div className="d-flex justify-content-between">
        <h4>{tab ? "Applicant Details" : "Applicant Details"}</h4>
        <div className="d-flex gap-2">
          <button
            onClick={handleSubmit}
            className="theme-btn btn-style-one small"
            disabled={isLoading}
          >
            {isLoading ? <BtnBeatLoader /> : "Save & Continue"}
          </button>
          <button
            onClick={() => setForm(initialState)}
            className="theme-btn btn-style-four small"
          >
            Reset
          </button>
          {/* <button
            onClick={() =>setTab(null)}
            className="theme-btn btn-style-four small"
          >
            Cancel
          </button> */}
        </div>
      </div>
      <div className="row manual-form">
        <div className="col-4 my-1">
          <p>
            First Name <strong className="text-danger">*</strong>
          </p>
          <div className="d-flex gap-2">
            {/* <div className="w-25">
              <select
                value={form.name_title}
                name="name_title"
                onChange={handleChange}
                className="client-form-input"
              >
                <option>Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
            </div> */}
            <div className="w-100">
              <input
                name="firstname"
                onChange={(e) => {
                  setError((prev) => ({ ...prev, firstNameErr: "" }));
                  handleChange(e);
                }}
                value={form.firstname}
                type="text"
                className="client-form-input"
                autocomplete="off"
              />
              <span className="text-danger">{error.firstNameErr}</span>
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
            autocomplete="off"
          />
        </div>
        <div className="col-4 my-1">
          <p>
            Last Name <strong className="text-danger">*</strong>
          </p>
          <input
            name="lastname"
            onChange={(e) => {
              setError((prev) => ({ ...prev, lastNameErr: "" }));
              handleChange(e);
            }}
            value={form.lastname}
            type="text"
            className="client-form-input"
            autocomplete="off"
          />
          <span className="text-danger">{error.lastNameErr}</span>
        </div>
        <div className="col-4 my-1">
          <p>
            Email <strong className="text-danger">*</strong>
          </p>
          <input
            name="email"
            onChange={(e) => {
              setError((prev) => ({ ...prev, emailErr: "" }));
              handleChange(e);
            }}
            value={form.email}
            type="text"
            className="client-form-input"
            autocomplete="off"
          />
          <span className="text-danger">{error.emailErr}</span>
        </div>
        <div className="col-4 my-1">
          <p>
            Mobile <strong className="text-danger">*</strong>
          </p>
          <input
            name="mobile"
            onChange={(e) => {
              setError((prev) => ({ ...prev, mobileErr: "" }));
              handleChange(e);
            }}
            value={form.mobile}
            type="text"
            className="client-form-input"
            autocomplete="off"
          />
          <span className="text-danger">{error.mobileErr}</span>
        </div>
        {/* <div className="col-4 my-1">
          <p>Date Of Birth</p>
          <DatePickerCustom
            handleDate={(date) => setForm((prev) => ({ ...prev, dob: date }))}
            date={form.dob}
          />
        </div> */}
        {/* <div className="col-4 my-1">
          <p>Skype ID</p>
          <input
            name="skype_id"
            onChange={handleChange}
            value={form.skype_id}
            type="text"
            className="client-form-input"
          />
        </div> */}
        <div className="col-4 my-1">
          <p>Linkedin Profile URL</p>
          <input
            name="linkedin"
            onChange={handleChange}
            value={form.linkedin}
            type="text"
            className="client-form-input"
            autocomplete="off"
          />
        </div>
        <div className="col-4 my-1">
          <p>
            Work Authorization 
            {/* <strong className="text-danger">*</strong> */}
          </p>
          <select
            name="authorization"
            onChange={(e) => {
              handleChange(e);
              if (!(e.target.value == "Select"))
                setError((prev) => ({ ...prev, workAuthErr: "" }));
            }}
            value={form.authorization}
            type="text"
            className="client-form-input"
          >
            <option>Select</option>
            {workAuthorization.map((item) => {
              return (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <span className="text-danger">{error.workAuthErr}</span>
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
        {form.is_clearance == "yes" && (
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
        )}
        <div className="col-4 my-1">
          <p>Address</p>
          <textarea
            name="address"
            onChange={handleChange}
            value={form.address}
            type="text"
            style={{ height: "70px" }}
            className="client-form-input"
            autocomplete="off"
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
            autocomplete="off"
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
            autocomplete="off"
          />
        </div>
        <div className="col-4 my-1">
          <p>
            Source <strong className="text-danger">*</strong>
          </p>
          <select
            name="source"
            onChange={(e) => {
              handleChange(e);
              if (!(e.target.value == "Select"))
                setError((prev) => ({ ...prev, sourceErr: "" }));
            }}
            value={form.source}
            type="text"
            className="client-form-input"
          >
            <option>Select</option>
            {sourceTypes.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <span className="text-danger">{error.sourceErr}</span>
        </div>
        <div className="col-4 my-1">
          <p>Experience</p>
          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="client-form-input"
            autocomplete="off"
          />
        </div>
        {/* <div className="col-4 my-1">
          <p>Referred By</p>
          <input
            name="referred_by"
            onChange={handleChange}
            value={form.referred_by}
            type="text"
            className="client-form-input"
          />
        </div> */}
        <div className="col-4 my-1">
          <p>Applicant Status</p>
          <select
            type="text"
            className="client-form-input"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
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
              style={{
                minHeight: "36px",
                maxHeight: "100px",
                overflow: "auto",
              }}
            >
              <div className="d-flex flex-wrap gap-2">
                {ownerList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                      style={{ background: "var(--primary-2nd-color)" }}
                    >
                      <span>
                        {item.first_name} {item.last_name}
                      </span>
                      {/* <span onClick={() => handleClose(item)} className="text-black fs-6 cursor-pointer">{reactIcons.close}</span> */}
                    </div>
                  );
                })}
              </div>
              <span className=" float-end">{reactIcons.downarrow}</span>
            </div>
            {open && (
              <>
                {/* <div className="position-fixed w-100">
                    <input type="text" className=""/>
                  </div> */}
                <div
                  className="position-absolute bg-white border border-1 w-100 px-2 custom-scroll-sm"
                  style={{
                    top: "33px",
                    zIndex: 10000,
                    maxHeight: "250px",
                    overflow: "auto",
                  }}
                >
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
                              setOwnerList((prev) => [...prev, item]);
                              setForm((prev) => ({
                                ...prev,
                                ownership: [...prev.ownership, item.id],
                              }));
                            } else {
                              const updatedOwnerList = ownerList.filter(
                                (_item) => _item.id !== item.id
                              );
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
                        <span className="mx-2">
                          {item.first_name} {item.last_name} {item.email}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-4 my-1">
          <p>Job Title</p>
          <input
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
            type="text"
            className="client-form-input"
            autocomplete="off"
          />
        </div>
        <div className="col-4 my-2">
          <p>Expected Pay</p>
          <div className="d-flex gap-2">
            <select
              name="expect_currency"
              value={form.expect_currency}
              onChange={handleChange}
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
              name="expect_amount"
              type="number"
              value={form.expect_amount}
              placeholder="Rate"
              onChange={handleChange}
              className="px-2 client-input-style form-mult-box form-mult-box"
              autocomplete="off"
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
        {/* <div className="col-4 my-1">
          <p>Relocation</p>
          <div className="d-flex gap-2 mt-3">
            <div className="d-flex gap-2">
              <input
                name="relocation"
                onChange={() => setForm((prev) =>({...prev, relocation:true}))}
                value={true}
                type="radio"
                checked={!form.relocation}
                // className="client-form-input"
              />
              <label>Yes</label>
            </div>
            <div className="d-flex gap-2">
              <input
                name="relocation"
                onChange={() => setForm((prev) =>({...prev, relocation:false}))}
                value={false}
                type="radio"
                checked={form.relocation}
                // className="client-form-input"
              />
              <label>No</label>
            </div>
          </div>
        </div> */}
        <div className="col-4 my-1">
          <p>Relocation</p>
          <div className="d-flex gap-2 mt-3">
            <div className="d-flex gap-2">
              <input
                name="relocation"
                onChange={() =>
                  setForm((prev) => ({ ...prev, relocation: true }))
                }
                value={true}
                type="radio"
                checked={form.relocation === true}
                // className="client-form-input"
              />
              <label>Yes</label>
            </div>
            <div className="d-flex gap-2">
              <input
                name="relocation"
                onChange={() =>
                  setForm((prev) => ({ ...prev, relocation: false }))
                }
                value={false}
                type="radio"
                checked={form.relocation === false}
                // className="client-form-input"
              />
              <label>No</label>
            </div>
          </div>
        </div>
        <div className="col-4 my-1">
          <p>Current Company</p>
          <input
            name="current_company"
            onChange={handleChange}
            value={form.current_company}
            type="text"
            className="client-form-input"
            autocomplete="off"
          />
        </div>
        <div className="col-4 my-2">
          <p>
            Primary Skills{" "}
            <button
                  className="text-primary position-relative"
                  onMouseEnter={() => setOpenPrim(true)}
                  onMouseLeave={() => setOpenPrim(false)}
                >
                  {reactIcons.info}
                  {openPrim &&
                  <div className="position-absolute bg-lightestblue rounded-1 p-1" style={{zIndex:5, width:"400px", top:"-10", minHeight:"40px", maxHeight:"fit-content"}}>
                      <span className="text-white">Please enter skills by using Enter button or mouse click as separator.</span>
                  </div> 
                  }
                </button>
          </p>
          <div
            className="d-flex flex-wrap position-relative custom-scroll-sm  px-2"
            style={{
              minHeight: "36px",
              borderBottom: "1px solid black",
              borderRadius: "3px",
              maxHeight: "125px",
              overflowY: "auto",
            }}
          >
            <div className="d-flex  flex-wrap mt-1">
              {form.primary_skills?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mx-1 my-1 px-1 gap-6 text-black fw-medium border rounded-1 border-primary"
                    // style={{ background: "var(--primary-2nd-color)" }}
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
              autocomplete="off"
              placeholder="Please enter skills by using Enter button or mouse click as separator."
              className="w-100"
              value={skills}
              onClick={() => {
                if (skills.trim()) {
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
              onKeyDown={(e) => {
                if (skills.trim() && e.key == "Enter") {
                  setForm((prev) => ({
                    ...prev,
                    primary_skills: [...prev.primary_skills, { name: skills }],
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
                  className="text-primary position-relative"
                  onMouseEnter={() => setOpenSecond(true)}
                  onMouseLeave={() => setOpenSecond(false)}
                >
                  {reactIcons.info}
                  {openSecond &&
                  <div className="position-absolute bg-lightestblue rounded-1 p-1" style={{zIndex:5, width:"400px", top:"-10", minHeight:"40px", maxHeight:"fit-content"}}>
                      <span className="text-white">Please enter skills by using Enter button or mouse click as separator.</span>
                  </div> 
                  }
                </button>
          </p>
          <div
            className="d-flex flex-wrap position-relative custom-scroll-sm  px-2"
            style={{
              minHeight: "36px",
              borderBottom: "1px solid black",
              borderRadius: "3px",
              maxHeight: "125px",
              overflowY: "auto",
            }}
          >
            <div className="d-flex   flex-wrap mt-1">
              {form.secondary_skills?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mx-1 px-1 my-1 gap-6 text-black  fw-medium border border-primary rounded-1"
                    // style={{ background: "var(--primary-2nd-color)" }}
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
              autocomplete="off"
              className="w-100"
              value={secondarySkills}
              placeholder="Please enter skills by using Enter button or mouse click as separator."
              onClick={() => {
                if (secondarySkills.trim()) {
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
              onKeyDown={(e) => {
                if (secondarySkills.trim() && e.key == "Enter") {
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
          <DatePickerCustom
            handleDate={(date) =>
              setForm((prev) => ({ ...prev, authorization_expiry: date }))
            }
            date={form.authorization_expiry}
          />
        </div>
        <div className="col-4 my-1">
          <p>
            Tax Terms 
            {/* <strong className="text-danger">*</strong> */}
          </p>
          <select
            name="tax_terms"
            value={form.tax_terms}
            onChange={(e) => {
              handleChange(e);
              if (!(e.target.value == "Select"))
                setError((prev) => ({ ...prev, taxTermErr: "" }));
            }}
            className="client-form-input"
          >
            <option>select</option>
            {TaxTerms.map((item) => {
              return <option key={item.name}>{item.name}</option>;
            })}
          </select>
          <span className="text-danger">{error.taxTermErr}</span>
        </div>

        <div className="col-4 my-1">
          <p>Notice Period</p>
          <select
            value={form.notice_period}
            name="notice_period"
            onChange={handleChange}
            className="client-form-input"
          >
            <option>Select</option>
            {noticePeriodOption.map((item, index) => {
              return <option key={index}>{item.name}</option>;
            })}
          </select>
          {form.notice_period == "Currently Serving Notice Period" && (
            <div className="py-2">
              <DatePickerCustom
                handleDate={(date) =>
                  setForm((prev) => ({ ...prev, lwd: date }))
                }
                date={form.lwd}
              />
            </div>
          )}
        </div>
        <div className="col-4 my-1">
          <p>Industry</p>
          <select
            type="text"
            onChange={handleChange}
            name="industry"
            value={form.industry}
            className="client-form-input"
          >
            <option>Software</option>
            <option>Hardware</option>
          </select>
        </div>
        {/* <div className="col-4 my-1">
          <p>Current CTC</p>
          <div className="d-flex gap-2">
            <select
              name="current_currency"
              value={form.current_currency}
              onChange={handleChange}
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
              name="current_amount"
              type="text"
              value={form.current_amount}
              placeholder="Rate"
              onChange={handleChange}
              className="px-2 client-input-style  form-mult-box"
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
        </div> */}

        {/* <div className="col-4 my-1">
          <p>Pan Card Number</p>
          <input
            type="text"
            onChange={handleChange}
            name="pancard"
            value={form.pancard}
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Aadhar Card Number</p>
          <input
            type="text"
            onChange={handleChange}
            name="aadharcard"
            value={form.aadharcard}
            className="client-form-input"
          />
        </div> */}
      </div>
      <div className="d-flex my-4 gap-2">
        <button
          onClick={handleSubmit}
          className="theme-btn btn-style-one small"
          disabled={isLoading}
        >
          {isLoading ? <BtnBeatLoader /> : "Save & Continue"}
        </button>
        <button
          onClick={() => setForm(initialState)}
          className="theme-btn btn-style-four small"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CandidateCreation;
