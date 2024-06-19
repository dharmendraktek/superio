"use client"
import { useEffect, useState } from "react";
import UserUpdateModal from "./UserUpdateModal";
import UserDeleteModal from "./components/UserDeleteModal";
// import { userData } from "./components/constant";  
import axios from "axios";
import { BASE_URL } from "@/utils/endpoints";
import { getReq } from "@/utils/apiHandlers";

const UserTable = () => {
  const [userData, setUserData]= useState([]);
  const [item, setItem] = useState();
  const [userId, setUserId] = useState(null);
  

  const getUserList = async () => {
    
    const response = await axios.get('http://10.10.105.229:8000/usersprofile/');
    setUserData(response.data ? response.data : [])
  }
  useEffect(()=> {
    getUserList();
  }, [])

  const handleDeleteUser = async() =>{
    const response = await axios.delete(`http://10.10.105.229:8000/usersprofile/${userId}/`)
    console.log("----------respone ", response);

  }


  return (
    <>
      <UserUpdateModal getUserList={getUserList} item={item} />
      <UserDeleteModal  userId={userId} handleDeleteUser={handleDeleteUser} />
      <table className="default-table manage-job-table">
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
                <td className="status">{item.user_branch == 1 ? 'INDIA' : 'USA'}</td>
                <td className="status">{item.department_name}</td>
                <td className="status">{item.user_reportingmanager.username}</td> 
                <td>
                  <div className="option-box">
                    <ul className="option-list">
                      <li>
                        <button 
                         onClick={() => setItem(item)}
                        data-bs-toggle="modal"
                            data-bs-target="#userUpdateModal" data-text="Edit User">
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
                         onClick={() => setUserId(item.id)}
                        data-bs-toggle="modal"
                            data-bs-target="#userDeleteModal" data-text="Delete User">
                          <span className="la la-trash"></span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
          {/* End tr */}
          {userData.length == 0 &&
             <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>No data found</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
             </tr>
          }
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
