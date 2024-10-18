'use client'
import StatusModal from "@/app/employers-dashboard/job-posts/[id]/components/StatusModal";
import ClientSubmissionModal from "@/components/dashboard-pages/employers-dashboard/jobposts/components/components/ClientSubmissionModal";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

// const stepsData = [
//   { id: 0, name: "Tagged" },
//   { id: 1, name: "Submission" },
//   { id: 2, name: "Client Submission" },
//   { id: 3, name: "Interview" },
//   { id: 4, name: "Confirmation" },
//   { id: 5, name: "Placement" },
//   { id: 6, name: "Not Joined" },
//   // {id:8, name:'Tagged'},
// ];


const stepsData = [
  { id: 0, name: "Tagged", value:''},
  { id: 1, name: "Submission", value:'submission' },
  { id:2, name: "Client Submission", value:'client_submission' },
  { id:3,  name:"Turbo Check", value:'turbo_check'},
  { id:4,  name:"T3 Check", value:'t3_check'},
  { id: 5, name: "Interview", value:'interview' },
  { id: 6, name: "Confirmation", value:'confirmation' },
  { id: 7, name: "Joined", value:'joined' },
  { id: 8, name: "Back Out", value:'not_joined' },
];

const Stepper = ({ submissionDetails, side, handleGetJobDetails }) => {
  
  console.log("------------submission deetaisl in stepper ", submissionDetails);
 
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

  let { submitted_by_details, job_detail } = submissionDetails || {} ;
  let { first_name, last_name } = submitted_by_details || {};

  let {
    client_name,
    contact_manager,
    job_code,
    job_type,
    title,
    payment_frequency,
    delivery_manager,
    amount,
  } = job_detail || {};


  const handleManagePipline = (status, subStatus) => {
  if((subStatus == "l1_reject") || (subStatus == "l2_reject") || (subStatus == "L3/dm reject") || (subStatus == "client_round_reject")){
    return false;
  }else if(status == "not_joined"){
    return false;
  }
  else {
    return true;
  }
  }

  useEffect(() => {
     if(submissionDetails?.currentStatus){
     let filterData =  stepsData.find((item) => item.value ==  submissionDetails?.current_status_details?.name)
     }
  }, [submissionDetails])

  const filteredSteps = stepsData.filter((item) => {
    if (
      !(submissionDetails?.job_detail?.client_name === "Mphasis") &&
      (item.name === "Turbo Check" || item.name === "T3 Check")
    ) {
      return false;
    }
    return true;
  });


  return (
    <>
      <StatusModal
        submissionId={submissionDetails.id}
        currentStatus={submissionDetails?.current_status}
        subStatus={submissionDetails?.current_substatus}
        submissionDetails={submissionDetails}
        handleGetJobDetails={handleGetJobDetails}
      />
      <ClientSubmissionModal submissionDetails={submissionDetails} handleGetJobDetails={handleGetJobDetails}  side="job" />

      <div className="py-1 px-1 mb-4 mt-2 d-flex justify-content-between ">
        <div className="" style={{ width: "250px" }}>
          {side == "applicant" ? (
            <div>
              <strong>
                {job_code} - {title}
              </strong>
              <p>{client_name}</p>
            </div>
          ) : (
            <div style={{ width: "250px" }}>
              <strong>
                {(firstname || "") +
                  " " +
                  (middlename || "") +
                  " " +
                  (lastname || "")}
              </strong>
            </div>
          )}
        </div>
        {side == "applicant" && <div className="w-20">Record</div>}
        <div className="" style={{ width: "250px" }}>
          <strong>{(first_name || "N/A") + " " + (last_name || "")}</strong>
        </div>
        {side == "applicant" ? (
          <div></div>
        ) : (
          <div style={{ width: "250px" }}>
            <strong>{mobile}</strong>
          </div>
        )}
        {/* <div style={{ width: "150px" }}>
          <p></p>
        </div> */}
        <div style={{ width: "250px" }}>
          <strong>
            {pay_rate_currency ? pay_rate_currency : "N.A"}/
            {pay_rate_amount ? pay_rate_amount : "N.A"}/
            {pay_rate_type ? pay_rate_type : "N.A"}/
            {pay_rate_contract_type ? pay_rate_contract_type : "N.A"}
          </strong>
        </div>
        <div className="w-20 text-center">
          {side == "applicant" ? (
            <div></div>
          ) : (
            <div
              className="d-flex justify-content-between"
              style={{ width: "235px" }}
            >
              <div>
                <p className="text-primary">
                  {submissionDetails?.current_substatus_details?.display_name ||
                    ""}
                </p>
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#statusModal"
                  className="text-primary cursor-pointer"
                >
                  {reactIcons.edit}
                </span>
              </div>
              <div className="dropdown">
                <span className="cursor-pointer" data-bs-toggle="dropdown">
                  {reactIcons.dots}
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <span class="dropdown-item"  data-bs-toggle='modal' data-bs-target ="#clientSubmissionModal" aria-controls="clientsumbission" >
                      Submit To Client
                    </span>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" data-bs-toggle='modal'  data-bs-target ="#clientSubmissionModal" aria-controls="clientsumbission">
                     Update Status
                    </a>
                  </li>
                  {/* <li>
                    <a class="dropdown-item" href="#">
                      Link 3
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div>
          <p></p>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        {submissionDetails && filteredSteps.map((item) => {
          return (
          
            <div>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: (submissionDetails?.job_detail?.client_name === "Mphasis") ? "70px" : "100px",
                    height: "3px",
                    background: `${
                      stepsData.find((item) => item.value ==  submissionDetails?.current_status_details?.name)?.id >= item.id
                        ? "#2bbc26"
                        : "gray"
                    }`,
                  }}
                ></div>
                <div>
                  { stepsData.find((item) => item.value ==  submissionDetails?.current_status_details?.name)?.id == item.id  ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "100%",
                        background: !handleManagePipline(submissionDetails?.current_status_details.name, submissionDetails?.current_substatus_details?.name) ? 'red' : "#2bbc26",
                      }}
                    >
                      {handleManagePipline(submissionDetails?.current_status_details.name, submissionDetails?.current_substatus_details?.name) ?
                       <span className="text-white">{reactIcons.checkmark}</span>
                       :
                       <span className="text-white fw-700">{reactIcons.normalclose}</span>
                      }
                    </div>
                  ) : stepsData.find((item) => item.value ==  submissionDetails?.current_status_details?.name)?.id > item.id ? (
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
                  style={{
                    width: (submissionDetails?.job_detail?.client_name === "Mphasis") ?  "65px" : "80px",
                    height: "3px",
                    background: `${
                      stepsData.find((item) => item.value ==  submissionDetails?.current_status_details?.name)?.id > item.id
                        ? "#2bbc26"
                        : "gray"
                    }`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-1 d-flex justify-content-between ">
        <div className=" text-center">
          <p>Tagged</p>
        </div>
        <div className="text-center">
          <p>Submission</p>
        </div>
        <div className="text-center">
          <p>Client Submission</p>
        </div>
        {(submissionDetails?.job_detail?.client_name === "Mphasis") &&
          <>
        <div className="text-center">
          <p>Turbo</p>
        </div>
        <div className="text-center">
          <p>T3</p>
        </div>
          </>
        }
        <div className="text-center">
          <p>Interview</p>
        </div>
        <div className="">
          <p>Confirmation</p>
        </div>
        <div className="text-center">
          <p>Joined</p>
        </div>
        <div className="">
          <p>Back Out</p>
        </div>
      </div>
    </>
  );
};
export default Stepper;
