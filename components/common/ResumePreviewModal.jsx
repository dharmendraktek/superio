'use client'
import { BASE_URL } from "@/utils/endpoints";
import { useEffect, useState } from "react";


const ResumePreviewModal = ({openResume, setOpenResume}) => {
    const[resume, setResume] = useState();

    useEffect(() => {
      if(openResume){
        let resume =  openResume.documents.find((item) => item.is_default == true);
        setResume(resume);  
    }
    }, [openResume])
     
    return(
        <div className="modal fade" id="resumePreviewModal" tabindex="-1" aria-labelledby="resumePreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="resumePreviewModalLabel">Preview</h5>
              {/* <h6>{openResume?.firstname}</h6> */}
              <button type="button" onClick={() => setOpenResume(null)} className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <iframe src={resume?.file_url} style={{width:'100%', height:'800px'}} />
            </div>
            {/* <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleUpdateStatus} >Update</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div> */}
          </div>
        </div>
      </div>
    )
}

export default ResumePreviewModal;