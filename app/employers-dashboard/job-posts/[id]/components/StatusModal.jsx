'use client'

import { getReq, patchReq } from "@/utils/apiHandlers"
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


const StatusModal = ({currentStatus, subStatus, submissionId}) => {
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({
    // new_status:'',
    new_substatus:''
  });


  useEffect(() =>{
    handleGetStatus();
  }, [])


  const handleGetStatus = async() => {
    const response = await getReq(`/status-choices/`);

    if(response.status){
        let nextStatus = currentStatus;
        let subStatusData = response.data.find((item) => item.id == nextStatus);
      setStatusList(subStatusData.substatus);
    }
  }

  const handleUpdateStatus = async() => {
    try{
       const response = await patchReq(`/submissions/${submissionId}/update-status/`, form)
       if(response.status){
        toast.success('Status has been changed successfully');
       }
    }catch(err){
        console.log("-------------erron ", err);
    }
  } 
  
  


    return(
        <div className="modal fade" id="statusModal" tabindex="-1" aria-labelledby="statusModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="statusModalLabel">Applicant Status</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div>
               <p>Status</p>
               <select className="client-form-input" onChange={(e) => setForm((prev) => ({...prev, new_substatus:e.target.value}))}>
                 <option>Select</option>
                {statusList.map((item, index) => {
                    return(
                        <option key={index} value={item.id}>{item.display_name}</option>
                    )
                })
                }
               </select>
               </div>
               <div className="my-2">
                <p>Comment</p>
                <textarea 
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                />
               </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleUpdateStatus} >Update</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default StatusModal;