"use client";
// import UserUpdateModal from "./UserUpdateModal";
// import UserDeleteModal from "./components/UserDeleteModal";

import { useState } from "react";
import ClientUpdateModal from "../ClientUpdateModal";
import ClientDeleteModal from "./ClientDeleteModal";
import { clientData, clientTableField } from "./constant";

const ClientTable = () => {
  const [expand, setExpand] = useState(null);
  return (
    <>
      <ClientDeleteModal />
      <ClientUpdateModal />
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
              {clientTableField.map((item, index) => {
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
            {clientData.map((item, index) => {
              return (
                <>
                  <tr className="">
                    {item.select == "input" && (
                      <td className="d-flex mt-3 ">
                        <input type="checkbox" />
                        <div
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
                        </div>
                        <div
                          className="bg-primary text-white mt-1 px-2 ml-2"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "12px",
                            borderRadius: "3px",
                          }}
                        >
                          3
                        </div>
                      </td>
                    )}
                    <td>{item.client_id}</td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td className="package">
                      {item.client_name}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td className="expiry">{item.Contact_number}</td>
                    <td>{item.website}</td>
                    <td className="total-jobs">{item.industry}</td>
                    <td className="used">{item.status}</td>
                    <td className="remaining">{item.category}</td>
                    <td className="status">{item.primary_owner}</td>
                    <td className="status">{item.business_unit}</td>
                    <td className="expiry">{item.job_posting}</td>
                    <td className="" style={{ width: "200px" }}>
                      {item.created_by}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {item.created_on}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {item.modified_on}
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
                  {item.client_id == expand && (
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
                  )}
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

export default ClientTable;
