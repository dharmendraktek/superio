"use client"
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import Paper from "@/components/common/Paper";
import { deleteReq, postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  name:'',
  proficiency:{
    read:false,
    write:false,
    speak:false,
  }
}

const Languages = ({applicantDetails, handleGetApplicantDetails}) => {
    const [form, setForm] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openOption, setOpenOption] = useState(null);

    const handleAddLang = async() => {
        setIsLoading(true);
        form['applicant_ref'] = applicantDetails.id;
        const response = await postApiReq('/applicant-languages/', form)
        setIsLoading(false);
        if(response.status){
          handleGetApplicantDetails();
          setForm(initialState);
          setOpen(false);
          toast.success('Languages has been added successfully');
        }
    }    

    const handleDeleteLangDetails = async(id) => {
      const response = await deleteReq(`/applicant-languages/${id}/`)
      if(response.status){
        toast.success('Language detail has been deleted successfully');
        handleGetApplicantDetails();
      }
    }

    return(
      <Paper>
        <div className="py-3 px-3">
          <div className="d-flex justify-content-between">
          <h4>Add Language Details</h4>
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
          <hr className="border"></hr>
          {open ?
            <>
        <div className="row">
        <div className="col-4 my-1">
          <p>Language</p>
          <select
            name="name"
            onChange={(e) => setForm((prev) => ({...prev, name:e.target.value}))}
            value={form.name}
            type="text"
            className="client-form-input"
          >
            <option>Select</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
     <div className="col-4 my-1">
       <p>Proficiency</p>
       <div className="d-flex gap-2">
        <div className="d-flex gap-1">
       <input
         name="read"
         onChange={(e) => 
            setForm((prevState) => ({
                ...prevState,
                proficiency: {
                  ...prevState.proficiency,
                  read: e.target.checked,
                }
              }))
         }
         value={form.completed_year}
         type="checkbox"
        //  className="client-form-input"
       />
       <span>Read</span>
        </div>
        <div className="d-flex gap-1">
       <input
         name="speak"
         onChange={(e) => 
            setForm((prevState) => ({
                ...prevState,
                proficiency: {
                  ...prevState.proficiency,
                  speak: e.target.checked,
                }
              }))
         }
         value={form.completed_year}
         type="checkbox"
        //  className="client-form-input"
       />
       <span>Speak</span>
        </div>
        <div className="d-flex gap-1">
       <input
         name="write"
         onChange={(e) => 
            setForm((prevState) => ({
                ...prevState,
                proficiency: {
                  ...prevState.proficiency,
                  write: e.target.checked,
                }
              }))
         }
         value={form.proficiency.speak}
         type="checkbox"
        //  className="client-form-input"
       />
       <span>Write</span>
        </div>
       </div>
     </div>
     </div>
     <div className="d-flex justify-content-end gap-2 my-3"> 
             <button onClick={handleAddLang} className="theme-btn btn-style-one small" disabled={isLoading}>{isLoading ? <BtnBeatLoader /> : 'Save'}</button>
             <button onClick={() => setOpen(false)} className="theme-btn btn-style-four small">Cancel</button>
         </div>
            </>
            :
            <div>
               {applicantDetails?.language?.map((item) => {
                return(
                  <div key={item.id} className="my-2 px-2 py-2 d-flex justify-content-between border" >
                    <div>
                      <h5>{item.name}</h5>
                      <span>{item.proficiency.read ? 'Read' :''} {item.proficiency.write ? 'Write' :''} {item.proficiency.speak ? 'Speak' :''}</span>
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
                {item.id == openOption && (
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
                         handleDeleteLangDetails(item.id)
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

export default Languages;   