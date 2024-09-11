import { useState } from "react";

const { default: Paper } = require("@/components/common/Paper")


const tabsName = [
    { id: 1, name: "Pipline" },
    { id: 2, name: "All" },
    { id: 3, name: "Client Submissions" },
    { id: 4, name: "Interviews" },
    { id: 5, name: "Confirmations" },
    { id: 6, name: "Placements" },
    { id: 7, name: "Not Joined" },
  ];

const Submissions = () => {
    const [tab, setTab] = useState(1);
    return(
        <Paper>
            <div>
                <div className="d-flex justify-content-between">
                    <h4>Submissions</h4>
                    <div className="submissions d-flex gap-2">
            {tabsName.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setTab(item.id)}
                  className={`tabs ${tab == item.id ? 'bg-primary text-white border-primary' : 'bg-white text-black'} border text-black cursor-pointer align-items-center border-1 rounded-2 ps-2 d-flex gap-3`}
                >
                  <span className="fs-6">{item.name}</span>
                  <div className="bg-white d-flex align-items-center justify-content-center  text-black rounded-end-1 h-100 px-2">4</div>
                </div>
              );
            })}
          </div>
                </div>
                <div className="d-flex my-3 border border-top-secondary py-1 border-bottom-secondary justify-content-around">
                    <div>
                    <p>JOB DETAILS</p>
                    </div>
                    <div>
                    <p>SUBMISSION DETAILS</p>
                    </div>
                    <div>
                    <p>SUBMITTED BY</p>
                    </div>
                    <div>
                    <p>CLIENT BILL RATE</p>
                    </div>
                    <div>
                    <p>PAY RATE</p>
                    </div>
                </div>
                      {/* <div className="d-flex justify-content-around">
                      <div>
                      <p>Job Details</p>
                      </div>
                      <div>
                      <p>Job Details</p>
                      </div>
                      <div>
                      <p>Job Details</p>
                      </div>
                      <div>
                      <p>Job Details</p>
                      </div>
                      <div>
                      <p>Job Details</p>
                      </div>
                  </div> */}
                
            </div>
        </Paper>
    )
}

export default Submissions;