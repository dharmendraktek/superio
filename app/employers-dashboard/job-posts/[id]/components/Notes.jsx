"use client";

import HtmlEditor from "@/components/common/HtmlEditor";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const tabsName = [
  { id: 1, name: "Job Posting" },
  { id: 2, name: "Applicant Reference" },
];

const Notes = () => {
  const [tab, setTab] = useState(1);
  const [form, setForm] = useState({
    description:''
  })
  const [descriptionData, setDescriptionData] = useState();

  return (
    <div className="shadow">
      <div className="d-flex justify-content-between py-4 px-4">
        <div className="d-flex gap-3">
          <h4>Notes</h4>
          <div className="submissions d-flex gap-2">
            {tabsName.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setTab(item.id)}
                  className={`tabs ${
                    tab == item.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-black"
                  } border text-black align-items-center border-1 rounded-2 ps-2 d-flex gap-3`}
                >
                  <span className="fs-6">{item.name}</span>
                  <div className="bg-white d-flex align-items-center justify-content-center  text-black rounded-end-1 h-100 px-2">
                    4
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          className="theme-btn btn-style-one small"
        >
          Add
        </button>
      </div>
      {tab == 1 && (
        <>
          {/* <hr className="border border-secondary"></hr> */}
          <div className="px-4 Py-4">
            <div className="border py-1 px-3 rounded-1 d-flex justify-content-between border-top-black border-end-black">
              <div>
                <p>ADDED BY/ ON</p>
              </div>
              <div>
                <p>NOTES/DESCRIPTION</p>
              </div>
              <div>
                <p>ACTION</p>
              </div>
            </div>
            <div className="py-2 px-3 rounded-1 d-flex justify-content-between ">
              {/* <div>
                  <p></p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div>
                  <p></p>
                  </div> */}
              <div className="text-center w-100 py-3">No notes available</div>
            </div>

            <div
              style={{ width: "800px !important" }}
              className="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Add Notes</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  // onClick={() => setForm(initialState)}
                ></button>
              </div>
              <div className="offcanvas-body">
                {/* <div className="d-flex justify-content-end">
            <button
              className="theme-btn btn-style-two mx-2 small"
              onClick={() => {
                setClientData(initialState);
                setClient("");
              }}
            >
              New
            </button>
            <button
              className="theme-btn btn-style-one small"
              onClick={() => {
                if (client.client_name) {
                  handleUpdateClient(client.id);
                } else {
                  handleCreateClient();
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <BeatLoader color={"#ffffff"} loading={loading} size={10} />
              ) : (
                "Save"
              )}
            </button>
          </div> */}
           <div>
            <HtmlEditor form={form}  descriptionData={descriptionData} setDescriptionData={setDescriptionData} />
           </div>
              </div>
            </div>
          </div>
        </>
      )}
      {tab == 2 && <div className="px-3">hii i am the pipline</div>}
    </div>
  );
};

export default Notes;
