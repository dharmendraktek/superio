"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { postApiReq } from "@/utils/apiHandlers";
import { interviewModes, interviewRounds } from "@/utils/constant";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import TimeZoneModal from "./TimeZoneModal";

const initialState = {
    applicant: 306104,
    job: 35,
    interviewer: ["john@example.com"],
    round:1,
    startdate: "2024-09-10",
    starttime: "10:00:00",
    endtime: "10:30:00",
    duration: "30",
    mode: "online",
    link: "https://meeting.com/interview123",
    is_notify_applicant: true,
    is_notify_interviewer: true,
    client: 41,
     contact_manager: null,
      endclient: null,
      mobile: null,
      reschedule: false,
      comment: null,
    reminders: [
      {
        reminder_type: "email",
        time_unit: "minutes",
        time_before: 30,
        frequency: 1,
        times: 1
      }
    ]
}

const InterviewScheduleModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState();
  const [additionalDoc, setAdditionalDoc] = useState();

 
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]:value}))
  }

  const handleScheduleInterview = async() => {
     try{
      setIsLoading(true);
      const response = await postApiReq('/interviews/', form);
      setIsLoading(false);
      if(response.status){
         toast.success('The applicant interview has been scheduled successfully.')
      }
     }catch(err){
      toast.error(err || 'Something went wrong')
     }
  }

  const handleFileUpload = (e, type) => {
    let file = e.target.files[0];
    if(type == 'resume'){
      setDocument(file);
    }else if (type == 'additional'){
      setAdditionalDoc(file);
    }
  };


  return (
    <div
      style={{ width: "1000px !important" }}
      className="offcanvas offcanvas-end"
      tabindex="-1"
      id="interviewSchedule"
      aria-labelledby="interviewScheduleRightLabel"
    >
      <TimeZoneModal />
      <div className="offcanvas-header">
        <h5 id="interviewScheduleRightLabel">Schedule Interview</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          id="closeBtnClient"
          // onClick={() => setForm(initialState)}
        ></button>
      </div>
      <div className="offcanvas-body">
        <div>
          <div className="d-flex gap-4">
            <div className="flex-wrap w-50">
              <div className="mb-2">
                <input type="text" disabled className="client-form-input" />
              </div>
              <div>
                <input type="text" disabled className="client-form-input" />
              </div>
            </div>
            <div className="w-50">
              <div className="d-flex gap-2">
                <span>{reactIcons.mail}</span>
                <p>demo@mail.com</p>
              </div>
              <div className="d-flex gap-2">
                <span>{reactIcons.phonecall}</span>
                <p>989526532</p>
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
                    startdate: moment(date).format("yyyy-MM-DD"),
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
                    handleDate={(date) =>{
                      setForm((prev) => ({
                        ...prev,
                        startdate: moment(date).format('hh:mm:ss'),
                      }))
                    }
                    }
                    showTime={true}
                  />
                </div>
                <div>
                  <span>To</span>
                </div>
                <div className="w-50">
                  <DatePickerCustom
                   handleDate={(date) =>{
                    setForm((prev) => ({
                      ...prev,
                      enddate: moment(date).format('hh:mm:ss'),
                    }))
                  }
                  }
                  showTime={true}
                  />
                </div>
              </div>
              <div>
                <span></span>
                <span className="text-primary">Time Zone</span>
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
                <select name="mode" onChange={handleChange} className="client-form-input">
                  <option>Select</option>
                  {interviewModes.map((item, index) => {
                    return(<option key={index} value={item.name}>{item.name}</option>)
                  })
                  }
                </select>
              </div>
              <div className="w-50">
                <p>
                  Interview Round <strong className="text-danger">*</strong>
                </p>
                <select name="round" onChange={handleChange} className="client-form-input">
                  <option>Select</option>
                  {interviewRounds.map((item, index) => {
                    return(<option key={index} value={item.name}>{item.name}</option>)
                  })
                  }
                </select>
              </div>
            </div>
            <div className="w-100">
              <p>Link Address</p>
              <textarea name="link" className="client-form-input" onChange={handleChange} />
            </div>
            <div className="my-3">
              <div onClick={() => setOpen(!open)}>
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
                        <input type="checkbox" name="is_notify_applicant" checked={form.is_notify_applicant} onChange={handleChange} />
                        <span>Notify Applicant</span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" name="is_notify_interviewer" checked={form.is_notify_interviewer} onChange={handleChange} />
                        <span>Notify Interviewer</span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" name="feedback" onChange={handleChange} />
                        <span>Show feedback to other Interviewers</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <p>Additional Notifiers</p>
                    </div>
                    <div className="col-6 my-2">
                      <p>Guests</p>
                      <textarea className="client-form-input" />
                    </div>
                    <div className="col-6 my-2">
                      <p>Evaluation Templates</p>
                      <textarea className="client-form-input" />
                    </div>
                    <div className="col-6 my-2">
                      <p>
                        Client <strong className="text-danger">*</strong>
                      </p>
                      <input className="client-form-input" value={form.client}  />
                    </div>
                    <div className="col-6 my-2">
                      <p>Client Contact</p>
                      <select className="client-form-input">
                        <option>Select</option>
                      </select>
                    </div>
                    <div className="col-6 my-2">
                      <p>
                        End Client <strong className="text-danger">*</strong>
                      </p>
                      <input className="client-form-input" />
                    </div>
                    <div className="col-6 my-2">
                      <p>Contact Number</p>
                      <input className="client-form-input" />
                    </div>
                    <div className="col-12">
                      <p>Reminder</p>
                      <div className="d-flex gap-2">
                        <div className="w-25">
                          <select name="reminder_type" className="client-form-input">
                            <option>Email</option>
                          </select>
                        </div>
                        <div className="w-75">
                          <input type="text" className="client-form-input" />
                        </div>
                      </div>
                      <div className="d-flex my-3    justify-content-between">
                        <div className="d-flex gap-3 align-items-center" style={{width:"40%"}}>
                         <select name="time_unit" className="client-form-input">
                            <option>Select</option>
                         </select>
                         <span>Before</span>
                        </div>
                        <div className="d-flex gap-3 align-items-center" style={{width:"40%"}}>
                        <select name="time_before" className="client-form-input">
                            <option>Select</option>
                         </select>
                         <span>Frequency</span>    
                        </div>
                        <div className="d-flex gap-3 align-items-center" style={{width:"20%"}}>
                        <select className="client-form-input">
                            <option>1</option>
                         </select>
                         <span>Times</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 my-2">
                        <p>Resume</p>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'resume')} />
                    </div>
                    <div className="col-6 my-2">
                        <p>Additional Attachment</p>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'additional')} />
                    </div>
                    <div className="col-12">
                        <p>Comments</p>
                        <textarea name="comment" className="client-form-input" onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex gap-2">
                <button onClick={handleScheduleInterview} className="theme-btn btn-style-one small">{isLoading ? <BtnBeatLoader /> : 'Schedule'}</button>
                <button className="theme-btn btn-style-four small"  data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduleModal;
