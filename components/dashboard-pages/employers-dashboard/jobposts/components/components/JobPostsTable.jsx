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
import { deleteReq, getReq, postApiReq } from "@/utils/apiHandlers";
import Pagination from "@/components/common/Pagination";
import { removeSpecialChar } from "@/utils/constant";
import Loader from "@/components/common/Loader";
import { toast } from "react-toastify";

const tabsName = [
  { id: 1, name: "ACTIVE JOB POST" },
  { id: 2, name: "INACTIVE JOB POST" },
];

const JobPostsTable = () => {
  const [expand, setExpand] = useState(null);
  const [jobPostList, setJobPostList] = useState([]);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    getJobpostsList();
  }, []);

  const getJobpostsList = async () => {
    setIsLoading(true);
    const response = await getReq(
      `/jobs/?page=${page + 1}&active=${active == 1 ? true : false}${
        search ? `&search=${search}` : ""
      }`
    );
    setIsLoading(false);
    if (response.status) {
      setJobPostList(response.data.results);
      setDataCount(response?.data.count);
    }
  };

  useEffect(() => {
    if (search) {
      setPage(0);
    }
    getJobpostsList(search);
  }, [search, page, active]);

  const handleInactiveJobPost = async (id) => {
    const response = await deleteReq(`/jobs/${id}/`);
    if (response.status) {
      toast.success("Job post Inactivated successfully");
      getJobpostsList();
    }
  };

  const handleActivateJobPost = async (id) => {
    const response = await postApiReq(
      `/jobs/${id}/job-activate/?activate=true`
    );
    if (response.status) {
      toast.success("Job post activated successfully");
      getJobpostsList();
    }
  };


  const handleDeleteJobPost = async(id) => {
    const response = await deleteReq(`/jobs/${id}/?permanent_delete=true`);
    if(response.status){
      toast.success("Job post deleted successfully");
      getJobpostsList();
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="d-flex justify-content-between my-2">
        <div className="d-flex gap-2">
          <div
            className="d-flex border border-primary rounded-1"
            style={{ width: "300px", height: "30px" }}
          >
            {tabsName.map((item, index) => {
              return (
                <div
                  style={{ width: "150px", borderLeft: "2px" }}
                  className={`text-center cursor-pointer rounded-1 ${
                    active == item.id
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                  key={index}
                >
                  <li
                    onClick={() => {
                      setPage(0);
                      setActive(item.id);
                    }}
                  >
                    {item.name}
                  </li>
                </div>
              );
            })}
          </div>
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
        </div>
        <Link href="/employers-dashboard/job-posts/add-job-posts">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link>
      </div>
      <div className="table_div custom-scroll-sm">
        <table className="default-table ">
          <thead className="">
            <tr>
              {jobPostsTableField.map((item, index) => {
                return (
                  <>
                    {item.title == "input" ? (
                      <th style={{ width: "50px" }}>
                        <input className="cursor-pointer" type="checkbox" />
                      </th>
                    ) : (
                      <th style={{ width: "200px" }} key={index}>
                        {removeSpecialChar(item.title)}
                      </th>
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
                      <td className="d-flex">
                        {/* <input type="checkbox" /> */}
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
                      <Link
                        href="/employers-dashboard/job-posts/[id]"
                        as={`/employers-dashboard/job-posts/${item.id}?jobId=${item.id}`}
                      >
                        {/* <Link href={{ pathname: `/employers-dashboard/job-posts/${item.id}`, query: item }}> */}
                        {item.job_code}
                      </Link>
                    </td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td>
                      {item.title}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td className="">{item.client_name}</td>
                    <td>{item.city}</td>
                    <td className="">{item.state}</td>
                    <td className="">{item.job_status}</td>
                    <td className="">
                      {item.currency}
                      {item.currency ? "/" : ""}
                      {item.amount}
                      {item.amount ? "/" : ""}
                      {item.payment_frequency}
                    </td>
                    <td className="">{item.delivery_manager_name}</td>
                    <td className="">{item.contact_manager_name}</td>
                    <td className="">
                      <div className="d-flex flex-wrap">
                        {item.assign_details.map((item) => {
                          return <span>{item.first_name},</span>;
                        })}
                      </div>
                    </td>
                    <td className="">{"-"}</td>
                    <td className="">
                      {moment(item.created_at).format("DD-MM-yyyy hh:mm A")}
                    </td>
                    <td className="">
                      {moment(item.updated_at).format("DD-MM-yyyy hh:mm A")}
                    </td>
                    <td className="">{item.head_account_manager_name}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link
                              href="/employers-dashboard/job-posts/[id]"
                              as={`/employers-dashboard/job-posts/${item.id}?jobId=${item.id}`}
                            >
                              <button
                                // data-bs-toggle="modal"
                                // data-bs-target="#clientUpdateModal"
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
                            </Link>
                          </li>
                          <li>
                            <button
                              // data-bs-toggle="modal"
                              // data-bs-target="#clientDeleteModal"
                              data-text={`${
                                active == 1
                                  ? "Inactivate Job Post"
                                  : "Activate Job Post"
                              }`}
                              onClick={() => {
                                if (active == 1) {
                                  handleInactiveJobPost(item.id);
                                } else {
                                  handleActivateJobPost(item.id);
                                }
                              }}
                            >
                              <span
                                className={`${
                                  active == 1
                                    ? "la la-window-close"
                                    : "las la-check-square"
                                }`}
                              ></span>
                            </button>
                          </li>
                          <li>
                            <button
                              // data-bs-toggle="modal"
                              // data-bs-target="#clientDeleteModal"
                              data-text='Delete Job Post'
                              onClick={() => {
                               handleDeleteJobPost(item.id)
                              }}
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
      {dataCount > 25 && (
        <Pagination
          page={page}
          setPage={setPage}
          dataCount={dataCount}
          pageSize={25}
          //  setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default JobPostsTable;
