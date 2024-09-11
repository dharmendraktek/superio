"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import MultiSelect from "@/components/common/MultiSelect";
import Paper from "@/components/common/Paper";
import UploadSingleDocument from "@/components/common/UploadSingleDocument";
import { deleteReq, getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment, { duration } from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  mode: "",
  date: "",
  time: "",
  duration: "",
  guest_attendee: [],
  attendee: [],
  applicant_ref: "",
  created_by: "",
  is_notify_on_email: false,
  document: "",
  link: "",
  venue: "",
};

const MeetingSchedules = ({ applicantData, handleGetApplicantDetails }) => {
  const [form, setForm] = useState(initialState);
  const [usersList, setUsersList] = useState([]);
  const [attendeeList, setAttendeeList] = useState([]);
  const [email, setEmail] = useState("");
  const [openOption, setOpenOption] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetUsersList = async () => {
    const response = await getReq(`/users/`);
    if (response.status) {
      setUsersList(response.data);
    }
  };

  useEffect(() => {
    handleGetUsersList();
  }, []);

  useEffect(() => {
    if (meetingDetails) {
      setAttendeeList(meetingDetails.attendee_details);
      setForm((prev) => ({
        ...prev,
        title: meetingDetails.title,
        description: meetingDetails.description,
        mode: meetingDetails.mode,
        date: meetingDetails.date,
        time: meetingDetails.time,
        duration: meetingDetails.duration,
        attendee: meetingDetails.attendee,
        guest_attendee: meetingDetails.guest_attendee,
        is_notify_on_email: meetingDetails.is_notify_on_email,
      }));
    }
  }, [meetingDetails]);

  const handleSubmit = async () => {
    setIsLoading(true);
    form["applicant_ref"] = applicantData.id;
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("mode", form.mode);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("duration", form.duration);
    formData.append("attendee", JSON.stringify(form.attendee));
    formData.append("guest_attendee", (form.guest_attendee));
    formData.append("is_notify_on_email", form.is_notify_on_email);
    formData.append("document", form.document);
    formData.append("applicant_ref", form.applicant_ref);
    formData.append("link", form.link);
    formData.append("venue", form.venue);
    const response = meetingDetails
      ? await patchReq(`/applicant-meeting/${meetingDetails.id}/`, formData)
      : await postApiReq("/applicant-meeting/", formData);
    setIsLoading(false);
    if (response.status) {
      let message = meetingDetails
        ? "Meeting has been updated successfully"
        : "Meeting has been created successfully";
      toast.success(message);
      handleGetApplicantDetails();
      setMeetingDetails("");
      setForm(initialState);
    }
  };

  const handleFileUpload = (e) => {
    setForm((prev) => ({
      ...prev,
      document: e.target.files[0],
    }));
  };

  const handleDeleteMeeting = async (id) => {
    const response = await deleteReq(`/applicant-meeting/${id}/`);
    if (response.status) {
      toast.success("Meeting has been deleted successfully");
      handleGetApplicantDetails();
    }
  };

  const handleClear = () => {
    setForm(initialState);
  };

  

  return (
    <Paper>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Meeting Schedules</h4>
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMeeting"
            aria-controls="offcanvasMeeting"
            className="theme-btn btn-style-one small"
          >
            Add
          </button>
        </div>
        <div className="d-flex my-3 border border-top-secondary px-2 py-1 border-bottom-secondary justify-content-between">
          <div style={{ width: "200px" }}>
            <p>MEETING FOR</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>DESCRIPTION</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>ATTENDEES</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>GUEST ATTENDEES</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>START TIME/DURATION</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>CREATED BY</p>
          </div>
          <div style={{ width: "100px" }}>
            <p>ATTACHMENT</p>
          </div>
          <div style={{ width: "80px" }}>
            <p>ACTION</p>
          </div>
        </div>
        {applicantData?.meeting?.map((item, index) => {
          return (
            <div className="d-flex px-2 my-2  py-2 justify-content-between">
              <div style={{ width: "200px" }}>
                <p>{item.title}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p>{item.description}</p>
              </div>
              <div className="d-flex flex-wrap" style={{ width: "150px" }}>
                {item.attendee_details.map((item) => {
                  return (
                    <p style={{lineHeight:'10px'}} key={item.id}>
                      {item.first_name} {item.last_name}
                    </p>
                  );
                })}
              </div>
              <div className="d-flex flex-wrap gap-2" style={{ width: "150px" }}>
                {(item?.guest_attendee)?.split(',')?.map((item) => {
                  return <p style={{lineHeight:'10px'}} key={item}>{item}</p>;
                })}
              </div>
              <div style={{ width: "150px" }}>
                <p>
                  {item.date} - {item.time} {item.duration}
                </p>
              </div>
              <div style={{ width: "150px" }}>
                <strong>{item.created_by ? item.created_by.first_name + ' ' + item.created_by.last_name : ''}</strong>
                <p>{moment(item.updated_at).format('DD-MM-YYYY hh:mm A')}</p>
              </div>
              <div style={{ width: "100px" }}>
                <span className="fs-4">{reactIcons.view}</span>
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
                      onClick={() => {
                        handleDeleteMeeting(item.id);
                      }}
                      className="cursor-pointer"
                    >
                      {reactIcons.delete} Delete
                    </p>
                    <p
                      onClick={() => {
                        setMeetingDetails(item);
                        setOpenOption(null);
                      }}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasMeeting"
                      aria-controls="offcanvasMeeting"
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
          id="offcanvasMeeting"
          aria-labelledby="offcanvasMeetingLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasMeetingLabel">Schedule Meeting</h5>
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
              <div className="col-12 my-1">
                <p>Meeting Title</p>
                <input
                  type="text"
                  className="client-form-input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 my-1">
                <p>Meeting Description</p>
                <textarea
                  className="client-form-input"
                  type="text"
                  style={{
                    height: "60px",
                  }}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 my-1">
                <p>Meeting Mode</p>
                <select
                  className="client-form-input"
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option>Google Hangout</option>
                  <option>In-person</option>
                  <option>Microsoft Teams</option>
                  <option>Skype</option>
                  <option>Telephonic</option>
                  <option>WebX</option>
                </select>
              </div>
              {(form.mode == "Skype" || form.mode == "Google Hangout") && (
                <div className="col-6 my-1">
                  <p>Link</p>
                  <textarea
                    className="client-form-input"
                    type="text"
                    style={{
                      height: "60px",
                    }}
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                  />
                </div>
              )}
              {form.mode == "In-person" && (
                <div className="col-6 my-1">
                  <p>Venue</p>
                  <textarea
                    className="client-form-input"
                    type="text"
                    style={{
                      height: "60px",
                    }}
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="col-6 my-1">
                <p>Meeting Date</p>
                <DatePickerCustom
                  date={form.date}
                  handleDate={(date) =>
                    setForm((prev) => ({
                      ...prev,
                      date: moment(date).format("yyyy-MM-DD"),
                    }))
                  }
                />
              </div>
              <div className="col-6 my-1">
                <p>Meeting Time</p>
                <DatePickerCustom
                  // //  date={form.time}
                  // handleDate={(date) =>{
                  //   setForm((prev) => ({
                  //     ...prev,
                  //     time: moment(date).format('hh:mm:ss'),
                  //   }))
                  // }
                  // }
                  // showTime={true}
                  date={
                    form.time
                      ? moment(form.time, "HH:mm:ss").toDate()
                      : null
                  }
                  handleDate={(date) => {
                    if (moment(date).isValid()) {
                      let newTime = moment(date).format("HH:mm:ss");
                      setForm((prev) => ({
                        ...prev,
                        time: newTime,
                      }));
                    }
                  }}
                  showTime={true} // For time picker
                />
              </div>
              <div className="col-6 my-1">
                <p>Duration</p>
                <select
                  className="client-form-input"
                  name="duration"
                  onChange={handleChange}
                >
                  <option>None</option>
                  <option>15 mins</option>
                  <option>30 mins</option>
                  <option>45 mins</option>
                  <option>60 mins</option>
                  <option>1 hr</option>
                  <option>2 hr</option>
                </select>
              </div>
              <div className="col-6 my-1">
                <MultiSelect
                  label="Add a Attendee"
                  usersList={usersList}
                  ownerList={attendeeList}
                  setOwnerList={setAttendeeList}
                  name="attendee"
                  form={form}
                  setForm={setForm}
                  email={false}
                />
              </div>
              <div className="col-6 my-1">
                <p>Guest Attendees</p>
                <textarea
                  placeholder="Enter Email-IDs with comma separator"
                  className="client-form-input"
                  type="text"
                  style={{
                    height: "60px",
                  }}
                  name="guest_attendee"
                  value={form.guest_attendee}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      guest_attendee: e.target.value.split(","),
                    }));
                  }}
                />
              </div>
              <div className="col-6 my-1">
                <div className="d-flex gap-2 my-2">
                  <input
                    type="checkbox"
                    value={form.is_notify_on_email}
                    name="is_notify_on_email"
                    onChange={handleChange}
                  />
                  <p>Notify Via Email</p>
                </div>
              </div>
              <div className="col-6 my-1">
                <UploadSingleDocument handleFileUpload={handleFileUpload} />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  onClick={handleSubmit}
                  className="theme-btn btn-style-one small"
                >
                  {isLoading ? (
                    <BtnBeatLoader />
                  ) : meetingDetails ? (
                    "Update"
                  ) : (
                    "Schedule"
                  )}
                </button>
                <button
                  data-bs-dismiss="offcanvas"
                  className="theme-btn btn-style-four small"
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

export default MeetingSchedules;
