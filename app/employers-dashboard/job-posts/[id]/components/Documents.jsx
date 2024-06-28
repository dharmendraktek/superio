"use client";

import Image from "next/image";
import { useState } from "react";

const Documents = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow h-50 py-2">
      <div className="d-flex justify-content-between px-4 py-4">
        <h4>Documents</h4>
        {!open && (
          <button
            onClick={() => setOpen(!open)}
            className="theme-btn btn-style-one small"
          >
            Add
          </button>
        )}
      </div>
      {open ? (
        <div>
          <div className="d-flex px-5 justify-content-between">
            <div>
              <label >
              <div htmlFor="#upload" className="border border-black rounded-1 p-2" style={{ width: "60px", height: "60px" }}>
                <Image
                  width={90}
                  height={10}
                  src="/images/upload.png"
                  alt="brand"
                />
              </div>
                <input type="file" id="upload" className="d-none" />
              </label>
            </div>
            <div className="d-flex gap-3">
              <div className="">
                <button className="theme-btn btn-style-one small">Save</button>
                <button
                  onClick={() => setOpen(!open)}
                  className="theme-btn btn-style-one small mx-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No documents available</div>
      )}
    </div>
  );
};

export default Documents;
