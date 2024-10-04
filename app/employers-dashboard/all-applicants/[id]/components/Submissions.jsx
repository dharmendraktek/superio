import Stepper from "@/app/employers-dashboard/job-posts/[id]/components/Stepper";
import { useEffect, useState } from "react";

const { default: Paper } = require("@/components/common/Paper")


const tabsName = [
    { id: 1, name: "Tagged" },
    { id: 2, name: "All" },
    { id: 3, name: "Client Submissions" },
    { id: 4, name: "Interviews" },
    { id: 5, name: "Confirmations" },
    { id: 6, name: "Placements" },
    { id: 7, name: "Not Joined" },
  ];

const Submissions = ({applicantData}) => {
    const [tab, setTab] = useState(1);
    const [submissionData, setSubmissionData] = useState([]);


    useEffect(() => {
     if(applicantData?.jobs_associated?.length > 0 && tab !=2){
      let filteredSumisson = applicantData?.jobs_associated.filter((item) => item.current_status == tab);
      setSubmissionData(filteredSumisson);
     }else {
        setSubmissionData(applicantData?.jobs_associated);
     }
    }, [applicantData, tab])

    return(
        <Paper>
            <div>
                <div className="d-flex justify-content-between">
                    <h4>Submissions</h4>
                    <div className="submissions d-flex gap-2">
            {tabsName.map((item, index) => {

                            let filtered = applicantData?.jobs_associated?.filter((_item) => _item.current_status == item.id)?.length;
              return (
                <div
                  key={index}
                  onClick={() => setTab(item.id)}
                  className={`tabs ${tab == item.id ? 'bg-primary text-white border-primary' : 'bg-white text-black'} border text-black cursor-pointer align-items-center border-1  ps-2 d-flex gap-3`}
                >
                  <span className="fs-6">{item.name}</span>
                  <div className="bg-white d-flex align-items-center justify-content-center  text-black rounded-end-1 h-100 px-2">{item.id == 2 ? applicantData?.jobs_associated?.length : filtered}</div>
                </div>
              );
            })}
          </div>
                </div>
                <div className="d-flex my-3 border border-top-secondary py-1 border-bottom-secondary justify-content-around">
                    <div style={{width:"250px"}}>
                    <p>JOB DETAILS</p>
                    </div>
                    <div style={{width:'250px'}}>
                    <p>SUBMISSION DETAILS</p>
                    </div>
                    <div style={{width:'250px'}}>
                    <p>SUBMITTED BY</p>
                    </div>
                    <div style={{width:'250px'}}>
                    <p>CLIENT BILL RATE</p>
                    </div>
                    <div style={{width:'250px'}}>
                    <p>PAY RATE</p>
                    </div>
                </div>
                {submissionData?.map((item, index) =>{
                  return(
                    <div key={index}>
                      <Stepper submissionDetails={item} side='applicant' />
                    </div>
                  )
                })
                }{submissionData?.length == 0 &&
                  <div className="text-center">
                      <strong>No submission available</strong>
                  </div>
                }
            </div>
        </Paper>
    )
}

export default Submissions;