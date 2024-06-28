"use Client";

import { BASE_URL } from "@/utils/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  user_role: "",
  user_team: "",
  user_dept: "",
  user_branch: "",
  user_reportingmanager: "",
  user_skype_id: "",
};

const UserUpdateModal = ({ item, getUserList }) => {
  const [userData, setUserData] = useState(initialState);
  const [teamList, setTeamList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersList = async () => {
    const response = await axios.get(BASE_URL + "/usersprofile/");
    setUserList(response.data.results);
  };

  const getTeamList = async () => {
    const response = await axios.get(BASE_URL + "/team-list/");
    if (response.status) {
      setTeamList(response.data);
    }
  };
  const getRoleList = async () => {
    const response = await axios.get(BASE_URL + "/role-list/");
    if (response.status) {
      setRoleList(response.data);
    }
  };
  const getDepartmentList = async () => {
    const response = await axios.get(BASE_URL + "/department-list/");
    if (response.status) {
      setDepartmentList(response.data);
    }
  };
  const getBranchList = async () => {
    const response = await axios.get(BASE_URL + "/branch-list/");
    if (response.status) {
      setBranchList(response.data);
    }
  };

  useEffect(() => {
    getTeamList();
    getRoleList();
    getDepartmentList();
    getBranchList();
    getUsersList();
  }, []);

  useEffect(() => {
    if (item) {
      setUserData((prev) => ({
        ...prev,
        username: item.user.username,
        user_role: item.user_role,
        user_dept: item.user_dept,
        user_reportingmanager: item.user_reportingmanager,
        user_team: item.user_team,
        user_skype_id: item.user_skype_id,
        user_branch: item.user_branch,
      }));
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const data = {
    user_role: userData.user_role,
    user_dept: userData.user_dept,
    user_reportingmanager: userData.user_reportingmanager,
    user_team: userData.user_team,
    user_skype_id: userData.user_skype_id,
    user_branch: userData.user_branch,
  };
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${BASE_URL}/usersprofile/${item.id}/`,
        data
      );
      if (response.status) {
        setIsLoading(false);
        toast.success("User data successfully updated.");
        getUserList();
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response || "Something went wrong");
    }
  };

  return (
    <>
      <div className="modal fade" id="userUpdateModal">
        <div className="modal-dialog modal-lg modal-dialog-centered userUpdate-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>
            {/* End close modal btn */}

            <div className="modal-body">
              {/* <!-- Login modal --> */}
              <div id="login-modal">
                {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                  {/* <form method="post"> */}
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label>Employee Code</label>
                        <input
                          type="text"
                          name="empcode"
                          placeholder="Employee Code"
                          value={item?.empcode}
                          disabled
                          required
                        />
                      </div>
                      {/* name */}
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Name"
                          value={userData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* name */}
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          name="Email"
                          placeholder="Email"
                          value={item?.user?.email}
                          disabled
                          required
                        />
                      </div>
                      {/* password */}
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Skype Id</label>
                        <input
                          type="text"
                          name="user_skype_id"
                          placeholder="Skype Id"
                          value={userData.user_skype_id}
                          onChange={handleChange}
                          // disabled
                          required
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          name="user_role"
                          onChange={handleChange}
                          value={userData.user_role}
                        >
                          {roleList.map((item) => {
                            return (
                              <option key={item.id} value={item.id} selected>
                                {item.role_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Team</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          name="user_team"
                          onChange={handleChange}
                          value={userData.user_team}
                        >
                          {teamList.map((item) => {
                            return (
                              <option key={item.id} value={item.id} selected>
                                {item.team_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Branch</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          name="user_branch"
                          onChange={handleChange}
                          value={userData.user_branch}
                        >
                          {branchList.map((item) => {
                            return (
                              <option
                                className="capitalize"
                                key={item.id}
                                value={item.id}
                                selected
                              >
                                {item.branch_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Department</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          name="user_dept"
                          onChange={handleChange}
                          value={userData.user_dept}
                        >
                          {departmentList.map((item) => {
                            return (
                              <option key={item.id} value={item.id} selected>
                                {item.dept_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {/* password */}
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Reporting Manager</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          name="user_reportingmanager"
                          onChange={handleChange}
                          value={userData.user_reportingmanager}
                        >
                          {userList.map((item) => {
                            return (
                              <option
                                value={item.user_reportingmanager}
                                selected
                              >
                                {item.reportingmanager_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-5">
                    <button
                      onClick={handleUpdate}
                      className="theme-btn btn-style-one"
                      // type="submit"
                      name="log-in"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <BeatLoader
                          color={"#ffffff"}
                          loading={isLoading}
                          size={15}
                        />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                  {/* </form> */}
                </div>
                {/* <!--End Login Form --> */}
              </div>
              {/* <!-- End Login Module --> */}
            </div>
            {/* En modal-body */}
          </div>
          {/* End modal-content */}
        </div>
      </div>
    </>
  );
};

export default UserUpdateModal;
