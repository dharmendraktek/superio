'use client'

import { getReq, patchReq } from "@/utils/apiHandlers"
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


const CreateTicketModal = () => {
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({
    // new_status:'',
    new_substatus:'',
    comment:''
  });
  const [departmentList, setDepartmentList] = useState([])
  const [subjectList, setSubjectList] = useState([]);


  useEffect(() =>{
    // handleGetSubject();
    handleGetDepartmentList();
    // handleGetSubject();
  }, [])

  const handleGetDepartmentList = async() => {
    const response = await axios.get('http://10.10.105.228:8000/api/ticket-departments/')
    if(response.status){
        setDepartmentList(response.data);
        console.log("--------------department list ", response.data);
    }
  }


  useEffect(() => {
     if(form.department){

     }
  }, [form.department])

//   const handleGetSubject = async() => {
//     const response = await axios.get(`http://10.10.105.228:8000/api/subjects/`);
//     console.log("------------subject s------", response.data);

//     if(response.status){
//       setSubjectList(response.data);
//     }
//   }

//   const handleUpdateStatus = async() => {
//     try{
//        const response = await patchReq(`/submissions/${submissionId}/update-status/`, form)
//        if(response.status){
//         toast.success('Status has been changed successfully');
//        }
//     }catch(err){
//     }
//   } 
  
  


    return(
        <div className="modal fade" id="createTicketModal" tabindex="-1" aria-labelledby="createTicketModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="createTicketModalLabel">Applicant Status</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div>
               <p>Department</p>
               <select className="client-form-input" onChange={(e) => setForm((prev) => ({...prev, new_substatus:e.target.value}))}>
                 <option>Select</option>
                {departmentList.map((item, index) => {
                    return(
                        <option key={index} value={item.id}>{item.dept_name}</option>
                    )
                })
                }
               </select>
               </div>
               <div className="my-2">
                <p>Subject</p>
                <select className="client-form-input">
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
                <p>Emails To</p>
                <textarea 
                  onChange={(e) => setForm((prev) => ({...prev, comment:e.target.value}))}
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                  disabled
                />
               </div>
               <div>
                <p>Priority</p>
                <select className="client-form-input">
                <option>Select</option>
                <option>Low</option>
                <option>High</option>
                <option>Critical</option>
                </select>
               </div>
               <div className="my-2">
                <p>Description</p>
                <textarea 
                  onChange={(e) => setForm((prev) => ({...prev, comment:e.target.value}))}
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                />
               </div>
               <div className="my-2">
                <p>Upload Image</p>
                <input
                  type="file"
                  onChange={(e) => setForm((prev) => ({...prev, comment:e.target.value}))}
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                />
               </div>
               
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal"  >Save</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateTicketModal;