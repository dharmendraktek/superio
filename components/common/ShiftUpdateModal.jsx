"use client";

import { getReq, patchReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TimePickerCustom from "./TimePickerCustom";
import moment from "moment";

const ShiftUpdateModal = ({ selectDateData }) => {
  const [form, setForm] = useState({
    status: "Active",
    shift_in_time: null,
    shift_out_time: null,
    shift_code:'',
    empcode:'',
    empname:'',
    company:''
  });
  console.log("-----------select data ", selectDateData);

  useEffect(() => {
    if (selectDateData) {
      const {
        shift_in_time,
        shift_out_time,
        user_id,
        username,

      } = selectDateData;
      setForm((prev) => ({
        ...prev,
        status: "Active",
        shift_in_time:shift_in_time,
        shift_out_time:shift_out_time,
        shift_code:'',
        empcode:user_id,
        empname:username,
        company:'XYZ'
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
    try {
      const response = await patchReq(
        `/attendance-shift/`,
        form
      );
      if (response.status) {
        toast.success("Shift has been successfully updated");
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
      id="shiftUpdateModal"
      tabindex="-1"
      aria-labelledby="shiftUpdateLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header border border-bottom-primary">
            <h5 className="modal-title" id="shiftUpdateLabel">
              Update Shift Time
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
                <p>Employee Code</p>
                <input type="text" value={form.empcode} disabled className="client-form-input" />
              </div>
              <div className="my-2">
                <p>Employee Name</p>
                <input type="text" className="client-form-input" disabled value={form.empname} />
              </div>
              <div className="my-2">
                <p>Company Name</p>
                <input type="text" className="client-form-input" value={form.company} disabled />
              </div>
              <div className="my-2">
                <p>Shift In Time</p>
                <input type="text"  value={form.shift_in_time} onChange={(e) => setForm((prev) => ({...prev, shift_in_time:e.target.value}))} className="client-form-input" />
              </div>
              <div className="my-2">
                <p>Shift Out Time</p>
                <input type="text"  value={form.shift_out_time}  onChange={(e) => setForm((prev) => ({...prev, shift_out_time:e.target.value}))}  className="client-form-input" />
              </div>
              <div className="my-2">
                <p>Status</p>
                <select className="client-form-input">
                    <option>Active</option>
                </select>
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

export default ShiftUpdateModal;
