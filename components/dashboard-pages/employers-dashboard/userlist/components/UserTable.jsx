"use client";
import { useEffect, useState } from "react";
import UserUpdateModal from "./UserUpdateModal";
import UserDeleteModal from "./components/UserDeleteModal";
// import { userData } from "./components/constant";
import axios from "axios";

import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/endpoints";
// import { SyncLoader } from "react-spinners";

const UserTable = ({ active, search, setSearch }) => {
  const [userData, setUserData] = useState([]);
  const [item, setItem] = useState();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserList = async (search) => {
    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/usersprofile/?active=${active == 1 ? true : false}${
        search ? `&search=${search}` : ""
      }`
    );
    setLoading(false);
    setUserData(response.data ? response.data.results : []);
  };
  useEffect(() => {
    getUserList(search);
  }, [active, search]);

  const handleDeleteUser = async (id) => {
    const response = await axios.delete(`${BASE_URL}/usersprofile/${id}/`);
    if (response.status) {
      toast.success("User is inactivated successfully!");
      getUserList();
    }
  };

  const handleActiveUser = async (id) => {
    const response = await axios.post(
      `${BASE_URL}/usersprofile/${id}/activate=true/`
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
      {/* <SyncLoader
        color={'green'}
        loading={loading}
        size={10}
      /> */}
      <table className="default-table ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Empcode</th>
            <th>Name</th>
            <th>Email</th>
            <th>Skype Id</th>
            <th>Role</th>
            <th>Team</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Reporting Manager</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody style={{}}>
          {userData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td className="trans-id">{item.empcode}</td>
                <td className="package">
                  {item.user.username}
                  {/* <a href="#">Super CV Pack</a> */}
                </td>
                <td className="expiry">{item.user.email}</td>
                <td className="total-jobs">{item.user_skype_id}</td>
                <td className="used">{item.role_name}</td>
                <td className="remaining">{item.team}</td>
                <td className="status">
                  {item.user_branch == 1 ? "INDIA" : "USA"}
                </td>
                <td className="status">{item.department_name}</td>
                <td className="status">{item.reportingmanager_name}</td>
                <td>
                  <div className="option-box">
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
    </>
  );
};

export default UserTable;
