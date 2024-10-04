"use client";

import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Paper from "@/components/common/Paper";
import { useDispatch, useSelector } from "react-redux";

export const reportName = [
  {
    name: "Submissions",
    value:'1263',
    style: {
      backgroundColor: "rgb(241 159 134)",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
  {
    name: "Client Submissions",
    value:'260',
    style: {
      backgroundColor: "#9994f1ad",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
  {
    name: "Interview Schedules",
    value:'100',
    style: {
      backgroundColor: "#7cbdf5d1",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
  {
    name: "Jobs",
    value:'1653',
    style: {
      backgroundColor: "#f99bf9",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
  {
    name: "Internal Rejections",
    value:'2',
    style: {
      backgroundColor: "#e31f1f78",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
  {
    name: "Pending Feedback",
    value:'50',
    style: {
      backgroundColor: "lightgray",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
  {
    name: "Client Rejections",
    value:'16',
    style: {
      backgroundColor: "#aee5c4",
      color:'black',
      width:'175px',
      height:'100px'
    },
  },
];

const Index = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employer.user);

  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer px-4">
          <Paper>
            <div>
              <div className="d-flex justify-content-between">
                <h5>Now Static Data  </h5>
                <div></div>
              </div>
              <div className="d-flex gap-4">{
                reportName.map((item, index) => {
                  return(
                    <div className="shadow text-center py-4 rounded-1 my-2" style={item.style} key={index}>
                         <h5 className="text-white">{item.value}</h5>
                         <p className="fs-5 text-black py-1">{item.name}</p>
                    </div>
                  )
                })
                }
                </div>
            </div>
          </Paper>
          <div className="row">
             <div className="col-6">
                 <Paper>
                   <div>
                    <div>
                      <h5>Confirmation Report - This Month</h5>
                    </div>
                      <div className="table_div_custom custom-scroll-sm" style={{height:"350px!important"}}>
                      <table className="default-table " >
                        <thead className="position-sticky">
                          <tr>
                            <th className="" style={{ width: "150px" }}>
                              Applicant Name
                            </th>
                            <th style={{ width: "200px" }}>Client</th>
                            <th style={{ width: "250px" }}>End Client</th>
                            <th style={{ width: "300px" }}>Tentative Start Date</th>
                            <th style={{ width: "300px" }}>Confirmation Created</th>
                            <th style={{ width: "250px" }} className="">
                            Created By
                            </th>
                            <th style={{ width: "250px" }}>Recruiter Name</th>
                            <th style={{ width: "200px" }}>Team Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1,2,3,4,5,6,7].map((item) => {
                            return(
                        <tr key={item}>
                          <td style={{ width: "150px" }}>Suresh Nettur</td>
                          <td style={{ width: "200px" }}>Mphasis</td>
                          <td style={{ width: "250px" }}>JPMC</td>
                          <td style={{ width: "300px" }}></td>
                          <td style={{ width: "300px" }}>1</td>
                          <td style={{ width: "250px" }}>Kunal Kumbhare</td>
                          <td style={{ width: "250px" }}></td>
                          <td style={{ width: "200px" }}></td>
                        </tr>
                            )
                          })
                          }
                        </tbody>
                      </table>
                    </div>
                   </div>
                 </Paper>
             </div>
             <div className="col-6">
                 <Paper>
                 <div>
                    <div>
                      <h5>Submission - No Feedback</h5>
                    </div>
                    <div className="table_div_custom custom-scroll-sm" style={{height:"350px!important"}}>
                    <table className="default-table " >
                      <thead className="position-sticky">
                        <tr>
                          <th className="" style={{ width: "150px" }}>
                            Applicant Name
                          </th>
                          <th style={{ width: "200px" }}>Client</th>
                          <th style={{ width: "250px" }}>End Client</th>
                          <th style={{ width: "300px" }}>Tentative Start Date</th>
                          <th style={{ width: "300px" }}>Confirmation Created</th>
                          <th style={{ width: "250px" }} className="">
                           Created By
                          </th>
                          <th style={{ width: "250px" }}>Recruiter Name</th>
                          <th style={{ width: "200px" }}>Team Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1,2,3,4,5,6,7].map((item) => {
                          return(
                       <tr key={item}>
                        <td style={{ width: "150px" }}>Suresh Nettur</td>
                        <td style={{ width: "200px" }}>Mphasis</td>
                        <td style={{ width: "250px" }}>JPMC</td>
                        <td style={{ width: "300px" }}></td>
                        <td style={{ width: "300px" }}>1</td>
                        <td style={{ width: "250px" }}>Kunal Kumbhare</td>
                        <td style={{ width: "250px" }}></td>
                        <td style={{ width: "200px" }}></td>
                       </tr>
                          )
                        })
                        }
                      </tbody>
                    </table>
                  </div>
                   </div>
                 </Paper>
             </div>
             <div className="col-12">
                 <Paper>
                 <div>
                    <div>
                      <h5>Current Month Interview Schedules</h5>
                    </div>
                    <div className="table_div_custom custom-scroll-sm" style={{height:"350px!important"}}>
                    <table className="default-table " >
                      <thead className="position-sticky">
                        <tr>
                          <th className="" style={{ width: "150px" }}>
                            Applicant Name
                          </th>
                          <th style={{ width: "200px" }}>Client</th>
                          <th style={{ width: "250px" }}>End Client</th>
                          <th style={{ width: "300px" }}>Tentative Start Date</th>
                          <th style={{ width: "300px" }}>Confirmation Created</th>
                          <th style={{ width: "250px" }} className="">
                           Created By
                          </th>
                          <th style={{ width: "250px" }}>Recruiter Name</th>
                          <th style={{ width: "200px" }}>Team Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1,2,3,4,5,6,7].map((item) => {
                          return(
                       <tr key={item}>
                        <td style={{ width: "150px" }}>Suresh Nettur</td>
                        <td style={{ width: "200px" }}>Mphasis</td>
                        <td style={{ width: "250px" }}>JPMC</td>
                        <td style={{ width: "300px" }}></td>
                        <td style={{ width: "300px" }}>1</td>
                        <td style={{ width: "250px" }}>Kunal Kumbhare</td>
                        <td style={{ width: "250px" }}></td>
                        <td style={{ width: "200px" }}></td>
                       </tr>
                          )
                        })
                        }
                      </tbody>
                    </table>
                  </div>
                   </div>
                 </Paper>
             </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default Index;
