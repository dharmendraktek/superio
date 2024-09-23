"use client";

import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import Paper from "@/components/common/Paper";
import { deleteReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  type: "",
  call_taken_on: new Date(),
  comment: "",
  followup_time: "",
  reminder: "",
  note: "",
  applicant_ref: "",
  created_by: 169,
};

const CallLogs = ({ applicantData, handleGetApplicantDetails }) => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const [callDetails, setCallDetails] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCallLog = async () => {
    setIsLoading(true);
    form["applicant_ref"] = applicantData.id;
    const response = callDetails ? await patchReq(`/applicant-call-log/${callDetails.id}/`, form) : await postApiReq("/applicant-call-log/", form);
    setIsLoading(false);
    if (response.status) {
      let message = callDetails ? 'Call log details updated successfully' : 'Call log details created successfully';
      toast.success(message)
      handleGetApplicantDetails();
    }
  };

  const handleDeleteCallLog = async(id) => {
    const response = await deleteReq(`/applicant-call-log/${id}/`)
    if(response.status){
      toast.success('Call log deleted successfully');
      handleGetApplicantDetails();
    }
  }

  useEffect(() => {
        if(callDetails){
          setForm((prev) => ({
            ...prev,
            type:callDetails.type,
            call_taken_on: callDetails.call_taken_on,
            comment:callDetails.comment,
            followup_time: callDetails.followup_time,
            reminder: callDetails.reminder,
            note: callDetails.note,
            applicant_ref: applicantData.id,
            created_by: 169,
          }))
        }
  }, [callDetails])

  const handleClear = () => {
    setCallDetails('');
    setForm(initialState);
  }
 
  return (
    <Paper>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Call Logs</h4>
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasCallLog"
            aria-controls="offcanvasCallLog"
            className="theme-btn btn-style-one small"
          >
            Add
          </button>
        </div>
        <div className="d-flex my-3 border border-top-secondary px-2 py-1 border-bottom-secondary justify-content-between">
          <div style={{ width: "200px" }}>
            <p>CALL TYPES</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>COMMENTS</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>CALL TAKEN</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>FOLLOW UP</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>LOG DATE</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>CREATED BY</p>
          </div>  
          <div style={{ width: "80px" }}>
            <p>ACTION</p>
          </div>
        </div>
        {applicantData?.calllog?.map((item, index) => {
          return (
            <div className="d-flex px-2 justify-content-between">
              <div style={{ width: "200px" }}>
                <p>{item.type}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p>{item.comment}</p>
              </div>
              <div className="d-flex flex-wrap" style={{ width: "150px" }}>
               <p></p>
              </div>
              <div style={{ width: "150px" }}>
                <p>{moment(item.call_taken_on).format("DD-MM-YYYY hh:mm A")}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p>{moment(item.followup_time).format("hh:mm A")}</p>
              </div>
              {/* <div style={{ width: "150px" }}>
                <p>pending</p>
              </div> */}
              <div style={{ width: "150px" }}>
                <strong>{item.created_by ? item.created_by.first_name + " " +item.created_by.last_name : ''  }</strong>
                <p>{moment(item.updated).format('DD-MM-YYYY hh:mm A')}</p>
              </div>
              <div className="position-relative" style={{ width: "80px" }}>
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
                         handleDeleteCallLog(item.id)
                        }}
                      className="cursor-pointer"
                    >
                      {reactIcons.delete} Delete
                    </p>
                    <p
                      onClick={() => {
                      setCallDetails(item)
                       setOpenOption(null)
                      }}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasCallLog"
                      aria-controls="offcanvasCallLog"
                      className="cursor-pointer"
                    >
                      {" "}
                      {reactIcons.edit} Update
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div
          style={{ width: "800px !important", background: "light-gray" }}
          className="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasCallLog"
          aria-labelledby="offcanvasCallLogLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasCallLogLabel">{callDetails ? 'Update Call Log' : 'Create New Call Log'}</h5>
            <div className="d-flex justify-content-end">
              {/* <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">Save</button> */}
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={handleClear}
              >
                {/* Cancel */}
              </button>
            </div>
          </div>
          <div className="offcanvas-body">
            <div className="row">
              <div className="col-6 my-1">
                <p>Call Type</p>
                <select
                  className="client-form-input"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  {/* <option>Call</option>
                  <option>Meeting</option> */}
                  <option>To Do</option>
                </select>
              </div>
              <div className="col-6 my-1">
                <p>Call Taken On</p>
                <DatePickerCustom
                  date={form.call_taken_on}
                  handleDate={(date) =>
                    setForm((prev) => ({ ...prev, call_taken_on: date }))
                  }
                />
              </div>
              <div className="col-12 my-1">
                <p>Comments</p>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  className="client-form-input"
                  type="text"
                  style={{ height: "80px" }}
                />
              </div>
              <div className="col-12">
                <h4>Follow Up Notes</h4>
              </div>
              <div className="col-6 my-1">
                <p>Date & Time</p>
                <DatePickerCustom
                  date={form.followup_time}
                  handleDate={(date) =>
                    setForm((prev) => ({ ...prev, followup_time: date }))
                  }
                  showTime={true}
                />
              </div>
              <div className="col-6 my-1">
                <p>Reminder</p>
                <select
                  className="client-form-input"
                  name="reminder"
                  value={form.reminder}
                  onChange={handleChange}
                >
                  <option>None</option>
                  <option>15 mins before</option>
                  <option>30 mins before</option>
                  <option>45 mins before</option>
                  <option>60 mins before</option>
                </select>
              </div>
              <div className="col-12 my-1">
                <p>Notes</p>
                <textarea
                  className="client-form-input"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  onClick={handleCreateCallLog}
                  className="theme-btn btn-style-one small"
                >
                  {isLoading ? <BtnBeatLoader /> : callDetails ? 'Update' : "Save"}
                </button>
                <button
                  className="theme-btn btn-style-four small"
                  data-bs-dismiss="offcanvas"
                  onClick={handleClear}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CallLogs;
