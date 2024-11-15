'use client'

import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import { getReq, postApiReq } from "@/utils/apiHandlers"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


const CreateTicketModal = () => {
  const [form, setForm] = useState({
    department:'',
    subject:'',
    description_of_issue:'',
    priority:'',
    image:'',
  });
  const [departmentList, setDepartmentList] = useState([])
  const [subjectList, setSubjectList] = useState([]);
  const [deptHead, setDeptHead] = useState([]);
  const [error, setError] = useState({
    department_head:'',
    subject:'',
  })
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    setError((prev) => ({
      ...prev, 
    department_head:'',
    subject:'',
    }))
    if(!form.department){
      setError((prev) => ({...prev, department:"This field is required"}))
    }
    if(!form.subject){
      setError((prev) => ({...prev, subject:"This field is required"}))
    }
    if(form.department && form.subject){
      return true
    }else{
      return false
    }
  }

  useEffect(() =>{
    // handleGetSubject();
    handleGetDepartmentList();
    // handleGetSubject();
  }, [])

  const handleGetDepartmentList = async() => {
    const response = await getReq('/ticket-departments/')
    if(response.status){
        setDepartmentList(response.data);
    }
  }


  useEffect(() => {
     if(form.department){
        let filterDept = departmentList.find((item) => item.id == form.department);
        setSubjectList(filterDept?.department_subject);
        setDeptHead(filterDept?.department_head)

     }
  }, [form.department])

  const handleChange = (e) => {
    const {name, value} = e.target;
  
    setForm((prev) => ({...prev, [name]:value}))
  }
 

  const handleCreateTicket = async () => {

    if(!handleValidation()){
      return;
    }
    const formData = new FormData();
    formData.append("department", form.department);
    // formData.append("department_head", form.department_head);
    formData.append("subject", form.subject);
    formData.append("priority", form.priority);
    formData.append("description_of_issue", form.description_of_issue);
    formData.append("image", form.image);

    try{
      setIsLoading(true);
      const response  = await postApiReq('/tickets/', formData);
      setIsLoading(false);
      if(response.status){
           console.log("-----------response ", response.data);
          toast.success("Ticke has been successfully created")
      }
    }catch(err){
      console.log("-------------error -------", err);
    }
  }

  
  


    return(
        <div className="modal fade" id="createTicketModal" tabindex="-1" aria-labelledby="createTicketModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="createTicketModalLabel">Create Ticket</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div>
               <p>Department</p>
               <select className="client-form-input" name="department" onChange={handleChange}>
                 <option>Select</option>
                {departmentList.map((item, index) => {
                    return(
                        <option key={index} value={item.id}>{item.dept_name}</option>
                    )
                })
                }
               </select>
               <span className="text-danger">{error.department}</span>
               </div>
               <div className="my-2">
                <p>Subject</p>
                <select className="client-form-input" name="subject" onChange={handleChange}  >
                <option>Select</option>
                {subjectList?.map((item, index) => {
                    return(
                        <option key={index} value={item.id}>{item.name}</option>
                    )
                })
                }
                </select>
                <span className="text-danger">{error.subject}</span>
               </div>
               <div className="my-2">
                <p>Emails To</p>
                <div className="border-bottom border-secondary d-flex flex-wrap  px-2" style={{minHeight:"30px", maxHeight:"fit-content"}}>
                  {deptHead?.map((item) => {
                    return(
                      <span>{item.email}</span>
                    )
                  })
                  }
                </div>
               </div>
               <div>
                <p>Priority</p>
                <select name="priority" className="client-form-input" onChange={handleChange}>
                <option>Select</option>
                <option>Low</option>
                <option>High</option>
                <option>Critical</option>
                </select>
               </div>
               <div className="my-2">
                <p>Description</p>
                <textarea 
                  name="description_of_issue" 
                  onChange={handleChange}
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                />
               </div>
               <div className="my-2">
                <p>Upload Image</p>
                <input
                  type="file"
                  onChange={(e) => setForm((prev) => ({...prev, image:e.target.files[0]}))}
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                />
               </div>
               
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" onClick={handleCreateTicket} disabled={isLoading} >{isLoading ?<BtnBeatLoader /> :"Create"}</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateTicketModal;