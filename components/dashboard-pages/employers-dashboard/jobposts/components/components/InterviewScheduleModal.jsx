"use client";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";

const InterviewScheduleModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ width: "1000px !important" }}
      className="offcanvas offcanvas-end"
      tabindex="-1"
      id="interviewSchedule"
      aria-labelledby="interviewScheduleRightLabel"
    >
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
              <DatePickerCustom />
            </div>
            <div className="my-3 w-100">
              <p>Interview Time</p>
              <div className="d-flex gap-2">
                <div className="flex-wrap w-50">
                  <DatePickerCustom />
                </div>
                <div>
                  <span>To</span>
                </div>
                <div className="w-50">
                  <DatePickerCustom />
                </div>
              </div>
            </div>
            <div>
              <p>Interviewer's</p>
              <textarea className="client-form-input" />
            </div>
            <div className="d-flex gap-3">
              <div className="w-50">
                <p>
                  Interview Mode <strong className="text-danger">*</strong>
                </p>
                <select className="client-form-input">
                  <option>Select</option>
                </select>
              </div>
              <div className="w-50">
                <p>
                  Interview Round <strong className="text-danger">*</strong>
                </p>
                <select className="client-form-input">
                  <option>Select</option>
                </select>
              </div>
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
                        <input type="checkbox" />
                        <span>Notify Applicant</span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" />
                        <span>Notify Interviewer</span>
                      </div>
                      <div className="d-flex gap-2">
                        <input type="checkbox" />
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
                      <input className="client-form-input" />
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
                          <select className="client-form-input">
                            <option>Email</option>
                          </select>
                        </div>
                        <div className="w-75">
                          <input type="text" className="client-form-input" />
                        </div>
                      </div>
                      <div className="d-flex my-3    justify-content-between">
                        <div className="d-flex gap-3 align-items-center" style={{width:"40%"}}>
                         <select className="client-form-input">
                            <option>Select</option>
                         </select>
                         <span>Before</span>
                        </div>
                        <div className="d-flex gap-3 align-items-center" style={{width:"40%"}}>
                        <select className="client-form-input">
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
                        <input type="file" />
                    </div>
                    <div className="col-6 my-2">
                        <p>Additional Attachment</p>
                        <input type="file" />
                    </div>
                    <div className="col-12">
                        <p>Comments</p>
                        <textarea className="client-form-input" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex gap-2">
                <button className="theme-btn btn-style-one small">Schedule</button>
                <button className="theme-btn btn-style-four small"  data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduleModal;
