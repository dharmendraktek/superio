'use client'
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import Paper from "@/components/common/Paper";
import { deleteReq, postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
    company_name:'',
    designation:'',
    startdate:new Date(),
    enddate:new Date()
}


const Experience = ({applicantDetails, handleGetApplicantDetails}) => {
    const [form, setForm] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);  
    const [open, setOpen] = useState(false);
    const [openOption, setOpenOption] = useState(null);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddWorkExp = async() => {
        setIsLoading(true);
        form['applicant_ref'] = applicantDetails.id;
        const response = await postApiReq('/applicant-work_experiences/', form)
        setIsLoading(false);
        if(response.status){
          handleGetApplicantDetails();
          setForm(initialState);
          setOpen(false);
          toast.success('Work experience has been added successfully');
        }
    }

    const handleDeleteExpDetails = async(id) => {
      const response = await deleteReq(`/applicant-work_experiences/${id}/`)
      if(response.status){
        toast.success('Experience detail has been deleted successfully');
        handleGetApplicantDetails();
      }
    }


    return(
        <Paper>
        <div className="py-3 px-3">
          <div className="d-flex justify-content-between">
          <h4>Add Work Experience Details</h4>
          <button
            // data-bs-toggle="offcanvas"
            // data-bs-target="#offcanvasMeeting"
            // aria-controls="offcanvasMeeting"
            className="theme-btn btn-style-one small"
            onClick={() => setOpen(true)} 
          >
            Add
          </button>
          </div>
          {open ?
            <>
        <div className="row">
        <div className="col-4 my-1">
       <p>Company Name</p>
       <input
         name="company_name"
         onChange={handleChange}
         value={form.company_name}
         type="text"
         className="client-form-input"
       />
     </div>
     <div className="col-4 my-1">
       <p>Designation</p>
       <input
         name="designation"
         onChange={handleChange}
         value={form.designation}
         type="text"
         className="client-form-input"
       />
     </div>
     <div className="col-4 my-1">
      <div className="d-flex justify-content-between gap-2">
       <div className="w-50">
       <p>Start Date</p>
       <DatePickerCustom
         handleDate={(date) =>
            setForm((prev) => ({ ...prev, startdate: date }))
          }
          date={form.startdate}
       />
       </div>
       <div className="w-50">
       <p>End Date</p>
       <DatePickerCustom 
           handleDate={(date) =>
            setForm((prev) => ({ ...prev, enddate: date }))
          }
          date={form.enddate}
       />
       </div>
      </div>
     </div>
     </div>
     <div className="d-flex justify-content-end gap-2 my-3"> 
             <button onClick={handleAddWorkExp} className="theme-btn btn-style-one small" disabled={isLoading}>{ isLoading ? <BtnBeatLoader /> :'Save'}</button>
             <button onClick={() => setOpen(false)} className="theme-btn btn-style-four small">Cancel</button>
         </div>
            </>
            :
            <div>
               {applicantDetails?.work_experience?.map((item) => {
                return(
                  <div key={item.id} className="my-2 px-2 py-2 d-flex justify-content-between border" >
                    <div>
                      <h5>{item.company_name}</h5>
                      <span>{item.designation}</span>
                      <p>{moment(item.startdate).format('DD-MM-YYYY')} - {moment(item.enddate).format('DD-MM-YYYY')}</p>
                    </div>
                    <div className="position-relative px-2">
                <strong
                  className="cursor-pointer"
                  onClick={() => {
                    if (openOption) setOpenOption(null);
                    else setOpenOption(item.id);
                  }}
                >
                  {reactIcons.dots}
                </strong>
                {item.id && item.id == openOption && (
                  <div
                    className="position-absolute bg-white shadow px-2 py-1 rounded-1"
                    style={{
                      width: "150px",
                      height: "60px",
                      right: "0px",
                      zIndex: "1000",
                    }}
                  >
                    <p
                      onClick={() =>{
                         handleDeleteExpDetails(item.id)
                        //  setOpen(!open);
                        }}
                      className="cursor-pointer"
                    >
                      {reactIcons.delete} Delete
                    </p>
                    {/* <p
                      onClick={() => {
                      setTask(item)
                        setForm((prev) => ({
                          ...prev,
                          description: item.text,
                        }));
                       setOpenOption(null)
                      }}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasTask"
                      aria-controls="offcanvasTask"
                      className="cursor-pointer"
                    >
                      {" "}
                      {reactIcons.edit} Update
                    </p> */}
                  </div>
                )}
              </div>
                  </div>
                )
               })
               }
              </div>
          }
        </div>
        </Paper>
    )
}

export default Experience;