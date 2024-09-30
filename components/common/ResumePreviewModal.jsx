'use client'
import { BASE_URL } from "@/utils/endpoints";
import { useEffect, useState } from "react";


const ResumePreviewModal = ({applicantDetails, setApplicantDetails}) => {
    const[resume, setResume] = useState();

    useEffect(() => {
      if(applicantDetails){
        let resume =  applicantDetails.documents.find((item) => item.is_default == true);
        setResume(resume);  
    }
    }, [applicantDetails])
     
    return(
        <div className="modal fade" id="resumePreviewModal" tabindex="-1" aria-labelledby="resumePreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="resumePreviewModalLabel">Preview</h5>
              {/* <h6>{applicantDetails?.firstname}</h6> */}
              <button type="button" onClick={() =>   etails(null)} className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <iframe src={resume?.file_url} style={{width:'100%', height:'800px'}} />
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

export default ResumePreviewModal;



// "use client";
// import { useState } from "react";

// const ResumePreviewModal = ({applicantDetails, setApplicantDetails   }) => {
//   const [tab, setTab] = useState("details");
//   const [num, setNum] = useState(1);
//   const [initialNum, setInitialNum] = useState(0);

//   const tabsName = [
//     { id: 1, name: "Applicant Details", value: "details" },
//     { id: 2, name: "Documents", value: "doc" },
//   ];

//   console.log("-------------documents de------", applicantDetails);

//   return (
//     <div
//       className="modal fade"
//       id="resumePreviewModal"
//       tabindex="-1"
//       aria-labelledby="resumePreviewModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-xl">
//         <div className="modal-content">
//           <div className="modal-header border border-bottom-primary">
//             <h5 className="modal-title" id="resumePreviewModalLabel">
//               Preview
//             </h5>
//             {/* <h6>{applicantDetails?.firstname}</h6> */}
//             <button
//               type="button"
//               onClick={() => setApplicantDetails(null)}
//               className="btn-close text-white"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <div>
//               <div className="d-flex">
//                 {tabsName.map((item, index) => {
//                   return (
//                     <div
//                       key={index}
//                       onClick={() => setTab(item.value)}
//                       className={`tabs ${
//                         tab == item.value
//                           ? "bg-primary text-white border-primary"
//                           : "bg-white text-black"
//                       } border text-black align-items-center cursor-pointer border-1 py-1  px-3 d-flex gap-3`}
//                     >
//                       <span className="fs-6">{item.name}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//               <hr className="border border-secondary"></hr>
//               {tab == "doc" ? (
//                 <div>
//                   {applicantDetails?.documents.length == 0 &&
//                   <div className="d-flex justify-content-end gap-2">
//                     <button
//                       className="theme-btn btn-style-one small"
//                       onClick={() => {
//                         if(num > 1){
//                           setNum((prev) => prev - 1);
//                         }
//                       }}
//                     >
//                       {" "}
//                       Prev{" "}
//                     </button>
//                     <butto
//                       className="theme-btn btn-style-four small"
//                       onClick={() => {
//                         if(num <= applicantDetails.documents.length)
//                         setNum((prev) => prev + 1);
//                         // setInitialNum((prev) => prev+1);
//                       }}
//                     >
//                       Next
//                     </butto>
//                   </div>
//                   }
//                   {applicantDetails?.documents
//                     ?.slice(num-1, num)
//                     .map((item, index) => {
//                       return (
//                         <div
//                           key={index}
//                           className="border border-secondary my-2 rounded-1"
//                         >
//                           <iframe src={item.file} className="w-100" />
//                         </div>
//                       );
//                     })}
//                     {applicantDetails?.documents.length == 0 &&
//                        <div className="text-center">
//                            No documents available
//                        </div>
//                     }
//                 </div>
//               ) : (
//                 <div className="row">
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">Applicant Name</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.firstname || "N/A"} {applicantDetails?.middlename || ""} {applicantDetails?.lastname || ""}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">Job Title</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.title || "N/A"}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">Email</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.email || "N/A"}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">
//                       Phone Number
//                     </p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.mobile || "N/A"}
//                     </div>
//                   </div>
//                   {/* <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">
//                       Client Bill/Rate
//                     </p>
//                     <div
//                       type="text"
//                       disabled
//                       value={jobDetails?.title}
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {jobDetails?.currency || "N.A"}
//                       {jobDetails?.currency ? "/" : "/"}
//                       {jobDetails?.amount || "N.A"}
//                       {jobDetails?.amount ? "/" : "/"}
//                       {jobDetails?.payment_frequency || "N.A"}
//                     </div>
//                   </div> */}
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">City</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {(applicantDetails?.city || "N/A")}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">State</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.state || "N/A"}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">Source</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.source || "N/A"}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">
//                       Authorization
//                      </p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.authorization || "N/A"}{" "}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">
//                       Skype Id
//                     </p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.skype_id || "N/A"}
//                     </div>
//                   </div>
//                   <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">PrimarySkills</p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100 d-flex gap-2 flex-wrap"
//                     >
//                       {applicantDetails?.primary_skills?.map((item, index) => {
//                         return(
//                         <div className="border border-primary px-1 rounded-1 bg-white" style={{width:'fit-content'}} key={index} >
//                           <span>{item.name}</span>
//                         </div>
//                         )
//                       })}
//                       {(applicantDetails?.primary_skills?.length == 0 && "N/A")}
//                     </div>
//                   </div>
//                   {/* <div className="col-4 my-2">
//                     <p className="text-black fw-400 my-1 fs-6">
//                       Account Manager
//                     </p>
//                     <div
//                       type="text"
//                       className="p-2 bg-secondary text-black fw-600 w-100"
//                     >
//                       {applicantDetails?.head_account_manager_name || "N/A"}
//                     </div>
//                   </div> */}
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* <div className="modal-footer">
//               <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleUpdateStatus} >Update</button>
//               <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
//             </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreviewModal;
