"use client";

import { deleteReq, postReq } from "@/utils/apiHandlers";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import ViewDocumentModal from "./ViewDocumentModal";

const Documents = ({ jobId, jobData, handleGetJobDetails }) => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [option, setOption] = useState(false);
  const [img, setImg] = useState();

  const handleFileUpload = (e) => {
    let file = e.target.files;
    Object.values(file).forEach((item) => {
      setDocuments((prev) => [...prev, item]);
    });
  };

  const handleSaveDocuments = async () => {
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append("files", file);
    });
    formData.append("job", jobId);
    const response = await postReq(`/documents/`, formData);
    if (response.status) {
      toast.success("Documents added sucessfully");
      setDocuments([])
      handleGetJobDetails();
      setOpen(false);
    }
  };

  const handleCloseDoc = (index) => {
    let update = [...documents];
    let filtered = update.filter((item, ind) => ind !== index);

    setDocuments(filtered);
  };

  const handleRemoveDoc = async (id) => {
    const response = await deleteReq(`/documents/${id}/`);
    if (response.status) {
      toast.success("Document deleted successfully");
      handleGetJobDetails();
    }
  };

  return (
    <div className="shadow h-50 py-2">
      <ViewDocumentModal img={img}/>
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
      <div className="p-2">
        {documents.map((item, index) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center rounded-1 my-2 px-2 bg-secondary"
              style={{ width: "100%", height: "50px", }}
              key={index}
            >
              <p>{item?.name}</p>
              <p></p>
              <span
                onClick={() => handleCloseDoc(index)}
                className="text-danger cursor-pointer"
              >
                {reactIcons.close}
              </span>
            </div>
          );
        })}
      </div>
      {open ? (
        <div>
          <div className="d-flex px-5 justify-content-between">
            <div>
              <label>
                <div
                  htmlFor="#upload"
                  className="border border-black rounded-1 p-2"
                  style={{ width: "60px", height: "60px" }}
                >
                  <Image
                    width={90}
                    height={10}
                    src="/images/upload.png"
                    alt="brand"
                  />
                </div>
                <input
                  type="file"
                  id="upload"
                  onChange={(e) => handleFileUpload(e)}
                  className="d-none"
                  multiple
                />
              </label>
            </div>
            <div className="d-flex gap-3">
              <div className="">
                <button
                  onClick={handleSaveDocuments}
                  className="theme-btn btn-style-one small"
                >
                  Save
                </button>
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
        <div>
          {jobData?.documents?.length > 0 ? (
            <div className="d-flex gap-2 flex-wrap">
              {jobData?.documents?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border m-2   position-relative d-flex align-items-center  rounded-1"
                    onMouseEnter={() => setOption(item.id)}
                    onMouseLeave={() => setOption(false)}
                    style={{ width: "48%", height: "60px", background:'aliceblue' }}
                  >
                    {option == item.id && (
                      <div
                        className="position-absolute d-flex gap-2 align-items-center px-2 justify-content-end"
                        style={{
                          width: "100%",
                          height: "60px",
                          top: "0px",
                          background: "rgba(0, 0, 0, 0.5)",
                          zIndex: "10000",
                        }}
                      >
                        {/* <div className="d-flex justify-content-center align-items-center" style={{width:"30px",height:'30px', background:'white', borderRadius:'50%' }}>
                    <span className="text-primary cursor-pointer">{reactIcons.edit}</span>
                    </div> */}
                        <div
                          data-bs-toggle="modal"
                          data-bs-target="#viewDocModal"
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "white",
                            borderRadius: "50%",
                          }}
                          onClick={() => setImg(item.file)}
                        >
                          <span className="text-primary cursor-pointer">
                            {reactIcons.view}
                          </span>
                        </div>
                        <div
                          onClick={() => handleRemoveDoc(item.id)}
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "white",
                            borderRadius: "50%",
                          }}
                        >
                          <span className="text-primary cursor-pointer">
                            {reactIcons.delete}
                          </span>
                        </div>
                      </div>
                    )}
                    <span className="p-2 fw-semibold">{item.file}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">No documents available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Documents;
