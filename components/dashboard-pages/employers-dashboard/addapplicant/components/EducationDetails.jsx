"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import Paper from "@/components/common/Paper";
import { deleteReq, postApiReq } from "@/utils/apiHandlers";
import { courses } from "@/utils/courses";
import { reactIcons } from "@/utils/icons";
import { Country, State } from "country-state-city";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  institute_name: "",
  degree: "",
  completed_year: new Date(),
  cgpa: "",
  country: "",
  state: "",
  city: "",
};

const EducationDetails = ({ applicantDetails, handleGetApplicantDetails }) => {
  const [form, setForm] = useState(initialState);
  const [countryCode, setCountryCode] = useState("AF");
  const countryList = Country.getAllCountries();
  const stateList = State.getStatesOfCountry(countryCode);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEducationDetails = async () => {
    form["applicant_ref"] = applicantDetails.id;
    setIsLoading(true);
    const response = await postApiReq(`/applicant-educations/`, form);
    setIsLoading(false);
    if (response.status) {
      handleGetApplicantDetails();
      toast.success('Education Details has been created successfully ')
      setOpen(false);
      setForm(initialState);
    }
  };
  useEffect(() => {
    if (form.country) {
      let country = countryList.find((item) => item.name == form.country);
      setCountryCode(country?.isoCode);
    }
  }, [form.country]);

  useEffect(() => {
       if(typeof applicantDetails?.education == 'object'){
        setOpen(true);
         setForm((prev) => ({
          ...prev,
          institute_name: applicantDetails?.education?.institute_name ? applicantDetails?.education?.institute_name : '',
          degree: applicantDetails?.education?.degree ? applicantDetails?.education?.degree : '' ,
          completed_year: applicantDetails?.education?.completed_year ? new Date(applicantDetails?.education?.completed_year) : new Date(),
          cgpa: applicantDetails?.education?.cgpa ? applicantDetails?.education?.cgpa : '' ,
          country: applicantDetails?.education?.country ? applicantDetails?.education?.country : '',
          state: applicantDetails?.education?.state ? applicantDetails?.education?.state : '',
          city: applicantDetails?.education?.city ? applicantDetails?.education?.city : '' ,
         }))
       }
  }, [applicantDetails?.education])


  const handleDeleteEduDetails = async(id) => {
    const response = await deleteReq(`/applicant-educations/${id}/`)
    if(response.status){
      toast.success('Education detail has been deleted successfully');
      handleGetApplicantDetails();
    }
  }

  return (
<Paper>
<div className="py-3 px-3">
        <div className="d-flex justify-content-between">
          <h4>Add Education Details</h4>
          <button
            // data-bs-toggle="offcanvas"
            // data-bs-target="#offcanvasMeeting"
            // aria-controls="offcanvasMeeting"
            className="theme-btn btn-style-one small"
            onClick={() => setOpen(true)} 
          >
            Add
          </button>
        </div>
        {open ? 
          <>
        <div className="row">
          <div className="col-4 my-1">
            <p>School Name</p>
            <input
              name="institute_name"
              onChange={handleChange}
              value={form.institute_name}
              type="text"
              className="client-form-input"
            />
          </div>
          <div className="col-4 my-1">
            <p>Degree</p>
            <input
              name="degree"
              onChange={handleChange}
              value={form.degree}
              type="text"
              className="client-form-input"
            />
              {/* <option>Select</option>
              {courses.map((item, index) =>{
                return(
                  <option key={index} value={item.degree}>{item.degree}</option>
                )
              } )
              }
            </input> */}
          </div>
          <div className="col-4 my-1">
            <p>Year Completed</p>
            <DatePickerCustom
              handleDate={(date) =>
                setForm((prev) => ({ ...prev, completed_year: date }))
              }
              date={form.completed_year}
            />
          </div>
          <div className="col-4 my-1">
            <p>GPA</p>
            <input
              name="cgpa"
              onChange={handleChange}
              value={form.cgpa}
              type="text"
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
        </div>
        <div className="d-flex justify-content-end gap-2 my-3">
          <button
            onClick={handleSaveEducationDetails}
            className="theme-btn btn-style-one small"
            disabled={isLoading}
          >
            {isLoading ? <BtnBeatLoader /> : "Save"}
          </button>
          <button
            onClick={() =>{
               setForm(initialState)
               setOpen(false);
              }}
            className="theme-btn btn-style-four small"
          >
            Cancel
          </button>
        </div>
          </>
          :
          <div>
          {applicantDetails?.education?.length > 0 && applicantDetails?.education?.map((item) => {
            return(
              <div key={item.id} className="my-2 px-2 py-2 d-flex justify-content-between border" >
                <div>
                  <h5>{item.degree}</h5>
                  <span>{item.institute_name} | {item.city} {item.state} {item.country} </span>
                  <p>{moment(item.completed_year).format('MMM-YYYY')}</p>
                  <span>Grade - {item.cgpa}</span>
                </div>
                <div className="position-relative px-2" >
                <strong
                  className="cursor-pointer"
                  onClick={() => {
                    if (openOption) setOpenOption(null);
                    else setOpenOption(item.id);
                  }}
                >
                  {reactIcons.dots}
                </strong>
                {item.id == openOption && (
                  <div
                    className="position-absolute bg-white shadow px-2 py-1 rounded-1"
                    style={{
                      width: "150px",
                      height: "60px",
                      right: "0px",
                      zIndex: "1000",
                    }}
                  >
                    <p
                      onClick={() =>{
                         handleDeleteEduDetails(item.id)
                        //  setOpen(!open);
                        }}
                      className="cursor-pointer"
                    >
                      {reactIcons.delete} Delete
                    </p>
                    {/* <p
                      onClick={() => {
                      setTask(item)
                        setForm((prev) => ({
                          ...prev,
                          description: item.text,
                        }));
                       setOpenOption(null)
                      }}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasTask"
                      aria-controls="offcanvasTask"
                      className="cursor-pointer"
                    >
                      {" "}
                      {reactIcons.edit} Update
                    </p> */}
                  </div>
                )}
              </div>
              </div>
            )
           })
           }
          </div>
        }
      </div>
</Paper>
  );
};

export default EducationDetails;
