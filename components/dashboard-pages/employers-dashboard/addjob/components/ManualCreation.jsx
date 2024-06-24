"use client";

import { useState } from "react";

const initialState = {
  job_code: "",
};

const ManualCreation = ({ setTab }) => {
  const [form, setform] = useState(initialState);

  const handleChange = () => {};
  return (
    <div className="p-5">
      <div className="d-flex justify-content-between">
        <h4>New Job Posting</h4>
        <div>
          <button className="theme-btn btn-style-one mx-2 small">Save</button>
          <button
            onClick={() => setTab(null)}
            className="theme-btn btn-style-three small"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="shadow px-3 py-3 mt-1">
        <div className="my-2">
          <h5 className="fw-bold">Job Details</h5>
        </div>
        <div className="row">
          <div className="col-4 my-1">
            <p>Job Code</p>
            <input
              name="job-code"
              value={form.email}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Job Title</p>
            <input
              name="job-code"
              value={form.email}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-4 my-1">
            <p>Current Bill/Salary</p>
            <div className="d-flex justify-content-between">
              <select className="client-input-style form-mult-box">
                <option>USD</option>
              </select>
              <input
                type="text"
                className="client-input-style form-mult-box form-mult-box"
              />
              <select className="client-input-style form-mult-box">
                <option>USD</option>
              </select>
              <select className="client-input-style form-mult-box">
                <option>USD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-4 my-1">

        </div>
        <div className="col-4 my-1">
          <p>Job Start Date</p>
        </div>
        <div className="col-4 my-1">
          <p>Job Start Date</p>
        </div>
      </div>
    </div>
  );
};

export default ManualCreation;
