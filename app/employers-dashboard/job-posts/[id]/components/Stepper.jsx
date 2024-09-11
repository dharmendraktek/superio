import { reactIcons } from "@/utils/icons";
import StatusModal from "./StatusModal";

const stepsData = [
  { id: 1, name: "Tagged" },
  { id: 2, name: "Submission" },
  { id: 3, name: "Client Submission" },
  { id: 4, name: "Interview" },
  { id: 5, name: "Confirmation" },
  { id: 6, name: "Placement" },
  { id: 7, name: "Not Joined" },
  // {id:8, name:'Tagged'},
];

const Stepper = ({ submissionDetails }) => {
  let {
    mobile,
    firstname,
    middlename,
    lastname,
    pay_rate_currency,
    pay_rate_amount,
    pay_rate_type,
    pay_rate_contract_type,
  } = submissionDetails.applicant_details[0];

  return (
    <>
        <StatusModal
         submissionId={submissionDetails.id}
         currentStatus = {submissionDetails?.current_status}
         subStatus={submissionDetails?.current_substatus}
        />
      <div className="py-1 px-1 mb-4 mt-2 d-flex justify-content-between ">
        <div className="w-20">
          <p>{firstname + " " + middlename + " " + lastname}</p>
        </div>
        <div className="" >
          <p>SUBMITTED BY/ON</p>
        </div>
        <div  style={{width:''}}>
          <p>{mobile}</p>
        </div>
        <div style={{width:"150px"}}>
          <p></p>
        </div>
        <div>
          <strong>
            {pay_rate_currency ?pay_rate_currency : 'N.A'  }
              /
             {pay_rate_amount ? pay_rate_amount : 'N.A' }/
              {
              pay_rate_type ? pay_rate_type : 'N.A' 
              }
              /
              {pay_rate_contract_type ? pay_rate_contract_type : 'N.A'}
          </strong>
        </div>
        <div className="w-20 text-center">
          <p>{submissionDetails?.current_substatus}</p>
          <span 
                data-bs-toggle="modal"
                data-bs-target="#statusModal" className="text-primary cursor-pointer">{reactIcons.edit}</span>
        </div>
        <div>
          <p></p>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        {stepsData.map((item) => {
          return (
            <div>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "100px",
                    height: "3px",
                    background: `${
                      submissionDetails.current_status >= item.id
                        ? "#2bbc26"
                        : "gray"
                    }`,
                  }}
                ></div>
                <div>
                  {submissionDetails.current_status == item.id ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "100%",
                        background: "#2bbc26",
                      }}
                    >
                      <span className="text-white">{reactIcons.checkmark}</span>
                    </div>
                  ) : submissionDetails.current_status > item.id ? (
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        borderRadius: "100%",
                        background: "#2bbc26",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        borderRadius: "100%",
                        background: "gray",
                      }}
                    >
                      {/* <span>{reactIcons.}</span> */}
                    </div>
                  )}
                  {/* <p>Taged</p> */}
                </div>
                <div
                  style={{ width: "69px", height: "3px", background: "gray" }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-1 d-flex justify-content-between ">
        <div className="w-20 text-center">
          <p>Tagged</p>
        </div>
        <div className="text-center">
          <p>Submission</p>
        </div>
        <div className="text-center">
          <p>Client Submission</p>
        </div>
        <div className="text-center">
          <p>Interview</p>
        </div>
        <div className="">
          <p>Confirmation</p>
        </div>
        <div className="w-20 text-center">
          <p>Placement</p>
        </div>
        <div className="">
          <p>Not Joined</p>
        </div>
      </div>
    </>
  );
};
export default Stepper;

// <div className=" border rounded-1   mt-2 mb-sm-4">
//   <div className="steps">
//     <div className="steps-header">
//       <div className="progress">
//         <div
//           className="progress-bar"
//           role="progressbar"
//           style={{ width: "28.5%" }}
//           aria-valuenow="28.5"
//           aria-valuemin="0"
//           aria-valuemax="100"
//         ></div>
//       </div>
//     </div>
//   </div>
//   <div className="steps-body">
//     <div className="step step-completed">
//       {/* <span className="step-icon">
//         <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         stroke-width="2"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         className="feather feather-check-circle"
//         >
//         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//         </svg>
//         </span> */}
//       <div>
//       <span>Candidate Name</span>
//       <p>Pipline</p>
//       </div>
//       <div>
//         <span className="step-indicator">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             className="feather feather-check"
//           >
//             <polyline points="20 6 9 17 4 12"></polyline>
//           </svg>
//         </span>
//       </div>
//     </div>
//     <div className="step step-completed">
//       <span className="step-indicator">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-check"
//         >
//           <polyline points="20 6 9 17 4 12"></polyline>
//         </svg>
//       </span>
//       {/* <span className="step-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-settings"
//         >
//           <circle cx="12" cy="12" r="3"></circle>
//           <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
//         </svg>
//       </span> */}
//       <span>Recruiter Name</span>
//       <p>Submission</p>
//     </div>
//     <div className="step step-active">
//       {/* <span className="step-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-award"
//         >
//           <circle cx="12" cy="8" r="7"></circle>
//           <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
//         </svg>
//       </span> */}
//       <span>Contact No</span>
//       <p>
//       Client Submission
//       </p>
//     </div>
//     <div className="step">
//       {/* <span className="step-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-truck"
//         >
//           <rect x="1" y="3" width="15" height="13"></rect>
//           <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
//           <circle cx="5.5" cy="18.5" r="2.5"></circle>
//           <circle cx="18.5" cy="18.5" r="2.5"></circle>
//         </svg>
//       </span> */}
//       Interview
//     </div>
//     <div className="step">
//       {/* <span className="step-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-home"
//         >
//           <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//           <polyline points="9 22 9 12 15 12 15 22"></polyline>
//         </svg>
//       </span> */}
//       Confirmation
//     </div>
//     <div className="step">
//       {/* <span className="step-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-home"
//         >
//           <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//           <polyline points="9 22 9 12 15 12 15 22"></polyline>
//         </svg>
//       </span> */}
//       Placement
//     </div>
//     <div className="step">
//       {/* <span className="step-icon">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="feather feather-home"
//         >
//           <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//           <polyline points="9 22 9 12 15 12 15 22"></polyline>
//         </svg>
//       </span> */}
//       Not Joined
//     </div>
//   </div>

//   <div className="d-sm-flex flex-wrap justify-content-between align-items-center text-center">
//     {/* <div className="custom-control custom-checkbox mt-2 mr-3">
//       <input
//         className="custom-control-input"
//         type="checkbox"
//         id="notify-me"
//         checked=""
//       />
//       <label className="custom-control-label" for="notify-me">
//         Notify me when order is delivered
//       </label>
//     </div>
//     <a
//       className="btn btn-primary btn-sm mt-2"
//       href="#order-details"
//       data-toggle="modal"
//     >
//       View Order Details
//     </a> */}
//   </div>
// </div>
