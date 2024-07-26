"use client";

import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import HtmlEditor from "@/components/common/HtmlEditor";
import { deleteReq, getReq, patchReq } from "@/utils/apiHandlers";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

const tabsName = [
  { id: 1, name: "Job Posting", value: "job" },
  { id: 2, name: "Applicant Reference", value: "applicant" },
];

const Notes = ({ jobId, noteData, setNoteData }) => {
  const [tab, setTab] = useState("job");
  const [form, setForm] = useState({
    description: "<p></p>",
  });
  const [descriptionData, setDescriptionData] = useState();
  const [openOption, setOpenOption] = useState();
  const [updateNoteId, setUpdateNoteId] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNotes = async () => {
    let data;
    let updateData;
    setIsLoading(true);
    if (updateNoteId) {
      let temp = [...noteData];
      temp.map((item) => {
        delete item["user"];
        item["user"] = 209;
        return item;
      });
      data = temp.filter((item) => item.id !== updateNoteId);
      data.push({
        text: descriptionData,
        type: tab,
        user: 209,
        id: updateNoteId,
        created_at: new Date(),
        updated_at: new Date(),
      });
    } else {
      let temp = [...noteData];
      updateData = temp.map((item) => {
        delete item["user"];
        item["user"] = 209;
        return item;
      });
      updateData.push({
        text: descriptionData,
        type: tab,
        user: 209,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    const response = await patchReq(`/jobs/${jobId}/`, {
      notes_write: updateNoteId ? data : updateData,
    });
    setIsLoading(false);
    toast.success("Note Created Successfully");

    setNoteData(response.data.notes);
  };

  const handleDeleteNotes = async (noteId) => {
    let updateData;
    let data= [];
    let temp = [...noteData];
    updateData = temp.map((item) => {
      delete item["user"];
      item["user"] = 209;
      return item;
    });
    if(updateData.length > 1){
     data = updateData.filter((item) => item.id !== noteId);
    }else{
      data.push({ id: noteId, delete: true });
    }
    const response = await patchReq(`/jobs/${jobId}/`, {
      notes_write: data,
    });
    if (response.status) {
      setNoteData(response.data.notes);
      toast.success("Note Deleted Successfully");
    }
  };


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
                  onClick={() => setTab(item.value)}
                  className={`tabs ${
                    tab == item.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-black"
                  } border text-black align-items-center cursor-pointer border-1 rounded-2 ps-2 d-flex gap-3`}
                >
                  <span className="fs-6">{item.name}</span>
                  <div className="bg-white d-flex align-items-center justify-content-center  text-black rounded-end-1 h-100 px-2">
                    {
                      noteData.filter((_item) => _item.type == item.value)
                        .length
                    }
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
          onClick={() => setOpen(!open)}
        >
          Add
        </button>
      </div>
      {tab == "job" && (
        <>
          {/* <hr className="border border-secondary"></hr> */}
          <div className="px-4 Py-4">
            <div className="border py-1 px-3 rounded-1 d-flex  border-top-black border-end-black">
              <div style={{ width: "350px" }}>
                <p>ADDED BY/ ON</p>
              </div>
              <div className="w-100">
                <p>NOTES/DESCRIPTION</p>
              </div>
              <div style={{ width: "100px" }}>
                <p>ACTION</p>
              </div>
            </div>
            <div
              className="custom-scroll-sm"
              style={{
                minHeight: "60px",
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              <div className="py-2 px-3 rounded-1  ">
                {noteData
                  .filter((item) => item.type == tab)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-between mb-2 "
                      >
                        <div style={{ width: "350px" }}>
                          <strong>
                            {item?.user?.first_name} {item?.user?.last_name}
                          </strong>
                          <p>
                            {moment(item.created_at).format(
                              "DD-MM-YYYY hh:mm A"
                            )}
                          </p>
                        </div>
                        <div className="w-100">
                          <div
                            className="mt-2"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </div>
                        <div
                          className="position-relative "
                          style={{ width: "100px" }}
                        >
                          <strong
                            onClick={() => {
                              if (!openOption) {
                                setOpenOption(item.id);
                              } else {
                                setOpenOption(null);
                              }
                            }}
                            className="fs-5 cursor-pointer"
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
                                onClick={() => handleDeleteNotes(item.id)}
                                className="cursor-pointer"
                              >
                                {reactIcons.delete} Delete
                              </p>
                              <p
                                onClick={() => {
                                  setUpdateNoteId(item.id);
                                  setForm((prev) => ({
                                    ...prev,
                                    description: item.text,
                                  }));
                                  setOpen(!open);
                                }}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
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
            </div>
            {!(noteData.find((item) => item.type == tab)) && (
                <div className="text-center w-100 py-3">No notes available</div>
              )}
            <div
              style={{ width: "800px !important" }}
              className="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div
                className="offcanvas-header"
                style={{ background: "var(--theme-color-first)" }}
              >
                <h5 id="offcanvasRightLabel" className="text-white">
                  Add Notes
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => {
                    setOpen(!open);
                    setForm((prev) => ({ ...prev, description: "<p></p>" }));
                    setUpdateNoteId(null);
                  }}
                ></button>
              </div>
              <div className="offcanvas-body">
                <div>
                  {open && (
                    <HtmlEditor
                      form={form}
                      wrapperStyle={{
                        border: "1px solid gray",
                        minHeight: "750px",
                        borderRadius: "3px",
                      }}
                      descriptionData={descriptionData}
                      setDescriptionData={setDescriptionData}
                    />
                  )}
                  <div className="d-flex mt-2 gap-2">
                    <button
                      onClick={handleCreateNotes}
                      className="theme-btn btn-style-one small"
                    >
                      {isLoading ? <BtnBeatLoader /> : "Save"}
                    </button>
                    <button
                      className="theme-btn btn-style-four small"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      onClick={() => {
                        setOpen(!open);
                        setForm((prev) => ({
                          ...prev,
                          description: "<p></p>",
                        }));
                        setUpdateNoteId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {tab == "applicant" && (
        <div className="px-3">
          <div className="px-4 Py-4">
            <div className="border py-1 px-3 rounded-1 d-flex justify-content-between border-top-black border-end-black">
              <div style={{ width: "350px" }}>
                <p>ADDED BY/ ON</p>
              </div>
              <div className="w-100">
                <p>NOTES/DESCRIPTION</p>
              </div>
              <div style={{ width: "100px" }}>
                <p>ACTION</p>
              </div>
            </div>
            <div
              className="custom-scroll-sm"
              style={{
                minHeight: "100px",
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              <div className="py-2 px-3 rounded-1  ">
                {noteData
                  .filter((item) => item.type == tab)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-between mb-2 "
                      >
                        <div style={{ width: "350px" }}>
                          <strong>
                            {item?.user?.first_name} {item?.user?.last_name}
                          </strong>
                          <p>
                            {moment(item.created_at).format(
                              "DD-MM-YYYY hh:mm A"
                            )}
                          </p>
                        </div>
                        <div className="w-100">
                          <div
                            className="mt-2"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </div>
                        <div
                          className="position-relative "
                          style={{ width: "100px" }}
                        >
                          <strong
                            onClick={() => {
                              if (!openOption) {
                                setOpenOption(item.id);
                              } else {
                                setOpenOption(null);
                              }
                            }}
                            className="fs-5 cursor-pointer"
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
                                onClick={() => handleDeleteNotes(item.id)}
                                className="cursor-pointer"
                              >
                                {reactIcons.delete} Delete
                              </p>
                              <p
                                onClick={() => {
                                  setUpdateNoteId(item.id);
                                  setForm((prev) => ({
                                    ...prev,
                                    description: item.text,
                                  }));
                                  setOpen(!open);
                                }}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
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
              {!(noteData.find((item) => item.type == tab)) && (
                <div className="text-center w-100 py-3">No notes available</div>
              )}
            </div>

            <div
              style={{ width: "800px !important" }}
              className="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div
                className="offcanvas-header"
                style={{ background: "var(--theme-color-first)" }}
              >
                <h5 id="offcanvasRightLabel" className="text-white">
                  Add Notes
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => {
                    setOpen(!open);
                    setForm((prev) => ({ ...prev, description: "<p></p>" }));
                    setUpdateNoteId(null);
                  }}
                ></button>
              </div>
              <div className="offcanvas-body">
                <div>
                  {open && (
                    <HtmlEditor
                      form={form}
                      wrapperStyle={{
                        border: "1px solid gray",
                        minHeight: "750px",
                        borderRadius: "3px",
                      }}
                      descriptionData={descriptionData}
                      setDescriptionData={setDescriptionData}
                    />
                  )}
                  <div className="d-flex mt-2 gap-2">
                    <button
                      onClick={handleCreateNotes}
                      className="theme-btn btn-style-one small"
                    >
                      {isLoading ? <BtnBeatLoader /> : "Save"}
                    </button>
                    <button
                      className="theme-btn btn-style-four small"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      onClick={() => {
                        setOpen(!open);
                        setForm((prev) => ({
                          ...prev,
                          description: "<p></p>",
                        }));
                        setUpdateNoteId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
