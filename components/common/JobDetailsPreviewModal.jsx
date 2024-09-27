'use client'
import { useEffect, useState } from "react";


const JobDetailsPreviewModal = ({jobDetails, setJobDetails}) => {

    useEffect(() => {
       console.log("----------job details ", jobDetails)
    }, [jobDetails])
     
    return(
        <div className="modal fade" id="jobDetailsPreviewModal" tabindex="-1" aria-labelledby="jobDetailsPreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="jobDetailsPreviewModalLabel">Preview</h5>
              {/* <h6>{openResume?.firstname}</h6> */}
              <button type="button" onClick={() => setJobDetails(null)} className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* <div>

              </div> */}
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

export default JobDetailsPreviewModal;