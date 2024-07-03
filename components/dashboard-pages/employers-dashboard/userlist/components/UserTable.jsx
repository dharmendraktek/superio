"use client";
import { useEffect, useState } from "react";
import UserUpdateModal from "./UserUpdateModal";
import UserDeleteModal from "./components/UserDeleteModal";
// import { userData } from "./components/constant";
import axios from "axios";

import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/endpoints";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getReq, postReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { SyncLoader } from "react-spinners";

const tabsName = [
  { id: 1, name: "ACTIVE USERS" },
  { id: 2, name: "INACTIVE USERS" },
];

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [item, setItem] = useState();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataCount, setDataCount] = useState();
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState();
  

  const getUserList = async (search) => {
    setLoading(true);
    const response = await getReq(
      `/usersprofile/?active=${active == 1 ? true : false}&page=${page+1}${
        search ? `&search=${search}` : ""
      }`
    );
    setLoading(false);
    setUserData(response.data ? response.data.results : []);
    setDataCount(response.data.count);
  };

  
  useEffect(() => {
    getUserList(search);
  }, [active, search, page]);

  const handleDeleteUser = async (id) => {
    const response = await deleteReq(`/usersprofile/${id}/`);
    if (response.status) {
      toast.success("User is inactivated successfully!");
      getUserList();
    }
  };

  const handleActiveUser = async (id) => {
    const response = await postReq(
      `/usersprofile/${id}/activate=true/`
    );
    if (response.status) {
      toast.success("User is activated successfully!");
      getUserList();
    }
  };

  return (
    <>
      <UserUpdateModal getUserList={getUserList} item={item} />
      <UserDeleteModal
        active={active}
        handleActiveUser={handleActiveUser}
        userId={userId}
        handleDeleteUser={handleDeleteUser}
      />
      {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <SyncLoader
        color={'green'}
        loading={true}
        size={10}
      />
      </div> */}
       <div className="col-xl-12 col-lg-12 my-3">
              <div className="d-flex justify-content-between">
              <div className="d-flex border border-primary rounded-1" style={{width:"300px"}}>
                {tabsName.map((item, index) => {
                  return (
                    <div
                      style={{width:"150px", borderLeft:'2px'}}
                      className={`text-center cursor-pointer rounded-1 ${
                        active == item.id
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                      key={index}
                    >
                      <li onClick={() => {
                        setPage(0);
                        setActive(item.id)
                      } 
                      }>{item.name}</li>
                    </div>
                  );
                })}
              </div>
              <div className="position-relative">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} style={{width:"350px", height:"45px"}} className="border border-primary px-4 rounded-1 h-100" placeholder="Search anything..." />
                <span className="position-absolute fs-4 text-primary" style={{left:"2px"}}>{reactIcons.search}</span>
                {search &&
                <span onClick={() => setSearch('')} className="position-absolute cursor-pointer	  text-primary fs-5" style={{right:"8px"}}>{reactIcons.close}</span>
                }
                {/* <div>
                  <button>Upload File</button>
                </div> */}
              </div>
              </div>
            </div>
      <div className="table_div">
      <table className="default-table ">
        <thead className="position-sticky">
          <tr>
            <th className="w-10">Id</th>
            <th>Empcode</th>
            <th>Name</th>
            <th>Email</th>
            <th>Skype Id</th>
            <th>Role</th>
            <th>Team</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Reporting Manager</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody style={{width:'100%'}}>
          {userData.map((item, index) => {
            return (
              <tr key={index}>
                <td className="w-10">{item.id}</td>
                <td className="trans-id">{item.empcode}</td>
                <td className="package">
                  {/* {item.username} */}
                  {item.user.first_name} {item.user.last_name}
                  {/* <a href="#">Super CV Pack</a> */}
                </td>
                <td className="expiry">{item.user.email}</td>
                <td className="total-jobs">{item.user_skype_id}</td>
                <td className="">{item.role_name}</td>
                <td className="remaining">{item.team}</td>
                <td className="status">
                  {item.user_branch == 1 ? "INDIA" : "USA"}
                </td>
                <td className="status">{item.department_name}</td>
                <td className="status">{item.reportingmanager_name}</td>
                <td className="text-center">
                  <div className="option-box text-center">
                    <ul className="option-list">
                      <li>
                        <button
                          onClick={() => setItem(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#userUpdateModal"
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
                          onClick={
                            () => {
                              if (active == 1) {
                                handleDeleteUser(item.id);
                              } else {
                                handleActiveUser(item.id);
                              }
                            }
                            // setUserId(item.id)
                          }
                          // data-bs-toggle="modal"
                          //     data-bs-target="#userDeleteModal"

                          data-text={`${
                            active == 1 ? "Inactive User" : "Active User"
                          }`}
                        >
                          <span
                            className={`${
                              active == 1
                                ? "las la-times-circle"
                                : "las la-check-square"
                            }`}
                          ></span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
          {/* End tr */}
          {userData.length == 0 && (
            <tr className="text-center mt-5">
              <td colSpan={11}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div>
      </div>
      <Pagination dataCount={dataCount} page={page} setPage={setPage} />
    </>
  );
};

export default UserTable;
