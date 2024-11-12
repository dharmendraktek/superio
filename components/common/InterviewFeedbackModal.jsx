'use client'

import { getReq,  postApiReq } from "@/utils/apiHandlers"

import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const recommendationList = [
    {name:'Does Not matches client requirement.'},
    {name:'Matches Client Requirement.'}
]


const InterviewFeedbackModal = ({selectedItem}) => {
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({
    interview_outcome:'',
    recommendation:'',
    file_upload:'',
    comment:''
  });


  useEffect(() =>{
    handleGetStatus();
  }, [])

console.log("----------------selected ", selectedItem);


  const handleGetStatus = async() => {
    const response = await getReq(`/interview-feedback-status-dropdown/`);

    console.log("----------response ", response);

    if(response.status){
      setStatusList(response.data);
    }
  }

  const handleSubmit = async() => {
    const formData = new FormData();
    formData.append('interview_outcome', form.interview_outcome);
    formData.append('recommendation', form.recommendation);
    formData.append('file_upload', form.file_upload);
    formData.append('comment', form.comment);
    formData.append('interview', selectedItem.id);
    try{
       const response = await postApiReq(`/interview-feedback/`, formData)
       if(response.status){
        toast.success('Feedback  has been Saved successfully');
       }
    }catch(err){
        toast.error(err.response || "Something went wrong")
    }
  } 
  
  


    return(
        <div className="modal fade" id="interviewFeedbackModal" tabindex="-1" aria-labelledby="interviewFeedbackModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="interviewFeedbackModalLabel">Interview Feedback</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div className="my-1">
               <p>Inteview Outcome</p>
               <select name="interview_outcome" className="client-form-input" onChange={(e) => setForm((prev) => ({...prev, interview_outcome:e.target.value}))}>
                 <option>Select</option>
                {statusList.map((item, index) => {
                    return(
                        <option key={index} value={item.id}>{item.display_name}</option>
                    )
                })
                }
               </select>
               </div>
               <div className="my-1">
               <p>Recommendation</p>
               <select name="recommendation" className="client-form-input" onChange={(e) => setForm((prev) => ({...prev, recommendation:e.target.value}))}>
                 <option>Select</option>
                {recommendationList.map((item, index) => {
                    return(
                        <option key={index} value={item.name}>{item.name}</option>
                    )
                })
                }
               </select>
               </div>
               <div className="my-1">
               <p>File Upload</p>
                <input type="file" onChange={(e) => {
                    let file = e.target.files[0]
                    setForm((prev) => ({...prev, file_upload:file}))
                }}  /> 
               </div>
               <div className="my-2">
                <p>Comment</p>
                <textarea 
                  onChange={(e) => setForm((prev) => ({...prev, comment:e.target.value}))}
                  className="border border-secondary px-2 py-1 w-100 rounded-1"
                />
               </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleSubmit} >Update</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default InterviewFeedbackModal;