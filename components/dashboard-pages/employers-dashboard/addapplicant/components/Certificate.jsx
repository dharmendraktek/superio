'use client'
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { deleteReq, postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
    name:'',
    completed_year:new Date(),
    comment:'',
}

const Certificate = ({applicantDetails,handleGetApplicantDetails}) => {
    const [form, setForm] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openOption, setOpenOption] = useState(null);


      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = async() => {
    setIsLoading(true);
    form['applicant_ref'] = applicantDetails.id
    const response = await postApiReq('/applicant-certificates/', form);
    setIsLoading(false);
    if(response.status){
      handleGetApplicantDetails();
        setForm(initialState)
        setOpen(false);
        toast.success('Certificate detail has been added successfully');
    }
  }

  const handleDeleteCertificateDetails = async(id) => {
    const response = await deleteReq(`/applicant-certificates/${id}/`)
    if(response.status){
      toast.success('Certificate detail has been deleted successfully');
      handleGetApplicantDetails();
    }
  }

    return(
        <div className="shadow">
           <div className="py-3 px-3">
            <div className="d-flex justify-content-between">
             <h4>Add Certification</h4>
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
          <p>Certification</p>
          <input
            name="name"
            onChange={handleChange}
            value={form.name}
            type="text"
            className="client-form-input"
          />
        </div>
        <div className="col-4 my-1">
          <p>Year Completed</p>
          <DatePickerCustom 
            handleDate={(date) =>
                setForm((prev) => ({ ...prev, completed_year: date }))
              }
              date={form.completed_year}
          />
        </div>
        <div className="col-4 my-1">
          <p>Comments</p>
          <textarea
            name="comment"
            onChange={handleChange}
            value={form.comment}
            type="text"
            className="client-form-input"
          />
        </div>
        </div>
          <div className="d-flex justify-content-end gap-2 my-3"> 
                <button onClick={handleAddCertificate} className="theme-btn btn-style-one small" disabled={isLoading}>{isLoading ? <BtnBeatLoader /> :'Save'}</button>
                <button onClick={() => setOpen(false)} className="theme-btn btn-style-four small">cancel</button>
            </div>
              </>
              :
              <div>
              {applicantDetails?.certificate?.map((item) => {
                return(
                  <div key={item.id} className="my-2 px-2 py-2 d-flex justify-content-between border" >
                    <div>
                      {/* <h5>{item.name}</h5> */}
                      <span>{item.name} | {moment(item.completed_year).format('DD-MM-YYYY')} </span>
                      <p>{item.comment}</p>
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
                         handleDeleteCertificateDetails(item.id)
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
           </div>
    )
}

export default Certificate;