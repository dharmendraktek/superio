"use client"

import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import Paper from "@/components/common/Paper";

const tabsName = [
    { id: 1, name: "Tagged", value:'submission'},
    { id: 2, name: "All", value:'' },
    { id: 3, name: "Client Submissions", value:'client_submission' },
    { id: 4, name: "Interviews", value:'interview' },
    { id: 5, name: "Confirmations", value:'confirmation' },
    { id: 6, name: "Joined", value:'joined' },
    { id: 7, name: "Not Joined", value:'not_joined' },
  ];


const Submissions = ({jobData, handleGetJobDetails}) => {
    const [tab, setTab] = useState(2);
    const [submissionData, setSubmissionData] = useState([]);

    // let {submissions} = jobData;

    useEffect(() => {
     if(jobData?.submissions?.length > 0 && tab !=2){
      let filteredSumisson = jobData?.submissions.filter((item) => item.current_status == tab);
        setSubmissionData(filteredSumisson);
     }else {
        setSubmissionData(jobData?.submissions);
     }
    }, [jobData, tab])

    return(
      <Paper>
        <div className="">
        <div className="d-flex justify-content-between py-2  px-2">
          <h4>Submissions</h4>
          <div className="submissions d-flex gap-2">
            {tabsName.map((item, index) => {
              let filtered = jobData?.submissions.filter((_item) => _item.current_status_details.name == item.value)?.length;
              return (
                <div
                  key={index}
                  onClick={() => setTab(item.id)}
                  className={`tabs ${tab == item.id ? 'bg-primary text-white border-primary' : 'bg-white text-black'} border text-black cursor-pointer align-items-center  rounded-start-2 ps-2 d-flex gap-3`}
                >
                  <span className="fs-6">{item.name}</span>
                  <div className="bg-white d-flex align-items-center justify-content-center  text-black rounded-end-1 h-100 px-2">{item.id == 2 ? jobData?.submissions.length : filtered}</div>
                </div>
              );
            })}
          </div>
      </div>
          {tab &&
          <>
             <div className="px-2 py-3">
                <div className="border py-1 px-3 rounded-1 d-flex justify-content-between border-top-black border-end-black">
                  <div className="" style={{width:'250px'}}>
                  <p>NAME</p>
                  </div>
                  <div className="" style={{width:'250px'}}>
                  <p>SUBMITTED BY/ON</p>
                  </div>
                  <div style={{width:'250px'}}>
                  <p>CONTACT/LOCATION</p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div style={{width:'250px'}}>
                  <p>PAY RATE/WORK AUTH</p>
                  </div>
                  <div className="" style={{width:'200px'}}>
                  <p>STATUS</p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                </div>
                {submissionData?.map((item) => {
                  return(
                <div className="py-2">
                  <Stepper submissionDetails={item} handleGetJobDetails={handleGetJobDetails} />
                </div>
                  )
                })
                }
                {submissionData?.length == 0 &&
                  <div className="text-center py-3">
                    <strong>
                    No submissions available
                    </strong>
                  </div>
               }
             </div>
          </>
          }
        </div>
      </Paper>
    )
}

export default Submissions;