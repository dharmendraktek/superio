"use client";
// import UserUpdateModal from "./UserUpdateModal";
// import UserDeleteModal from "./components/UserDeleteModal";

import { useEffect, useState } from "react";

import { clientData,  jobPostsTableField } from "./constant";
import axios from "axios";
import moment from "moment";
import Link from "next/link";

const JobPostsTable = () => {
  const [expand, setExpand] = useState(null);
  const [jobPostList, setJobPostList] = useState([]);

  
  useEffect(() => {
    getJobpostsList();
 }, [])


 const getJobpostsList = async() => {
  const response = await axios.get('http://127.0.0.1:8000/jobs/');
  console.log("---------------resposne ", response);
  if(response.status){
    setJobPostList(response.data);
  }
 }

  return (
    <>
    
      <div className="d-flex justify-content-end">
         <div>
          <input type="text" style={{width:"45px"}} />
          <button className="bg-primary" style={{width:"45px"}}></button>
         </div>
      </div>
      <div className="table_div">
        <table className="default-table">
          <thead className="">
            <tr>
              {jobPostsTableField.map((item, index) => {
                return (
                  <>
                    {item.title == "input" ? (
                      <th>
                        <input type="checkbox" />
                      </th>
                    ) : (
                      <th key={index}>{item.title}</th>
                    )}
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {jobPostList.map((item, index) => {
              return (
                <>
                  <tr key={index} className="">
                    {true && (
                      <td className="d-flex mt-3 ">
                        <input type="checkbox" />
                        {/* <div
                          onClick={() => {
                            if (expand) {
                              setExpand(null);
                            } else {
                              setExpand(item.client_id);
                            }
                          }}
                          className="mx-2 px-2 text-primary fw-bold fs-6"
                        >
                          <span className="">
                            {item.client_id == expand ? "-" : "+"}
                          </span>
                        </div> */}
                        {/* <div
                          className="bg-primary text-white mt-1 px-2 ml-2"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "12px",
                            borderRadius: "3px",
                          }}
                        >
                          3
                        </div> */}
                      </td>
                    )}
                    <td>
                    {/* <Link href='/employers-dashboard/job-posts/update-job/[id]'  as={`/employers-dashboard/job-posts/update-job/${item.id}`} > */}
                      {item.job_code}
                    {/* </Link> */}
                      </td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td className="package">
                      {item.title}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td className="expiry">{"Aman S"}</td>
                    <td>{item.city}</td>
                    <td className="total-jobs">{item.state}</td>
                    <td className="used">{item.job_status}</td>
                    <td className="remaining">{item.currency}/{item.amount}/{item.payment_frequency}</td>
                    <td className="status">{"-"}</td>
                    <td className="status">{"-"}</td>
                    <td className="expiry">{'-'}</td>
                    <td className="" style={{ width: "200px" }}>
                      {'-'}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.created_at).format("dd-mm-yyyy hh:mm A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.updated_at).format("dd-mm-yyyy hh:mm A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {'-'}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#clientUpdateModal"
                              data-text="Edit User"
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
                              data-bs-toggle="modal"
                              data-bs-target="#clientDeleteModal"
                              data-text="Delete User"
                            >
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  {/* {item.client_id == expand && (
                    <tr style={{ background: "white" }}>
                      <td colSpan={15}>
                        <div className="mx-5" style={{ width: "500px" }}>
                          <table>
                            <thead>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Office number</th>
                              <th>Designation</th>
                              <th>Mobile Number</th>
                              <th>Location</th>
                              <th>OwnerShip</th>
                              <th>Status</th>
                              <th>Created By</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Fleck</td>
                                <td>fleckjoy@gmail.com</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Alaska</td>
                                <td>Dharmendra</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )} */}
                </>
              );
            })}
            {/* End tr */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JobPostsTable;
