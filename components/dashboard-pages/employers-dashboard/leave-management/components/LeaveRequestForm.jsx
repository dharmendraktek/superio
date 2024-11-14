"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import SelectWithSearch from "@/components/common/SelectWithSearch";
import UsersListDropdown from "@/components/common/UsersListDropdown";
import { postApiReq } from "@/utils/apiHandlers";
import { useScroll } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

const initialState = {
  user: "",
  nature_of_leave: "",
  leave_type: "",
  leave_session: "",
  from_date: "",
  to_date: "",
  actual_leave_balance: 10,
  reason: "",
  reporting_manager: "",
  document: "",
  covering_employee: "",
  people_in_cc: [],
  //   status: 1,
};

const LeaveRequestForm = ({ setOpenForm }) => {
  const [form, setForm] = useState(initialState);
  const employeeDetails = useSelector((state) => state.employer.user);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCcs, setSelectedCcs] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateLeave = async () => {
    const formData = new FormData();

    formData.append("nature_of_leave", form.nature_of_leave);
    formData.append("leave_type", form.leave_type);
    formData.append("leave_session", form.leave_session);
    formData.append("from_date", moment(fromDate).format("yyyy-MM-DD"));
    formData.append("to_date", moment(toDate).format("yyyy-MM-DD"));
    // formData.append("actual_leave_balance", form.actual_leave_balance);
    formData.append("reason", form.reason);
    // formData.append("reporting_manager", form.reporting_manager);
    formData.append("document", form.document);
    formData.append("covering_employee", form.covering_employee);
    // formData.append("people_in_cc", form.people_in_cc);

    try {
      setIsLoading(true);
      const response = await postApiReq("/leaves/", formData);
      setIsLoading(false);
      if (response.status) {
      } else if (!response.status) {
      }
    } catch (err) {
        setIsLoading(false);
    }
  };
  return (
    <div>
      <div>
        <h4>Leave Request</h4>
      </div>
      <div className="row mt-2">
        <div className="col-4 my-1">
          <p>Application No</p>
          <input className="client-form-input" type="text" />
        </div>
        <div className="col-4 my-1">
          <p>Applied Date</p>
          <input
            className="client-form-input"
            type="text"
            disabled
            value={moment(new Date()).format("DD-MM-YYYY")}
          />
        </div>
        <div className="col-4 my-1">
          <p>Employee Name</p>
          <input
            className="client-form-input"
            type="text"
            value={employeeDetails.first_name + " " + employeeDetails.last_name}
            disabled
          />
        </div>
        <div className="col-4 my-1">
          <p>Employee Code</p>
          <input
            className="client-form-input"
            type="text"
            value={employeeDetails.empcode}
            disabled
          />
        </div>
        <div className="col-4 my-1">
          <p>Reporting Manager</p>
          <input
            className="client-form-input"
            type="text"
            value={
              employeeDetails.reportingmanager_details.first_name +
              " " +
              employeeDetails.reportingmanager_details.last_name
            }
            disabled
          />
        </div>
        <div className="col-4 my-1">
          <p>Nature of Leave</p>
          <select
            name="nature_of_leave"
            className="client-form-input"
            onChange={handleChange}
            value={form.nature_of_leave}
          >
            <option>Select</option>
            <option>Scheduled</option>
            <option>Unscheduled</option>
          </select>
        </div>
        <div className="col-4 my-1">
          <p>Leave Types</p>
          <select
            name="leave_type"
            className="client-form-input"
            onChange={handleChange}
            value={form.leave_type}
          >
            <option>Select</option>
            <option>LOP</option>
            <option>SL/PL</option>
            <option>Optional</option>
            <option>Maternity</option>
            <option>Paternity</option>
          </select>
        </div>
        <div className="col-4 my-1">
          <p>Leave Session</p>
          <select
            name="leave_session"
            className="client-form-input"
            onChange={handleChange}
            value={form.leave_session}
          >
            <option>Select</option>
            <option>Full Day</option>
          </select>
        </div>
        <div className="col-4 my-1">
          <p>Actual Leave Balance</p>
          <input className="client-form-input" type="text" value={form.actual_leave_balance} disabled />
        </div>
        <div className="col-4 my-1">
          <p>From Date</p>
          <DatePickerCustom
            date={fromDate}
            handleDate={(date) => setFromDate(date)}
          />
        </div>
        <div className="col-4 my-1">
          <p>To Date</p>
          <DatePickerCustom
            date={toDate}
            handleDate={(date) => setToDate(date)}
          />
        </div>
        <div className="col-4 my-1">
          <p>Reason</p>
          <textarea
            name="reason"
            className="client-form-input"
            type="text"
            onChange={handleChange}
            value={form.reason}
          />
        </div>
        <div className="col-4 my-1">
          <p>Covering Employee</p>
          <SelectWithSearch
            setForm={setForm}
            form={form}
            name="covering_employee"
            email={false}
          />
        </div>
        <div className="col-4 my-1">
          <p>People In CC</p>
          <UsersListDropdown
            selectedUsersIds={selectedCcs}
            setSelectedUsersIds={setSelectedCcs}
            showUsersAbove={true}
          />
        </div>
        <div className="col-4 my-2">
          <p>Upload Document</p>
          <input type="file" />
        </div>
      </div>
      <div className="d-flex gap-2 justify-content-end">
        <button
          className="theme-btn btn-style-one small"
          onClick={handleCreateLeave}
          disabled={isLoading}
        >
          {isLoading ? <BtnBeatLoader /> : "Save"}
        </button>
        <button className="theme-btn btn-style-two small" onClick={() => {
            setForm(initialState);
            setFromDate(null);
            setToDate(null);
        }}>Reset</button>
        <button
          className="theme-btn btn-style-four small"
          onClick={() => setOpenForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
