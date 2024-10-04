"use client";

import Paper from "@/components/common/Paper";
import { getReq } from "@/utils/apiHandlers";
import { useEffect, useState } from "react";

const JobDelegationReport = () => {
     const [jobDelegationList, setJobDelegationList] = useState([1,2,3,4,5,6]);
     const [page, setPage] = useState(0);
     const [dataCount, setDataCount] = useState();
     const [isLoading, setIsLoading] = useState(false);
     
     const getJobDelegationReport = async() => {
        setIsLoading(true);
         const response = await getReq(``);
         setIsLoading(false)
         if(response){
            setJobDelegationList(response.data || response.data.results);
         }
     } 
    
     useEffect(() =>{
         getJobDelegationReport();
     }, [])
    

  return (
    <>
      <Paper>
        <div>
          <div>
            <h5>Confirmation Report - This Month</h5>
          </div>
          <div
            className="table_div_custom custom-scroll-sm"
            style={{ height: "350px!important" }}
          >
            <table className="default-table ">
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
                {jobDelegationList.map((item) => {
                  return (
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default JobDelegationReport;
