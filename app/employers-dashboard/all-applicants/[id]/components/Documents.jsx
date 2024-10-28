import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import Paper from "@/components/common/Paper";
import UploadSingleDocument from "@/components/common/UploadSingleDocument";
import { documentTypes } from "@/components/dashboard-pages/employers-dashboard/addapplicant/components/constant";
import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  type: "Select",
  comment: "",
  applicant: "",
  is_default:'true',
};

const Documents = ({
  applicantDetails,
  setActiveForm,
  handleGetApplicantDetails,
  resume,
  setResume,
  resumeUrl,
}) => {
  const [form, setForm] = useState(initialState);
  const [document, setDocument] = useState(resume ? resume : "");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(resume ? true : false);
  const [option, setOption] = useState(null);
  const [file, setFile] = useState(resumeUrl ? resumeUrl : "");

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    setDocument(file);
  };

  useEffect(() => {
    if (resume) {
      setForm((prev) => ({ ...prev, type: "Resume" }));
    }
  }, [resume]);

  useEffect(() => {
    if (document) {
      setForm((prev) => ({ ...prev, title: document.name }));
    }
  }, [document]);

  useEffect(() => {
    if (applicantDetails?.documents?.length > 0) {
      let resume = applicantDetails?.documents?.find(
        (item) => item.is_default == true
      );
      if (resume) setFile(resume.file_url);
    }
  }, [applicantDetails]);

  const handleUploadDoc = async () => {
    const formData = new FormData();
    setIsLoading(true);
    // documents.forEach((file, index) => {
    formData.append("files", document);
    // });
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("comment", form.comment);
    formData.append("applicant", applicantDetails.id);
    if(form.is_default){
      formData.append("is_default", form.is_default);
    }
    const response = await postApiReq(`/applicant-documents/`, formData);
    setIsLoading(false);
    if (response.status) {
      handleGetApplicantDetails();
      setOpen(false);
      handleClear()
      toast.success("Document uploaded successfully");
    }
  };
  
  const handleClear = () => {
    setResume([])
      setForm(initialState);
      setDocument("");
  }

  const handleRemoveDoc = async (id) => {
    const response = await deleteReq(`/applicant-documents/${id}/`);
    if (response.status) {
      toast.success("Document deleted successfully");
      handleGetApplicantDetails();
    }else if(response.error){
      toast.error(response.error.error);
    }
  };

  const handleDownloadDoc = async(id) => {
    window.open(BASE_URL + `/applicant-documents/${id}/download/`);
  }

  return (
    <Paper>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Documents</h4>
          <div>
            <button
              onClick={() =>{
                setOpen(!open)
                handleClear();   
              }}
              className="theme-btn btn-style-one small"
            >
              {" "}
              Add
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div>
          <div className="row mt-4">
            <div className="col-4">
              <p className="mb-2">Upload Document</p>
              <UploadSingleDocument handleFileUpload={handleFileUpload} />
              <p className="text-danger">{document?.name}</p>
            </div>
            <div className="col-8">
              <div className="d-flex flex-fill gap-5 ">
                <div className="w-50">
                  <p className="py-2">Document Type</p>
                  <select
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="client-form-input"
                    value={form.type}
                  >
                    <option value='Select'>Select</option>
                    {documentTypes.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-50">
                  <p className="py-2">Document Title</p>
                  <input
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    type="text"
                    value={form?.title}
                    className="client-form-input"
                  />
                </div>
              </div>
              {form.type == "Resume" && (
                <div className="my-2">
                  <p>Resume Visibility</p>
                  <div className="d-flex gap-3">
                    <div className="d-flex gap-1 ">
                      <input
                        type="radio"
                        name="is_default"
                        value="true"
                        checked={form.is_default == "true"}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            is_default: e.target.value,
                          }));
                        }}
                      />
                      <p>Add and Make Default</p>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        name="is_default"
                        checked={form.is_default == "false"}
                        value="false"
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, is_default: "false" }))
                        }
                      />
                      <p>Add Only</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="my-2">
                <p className="py-2">Description</p>
                <textarea
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, comment: e.target.value }))
                  }
                  className="border w-100 p-2"
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="theme-btn btn-style-one small"
                  onClick={handleUploadDoc}
                  disabled={isLoading}
                >
                  {isLoading ? <BtnBeatLoader /> : "Save"}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="theme-btn btn-style-four small"
                  id='btnCancel'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {applicantDetails?.documents?.length > 0 ? (
            <div className="gap-2 flex-wrap">
              {applicantDetails?.documents?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border my-2 position-relative d-flex align-items-center  rounded-1"
                    onMouseEnter={() => setOption(item.id)}
                    onMouseLeave={() => setOption(false)}
                    style={{ height: "80px" }}
                  >
                    {option == item.id && (
                      <div
                        className="position-absolute d-flex gap-2 align-items-center px-2 justify-content-end"
                        style={{
                          width: "100%",
                          height: "80px",
                          top: "0px",
                          background: "rgba(0, 0, 0, 0.5)",
                          zIndex: "10000",
                        }}
                      >
                        {/* <div className="d-flex justify-content-center align-items-center" style={{width:"30px",height:'30px', background:'white', borderRadius:'50%' }}>
                    <span className="text-primary cursor-pointer">{reactIcons.edit}</span>
                    </div> */}
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "white",
                            borderRadius: "50%",
                          }}
                            onClick={() => handleDownloadDoc(item.id)}
                        >
                          <span className="text-primary cursor-pointer">
                            {reactIcons.download}
                          </span>
                        </div>
                        <div
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasQuickView  "
                          aria-controls="offcanvasQuickView"
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "white",
                            borderRadius: "50%",
                          }}
                          onClick={() => setFile(item.file_url)}
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
                    <div className="p-2 d-flex w-100 justify-content-between fw-semibold">
                      <div>
                        <span>{reactIcons.file}</span>
                        <span>
                          {item.type} - {item.document_name}
                        </span>
                        {item.is_default && (
                          <span
                            className="fs-5 ms-2"
                            style={{ color: "green" }}
                          >
                            {reactIcons.checked}
                          </span>
                        )}
                        <p>
                          Created By -{" "}
                          {item.updated_by
                            ? item.updated_by.first_name +
                              " " +
                              item.updated_by.last_name
                            : "N/A"}
                        </p>
                        <p>comment - {item.comment ? item.comment : "N/A"}</p>
                      </div>
                      <div>
                        <span>{reactIcons.dots}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">No documents available</div>
          )}
        </div>
      )}
      <div
        style={{ width: "800px !important", background: "light-gray" }}
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasQuickView"
        aria-labelledby="offcanvasQuickViewLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasQuickViewLabel">{"Resume"}</h5>
          <div className="d-flex justify-content-end">
            {/* <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">Save</button> */}
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              {/* Cancel */}
            </button>
          </div>
        </div>
        <div className="offcanvas-body">
          <iframe
            src={file}
            style={{ width: "100%", height: "100%" }}
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </Paper>
  );
};

export default Documents;
