"use Client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

 const initialState = {
   username:'',
   role_name:'',
   department_name:'',
   user_reportingmanager:'',
   team:'',
  user_skype_id:''
 }

const UserUpdateModal = ({ item, getUserList }) => {
  const [userData, setUserData] = useState(initialState);
  
  useEffect(() => {
    if(item){
      setUserData((prev) => ({...prev, 
        username:item.user.username, 
        role_name:item.role_name,
        department_name:item.department_name,
        user_reportingmanager:item.user_reportingmanager.username,
        team:item.team,
        user_skype_id: item.user_skype_id
      }))
    }
  }, [item])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData((prev) => ({...prev, [name]:value}))
  }
  const data = {
    username:userData.username,
    user_skype_id: userData.user_skype_id
  }
  const handleUpdate = async() => {
    try{
      const response = await axios.patch(`http://10.10.105.229:8000/usersprofile/${item.id}/`, data)
      if(response.status){
        toast.success("User data successfully updated.")
        getUserList();
      }
    }catch(err){
        toast.error(err.response || "Something went wrong");
    }
  }


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
                          <input
                            type="text"
                            name="role_name"
                            placeholder="Role"
                            value={userData.role_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Team</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="team"
                            onChange={handleChange}
                          >
                            <option selected>{userData.team}</option>
                            <option value="IT">IT </option>
                            <option value="HR">HR</option>
                            <option value="OPERATION">Operation</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Branch</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="branch"
                            disabled
                            onChange={handleChange}
                          >
                            <option selected>INDIA</option>
                            <option value="USA">USA</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Department</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="department_name"
                            onChange={handleChange}
                          >
                            <option selected>{userData.department_name}</option>
                            <option value="HR">HR </option>
                            <option value="IT">IT </option>
                            <option value="OPERATION">Operation </option>
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
                          >
                            <option selected>{userData.user_reportingmanager}</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                      >
                        Update
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
