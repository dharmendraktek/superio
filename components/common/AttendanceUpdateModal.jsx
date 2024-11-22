"use client";

import { getReq, patchReq, putReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TimePickerCustom from "./TimePickerCustom";
import moment from "moment";

const AttendanceUpdateModal = ({ selectDateData }) => {
  const [form, setForm] = useState({
    status: "",
    date_of_attendance: "",
    first_timestamp: null,
    last_timestamp: null,
    duration: "",
    shift_in_time: null,
    shift_out_time: null,
  });
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    if (selectDateData) {
      const {
        status,
        duration,
        first_timestamp,
        last_timestamp,
        date_of_attendance,
        shift_in_time,
        shift_out_time,
      } = selectDateData;
      setForm((prev) => ({
        ...prev,
        status: status.id,
        date_of_attendance: date_of_attendance,
        first_timestamp: first_timestamp,
        last_timestamp: last_timestamp,
        duration: duration,
        shift_in_time:shift_in_time,
        shift_out_time:shift_out_time,
      }));
    }
  }, [selectDateData]);

  useEffect(() => {
    handleGetAttendanceStatus();
  }, []);

  const handleGetAttendanceStatus = async () => {
    const response = await getReq(`/attendance-status/`);
    if (response.status) {
      setStatusList(response.data);
    }
  };

  const handleUpdateStatus = async () => {
    let data = {
      status: form.status,
      // date_of_attendance: date_of_attendance,
      first_timestamp: form.first_timestamp,
      last_timestamp: form.last_timestamp,
      duration: form.duration,
      // shift_in_time:shift_in_time,
      // shift_out_time:shift_out_time,
    }

    try {
      const response = await putReq(
        `/attendance-details/${selectDateData?.id}/`, data);
      if (response.status) {
        toast.success("Status has been changed successfully");
      }
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div
      className="modal fade"
      id="attendanceUpdateModal"
      tabindex="-1"
      aria-labelledby="attendanceUpdateLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header border border-bottom-primary">
            <h5 className="modal-title" id="attendanceUpdateLabel">
              Update Attendance
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="my-2">
                <p>Status</p>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="client-form-input"
                >
                  <option>Select</option>
                  {statusList.map((item) => (
                    <option
                      className="text-black"
                      key={item.id}
                      value={item.id}
                    >
                      {item?.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-2">
                    <p>Date</p>
                    <input type="text" className="client-form-input"  checked value={moment(form.date_of_attendance).format("DD-MM-yyyy")} />
                 </div>
              <div className="my-2">
                <p>In Time</p>
                <TimePickerCustom
                  value={new Date(form.first_timestamp)}
                  handleTime={(date) => {
                    setForm((prev) => ({ ...prev, first_timestamp: date }));
                  }}
                />
                {/* <input type="text"  checked value={"30-04-2024"} className="client-form-input"  /> */}
              </div>
              <div className="my-2">
                <p>Out Time</p>
                {/* <input type="text"  checked value={"30-04-2024"} className="client-form-input"  /> */}
                <TimePickerCustom
                  value={new Date(form.last_timestamp)}
                  handleTime={(date) =>
                    setForm((prev) => ({ ...prev, last_timestamp: date }))
                  }
                />
              </div>
              <div className="my-2">
                <p>Duration</p>
                <input
                  type="text"
                  onChange={handleChange}
                  checked
                  value={form.duration}
                  className="client-form-input"
                />
              </div>
              <div className="my-2">
                <p>Shift In Time</p>
                {/* <TimePickerCustom
                  // value={form.shift_in_time}
                  handleTime={(date) =>
                    setForm((prev) => ({ ...prev, shift_in_time: date }))
                  }
                /> */}
                <input type="text"  value={form.shift_in_time} disabled onChange={(e) => setForm((prev) => ({...prev, shift_in_time:e.target.value}))} className="client-form-input" />
              </div>
              <div className="my-2">
                <p>Shift Out Time</p>
                {/* <TimePickerCustom
                  // value={form.shift_in_time}
                  handleTime={(date) =>
                    setForm((prev) => ({ ...prev, shift_out_time: date }))
                  }
                /> */}
                <input type="text"  value={form.shift_out_time} disabled onChange={(e) => setForm((prev) => ({...prev, shift_out_time:e.target.value}))}  className="client-form-input" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="theme-btn btn-style-one small"
              data-bs-dismiss="modal"
              onClick={handleUpdateStatus}
            >
              Update
            </button>
            <button
              type="button"
              className="theme-btn btn-style-four small"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceUpdateModal;
