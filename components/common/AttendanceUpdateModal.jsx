'use client'

import { getReq, patchReq } from "@/utils/apiHandlers"
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


const AttendanceUpdateModal = ({selectDateData}) => {
  const [form, setForm] = useState({
    status:'',
    date_of_attendance:'',
    first_timestamp:'',
    last_timestamp:'',
    duration:'',
    shift_in_time:'',
    shift_out_time:''
  })
  const [statusList, setStatusList] = useState([]);
  

  console.log("-------------set select data ", selectDateData);

  useEffect(() =>{
    handleGetAttendanceStatus();
  }, [])


  const handleGetAttendanceStatus = async() => {
    const response = await getReq(`/attendance-status/`);
    if(response.status){
        setStatusList(response.data);
    }
  }

  const handleUpdateStatus = async() => {
    try{
       const response = await patchReq(`/attendance-details/${submissionId}/update-status/`, form)
       if(response.status){
        toast.success('Status has been changed successfully');
       }
    }catch(err){
    }
  } 
  
  


    return(
        <div className="modal fade" id="attendanceUpdateModal" tabindex="-1" aria-labelledby="attendanceUpdateLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="attendanceUpdateLabel">Update Attendance</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div>
                 <div className="my-2">
                    <p>Type</p>
                    <select className="client-form-input">
                        <option>Select</option>
                        {statusList.map((item) => (
                            <option key={item.id} value={item.id}>{item?.name}</option>
                        )
                        )
                        }

                    </select>
                 </div>
                 <div className="my-2">
                    <p>Date</p>
                    <input type="text" className="client-form-input"  checked value={"30-04-2024"} />
                 </div>
                 <div className="my-2">
                    <p>In Time</p>
                    <input type="text"  checked value={"30-04-2024"} className="client-form-input"  />
                 </div>
                 <div className="my-2">
                    <p>Out Time</p>
                    <input type="text"  checked value={"30-04-2024"} className="client-form-input"  />
                 </div>
                 <div className="my-2">
                    <p>Duration</p>
                    <input type="text"  checked value={"30-04-2024"} className="client-form-input"  />
                 </div>
                 <div className="my-2">
                    <p>Shift In Time</p>
                    <input type="text"  checked value={"30-04-2024"} className="client-form-input"  />
                 </div>
                 <div className="my-2">
                    <p>Shift Out Time</p>
                    <input type="text"  checked value={"30-04-2024"} className="client-form-input"  />
                 </div>
                 
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

export default AttendanceUpdateModal;