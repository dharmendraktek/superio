"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import {
  interviewModes,
  interviewRounds,
  minutesType,
  timeType,
} from "@/utils/constant";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TimeZoneModal from "./TimeZoneModal";
import moment from "moment";
import UsersListDropdown from "@/components/common/UsersListDropdown";
import UploadSingleDocument from "@/components/common/UploadSingleDocument";

const initialState = {
  applicant: "",
  job: "",
  interviewer: [],
  round: "",
  startdate: "",
  starttime: "",
  endtime: "",
  duration: "",
  mode: "",
  link: "",
  is_notify_applicant: false,
  is_notify_interviewer: false,
  show_feedback_to_other_interviewer: false,
  client: "",
  contact_manager: null,
  endclient: null,
  mobile: null,
  reschedule: false,
  comment: null,
  additional_notifiers: [],
  timezone: "(UTC-06:00) Central Time (US & Canada)",
};

const remInitialState = {
  reminder_type: "email",
  time_unit: "minutes",
  time_before: 30,
  // frequency: 1,
  email: [],
  times: 1,
  interview:'',
};

const InterviewScheduleModal = ({ jobPostList, applicantData }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState();
  const [additionalDoc, setAdditionalDoc] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);
  const [reminder, setReminder] = useState(remInitialState);
  const [reminderUsersIds, setReminderUsersIds] = useState([]);
  const [clientContactList, setClientContactList] = useState([]);
  const [roundList, setRoundList] = useState([]);


  useEffect(() => {
    if (jobPostList.length > 0) {
      const filteredData = jobPostList.filter((item) =>
        item.submissions.some((submission) => submission.selected === true)
      );
      setJobData(filteredData);
      handleGetInterviewRoundList();
    }
  }, [jobPostList]);

  useEffect(() => {
    if (applicantData.length > 0) {
      const filteredData = applicantData.filter((item) =>
        item.jobs_associated.some((jobs) => jobs.selected === true)
      );
      setJobData(filteredData);
      handleGetInterviewRoundList();
    }
  }, [applicantData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReminder = async (id) => {
    let data = {...reminder,  
      interview:id,
    }
  
    try {
      const response = await postApiReq("/interview-reminder/", data);
      if (response.status) {
        let btn = document.getElmentById('closeBtnInterview');
        btn.click();
      }
    } catch (err) {
      toast.error(err || 'Somthing went wrong');
    }
  };

  const handleScheduleInterview = async () => {    
    form["submission_ref"] = jobData[0]?.submissions[0]?.id;
    try {
      setIsLoading(true);
      const response = await postApiReq("/interviews/", form);
      setIsLoading(false);
      if (response.status) {
        handleSubmitReminder(response.data.id);
        handleAddInterviewDocuments(response.data.id);
        toast.success(
          "The applicant interview has been scheduled successfully."
        );
      }
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  const handleGetInterviewRoundList = async() => {
    const response = await getReq('/interview-round-choice/');
    if(response.status){
      console.log("------------resonspe list round list", response.data);
        setRoundList(response.data);
    }
  }

  const handleFileUpload = (e, type) => {
    if (type == "resume") {
      let file = e.target.files[0];
      setDocument(file);
    } else if (type == "additional") {
      console.log("-------------data ", e.target.files);
      let fileArray = Object.values(e.target.files);
      setAdditionalDoc(fileArray);
    }
  };

  const handleAddInterviewDocuments = async(interviewId) => {
       setAdditionalDoc((prev) => [...prev, document])
       const formData = new FormData();
       formData.append('interview_ref', interviewId);
       console.log("--------------addtional doc ", additionalDoc);
       
        additionalDoc.forEach((file) => {
          formData.append('files', file);
       })
       const response = await postApiReq('/interview-email-documents/', formData);
       if(response.status){
        console.log("-------------interview documents uploaded successfully ");
       }
  }

  let jobId = jobData.length > 0 &&
  jobData[0]?.id;
  
  let applicantId = (jobData.length > 0 && applicantData.length > 0) ? 
  jobData[0]?.jobs_associated[0]?.applicant_details[0]?.id : jobData[0]?.submissions[0]?.applicant_details[0]?.id;
  
  let firstName =
  (jobData.length > 0 && applicantData.length > 0) ? jobData[0]?.jobs_associated[0]?.applicant_details[0]?.firstname :
    jobData[0]?.submissions[0]?.applicant_details[0]?.firstname;
  
    let middleName =
  (jobData.length > 0 && applicantData?.length > 0) ? jobData[0]?.jobs_associated[0]?.applicant_details[0]?.middlename :
    jobData[0]?.submissions[0]?.applicant_details[0]?.middlename;
  
  let lastName =
  (jobData.length > 0 && applicantData?.length > 0) ?
  jobData[0]?.jobs_associated[0]?.applicant_details[0]?.lastname : jobData[0]?.submissions[0]?.applicant_details[0]?.lastname;
  
  let clientName =   (jobData.length > 0 && applicantData?.length > 0) ? jobData[0]?.jobs_associated[0]?.job_detail?.client_name : jobData[0]?.client_name;
  
  let clientId =  (jobData.length > 0 && applicantData?.length > 0) ? jobData[0]?.jobs_associated[0]?.job_detail?.client : jobData[0]?.client;
  

  let contactManagerId =  (jobData.length > 0 && applicantData?.length > 0) ? jobData[0]?.jobs_associated[0]?.job_detail?.contact_manager : jobData[0]?.contact_manager;


  
  let jobTitle = (jobData.length > 0 && applicantData?.length > 0) ? jobData[0]?.jobs_associated[0]?.job_detail?.title : jobData[0]?.title;
  
  let jobCode = (jobData.length > 0 && applicantData?.length > 0) ? jobData[0]?.jobs_associated[0]?.job_detail?.job_code  : jobData[0]?.job_code;
  
  let applicantEmail =
  (jobData.length > 0 && applicantData.length > 0) ? jobData[0]?.jobs_associated[0]?.applicant_details[0]?.email :
    jobData[0]?.submissions[0]?.applicant_details[0]?.email;
  
    let applicantContact =
    (jobData.length > 0 && applicantData.length > 0) ? jobData[0]?.jobs_associated[0]?.applicant_details[0]?.mobile :
    jobData[0]?.submissions[0]?.applicant_details[0]?.mobile;

  useEffect(() => {
    setForm((prev) => ({ ...prev, additional_notifiers: selectedUsersIds }));
    setReminder((prev) => ({ ...prev, email: reminderUsersIds }));
  }, [selectedUsersIds, reminderUsersIds]);

  const handleGetClientContactManagers = async () => {
    const response = await getReq(`/client-details/${clientId}/`);
    if (response.status) {
      setClientContactList(response.data.contact_manager);
      // setLobList(response.data.lob);
    }
  };

  useEffect(() => {
    if (clientId) {
      handleGetClientContactManagers();
    }
    setForm((prev) => ({
      ...prev,
      client: clientId,
      contact_manager: contactManagerId,
      mobile:applicantContact,
      applicant:applicantId,
      job:jobId,
    }));
  }, [clientId, applicantContact]);

  return (
    <div
      style={{ width: "1000px !important" }}
      className="offcanvas offcanvas-end"
      tabindex="-1"
      id="interviewSchedule"
      aria-labelledby="interviewScheduleRightLabel"
    >
      <TimeZoneModal form={form} setForm={setForm} />
      <div className="offcanvas-header">
        <h5 id="interviewScheduleRightLabel">Schedule Interview</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          id="closeBtnInterview"
          // onClick={() => setForm(initialState)}
        ></button>
      </div>
      <div className="offcanvas-body">
        <div>
          <div className="d-flex gap-4">
            <div className="flex-wrap w-50">
              <div className="mb-2">
                <input
                  type="text"
                  value={(jobCode || "") + "-" + (jobTitle || "")}
                  disabled
                  className="client-form-input"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={
                    (firstName || "") +
                    " " +
                    (middleName || "") +
                    " " +
                    (lastName || "")
                  }
                  disabled
                  className="client-form-input"
                />
              </div>
            </div>
            <div className="w-50">
              <div className="d-flex gap-2">
                <span>{reactIcons.mail}</span>
                <p>{applicantEmail}</p>
              </div>
              <div className="d-flex gap-2">
                <span>{reactIcons.phonecall}</span>
                <p>{applicantContact}</p>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="mt-5">
            <div>
              <DatePickerCustom
                date={form.startdate}
                handleDate={(date) =>
                  setForm((prev) => ({
                    ...prev,
                    startdate: moment(date).format("YYYY-MM-DD"), // Fixed year format
                  }))
                }
                showTime={false}
              />
            </div>
            <div className="my-3 w-100">
              <p>Interview Time</p>
              <div className="d-flex gap-2">
                <div className="flex-wrap w-50">
                  <DatePickerCustom
                    date={
                      form.starttime
                        ? moment(form.starttime, "HH:mm:ss").toDate()
                        : null
                    }
                    handleDate={(date) => {
                      if (moment(date).isValid()) {
                        let newTime = moment(date).format("HH:mm:ss");
                        setForm((prev) => ({
                          ...prev,
                          starttime: newTime,
                        }));
                      }
                    }}
                    showTime={true} // For time picker
                  />
                </div>
                <div>
                  <span>To</span>
                </div>
                <div className="w-50">
                  <DatePickerCustom
                    date={
                      form.endtime
                        ? moment(form.endtime, "HH:mm:ss").toDate()
                        : null
                    }
                    handleDate={(date) => {
                      if (moment(date).isValid()) {
                        let newTime = moment(date).format("HH:mm:ss");
                        setForm((prev) => ({
                          ...prev,
                          endtime: newTime,
                        }));
                      }
                    }}
                    showTime={true} // For time picker
                  />
                </div>
              </div>
              <div className="my-2 d-flex gap-1">
                <span>{form.timezone}</span>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#timeZoneModal"
                  className="theme-btn btn-style-four small cursor-pointer"
                >
                  Time Zone
                </button>
              </div>
            </div>
            <div>
              <p>Interviewer's</p>
              <textarea
                placeholder="Enter Email-IDs with comma separator"
                className="client-form-input"
                type="text"
                style={{
                  height: "60px",
                }}
                name="interviewer"
                value={form.interviewer}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    interviewer: e.target.value.split(","),
                  }));
                }}
              />
            </div>
            <div className="d-flex gap-3">
              <div className="w-50">
                <p>
                  Interview Mode <strong className="text-danger">*</strong>
                </p>
                <select
                  name="mode"
                  onChange={handleChange}
                  className="client-form-input"
                >
                  <option>Select</option>
                  {interviewModes.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-50">
                <p>
                  Interview Round <strong className="text-danger">*</strong>
                </p>
                <select
                  name="round"
                  onChange={handleChange}
                  className="client-form-input"
                >
                  <option>Select</option>
                  {roundList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="w-100 my-2">
              <p>Link Address</p>
              <textarea
                name="link"
                className="client-form-input"
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                <strong>
                  Advance Configurations{" "}
                  <span className="fs-4">
                    {open ? reactIcons.arrowfillup : reactIcons.arrowfilldown}
                  </span>
                </strong>
              </div>
              {open && (
                <div>
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          name="is_notify_applicant"
                          checked={form.is_notify_applicant}
                          // value={true}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              is_notify_applicant: e.target.checked,
                            }));
                          }}
                        />
                        <span>Notify Applicant</span>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          name="is_notify_interviewer"
                          checked={form.is_notify_interviewer}
                          // value={true}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              is_notify_interviewer: e.target.checked,
                            }));
                          }}
                        />
                        <span>Notify Interviewer</span>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="checkbox"
                          name="feedback"
                          checked={form.show_feedback_to_other_interviewer}
                          onChange={(e) => {
                            setForm((prev) => ({
                              ...prev,
                              show_feedback_to_other_interviewer:
                                e.target.checked,
                            }));
                          }}
                        />
                        <span>Show feedback to other Interviewers</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <p>Additional Notifiers</p>
                      <UsersListDropdown
                        selectedUsersIds={selectedUsersIds}
                        setSelectedUsersIds={setSelectedUsersIds}
                        showUsersbelow={true}
                      />
                    </div>
                    <div className="col-12 my-2">
                      <p>Guests</p>
                      <textarea
                        placeholder="Enter Email-IDs with comma separator"
                        className="client-form-input"
                        type="text"
                        style={{
                          height: "60px",
                        }}
                        name="guest_email"
                        value={form.guest_email}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            guest_email: e.target.value.split(","),
                          }));
                        }}
                      />
                    </div>
                    {/* <div className="col-6 my-2">
                      <p>Evaluation Templates</p>
                      <textarea className="client-form-input" />
                    </div> */}
                    <div className="col-6 my-2">
                      <p>
                        Client <strong className="text-danger">*</strong>
                      </p>
                      <input className="client-form-input" value={clientName} />
                    </div>
                    <div className="col-6 my-2">
                      <p>Client Contact</p>
                      <select
                        value={form.contact_manager}
                        className="client-form-input"
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            contact_manager: e.target.value,
                          }))
                        }
                      >
                        <option value={""}>Select</option>
                        {clientContactList.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-6 my-2">
                      <p>
                        End Client <strong className="text-danger">*</strong>
                      </p>
                      <input name="endclient" className="client-form-input" onChange={handleChange} />
                    </div>
                    <div className="col-6 my-2">
                      <p>Contact Number</p>
                      <input name="mobile" value={form.mobile} className="client-form-input" onChange={handleChange}  />
                    </div>
                    <div className="col-12">
                      <p>Reminder</p>
                      <div className="d-flex gap-2">
                        <div className="w-25">
                          <select
                            name="reminder_type"
                            className="client-form-input"
                            onChange={(e) => {
                              setReminder((prev) => ({
                                ...prev,
                                reminder_type: e.target.value,
                              }));
                            }}
                          >
                            <option>Email</option>
                          </select>
                        </div>
                        <div className="w-75">
                          <UsersListDropdown
                            selectedUsersIds={reminderUsersIds}
                            setSelectedUsersIds={setReminderUsersIds}
                            showUsersAbove={true}
                          />
                        </div>
                      </div>
                      <div className="d-flex my-3    justify-content-between">
                        <div
                          className="d-flex gap-3 align-items-center"
                          style={{ width: "40%" }}
                        >
                          <select
                            name="time_unit"
                            className="client-form-input"
                            onChange={(e) => {
                              setReminder((prev) => ({
                                ...prev,
                                time_unit: e.target.value,
                              }));
                            }}
                          >
                            <option>Select</option>
                            {timeType.map((item, index) => {
                              return (
                                <option key={index} value={item.value}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                          <span>Before</span>
                        </div>
                        <div
                          className="d-flex gap-3 align-items-center"
                          style={{ width: "40%" }}
                        >
                          {reminder.time_unit == "Days" ? (
                            <input
                              type="number"
                              className="client-form-input"
                              onChange={(e) => {
                                setReminder((prev) => ({
                                  ...prev,
                                  time_before: e.target.value,
                                }));
                              }}
                            />
                          ) : (
                            <select
                              name="time_before"
                              className="client-form-input"
                              onChange={(e) => {
                                setReminder((prev) => ({
                                  ...prev,
                                  time_before: e.target.value,
                                }));
                              }}
                            >
                              <option>Select</option>
                              {minutesType.map((item, index) => {
                                return (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                          <span>Frequency</span>
                        </div>
                        <div
                          className="d-flex gap-3 align-items-center"
                          style={{ width: "20%" }}
                        >
                          {}
                          <select
                            className="client-form-input"
                            onChange={(e) => {
                              setReminder((prev) => ({
                                ...prev,
                                times: e.target.value,
                              }));
                            }}
                          >
                            <option>1</option>
                          </select>
                          <span>Times</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 my-2">
                      <p>Resume</p>
                      <UploadSingleDocument handleFileUpload={(e) => handleFileUpload(e, 'resume') }  />  
                      {/* <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "resume")}
                      /> */}
                      <div>
                        {document &&
                        <span className="text-primary">{document.name}</span>
                        }
                      </div>
                    </div>
                    <div className="col-6 my-2">
                      <p>Additional Attachment</p>
                      <UploadSingleDocument handleFileUpload={(e) => handleFileUpload(e, 'additional') } multiple />  

                      {/* <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "additional")}
                        multiple
                      /> */}
                      {additionalDoc?.map((item) => {
                         return(
                          <p className="text-primary">{item.name}</p>
                         )
                      })
                      }
                    </div>
                    <div className="col-12">
                      <p>Comments</p>
                      <textarea
                        name="comment"
                        className="client-form-input"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={handleScheduleInterview}
                className="theme-btn btn-style-one small"
              >
                {isLoading ? <BtnBeatLoader /> : "Schedule"}
              </button>
              <button
                className="theme-btn btn-style-four small"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduleModal;
