"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import MultiSelect from "@/components/common/MultiSelect";
import Paper from "@/components/common/Paper";
import { deleteReq, getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  priority: "",
  description: "",
  type: "",
  category: "",
  due_date: "",
  reminder: "",
  status: "",
  meeting_url: "",
  is_notify_via_email: false,
  is_task_on_calendar: false,
  applicant_ref: "",
  assign: [],
  escalate_to: [],
  ownership: [],
};

const TaskManager = ({ applicantData, handleGetApplicantDetails }) => {
  const [form, setForm] = useState(initialState);
  const [openOwner, setOpenOwner] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [assignList, setAssignList] = useState([]);
  const [escaleList, setEscaleList] = useState([]);
  const [openAssign, setOpenAssign] = useState(false);
  const [openEscale, setOpenEscale] = useState(false);
  const [openOption, setOpenOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState();

  const handleSubmit = async () => {
    setIsLoading(true);
    form["applicant_ref"] = applicantData.id;
    const response = task ? await patchReq(`/task/${task.id}/`, form)  : await postApiReq("/task/", form);
    setIsLoading(false);
    if (response.status) {
      handleGetApplicantDetails();
      setForm(initialState);
      let message = task ? 'Task Updated successfully' : 'Task created successfully'
      toast.success(message);
      setTask('');
      setAssignList([])
      setOwnerList([])
      setEscaleList([])
    }
  };

  const handleDeleteTask = async(id) => {
    const response = await deleteReq (`/task/${id}/`)
     if(response.status){
      toast.success('Task deleted successfully')
      handleGetApplicantDetails();
     }
  }

  useEffect(() => {
    if(task){
      setAssignList(task.assign_details);
      setOwnerList(task.ownership_details)
      setEscaleList(task.escalate_to_details)
      setForm((prev) =>({
        ...prev,
        title:task.title,
        priority: task.priority,
        description: task.description,
        type: task.type,
        category:task.category,
        due_date:task.due_date,
        reminder: task.reminder,
        status: task.status,
        meeting_url: task.meeting_url,
        is_notify_via_email: task.is_notify_via_email,
        is_task_on_calendar: task.is_task_on_calendar,
        applicant_ref: task.applicant_ref,
        assign:task.assign,
        escalate_to: task.escalate_to,
        ownership: task.ownership, 
      }) )
    }
  }, [task])

  const handleGetUsersList = async () => {
    const response = await getReq(`/users/`);
    if (response.status) {
      setUsersList(response.data);
    }
  };

  useEffect(() => {
    handleGetUsersList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setTask('');
    setForm(initialState);
    setAssignList([])
    setOwnerList([])
    setEscaleList([])
  }

 

  return (
    <Paper>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Task Manager</h4>
          <div>
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTask"
              aria-controls="offcanvasTask"
              className="theme-btn btn-style-one small"
            >
              Add
            </button>
          </div>
          <div
            style={{ width: "800px !important", background: "light-gray" }}
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasTask"
            aria-labelledby="offcanvasTaskLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasTaskLabel">{task ? 'Update Task' :'Create New Task'}</h5>
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
                <div className="col-12">
                  <div className="d-flex gap-2">
                    <div className="w-75">
                      <p>Title</p>
                      <input
                        name="title"
                        placeholder="Title"
                        className="client-form-input"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-25">
                      <p>Priority</p>
                      <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="client-form-input"
                      >
                        <option>Select</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Critical</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="my-2">
                    <p>Description</p>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Enter a brief description of task"
                      className="client-form-input"
                      type="text"
                      style={{ height: "80px" }}
                    />
                  </div>
                </div>
                <div className="col-6 my-1">
                  <p>Task Type</p>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="client-form-input"
                  >
                    <option>Select</option>
                    <option>Call</option>
                    <option>Meeting</option>
                    <option>To Do</option>
                  </select>
                </div>
                {form.type == "Meeting" && (
                  <div className="col-6 my-1">
                    <p>Meeting Url</p>
                    <input
                      name="meeting_url"
                      value={form.meeting_url}
                      onChange={handleChange}
                      type="text"
                      className="client-form-input"
                    />
                  </div>
                )}
                <div className="col-6 my-1">
                  <p>Task Category</p>
                  <select
                    className="client-form-input"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                  </select>
                </div>
                <div className="col-6 my-1">
                  <p>Related To</p>
                  <input
                    name="applicant"
                    value={'Applicant'}
                    className="client-form-input"
                    type="text"
                    disabled
                  />
                </div>
                <div className="col-6 my-1">
                  <p>Applicant</p>
                  <input
                    name="designation"
                    value={applicantData.id + "-" + applicantData.firstname +" "+ applicantData.middlename + " " + applicantData.lastname }
                    className="client-form-input"
                    type="text"
                    disabled
                  />
                </div>
                <div className="col-6 my-1">
                  <p>Due Date</p>
                  <DatePickerCustom
                    handleDate={(date) =>
                      setForm((prev) => ({ ...prev, due_date: date }))
                    }
                    date={form.due_date}
                  />
                </div>
                <div className="col-6 my-1">
                  <p>Status</p>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="client-form-input"
                  >
                    <option>Select</option>
                    <option>Completed</option>
                    <option>Inprogress</option>
                    <option>Not Started</option>
                  </select>
                </div>
                <div className="col-6 my-1">
                  <MultiSelect
                    label="Assign To"
                    ownerList={assignList}
                    setOwnerList={setAssignList}
                    name="assign"
                    form={form}
                    setForm={setForm}
                    usersList={usersList}
                  />
                </div>
                <div className="col-6 my-1">
                  <MultiSelect
                    label="Escalate To"
                    ownerList={escaleList}
                    setOwnerList={setEscaleList}
                    name="escalate_to"
                    form={form}
                    setForm={setForm}
                    usersList={usersList}
                  />
                </div>
                <div className="col-6 my-1">
                  <p>Reminder</p>
                  <select
                    name="reminder"
                    value={form.reminder}
                    onChange={handleChange}
                    className="client-form-input"
                  >
                    <option>None</option>
                    <option>15 mins before</option>
                    <option>30 mins before</option>
                    <option>45 mins before</option>
                    <option>60 mins before</option>
                  </select>
                </div>
                <div className="col-6 my-1">
                  <MultiSelect
                    label="Ownership"
                    ownerList={ownerList}
                    setOwnerList={setOwnerList}
                    name="ownership"
                    form={form}
                    usersList={usersList}
                    setForm={setForm}
                  />
                </div>
                <div className="col-6 my-2">
                  <div className="d-flex gap-2">
                    <input
                      name="is_notify_via_email"
                      onChange={handleChange}
                      type="checkbox"
                      checked={form.is_notify_via_email}
                    />
                    <strong>Notify via Email</strong>
                  </div>
                  <div className="d-flex gap-2">
                    <input type="checkbox" />
                    <strong>Recurrence Task</strong>
                  </div>
                </div>
                <div className="col-6 my-2">
                  <div className="d-flex gap-2">
                    <input
                      name="is_task_on_calendar"
                      onChange={handleChange}
                      checked={form.is_task_on_calendar}
                      type="checkbox"
                    />
                    <strong>Show task on event calendar</strong>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    onClick={handleSubmit}
                    className="theme-btn btn-style-one small"
                    disabled={isLoading}
                  >
                    {isLoading ? <BtnBeatLoader /> : task ? 'Update Task' : "Create Task"}
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
        <div className="d-flex my-3 border border-top-secondary px-2 py-1 border-bottom-secondary justify-content-between">
          <div style={{ width: "200px" }}>
            <p>ASSIGNED BY/ CREATED ON</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>DUE DATE/TIME</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>TASK DESCRIPTION</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>ASSIGNED TO</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>MODIFIED ON</p>
          </div>
          <div style={{ width: "150px" }}>
            <p>STATUS MODIFIED ON</p>
          </div>
          <div style={{ width: "100px" }}>
            <p>STATUS</p>
          </div>
          <div style={{ width: "80px" }}>
            <p>ACTION</p>
          </div>
        </div>
        {applicantData?.task?.map((item, index) => {
          return (
            <div className="d-flex px-2 justify-content-between">
              <div style={{ width: "200px" }}>
                <strong>{item.updated_by.first_name + " " +item.updated_by.last_name}</strong>
                <p>{moment(item.updated_at).format('DD-MM-YYYY hh:mm A')}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p>{moment(item.due_date).format("DD-MM-YYYY hh:mm A")}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p>{item.description}</p>
              </div>
              <div className="d-flex flex-wrap" style={{ width: "150px" }}>
                {item.assign_details.map((item) => {
                  return (
                    <p key={item.id}>
                      {item.first_name} {item.last_name}
                    </p>
                  );
                })}
              </div>
              <div style={{ width: "150px" }}>
                <p>{moment(item.updated_at).format("DD-MM-YYYY hh:mm A")}</p>
              </div>
              <div style={{ width: "150px" }}>
                <p>pending</p>
              </div>
              <div style={{ width: "100px" }}>
                <p>{item.status}</p>
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
                         handleDeleteTask(item.id)
                         setOpen(!open);
                        }}
                      className="cursor-pointer"
                    >
                      {reactIcons.delete} Delete
                    </p>
                    <p
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
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default TaskManager;
