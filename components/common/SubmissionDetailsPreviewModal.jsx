'use client'

import { getReq, patchReq } from "@/utils/apiHandlers"
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const tabsName = [
    {id:1, name:'Resume', },
    {id:2, name:'Job Description'},
    {id:3, name:'Documents'},
    {id:4, name:'Linkedin'},
    {id:5, name:'AI Check'},
]

const SubmissionDetailsPreviewModal = () => {
    const [tab, setTab] = useState(1);
 
  


    return(
        <div className="modal fade" id="submissionPreview" tabindex="-1" aria-labelledby="submissionPreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="submissionPreviewModalLabel">Applicant Status</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                 <div className="col-2">
                    <div className="border px-2 rounded-1">
                        {tabsName.map((item, index) => {
                            return(
                                <div key={index} className={`d-flex justify-content-between ${tab == item.id ? 'bg-primary' : 'bg-white'} `}>
                                <div>
                                   <span>{item.name == "Documents" ?  reactIcons.arrowfilldown : ''}</span>
                                   <span>{item.name}</span>
                                    </div>
                                   <input type="checkbox" />
                                </div>
                            )
                        })
                        }
                    </div>
                 </div>
                 <div className="col-10">
                    <div className="border">
                        sdfsd
                    </div>
                 </div>
              </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" >Update</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SubmissionDetailsPreviewModal;