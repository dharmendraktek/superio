"use client";

import { getReq, postReq } from "@/utils/apiHandlers";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ManualCreation from "./ManualCreation";

const ParseEmailJobTable = () => {
  const [jobData, setJobData] = useState([]);
  const [open, setOpen] = useState(true);
  const [jobItem, setJobItem] = useState();

  const handleGetParseJobByEmail = async () => {
    const response = await getReq("/temp-jobs/");
    setJobData(response.data);
  };

const handleApproveJob = async(id) => {
//   const response = await postReq('/approve-job/', {job_id:id})
//  if(response.status){
//     toast.success('Job detials approved successfully !')
//     handleGetParseJobByEmail();
//  }
} 

  useEffect(() => {
    handleGetParseJobByEmail();
  }, []);

  return (
    <div className="p-5">
     { open ? 
      <div className="table_div">
        <table className="default-table">
          <thead className="">
            <tr>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Client</th>
              <th>Location</th>
              <th>Primary Skills</th>
              <th>Secondary Skills</th>
              <th>Experience</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((item, index) => {
              return (
                <>
                  <tr key={index} className="">
                    <td>{item.title}</td>
                    <td style={{ width: "120px" }}>
                      {item.job_type ? item.job_type : "-"}
                    </td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td>
                      {item.client ? item.client : "-"}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td className="">{item.address ? item.address : "-"}</td>
                    <td>
                      <div className="d-flex">
                        {item.primary_skills.map((item) => {
                          return <span>{item.name}/</span>;
                        })}
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex">
                        {item.secondary_skills.map((item) => {
                          return <span>{item.name}/</span>;
                        })}
                      </div>
                    </td>
                    <td className="">{item.experience}</td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.created_at).format("dd-mm-yyyy hh:mm A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.updated_at).format("dd-mm-yyyy hh:mm A")}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                        <li>
                            <button
                              onClick={() =>{
                                  setJobItem(item)
                                      setOpen(false)
                              } 
                              }
                              data-text="Edit Job Details"
                            >
                              {/* <a
                            href="#"
                            className="theme-btn btn-style-three call-modal"
                            data-bs-toggle="modal"
                            data-bs-target="#userUpdateModal"
                          > */}
                              <span className="las la-edit"></span>
                              {/* </a> */}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleApproveJob(item.id)}
                              data-bs-toggle="modal"
                              data-bs-target="#clientUpdateModal"
                              data-text="Approve"
                            >
                              {/* <a
                            href="#"
                            className="theme-btn btn-style-three call-modal"
                            data-bs-toggle="modal"
                            data-bs-target="#userUpdateModal"
                          > */}
                              <span className="las la-check-square"></span>
                              {/* </a> */}
                            </button>
                          </li>
                          <li>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#clientDeleteModal"
                              data-text="Declined"
                            >
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
            {/* End tr */}
          </tbody>
        </table>
      </div>
      :
<ManualCreation setOpen={setOpen} jobData={jobItem}  name='update'  handleGetJobDetails={handleGetParseJobByEmail}  />
     }
      {/* {dataCount > 25 &&
      <Pagination 
         page={page}
         setPage={setPage}
         dataCount={dataCount}
         pageSize={25}
        //  setPageSize={setPageSize}
        />
      } */}
    </div>
  );
};

export default ParseEmailJobTable;
