import DatePickerCustom from "@/components/common/DatePickerCustom";
import { BASE_URL } from "@/utils/endpoints";
import axios from "axios";
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { jobStatus, jobTypes, priorityTypes, TaxTerms } from "./constant";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import HtmlEditor from "@/components/common/HtmlEditor";
import Image from "next/image";
import SelectWithSearch from "@/components/common/SelectWithSearch";
import LanguageModal from "./components/LanguageModal";
import UsersModal from "./components/UsersModal";
import { deleteReq, getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import { currencyJson } from "@/utils/currency";
import JobPostCommentsModal from "./components/JobPostCommentsModal";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import { useRouter } from "next/navigation";
import Paper from "@/components/common/Paper";

const initialState = {
  job_code: "",
  title: "",
  currency: "",
  amount: "",
  payment_frequency: "",
  job_type: "",
  start_date: new Date(),
  end_date: new Date(),
  remote: "",
  lob: "",
  address: "",
  country: "",
  city: "",
  state: "",
  job_status: "",
  client: "",
  contact_manager: "",
  interview_mode: "",
  application_form: "",
  primary_skills: [],
  secondary_skills: [],
  languages: [],
  experience: "",
  number_of_position: "",
  head_account_manager: "",
  account_manager: "",
  delivery_manager: "",
  assign: [],
  tax_term: "",
  department: "",
  description: "<p></p>",
  post_on_portal: new Date(),
  is_active: 1,
  priority: "",
  post_on_portal:false,
  // post_date_on_portal: "",
};

const ManualCreation = ({
  setTab,
  tab,
  setOpen,
  open,
  jobData,
  handleGetJobDetails,
  name,
  jobType,
  setJobData,
}) => {
  const [form, setForm] = useState(initialState);
  const [countryCode, setCountryCode] = useState("AF");
  const [clientNameList, setClientNameList] = useState([]);
  const [lobList, setLobList] = useState([]);
  const [clientManagerList, setClientManagerList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const countryList = Country.getAllCountries();
  const stateList = State.getStatesOfCountry(countryCode);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState("");
  const [secondarySkills, setSecondarySkills] = useState();
  const [openLang, setOpenLang] = useState(false);
  const [descriptionData, setDescriptionData] = useState();
  const [languageList, setLanguageList] = useState([]);
  const [teamId, setTeamId] = useState();
  const [assignList, setAssignList] = useState([]);
  const [search, setSearch] = useState();
  const [documents, setDocuments] = useState([]);
  const [option, setOption] = useState(false);
  const [comments, setComments] = useState();
  const [commentsErr, setCommentsErr] = useState("");
  const [error, setError] = useState({
    jobCodeErr: "",
    jobTitleErr: "",
    clientErr: "",
    lobErr: "",
    contactManagerErr: "",
    stateErr: "",
    cityErr: "",
    jobStatusErr: "",
    jobTypeErr: "",
    experienceErr: "",
    primarySkillsErr: "",
    positionErr: "",
    taxTermErr: "",
    deliveryManagerErr: "",
    accountManagerErr: "",
    assignToErr: "",
    jobDescriptionErr: "",
  });

  const router = useRouter();

  // const cityList = City?.getAllCities('MP');
  // console.log("----------city list ", cityList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   if(jobData.languages){
  //       jobData.forEach((item) => {

  //       })
  //   }
  // }, [jobData.languages])\


  useEffect(() => {
    if (jobData) {
      console.log("-----------job dat a", jobData);
      setAssignList(jobData.assign_details ? jobData.assign_details : []);
      setComments(jobData.comment);
      setForm((prev) => ({
        ...prev,
        job_code: jobData.job_code,
        title: jobData.title,
        currency: jobData.currency,
        amount: jobData.amount !== "Not specified" ? jobData.amount : 0,
        payment_frequency: jobData.payment_frequency,
        job_type: jobData.job_type,
        start_date: jobData.start_date,
        end_date: jobData.end_date,
        remote: jobData.remote,
        lob: jobData.lob,
        address: jobData.address,
        country: jobData.country,
        state: jobData.state,
        city: jobData.city,
        job_status: jobData.job_status,
        client: jobData.client,
        contact_manager: jobData.contact_manager,
        interview_mode: jobData.interview_mode,
        application_form: jobData.application_form,
        primary_skills:
          jobData.secondary_skills == "Not specified"
            ? []
            : typeof jobData.primary_skills == "object"
            ? jobData.primary_skills
            : typeof jobData.primary_skills == "string"
            ? jobData.primary_skills.split(",").map((name) => ({ name }))
            : [],
        secondary_skills:
          jobData.secondary_skills == "Not specified"
            ? []
            : typeof jobData.secondary_skills == "object"
            ? jobData.secondary_skills
            : typeof jobData.secondary_skills == "string"
            ? jobData.secondary_skills.split(",").map((name) => ({ name }))
            : [],
        languages: jobData?.languages ? jobData?.languages : [],
        experience: jobData.experience,
        number_of_position: jobData.number_of_position,
        head_account_manager: jobData.head_account_manager,
        account_manager: jobData.account_manager,
        delivery_manager: jobData.delivery_manager,
        assign: jobData.assign ? jobData.assign : [],
        tax_term:jobData.tax_term ? jobData.tax_term : '',
        department: jobData.department,
        description: jobData.description ? jobData.description : "<p></p>",
        is_active: 1,
        post_on_portal: true,
        // post_date_on_portal:form.post_date_on_portal,
        priority: jobData.priority,
      }));
    }
  }, [jobData]);

  useEffect(() => {
    if (form.country) {
      let country = countryList.find((item) => item.name == form.country);
      setCountryCode(country?.isoCode);
    }
  }, [form.country]);

  useEffect(() => {
    handleGetClientNames();
    handleGetJobCode();
    handleGetDepartment();
    handleGetLanguageList();
    handleGetUsersList();
  }, []);

  useEffect(() => {
    handleGetUsersList();
  }, [search]);

  useEffect(() => {
    if (form.client) {
      handleGetClientContactManagers();
      // handleGetLobs();
    }
  }, [form.client]);

  const handleGetLanguageList = async () => {
    const response = await getReq("/language/");
    setLanguageList(response.data);
  };

  const handleGetDepartment = async () => {
    const response = await getReq("/department-list/");
    setDepartmentList(response.data);
  };

  const handleGetJobCode = async () => {
    console.log("-------------job data ", jobData, name);
    if (!jobData || name=="parse") {
    const response = await getReq("/next-job-code/");
    if (response.status) {
      setForm((prev) => ({ ...prev, job_code: response.data.next_job_code }));
    }
    }
  };

  const handleGetLobs = async () => {
    const response = await getReq(`/lob/${form.client}/`);
    if (response.status) {
      setLobList(response.data ? response.data : []);
    }
  };

  const handleGetClientNames = async () => {
    const response = await getReq("/clients-dropdown/");
    if (response.status) {
      setClientNameList(response.data);
    }
  };

  const handleGetClientContactManagers = async () => {
    const response = await getReq(`/client-details/${form.client}/`);
    if (response.status) {
      setClientManagerList(response.data.contact_manager);
      setLobList(response.data.lob);
    }
  };

  const handleGetUsersList = async () => {
    const response = await getReq(
      `/users/${search ? `?search=${search}` : ""}`
    );
    if (response.status) {
      setUsersList(response.data);
    }
  };

  const handleValidation = () => {
    setError((prev) => ({
      ...prev, 
      jobCodeErr: "",
      jobTitleErr: "",
      clientErr: "",
      lobErr: "",
      contactManagerErr: "",
      stateErr: "",
      cityErr: "",
      jobStatusErr: "",
      jobTypeErr: "",
      experienceErr: "",
      primarySkillsErr: "",
      positionErr: "",
      taxTermErr: "",
      deliveryManagerErr: "",
      accountManagerErr: "",
      assignToErr: "",
      jobDescriptionErr: "",
    }))
  

    if (!form.job_code) {
      setError((prev) => ({ ...prev, jobCodeErr: "This field is required" }));
    }
    if (!form.title) {
      setError((prev) => ({ ...prev, jobTitleErr: "This field is required" }));
    }
    if (!form.client) {
      setError((prev) => ({ ...prev, clientErr: "This field is required" }));
    }
    // if (!form.lob) {
    //   setError((prev) => ({ ...prev, lobErr: "This field is required" }));
    // }
    // if (!form.contact_manager) {
    //   setError((prev) => ({
    //     ...prev,
    //     contactManagerErr: "This field is required",
    //   }));
    // }
    if (!form.state) {
      setError((prev) => ({ ...prev, stateErr: "This field is required" }));
    }
    if (!form.city) {
      setError((prev) => ({ ...prev, cityErr: "This field is required" }));
    }
    if (!form.job_status) {
      setError((prev) => ({ ...prev, jobStatusErr: "This field is required" }));
    }
    if (!form.job_type) {
      setError((prev) => ({ ...prev, jobTypeErr: "This field is required" }));
    }
    if (!form.experience) {
      setError((prev) => ({
        ...prev,
        experienceErr: "This field is required",
      }));
    }
    if (form.primary_skills.length == 0) {
      setError((prev) => ({
        ...prev,
        primarySkillsErr: "This field is required",
      }));
    }
    if (!form.number_of_position) {
      setError((prev) => ({ ...prev, positionErr: "This field is required" }));
    }
    if (!form.tax_term) {
      setError((prev) => ({ ...prev, taxTermErr: "This field is required" }));
    }
    if (!form.delivery_manager && !form.delivery_manager == 'Select') {
      setError((prev) => ({
        ...prev,
        deliveryManagerErr: "This field is required",
      }));
    }
    if (!form.account_manager && !form.account_manager == 'Select') {
      setError((prev) => ({
        ...prev,
        accountManagerErr: "This field is required",
      }));
    }
    if (form.assign.length == 0) {
      setError((prev) => ({ ...prev, assignToErr: "This field is required" }));
    }
    if ((form.description == '<p></p>')) {
      setError((prev) => ({
        ...prev,
        jobDescriptionErr: "This field is required",
      }));
    }

    let {
      job_code,
      title,
      client,
      lob,
      contact_manager,
      state,
      city,
      job_status,
      job_type,
      experience,
      primary_skills,
      number_of_position,
      tax_term,
      delivery_manager,
      account_manager,
      assign,
      description,
    } = form;
    if (
      // job_code &&
      title &&
      client &&
      // lob &&
      // contact_manager &&
      state &&
      city &&
      job_status &&
      job_type &&
      experience &&
      primary_skills.length > 0 &&
      number_of_position &&
      tax_term &&
      delivery_manager &&
      account_manager &&
      // assign.length > 0 &&
      description
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {

    if (handleValidation()) {
      if (name == "update" && !comments && !jobType == "Email") {
        setCommentsErr("This field is required");
        return;
      } else if (!jobType == "Email") {
        form["comment"] = comments;
      }
      if((name == "create")){
        delete form["job_code"]
      }
      try {
        setIsLoading(true);
        const response =
          jobData && jobType == "Email"
            ? await patchReq(`/temp-jobs/${jobData.id}/`, form)
            : name == "update"
            ? await patchReq(`/jobs/${jobData.id}/`, form)
            : await postApiReq("/jobs/", form);
        setIsLoading(false);
         
        if (response.status) {
          if (jobData) {
            if (documents.length > 0) {
              handleSaveDocuments(jobData.id);
            }
            setOpen(true);
            toast.success("Job post updated successfully !");
            handleGetJobDetails();
            let btnModal = document.getElementById("commentModalClose");
            btnModal.click();
            setTab(null);
            // router.push(`/employers-dashboard/job-posts/${jobData.id}?jobId=${jobData.id}`);
          } else {
            if (documents.length > 0) {
              handleSaveDocuments(response.data.id);
            }
            setIsLoading(false);
            setForm(initialState);
            toast.success("Job post created successfully !");
            router.push("/employers-dashboard/job-posts");
          }
        }
      } catch (err) {
        setIsLoading(false);
        // toast.error(err.response || "Something went wrong");
      }
    }else{
      let closeBtn = document.getElementById('jobCommentModal')
      closeBtn.click();
    }
  };

  useEffect(() => {
    if (form.country) {
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
    if (descriptionData) {
      setForm((prev) => ({ ...prev, description: descriptionData }));
    }
  }, [descriptionData]);

  const handleClose = (item) => {
    let temp = [...assignList];
    let newTemp = temp.filter((_item) => _item.id !== item.id);
    setAssignList(newTemp);
    setForm((prev) => ({
      ...prev,
      assign: prev.assign.filter((_item, _index) => _item !== item.id),
    }));
  };

  const handleFileUpload = (e) => {
    let file = e.target.files;
    Object.values(file).forEach((item) => {
      setDocuments((prev) => [...prev, item]);
    });
  };

  const handleSaveDocuments = async (jobId) => {
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append("files", file);
    });
    formData.append("job", jobId);
    const response = await postApiReq(`/documents/`, formData);
    if (response.status) {
      // toast.success("Documents added sucessfully");
      setDocuments([]);
    }
  };

  const handleRemoveDoc = async (id) => {
    const response = await deleteReq(`/documents/${id}/`);
    if (response.status) {
      toast.success("Document deleted successfully");
      setJobData((prev) => ({
        ...prev,
        documents: prev.documents.filter((_item) => _item.id !== id),
      }));
      // handleGetJobDetails();
    }
  };

  const handleCloseDoc = (index) => {
    let update = [...documents];
    let filtered = update.filter((item, ind) => ind !== index);

    setDocuments(filtered);
  };


  return (
    <div className="py-2">
      <LanguageModal handleGetLanguageList={handleGetLanguageList} />
      <JobPostCommentsModal
        comments={comments}
        setComments={setComments}
        commentsErr={commentsErr}
        setCommentsErr={setCommentsErr}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <UsersModal
        usersList={usersList}
        form={form}
        setForm={setForm}
        setUsersList={setUsersList}
        teamId={teamId}
        setTeamId={setTeamId}
        handleGetUsersList={handleGetUsersList}
        assignList={assignList}
        setAssignList={setAssignList}
        search={search}
        setSearch={setSearch}
        handleClose={handleClose}
      />
      <div className="d-flex justify-content-between cursor-pointer">
        <div
          onClick={() => {
            if (tab) {
              setTab(null);
            } else {
              setOpen(true);
            }
          }}
          className="d-flex gap-2 align-items-center"
        >
          <span className="text-primary cursor-pointer fs-3">
            {reactIcons.backarrow}
          </span>
          <span className="text-primary">Back</span>
          <h4 className="fw-medium text-black">
            {name == "update" ? "Update Job Posting" : "New Job Posting"}
          </h4>
        </div>
        <div>
          <button
            className="theme-btn btn-style-one mx-2 small"
            onClick={name == "create" || jobType == "Email" ? handleSubmit : ""}
            data-bs-toggle="modal"
            data-bs-target={
              (name == "update" && !(jobType == "Email"))  ? "#commentsModal" : ""
            }
          >
            {isLoading ? (
              <BtnBeatLoader />
            ) : name == "update" ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
          <button
            onClick={() => {
              if (tab) {
                setTab(null);
              } else {
                setOpen(true);
              }
            }}
            className="theme-btn btn-style-three small"
          >
            Cancel
          </button>
        </div>
      </div>
      <Paper>
        <div
          className="px-3 py-3 mt-2 border-5 manual-form"
          style={{ borderTopColor: "var(--theme-color-first)" }}
        >
          <div className="my-2 px-5">
            <h6 className="fs-3 fw-medium text-black">Job Details</h6>
          </div>
          <div className="row px-5">
            {!jobType  && (
              <div className="col-4 my-2">
                <p>
                  Job Code <strong className="text-danger">*</strong>
                </p>
                <input
                  name="job_code"
                  value={form.job_code}
                  onChange={handleChange}
                  className="client-form-input"
                  type="text"
                  disabled={form.job_code}
                />
                <span className="text-danger">{error.jobCodeErr}</span>
              </div>
            )}
            <div className="col-4 my-2">
              <p>
                Job Title <strong className="text-danger">*</strong>
              </p>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
              <span className="text-danger">{error.jobTitleErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>Client Bill/Rate</p>
              <div className="d-flex gap-3">
                <select
                  name="currency"
                  value={form.currency}
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
                  name="amount"
                  type="text"
                  value={form.amount}
                  placeholder="Rate"
                  onChange={handleChange}
                  className="px-2 client-input-style form-mult-box form-mult-box"
                />
                <select
                  value={form.payment_frequency}
                  name="payment_frequency"
                  onChange={handleChange}
                  className="client-input-style form-mult-box"
                >
                  <option>Select</option>
                  <option>Hourly</option>
                  <option>Monthly</option>
                  <option>Annually</option>
                </select>
              </div>
            </div>
            <div className="col-4 my-2">
              <p>Remote Job</p>
              <div className="d-flex gap-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="remote"
                  value="yes"
                  checked={form.remote == "yes"}
                />
                <span>Yes</span> {" "}
                <input
                  onChange={handleChange}
                  type="radio"
                  name="remote"
                  value="no"
                  checked={form.remote == "no"}
                />
                <span>No</span> {" "}
                <input
                  onChange={handleChange}
                  type="radio"
                  name="remote"
                  value="Hybrid"
                  checked={form.remote == "Hybrid"}
                />
                <span>Hybrid</span>
              </div>
            </div>
            <div className="col-4 my-2">
              <p>Job Start Date</p>
              <DatePickerCustom
                handleDate={(date) => {
                  if (date) {
                    setForm((prev) => ({ ...prev, start_date: date }));
                  }
                }}
                date={form.start_date}
              />
            </div>
            <div className="col-4 my-2">
              <p>Job End Date</p>
              <DatePickerCustom
                handleDate={(date) =>
                  setForm((prev) => ({ ...prev, end_date: date }))
                }
                date={form.end_date}
              />
            </div>
            <div className="col-4 my-2">
              <p>
                Client <strong className="text-danger">*</strong>
              </p>
              <select
                value={form.client}
                className="client-form-input"
                name="client"
                onChange={handleChange}
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
              <span className="text-danger">{error.clientErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                Names of LOB 
                {/* <strong className="text-danger">*</strong> */}
              </p>
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
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <span className="text-danger">{error.lobErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                Contact Manager 
                {/* <strong className="text-danger">*</strong> */}
              </p>
              <select
                value={form.contact_manager}
                className="client-form-input"
                name="contact_manager"
                onChange={handleChange}
              >
                <option>Select</option>
                {clientManagerList?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <span className="text-danger">{error.contactManagerErr}</span>
            </div>
            <div className="col-4 my-2">
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
            <div className="col-4 my-2">
              <p>
                State <strong className="text-danger">*</strong>
              </p>
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
                  <option value={form.country}>{form.country}</option>
                )}
              </select>
              <span className="text-danger">{error.stateErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                City <strong className="text-danger">*</strong>
              </p>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
              <span className="text-danger">{error.cityErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                Job Status <strong className="text-danger">*</strong>
              </p>
              <select
                value={form.job_status}
                className="client-form-input"
                name="job_status"
                onChange={handleChange}
              >
                <option>Select</option>
                {jobStatus.map((item, index) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
              <span className="text-danger">{error.jobStatusErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                Job Type <strong className="text-danger">*</strong>
              </p>
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
              <span className="text-danger">{error.jobTypeErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>Priority</p>
              <select
                value={form.priority}
                className="client-form-input"
                name="priority"
                onChange={handleChange}
              >
                <option>Select</option>
                {priorityTypes.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="col-4 my-2">
              <p>Application Form</p>
              <select
                value={form.application_form}
                className="client-form-input"
                name="application_form"
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="General Application">General Application</option>
                <option value="Referral Portal Form">
                  Referral Portal Form
                </option>
              </select>
            </div>
            <div className="col-4 my-2">
              <p>Address</p>
              <textarea
                name="address"
                onChange={handleChange}
                value={form.address}
                className="client-form-input"
                style={{ height: "65px" }}
              />
            </div>
            <div className="col-12 my-2">
              <h4>Skills</h4>
            </div>
            <div className="col-4 my-2">
              <p>
                Experience <strong className="text-danger">*</strong>
              </p>
              <div className="d-flex gap-2">
                <input
                  placeholder="Experience"
                  className="client-form-input"
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  style={{ width: "200px" }}
                />
                <span>Years</span>
              </div>
              <span className="text-danger">{error.experienceErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                Primary Skills <strong className="text-danger">*</strong>{" "}
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top-right"
                  title="Please enter skills enter button as seprator"
                  className="text-primary"
                >
                  {reactIcons.info}
                </span>
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
                  {form.primary_skills.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mx-1 my-1 px-1 gap-6 text-black fw-medium  border-primary rounded-1"
                        // style={{ background: "var(--primary-2nd-color)" }}
                        style={{border:'1px solid'}}
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
                  // className="client-form-input"
                  type="text"
                />
              </div>
              <span className="text-danger">{error.primarySkillsErr}</span>
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
                  {form.secondary_skills.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mx-1 px-1 my-1 gap-6 text-black fw-medium  border-primary rounded-1"
                        // style={{ background: "var(--primary-2nd-color)" }}
                        style={{border:'1px solid'}}
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
            <div className="col-4 my-2">
              <p>Languages</p>
              <div className="position-relative cursor-pointer">
                <div
                  className="client-form-input d-flex justify-content-between"
                  onClick={() => setOpenLang(!openLang)}
                  style={{ minHeight: "36px", maxHeight: "fit-content" }}
                >
                  <div className="d-flex flex-wrap gap-2">
                    {form.languages.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                          style={{ background: "var(--primary-2nd-color)" }}
                        >
                          <span>{item.name}</span>
                          {/* <span onClick={() => handleClose(item)} className="text-black fs-6 cursor-pointer">{reactIcons.close}</span> */}
                        </div>
                      );
                    })}
                  </div>
                  <span className=" float-end">{reactIcons.downarrow}</span>
                </div>
                {openLang && (
                  <div
                    className="position-absolute bg-white border border-1 w-100 px-2"
                    style={{ top: "33px", zIndex: 10000 }}
                  >
                    <div>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#languageModal"
                        className="theme-btn btn-style-three small d-flex align-items-center"
                        onClick={() => setOpenLang(false)}
                        style={{ width: "100%" }}
                      >
                        {/* <span>{reactIcons.addcircle}</span> */}
                        <span>Add</span>
                      </button>
                    </div>
                    {languageList.map((item, index) => {
                      return (
                        <div key={index} className="">
                          <input
                            type="checkbox"
                            checked={form?.languages?.find(
                              (_item) => _item.name == item.name
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm((prev) => ({
                                  ...prev,
                                  languages: [
                                    ...prev.languages,
                                    { name: item.name },
                                  ],
                                }));
                              } else {
                                setForm((prev) => ({
                                  ...prev,
                                  languages: prev.languages.filter(
                                    (_item, _index) => _item.name !== item.name
                                  ),
                                }));
                              }
                            }}
                          />
                          <span className="mx-2">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 my-2">
              <h4>Organizational Information</h4>
            </div>
            <div className="col-4 my-2">
              <p>
                Number of positions <strong className="text-danger">*</strong>
              </p>
              <input
                name="number_of_position"
                value={form.number_of_position}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
              <span className="text-danger">{error.positionErr}</span>
            </div>
            {/* <div className="col-4 my-2">
            <p>Maximum Allowed Submissions</p>
            <input
              name="job-code"
              value={form}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div> */}
            <div className="col-4 my-2">
              <p>
                Tax Terms <strong className="text-danger">*</strong>
              </p>
              <select className="client-form-input" value={form.tax_term} onChange={handleChange}  name="tax_term">
                <option>Select</option>
                {TaxTerms.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <span className="text-danger">{error.taxTermErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>Head Account Managers</p>
              <select
                value={form.head_account_manager}
                className="client-form-input"
                name="head_account_manager"
                onChange={handleChange}
              >
                <option value={""}>Select</option>
                {usersList.map((item) => {
                  // console.log("-------------item ", item);
                  return (
                    <option value={item.id} key={item.id}>
                      {item.first_name} {item.last_name} ({item.email})
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-4 my-2">
              <p>Department</p>
              <select
                value={form.department}
                className="client-form-input"
                name="department"
                onChange={handleChange}
              >
                <option value={""}>Select</option>
                {departmentList.map((item) => {
                  return <option value={item.id}>{item.dept_name}</option>;
                })}
              </select>
            </div>
            <div className="col-4 my-2">
              <p>
                Delivery Manager <strong className="text-danger">*</strong>
              </p>
              <select
                value={form.delivery_manager}
                onChange={handleChange}
                className="client-form-input"
                name="delivery_manager"
              >
                <option value={""}>Select</option>
                {usersList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.first_name} {item.last_name} ({item.email})
                    </option>
                  );
                })}
              </select>
              <span className="text-danger">{error.deliveryManagerErr}</span>
            </div>
            <div className="col-4 my-2">
              <p>
                Account Manager <strong className="text-danger">*</strong>
              </p>
              <select
                value={form.account_manager}
                onChange={handleChange}
                className="client-form-input"
                name="account_manager"
              >
                <option value={""}>Select</option>
                {usersList.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.first_name} {item.last_name} ({item.email})
                    </option>
                  );
                })}
              </select>
              <span className="text-danger">{error.accountManagerErr}</span>
            </div>
            {!jobType && (
              <div className="col-4 my-2">
                <p>
                  Assigned To <strong className="text-danger">*</strong>
                </p>
                <div className="client-form-input d-flex justify-content-between">
                  <div className="d-flex flex-wrap gap-2">
                    {assignList.map((item) => {
                      return (
                        <div
                          className="my-1 px-1 text-black fw-medium d-flex gap-1 rounded-1"
                          style={{ background: "var(--primary-2nd-color)" }}
                        >
                          <span>{item.first_name} {item.last_name}</span>
                          <span
                            onClick={() => handleClose(item)}
                            className="text-black fs-6 cursor-pointer"
                          >
                            {reactIcons.close}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* <select
              className="client-form-input"
              name="assign"
              value={form.assign}
              onChange={handleChange}
            >
              <option>Select</option>
              {usersList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    <span>{item.username}</span>
                  </option>
                );
              })}
            </select> */}
                <span
                  className="cursor-pointer  text-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#usersModal"
                >
                  assign
                </span>
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#usersModal"
                  className="text-primary fs-5"
                >
                  {reactIcons.settings}
                </span>
                <span className="text-danger">{error.assignToErr}</span>
              </div>
            )}
            {!jobType && form.post_on_portal && (
              <div className="col-4 my-2">
                <p>Career Portal Published Date</p>
                <DatePickerCustom
                  handleDate={(date) =>
                    setForm((prev) => ({ ...prev, post_date_on_portal: date }))
                  }
                  date={form.post_date_on_portal}
                />
              </div>
            )}
            {/* <div className="col-4 my-2">
              <p>Job Delegation</p>
              <SelectWithSearch 
                list={usersList}
                setList={setUsersList}
                onChange={handleJobDelegation}
              />
            </div> */}
            <div className="col-12 my-1">
              <p>
                Job Description <strong className="text-danger">*</strong>{" "}
              </p>
              {(name == "update" || name == "parse") && form.description && (
                <HtmlEditor
                  setDescriptionData={setDescriptionData}
                  form={form}
                  wrapperStyle={{
                    border: "1px solid gray",
                    minHeight: "250px",
                    borderRadius: "3px",
                  }}
                />
              )}
              {name == "create" && form.description && (
                <HtmlEditor
                  setDescriptionData={setDescriptionData}
                  form={form}
                  wrapperStyle={{
                    border: "1px solid gray",
                    minHeight: "250px",
                    borderRadius: "3px",
                  }}
                />
              )}
              <span className="text-danger">{error.jobDescriptionErr}</span>
              {/* {!jobType && (
                <div className="mt-4 d-flex gap-2 ">
                  <input
                    type="checkbox"
                    checked={form.post_on_portal}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        post_on_portal: e.target.checked,
                      }))
                    }
                  />
                  <label className="fw-medium">Post Job on Career Portal</label>
                </div>
              )} */}
            </div>
            {!jobType && (
              <div className="col-12 my-1">
                <h4>Documents</h4>
                <label>
                  <div
                    htmlFor="#upload"
                    className="rounded-1 p-2"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Image
                      width={90}
                      height={10}
                      src="/images/upload.png"
                      alt="brand"
                    />
                  </div>
                  <input
                    type="file"
                    id="upload"
                    multiple
                    onChange={(e) => {
                      handleFileUpload(e);
                    }}
                    className="d-none"
                  />
                </label>
              </div>
            )}
            <div className=" flex-wrap">
              <div className="d-flex gap-2 flex-wrap">
                {documents.map((item, index) => {
                  return (
                    <div
                      className="d-flex justify-content-between align-items-center rounded-1 my-2 px-2 bg-secondary"
                      style={{ width: "100%", height: "50px" }}
                      key={index}
                    >
                      <p>{item?.name}</p>
                      <p></p>
                      <span
                        onClick={() => handleCloseDoc(index)}
                        className="text-danger cursor-pointer"
                      >
                        {reactIcons.close}
                      </span>
                    </div>
                  );
                })}
              </div>

              {documents.length == 0 &&
                jobData?.documents?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" m-2   position-relative d-flex align-items-center  rounded-1"
                      onMouseEnter={() => setOption(item.id)}
                      onMouseLeave={() => setOption(false)}
                      style={{
                        width: "48%",
                        height: "60px",
                        background: "aliceblue",
                      }}
                    >
                      {option == item.id && (
                        <div
                          className="position-absolute d-flex gap-2 align-items-center px-2 justify-content-end"
                          style={{
                            width: "100%",
                            height: "60px",
                            top: "0px",
                            background: "rgba(0, 0, 0, 0.5)",
                            zIndex: "10000",
                          }}
                        >
                          {/* <div className="d-flex justify-content-center align-items-center" style={{width:"30px",height:'30px', background:'white', borderRadius:'50%' }}>
                    <span className="text-primary cursor-pointer">{reactIcons.edit}</span>
                    </div> */}
                          <div
                            data-bs-toggle="modal"
                            data-bs-target="#viewDocModal"
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              width: "30px",
                              height: "30px",
                              background: "white",
                              borderRadius: "50%",
                            }}
                            onClick={() => setImg(item.file)}
                          >
                            <span className="text-primary cursor-pointer">
                              {reactIcons.view}
                            </span>
                          </div>
                          <div
                            onClick={() => handleRemoveDoc(item.id)}
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              width: "30px",
                              height: "30px",
                              background: "white",
                              borderRadius: "50%",
                            }}
                          >
                            <span className="text-primary cursor-pointer">
                              {reactIcons.delete}
                            </span>
                          </div>
                        </div>
                      )}
                      <span className="p-2 fw-semibold">{item.file}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ManualCreation;
