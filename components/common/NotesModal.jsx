"use client";

import { useEffect, useState } from "react";
import BtnBeatLoader from "./BtnBeatLoader";
import HtmlEditor from "./HtmlEditor";
import { patchReq, postApiReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";

const NotesModal = ({submissionDetails, side=''}) => {
  const [open, setOpen] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    description: "<p></p>",
  });
  const [descriptionData, setDescriptionData] = useState();
  const [jobData, setJobData] = useState();
  const [applicantData, setApplicantData] = useState();

  console.log("-------------- submission details of notes modal", submissionDetails);

  useEffect(() => {
    if (submissionDetails?.length > 0 && side == "applicant") {
      const filteredData = submissionDetails
        .map((item) => {
          const selectedSubmissions = item.jobs_associated.filter(
            (submission) => submission.selected === true
          );
          return { ...item, submissions: selectedSubmissions };
        })
        .filter((item) => item.submissions.length > 0);
        setApplicantData(filteredData[0]?.submissions[0]?.applicant_details)

    //   setSubmissionId(filteredData[0]?.jobs_associated[0]?.id);
    } else if (submissionDetails?.length > 0) {
      const filteredData = submissionDetails
        .map((item) => {
          const selectedSubmissions = item.submissions.filter(
            (submission) => submission.selected === true
          );

          return { ...item, submissions: selectedSubmissions };
        })
        .filter((item) => item.submissions.length > 0);

        console.log("----------------filtered data ----", filteredData);
        setApplicantData(filteredData[0]?.submissions[0]?.applicant_details)

    //   setSubmissionId(filteredData[0]?.submissions[0]?.applicant_details?.id);
    }
  }, [submissionDetails]);

  const handleCreateNotes = async () => {
    let closeBtn = document.getElementById('closeNote');
    try{
      setIsLoading(true);
      let data = {
      text: descriptionData,
      type:'applicant',
      created_at:new Date(),
      updated_at:new Date(),
      applicant_ref:applicantData[0].id,
      user:209,
    }
       const response =  updateNoteId ? await patchReq(`/applicant-notes/${updateNoteId}/`, data) :await postApiReq('/applicant-notes/', data);
       setIsLoading(false);
       if(response.status) {
      closeBtn.click();
        let message = updateNoteId ? 'Note updated successfully' : 'Note created successfully';
        toast.success(message)
       }
    }
    catch(err){
      toast.error(err.message || 'Someting went wrong')
    }
  };

  return (
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
          id="closeNote"
          onClick={() => {
            setOpen(!open);
            setForm((prev) => ({ ...prev, description: "<p></p>" }));
            setUpdateNoteId(null);
          }}
        ></button>
      </div>
      <div className="offcanvas-body">
        <div>
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
  );
};

export default NotesModal;
