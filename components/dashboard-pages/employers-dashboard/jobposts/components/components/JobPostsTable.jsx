"use client";
// import UserUpdateModal from "./UserUpdateModal";
// import UserDeleteModal from "./components/UserDeleteModal";

import { useEffect, useState } from "react";

import { clientData, jobPostsTableField } from "./constant";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";

const JobPostsTable = () => {
  const [expand, setExpand] = useState(null);
  const [jobPostList, setJobPostList] = useState([]);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState(10);


  useEffect(() => {
    getJobpostsList();
  }, []);

  const getJobpostsList = async () => {
    const response = await axios.get(BASE_URL + `/jobs/${search ?`?search=${search}` :''}`);
    if (response.status) {
      setJobPostList(response.data);
      // setDataCount(response?.data.)
    }
  };

  useEffect(() => {
     if(search){
      getJobpostsList(search)
     }
  }, [search])

  return (
    <>
      <div className="d-flex justify-content-between my-2">
        <div className="position-relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "350px" }}
            className="border border-primary px-4 rounded-1"
            placeholder="Search anything..."
          />
          <span
            className="position-absolute fs-4 text-primary"
            style={{ left: "2px" }}
          >
            {reactIcons.search}
          </span>
          {search && (
            <span
              onClick={() => setSearch("")}
              className="position-absolute cursor-pointer	  text-primary fs-5"
              style={{ right: "8px" }}
            >
              {reactIcons.close}
            </span>
          )}
        </div>
        <Link href="/employers-dashboard/job-posts/add-job-posts">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link>
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
                      <th key={index} style={{width:'100px'}}>{item.title}</th>
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
                    <td style={{width:'100px'}}>
                      <Link href='/employers-dashboard/job-posts/[id]'  as={`/employers-dashboard/job-posts/${item.id}?jobId=${item.id}`}  >
                      {/* <Link href={{ pathname: `/employers-dashboard/job-posts/${item.id}`, query: item }}> */}
                      {item.job_code}
                      </Link>
                    </td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td className="package">
                      {item.title}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td className="expiry">{"-"}</td>
                    <td>{item.city}</td>
                    <td className="total-jobs">{item.state}</td>
                    <td className="used">{item.job_status}</td>
                    <td className="remaining">
                      {item.currency}/{item.amount}/{item.payment_frequency}
                    </td>
                    <td className="status">{"-"}</td>
                    <td className="status">{item.contact_manager_name}</td>
                    <td className="expiry">{item.assign_name}</td>
                    <td className="" style={{ width: "200px" }}>
                      {"-"}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.created_at).format("dd-mm-yyyy hh:mm A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.updated_at).format("dd-mm-yyyy hh:mm A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {"-"}
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
      {dataCount > 25 &&
      <Pagination 
         page={page}
         setPage={setPage}
         dataCount={dataCount}
         pageSize={25}
        //  setPageSize={setPageSize}
        />
      }
    </>
  );
};

export default JobPostsTable;
