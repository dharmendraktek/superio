"use client"

import { useState } from "react";
import Stepper from "./Stepper";
import Paper from "@/components/common/Paper";

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

        <div className="">
        <div className="d-flex justify-content-between py-4 px-4">
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
          {tab == 1 &&
          <>
        {/* <hr className="border border-secondary"></hr> */}
             <div className="px-4 py-3">
                <div className="border py-1 px-3 rounded-1 d-flex justify-content-between border-top-black border-end-black">
                  <div>
                  <p>NAME</p>
                  </div>
                  <div>
                  <p>SUBMITTED BY/ON</p>
                  </div>
                  <div>
                  <p>CONTACT/LOCATION</p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div>
                  <p>PAY RATE/WORK AUTH</p>
                  </div>
                  <div>
                  <p>STATUS</p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                  <div>
                  <p></p>
                  </div>
                </div>
                <div className="py-2  rounded-1 d-flex justify-content-between ">
                  <Stepper />
                </div>
             </div>
          </>
          }
           {tab == 2 &&
             <div className="px-3">
                 hii i am the pipline
             </div>
          }
           {tab == 3 &&
             <div className="px-3">
                 hii i am the pipline
             </div>
          }
           {tab == 4 &&
             <div className="px-3">
                 hii i am the pipline
             </div>
          }
           {tab == 5 &&
             <div className="px-3">
                 hii i am the pipline
             </div>
          }
          {tab == 6  &&
             <div className="px-3">
                 hii i am the pipline
             </div>
          }
        </div>
      </Paper>
    )
}

export default Submissions;